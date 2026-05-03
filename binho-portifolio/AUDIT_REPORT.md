# Auditoria Técnica — Portfólio Binho

**Escopo:** Segurança e arquitetura React do projeto `binho-portifolio`.
**Data:** 2026-05-03
**Stack analisada:** React 19.2 · CRA (react-scripts 5.0.1) · Tailwind 3.4 · Framer Motion 12 · lucide-react 1.11

---

## Sumário executivo

O projeto é um SPA de portfólio enxuto, sem backend, sem dados sensíveis nem autenticação — então o "risco" é menor que numa app transacional. Mesmo assim, há **achados sérios** que merecem ação:

- 28 vulnerabilidades npm (14 *high*) herdadas do `react-scripts` (CRA), que está oficialmente abandonado.
- Formulário de contato implementado com `mailto:` POST — não funciona em maior parte dos clientes modernos, e ainda expõe o e-mail em texto puro dentro do HTML.
- Source maps em produção, expondo o código original.
- Acessibilidade quebrada em vários pontos (toggles em `<span>`, modal sem `role/aria`, inputs sem `<label>`).
- Tradução duplicada e dessincronizada: `translations.js` tem chaves que os componentes simplesmente ignoram, fazendo i18n inline com `language === 'pt' ? <>...</>`.
- Áudio de fundo de **30 MB em `.wav`** servido em produção.

Nenhum achado é "vai vazar dados do usuário hoje" — mas vários comprometem reputação técnica num portfólio de Tech Lead. Ataque-os pelo topo desta lista.

---

## 1. Segurança

### 1.1 CRÍTICO · `react-scripts@5.0.1` traz 28 CVEs e está deprecado

`npm audit` resumido:

```
28 vulnerabilities (9 low, 5 moderate, 14 high)
```

Cadeia das *high*: `nth-check` → `css-select` → `svgo` → `@svgr/webpack` → `react-scripts`; `serialize-javascript` → `css-minimizer-webpack-plugin`; `jsonpath` → `bfj`; `webpack-dev-server` ↔ `sockjs` ↔ `uuid`.

`npm audit fix --force` puxa `react-scripts@0.0.0` (placeholder) — **não rode**.

**Correção real:** migrar de CRA para **Vite** (ou Next.js se quiser SSR/SEO). É um trabalho de ~2-4h num projeto deste tamanho:

```bash
npm create vite@latest binho-portifolio -- --template react-ts
# copiar src/, public/, tailwind.config.js, postcss.config.js
# substituir react-scripts por vite, @vitejs/plugin-react
# index.html sai de public/ para a raiz
```

Benefícios diretos: zera CVEs do build chain, build 5–10× mais rápido, HMR instantâneo, suporte nativo a ESM, base para TypeScript, e elimina a maior parte do node_modules.

### 1.2 ALTO · Source maps publicados em produção

`build/static/js/*.map` está sendo gerado. Qualquer um abre o DevTools e lê todo o seu fonte original (incluindo arquivos não minificados). Fix:

```bash
# .env.production
GENERATE_SOURCEMAP=false
```

Em Vite o equivalente é `build.sourcemap: false`.

### 1.3 ALTO · Formulário `mailto:` é teatro de segurança e UX

`src/components/layout/Footer.js:23`:

```jsx
<form action="mailto:lealdinifabio@gmail.com" method="POST" encType="text/plain">
```

Problemas concretos:

- **Não funciona** em Chrome/Edge/Safari para `method="POST"` — o usuário sempre será jogado pro cliente de e-mail nativo (ou nada acontece). O usuário acha que enviou, você nunca recebe.
- **Email aparece em texto puro 2× no DOM** (action e link mailto). Bots de scraping coletam em milissegundos.
- **Zero proteção contra spam/bot** (nenhum honeypot, sem captcha).
- **Inputs não têm `<label>`** — apenas placeholders. Falha em WCAG 2.1 1.3.1 e 4.1.2.

**Correção recomendada:** trocar por um endpoint serverless (Formspree, Web3Forms, Resend, ou Cloudflare Worker) com:

- `<label>` invisível ou visível para cada input;
- honeypot oculto (campo `website` que humanos não vêem);
- ofuscação do email no fallback (`mailto:` apenas após interação, ou substituir por `<a href="#" onClick={() => navigator.clipboard.writeText(...)}>` e copiar pro clipboard).

### 1.4 MÉDIO · Sem CSP nem outros headers de segurança

GitHub Pages não permite headers de servidor, mas é possível setar via `<meta http-equiv>` no `index.html`:

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

(Note que `'unsafe-inline'` em styles é exigido pelo Tailwind/CRA inline; com Vite + nonce dá pra apertar.)

### 1.5 MÉDIO · `<iframe>` do PDF sem `sandbox`

`SlideViewer.jsx:53` — embora o PDF seja seu, é boa prática:

```jsx
<iframe src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
        sandbox="allow-same-origin allow-scripts allow-popups"
        loading="lazy"
        referrerPolicy="no-referrer" />
```

### 1.6 BAIXO · `localStorage` sem try/catch

