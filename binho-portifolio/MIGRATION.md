# Migração CRA → Vite — passos finais para você rodar localmente

A migração já está commit-ready. Algumas operações precisam ser executadas
no seu terminal (ou Finder) porque o sandbox onde rodei os ajustes não tem
permissão para apagar arquivos no mount do macOS.

## 1. Reinstalar dependências (obrigatório)

O `package.json` foi reescrito (Vite + Vitest + ESLint substituem
`react-scripts`). Limpe o `node_modules` antigo:

```bash
cd ~/Documents/React/Lealdini.github.io/binho-portifolio
rm -rf node_modules package-lock.json build
npm install
```

## 2. Apagar arquivos órfãos da migração

O Vite usa `index.html` na raiz e `assets/` como pasta de estáticos —
o `public/` da CRA não é mais necessário, e durante a migração foi criada
uma pasta `static/` que pode ser descartada:

```bash
rm -rf public static
```

Antes de rodar isso, **confirme** que `assets/` contém:

```
assets/
├── apresentacoes/
│   ├── ai_verge.pdf
│   └── falando_com_maquina.pdf
├── audio/
│   ├── alive.opus      (1.4 MB — substitui o wav de 30 MB)
│   └── alive.mp3       (1.9 MB — fallback Safari < 17.5)
├── favicon.ico
├── logo192.png
├── logo512.png
├── manifest.json
└── robots.txt
```

Se faltar algo, copie de `public/` antes de apagar.

## 3. Apagar a pasta `build/` antiga (CRA)

```bash
rm -rf build
npm run build   # vai recriar com o output do Vite
```

## 4. Comandos novos

| Antes (CRA)              | Agora (Vite)         |
|--------------------------|----------------------|
| `npm start`              | `npm run dev`        |
| `npm run build`          | `npm run build`      |
| `npm test`               | `npm test`           |
| —                        | `npm run preview`    |

`npm start` continua funcionando como alias de `vite`.

## 5. O que mudou no fonte (referência rápida)

- `index.html` agora vive na raiz do projeto (Vite convention).
- `postcss.config.js` e `tailwind.config.js` viraram ESM (`export default`)
  porque `package.json` agora tem `"type": "module"`.
- `src/reportWebVitals.js` foi removido (dependia de `web-vitals`,
  retirado para limpar a árvore).
- `src/index.js` não chama mais `reportWebVitals()`.
- `BackgroundMusic.jsx` agora usa `<audio><source>` com opus + mp3.
- `tailwind.config.js` passou a incluir `./index.html` no `content`.
- `vite.config.js` usa `publicDir: 'assets'` (em vez do `public/` da CRA),
  `base: './'` (compatível com GitHub Pages user/project sites),
  `build.outDir: 'build'` (mantém o caminho de deploy que você já tinha).

## 6. Resultado do primeiro build (referência)

```
build/index.html                       2.59 kB │ gzip:   0.92 kB
build/assets/index-*.css              36.79 kB │ gzip:   6.47 kB
build/assets/SlideViewer-*.js          3.17 kB │ gzip:   1.53 kB   ← lazy
build/assets/TechTalks-*.js            4.55 kB │ gzip:   1.80 kB   ← lazy
build/assets/LabSection-*.js           5.02 kB │ gzip:   1.82 kB   ← lazy
build/assets/index-*.js              372.51 kB │ gzip: 117.23 kB
```

`SlideViewer` só carrega quando o usuário clica em "Ver Slides".

## 7. Próximos passos sugeridos (não bloqueantes)

- **TypeScript:** crie `tsconfig.json` e migre arquivo a arquivo de `.jsx` para `.tsx`. Vite suporta TS sem nenhuma config extra além do tsconfig.
- **Backend de e-mail real:** o form atualmente abre o cliente de e-mail nativo do usuário com a mensagem pré-preenchida. Se quiser receber direto sem depender disso, integre Web3Forms / Formspree / Resend (uma chave em `import.meta.env.VITE_FORM_ENDPOINT`).
- **Pre-render / SSG** com `vite-plugin-ssr` ou migrar para Next.js se quiser SEO mais rico.
