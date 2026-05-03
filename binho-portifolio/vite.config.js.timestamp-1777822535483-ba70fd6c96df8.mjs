// vite.config.js
import { defineConfig } from "file:///sessions/awesome-exciting-curie/mnt/binho-portifolio/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/awesome-exciting-curie/mnt/binho-portifolio/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  // Use a relative base so the build works on GitHub Pages user/project sites.
  base: "./",
  // Static assets live under `assets/` instead of the legacy CRA `public/`.
  // (The old `public/index.html` would otherwise clobber the Vite-generated one.)
  publicDir: "assets",
  plugins: [react()],
  // Many files in this codebase use the `.js` extension but contain JSX.
  // Tell esbuild to treat them as JSX so we don't have to rename them all
  // during the migration.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" }
    }
  },
  build: {
    outDir: "build",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3e3,
    open: true
  },
  preview: {
    port: 3e3
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.js"],
    css: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvYXdlc29tZS1leGNpdGluZy1jdXJpZS9tbnQvYmluaG8tcG9ydGlmb2xpb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2F3ZXNvbWUtZXhjaXRpbmctY3VyaWUvbW50L2JpbmhvLXBvcnRpZm9saW8vdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Nlc3Npb25zL2F3ZXNvbWUtZXhjaXRpbmctY3VyaWUvbW50L2JpbmhvLXBvcnRpZm9saW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBVc2UgYSByZWxhdGl2ZSBiYXNlIHNvIHRoZSBidWlsZCB3b3JrcyBvbiBHaXRIdWIgUGFnZXMgdXNlci9wcm9qZWN0IHNpdGVzLlxuICBiYXNlOiAnLi8nLFxuXG4gIC8vIFN0YXRpYyBhc3NldHMgbGl2ZSB1bmRlciBgYXNzZXRzL2AgaW5zdGVhZCBvZiB0aGUgbGVnYWN5IENSQSBgcHVibGljL2AuXG4gIC8vIChUaGUgb2xkIGBwdWJsaWMvaW5kZXguaHRtbGAgd291bGQgb3RoZXJ3aXNlIGNsb2JiZXIgdGhlIFZpdGUtZ2VuZXJhdGVkIG9uZS4pXG4gIHB1YmxpY0RpcjogJ2Fzc2V0cycsXG5cbiAgcGx1Z2luczogW3JlYWN0KCldLFxuXG4gIC8vIE1hbnkgZmlsZXMgaW4gdGhpcyBjb2RlYmFzZSB1c2UgdGhlIGAuanNgIGV4dGVuc2lvbiBidXQgY29udGFpbiBKU1guXG4gIC8vIFRlbGwgZXNidWlsZCB0byB0cmVhdCB0aGVtIGFzIEpTWCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlbmFtZSB0aGVtIGFsbFxuICAvLyBkdXJpbmcgdGhlIG1pZ3JhdGlvbi5cbiAgZXNidWlsZDoge1xuICAgIGxvYWRlcjogJ2pzeCcsXG4gICAgaW5jbHVkZTogL3NyY1xcLy4qXFwuanN4PyQvLFxuICAgIGV4Y2x1ZGU6IFtdLFxuICB9LFxuXG4gIG9wdGltaXplRGVwczoge1xuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBsb2FkZXI6IHsgJy5qcyc6ICdqc3gnIH0sXG4gICAgfSxcbiAgfSxcblxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcblxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcblxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBzZXR1cEZpbGVzOiBbJy4vc3JjL3NldHVwVGVzdHMuanMnXSxcbiAgICBjc3M6IGZhbHNlLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLE1BQU07QUFBQTtBQUFBO0FBQUEsRUFJTixXQUFXO0FBQUEsRUFFWCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLakIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsU0FBUyxDQUFDO0FBQUEsRUFDWjtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRLEVBQUUsT0FBTyxNQUFNO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxZQUFZLENBQUMscUJBQXFCO0FBQUEsSUFDbEMsS0FBSztBQUFBLEVBQ1A7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