`LanguageContext.jsx`, `ThemeToggle.jsx`. Em **Safari modo privado** ou storage cheio, `setItem` lança e quebra o app.

```js
const safeStorage = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k,v) => { try { localStorage.setItem(k,v); } catch {} },
};
```

### 1.7 BAIXO · `savedLang` não é validado

```js
// LanguageContext.jsx:11
const savedLang = localStorage.getItem('app-language');
if (savedLang) setLanguage(savedLang);  // aceita qualquer string
```

Adultere via DevTools com um valor inválido e `t()` faz `value[k]` em `undefined` → TypeError. Validar:

```js
const allowed = ['pt', 'en'];
if (savedLang && allowed.includes(savedLang)) setLanguage(savedLang);
```

### 1.8 BAIXO · `t()` quebra com chave aninhada inexistente

```js
for (const k of keys) {
  if (value[k] === undefined) return key;  // se value já for undefined, isso explode
  value = value[k];
}
```

Corrigir:

```js
for (const k of keys) {
  if (value == null || value[k] === undefined) return key;
  value = value[k];
}
```

### 1.9 INFO · Áudio de 30 MB no bundle público

`public/audio/alive.wav` = **30 MB**. Não é vetor de segurança, mas:

- usuário móvel paga banda;
- LCP/INP afetados;
- bom alvo para *bandwidth abuse* se alguém embedar seu site.

Converter para `.opus` ~1 MB ou `.mp3` ~3 MB, e usar `preload="none"` (já que não toca automaticamente).

---

## 2. Arquitetura e qualidade de código

### 2.1 ALTO · Tradução duplicada e dessincronizada

Você tem `i18n/translations.js` com chaves estruturadas, **mas** vários componentes ignoram e fazem i18n inline:

- `About.js:69` — `language === 'pt' ? <>...</> : <>...</>`
- `Experience.js:57` — idem
- `LabSection.jsx:61` — idem
- `TechTalks.jsx:69` — idem

Resultado: o texto em `translations.js` para `experience.card1_text`, `about.text`, `lab.subtitle`, `lab.project_text` está **órfão** — ninguém lê. Quando você editar o arquivo de traduções, nada muda na UI; quem nunca passou por isso.

**Correção:** unificar via `t()` com suporte a interpolação rica. Opções:

1. **Componente `<Trans>` próprio** que aceita placeholders (`<1>`, `<2>`) já presentes no `translations.js`:

   ```jsx
   <Trans i18nKey="experience.card1_text"
          components={[<span className="font-medium" />, <strong />]} />
   ```

2. **Adotar `react-i18next`** — biblioteca padrão, suporte a Trans, plural, lazy loading.

Ganho: uma única fonte de verdade, traduções reais reaproveitáveis (ex.: `pt-BR` vs `pt-PT`), e os textos PARAM de duplicar em JSX.

### 2.2 ALTO · Acessibilidade comprometida

| Componente | Problema | Correção |
|---|---|---|
| `ThemeToggle` | `<motion.span onClick>` para alternar tema/idioma — não tabulável, sem semântica | Trocar por `<button>` real com `aria-pressed` |
| `SlideViewer` (modal) | Sem `role="dialog"`, `aria-modal="true"`, sem focus trap, sem retorno de foco | Usar `<dialog>` nativo ou Radix Dialog/HeadlessUI |
| `Footer` form | Inputs só com `placeholder` | `<label>` com `htmlFor` (pode estar `sr-only`) |
| `CustomCursor` | Anima a 60+ fps mesmo em `prefers-reduced-motion` | Respeitar `window.matchMedia('(prefers-reduced-motion: reduce)')` |
| `ParallaxBackground` | Idem — partículas e símbolos flutuando ignoram preferência | Idem |
| `<html lang="en">` em `index.html` | Conteúdo padrão é PT | Trocar para `pt-BR` (ou setar via JS quando idioma muda) |

### 2.3 MÉDIO · `LanguageContext` re-renderiza tudo a cada render

```js
return (
  <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
```

`{ language, toggleLanguage, t }` é objeto novo a cada render → todos os consumidores re-renderizam. Mesmo que React 19 ajude com automatic memoization, vale o `useMemo`/`useCallback`:

```js
const t = useCallback((key) => { /* ... */ }, [language]);
const value = useMemo(() => ({ language, toggleLanguage, t }), [language, t]);
```

### 2.4 MÉDIO · Mistura `.js` e `.jsx` sem critério

`Hero.js`, `About.js`, `Experience.js`, `TechStack.js`, `Footer.js`, `index.js`, `App.js` contêm JSX mas usam extensão `.js`. Padronize — preferência: **migrar para TypeScript** (`.tsx`). Para um portfólio de Tech Lead, ter TS demonstra maturidade e captura o tipo de bug do item 1.7/1.8 em compile time.

### 2.5 MÉDIO · Sem `ErrorBoundary`

Qualquer exceção em qualquer componente derruba o app inteiro pra tela branca. Adicionar um boundary mínimo no `App.js`:

