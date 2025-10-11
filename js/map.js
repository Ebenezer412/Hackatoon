/**
 * TerraViva - Módulo de Mapa
 * Gerencia a inicialização e configuração do mapa Leaflet.js
 */

// Variável global para o mapa
let mapInstance = null;

/**
 * Dados dos marcadores do mapa
 */
const MAP_MARKERS = [
    { 
        coords: [-15.78, -47.93], 
        title: 'Projeto Agrosustentável (BR)', 
        info: 'Foco em Plantio Direto e Agricultura de Precisão.' 
    },
    { 
        coords: [40.0, -4.0], 
        title: 'Área de Risco de Desertificação (ES)', 
        info: 'Região com alto índice de erosão. Projetos de reflorestamento em curso.' 
    },
    { 
        coords: [15.0, 0.0], 
        title: 'Iniciativa Sahel (África)', 
        info: 'Restauração de terras áridas e semi-áridas com técnicas de barreira verde.' 
    }
];

/**
 * Configurações do mapa
 */
const MAP_CONFIG = {
    center: [30, -10],
    zoom: 2,
    maxZoom: 18,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
};

/**
 * Inicializa o mapa Leaflet.js.
 */
function initMap() {
    try {
        // Verificar se Leaflet está disponível
        if (typeof L === 'undefined') {
            throw new Error('Leaflet.js não está carregado');
        }

        // Verificar se o elemento do mapa existe
        const mapElement = document.getElementById('mapa-interativo');
        if (!mapElement) {
            throw new Error('Elemento do mapa não encontrado');
        }

        // Remove instância anterior se existir
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }
        
        // Criar nova instância do mapa
        mapInstance = L.map('mapa-interativo').setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

        // Adicionar camada de tiles
        L.tileLayer(MAP_CONFIG.tileLayer, {
            maxZoom: MAP_CONFIG.maxZoom,
            attribution: MAP_CONFIG.attribution
        }).addTo(mapInstance);

        // Adicionar marcadores
        addMarkersToMap();

        console.log('Mapa inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar mapa:', error);
        showMapFallback();
    }
}

/**
 * Adiciona marcadores ao mapa
 */
function addMarkersToMap() {
    if (!mapInstance) return;

    MAP_MARKERS.forEach(marker => {
        try {
            L.marker(marker.coords)
                .addTo(mapInstance)
                .bindPopup(`<strong>${marker.title}</strong><br>${marker.info}`);
        } catch (error) {
            console.error('Erro ao adicionar marcador:', error);
        }
    });
}

/**
 * Mostra conteúdo alternativo quando o mapa falha
 */
function showMapFallback() {
    const mapElement = document.getElementById('mapa-interativo');
    if (mapElement) {
        mapElement.innerHTML = `
            <div class="p-8 text-center text-gray-500">
                <p class="text-lg font-semibold mb-2">Mapa temporariamente indisponível</p>
                <p class="text-sm">Estamos trabalhando para restaurar esta funcionalidade. Tente recarregar a página.</p>
            </div>
        `;
    }
}

/**
 * Destrói a instância do mapa
 */
function destroyMap() {
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
}

/**
 * Atualiza o centro do mapa
 */
function setMapCenter(lat, lng, zoom = MAP_CONFIG.zoom) {
    if (mapInstance) {
        mapInstance.setView([lat, lng], zoom);
    }
}

/**
 * Adiciona um novo marcador ao mapa
 */
function addMarker(lat, lng, title, info) {
    if (mapInstance) {
        L.marker([lat, lng])
            .addTo(mapInstance)
            .bindPopup(`<strong>${title}</strong><br>${info}`);
    }
}

// Exportar funções para uso global
window.initMap = initMap;
window.showMapFallback = showMapFallback;
window.destroyMap = destroyMap;
window.setMapCenter = setMapCenter;
window.addMarker = addMarker;
