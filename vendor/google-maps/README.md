Google Maps API - instruções (opcional)

Objetivo
- Permitir que a aba "Projetos" utilize o Google Maps para visualização interativa com polígonos e marcadores.

Passos rápidos
1. Obtenha uma API Key do Google Cloud Console (Maps JavaScript API) e habilite o billing se solicitado.
2. Coloque a sua chave no URL do script abaixo substituindo `YOUR_KEY`.

Exemplo de inclusão no `TerraViva.html` (adicionar antes do fechamento de `</body>`):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=initGoogleMaps" async defer></script>
```

Notas
- O `callback=initGoogleMaps` chama a função `initGoogleMaps()` definida em `TerraViva.html` quando a API estiver pronta.
- Se não incluir o script, a aplicação usará Leaflet como fallback automaticamente.
- Para desenvolvimento local, sirva os arquivos via HTTP (p.ex. `python -m http.server`) para evitar problemas de CORS/HTTPS com algumas APIs.

Se quiser que eu adicione automaticamente uma variável ou local `.env` para a chave e insira o `<script>` no HTML, diga "faça" e eu adiciono (não coloque a chave aqui publicamente).