```jsx
<ErrorBoundary fallback={<MinimalError />}>
  <main>...</main>
</ErrorBoundary>
```

### 2.6 MÉDIO · Teste padrão CRA está quebrado

`src/App.test.js` é o template do CRA (`renders learn react link`) e **falha** se executado, porque o app não tem mais esse texto. Remova ou substitua por testes reais (renderiza Hero, alterna idioma, abre modal de PDF).

### 2.7 MÉDIO · Sem code splitting

Tudo carrega no bundle inicial. `framer-motion` (~80 kB gzip) + ícones lucide entram para uma seção como `LabSection` que aparece no fim. Use `React.lazy`:

```jsx
const LabSection = lazy(() => import('./components/sections/LabSection'));
const TechTalks = lazy(() => import('./components/sections/TechTalks'));
// envolver em <Suspense fallback={...}>
```

`SlideViewer` é candidato perfeito a lazy-load (só carrega quando o usuário clica em "Ver Slides").

### 2.8 BAIXO · `manifest.json` não personalizado

```json
{ "short_name": "React App", "name": "Create React App Sample" }
```

Trocar para `"Binho · Portfolio"`, definir `theme_color: "#4ade80"`, ícones próprios.

### 2.9 BAIXO · `meta description` duplicada

`index.html:9-11` tem o template CRA *e* o seu próprio em `:29`. Remover o primeiro.

### 2.10 BAIXO · Código morto

`src/data/content.js:1-18` exporta `talksData` que ninguém importa (TechTalks tem dados inline). Remover ou centralizar (ver 2.1).

### 2.11 BAIXO · `key={index}` em listas

`TechStack.js:59` — usar `key={skill.name}` (estável). Mesma coisa em `ParallaxBackground.jsx:124` (`key={i}`) — usar `sym.text`.

### 2.12 BAIXO · `setInterval` 1Hz em `About.js`

Atualizar segundos faz `<About>` re-renderizar 60×/min. Para um item decorativo, considerar:

- atualizar só visualmente via `requestAnimationFrame` + ref no DOM;
- ou parar quando a seção sai do viewport (`useInView`).

### 2.13 BAIXO · `CustomCursor` re-renderiza por mousemove

Padrão correto já está em `ParallaxBackground` (`useMotionValue`). Aplicar mesma técnica em `CustomCursor`.

### 2.14 BAIXO · Variants de motion duplicados

`containerVariants`/`itemVariants` repetidos em 3 componentes — extrair para `src/anim/variants.js`.

### 2.15 INFO · SEO

- Sem JSON-LD `Person` schema;
- Sem `sitemap.xml`;
- `<html lang>` errado (item 2.2);
- Open Graph tem `og:image` único 512×512 — recomendado 1200×630 dedicado.

---

## 3. Plano de ação priorizado

| # | Item | Esforço | Impacto |
|---|---|---|---|
| 1 | Migrar CRA → Vite + TypeScript | M | resolve §1.1, §1.2, §2.4 e habilita resto |
| 2 | Trocar form `mailto:` por endpoint sem-server (Formspree/Web3Forms) com labels e honeypot | S | §1.3, §2.2 |
| 3 | Comprimir `alive.wav` → `.opus`/`.mp3` | XS | §1.9 |
| 4 | Consolidar i18n em `t()`+`<Trans>` (ou `react-i18next`) | M | §2.1 |
| 5 | Acessibilidade: trocar `<span onClick>` por `<button>`, modal `<dialog>`, labels nos inputs, `prefers-reduced-motion` | M | §2.2 |
| 6 | Memoizar `LanguageContext` value, validar `savedLang`, hardening `t()` | XS | §1.6, §1.7, §1.8, §2.3 |
| 7 | Adicionar `ErrorBoundary`, lazy-load de `SlideViewer`/`LabSection` | S | §2.5, §2.7 |
| 8 | Limpar template padrão (manifest, meta description, App.test.js, talksData morto) | XS | §2.6, §2.8, §2.9, §2.10 |
| 9 | CSP via meta + `X-Content-Type-Options` + sandbox no iframe | XS | §1.4, §1.5 |
| 10 | SEO: JSON-LD Person, sitemap, lang correto, og:image 1200×630 | S | §2.15 |

XS = ≤30min, S = 1–3h, M = 0,5–1 dia.

---

## 4. Quick wins que dá pra fazer hoje (≤30 min cada)

1. `.env.production` com `GENERATE_SOURCEMAP=false`.
2. Renomear `manifest.json` → `"name": "Fábio Lealdini · Portfolio"`.
3. `<html lang="pt-BR">` no `index.html`, remover meta description default.
4. Validar `savedLang` no `LanguageContext` e proteger `t()` contra `value` undefined.
5. Memoizar value do `LanguageContext`.
6. Trocar `<motion.span onClick>` do `ThemeToggle` por `<button>`.
7. Apagar `data/content.js` e o `App.test.js` quebrado.
8. Adicionar `prefers-reduced-motion` em `ParallaxBackground` e `CustomCursor`.

Esses oito itens já tiram metade do relatório do caminho.
