Instruções para usar uma cópia local do Leaflet (opcional)

Objetivo
- Permitir que a aplicação carregue o Leaflet localmente (offline) para testes e desenvolvimento.

O que colocar aqui
- Coloque os arquivos `leaflet.js` e `leaflet.css` (versão 1.9.4) na pasta `vendor/leaflet/`.
- Opcionalmente adicione também `images/marker-icon.png`, `images/marker-icon-2x.png` e `images/marker-shadow.png` se quiser ícones locais.

Como baixar (PowerShell)
- Baixar os arquivos do unpkg (ou de https://leafletjs.com):

  # Criar pasta (se necessário)
  mkdir -Force vendor\leaflet

  # Baixar CSS
  Invoke-WebRequest -Uri "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" -OutFile "vendor\leaflet\leaflet.css"

  # Baixar JS
  Invoke-WebRequest -Uri "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" -OutFile "vendor\leaflet\leaflet.js"

- Ou usando curl (Git Bash / WSL):

  mkdir -p vendor/leaflet
  curl -L -o vendor/leaflet/leaflet.css https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
  curl -L -o vendor/leaflet/leaflet.js https://unpkg.com/leaflet@1.9.4/dist/leaflet.js

Como funciona o loader no projeto
- `TerraViva.html` agora tenta carregar `/vendor/leaflet/leaflet.css` e `/vendor/leaflet/leaflet.js` primeiro.
- Se os arquivos locais não estiverem disponíveis, o loader faz fallback automaticamente para o CDN (`unpkg.com`).

Notas
- Sirva o projeto via HTTP (p.ex. `npx http-server` ou `python -m http.server`) para que os caminhos locais funcionem.
- Se precisar, posso baixar automaticamente os arquivos e colocá-los em `vendor/leaflet` — diga "faça" que eu faço isso por você.
