/**
 * TerraViva - Módulo de Gráficos
 * Gerencia a inicialização e configuração dos gráficos Chart.js
 */

// Variáveis globais para gráficos
let chartDegradacaoInstance = null;
let chartErosaoInstance = null;
let chartDesertificacaoInstance = null;
let chartRecuperacaoInstance = null;

/**
 * Dados dos gráficos - centralizados para facilitar manutenção
 * Fontes: ONU Meio Ambiente, FAO, Ministério do Ambiente de Angola
 * Dados simulados para fins de demonstração
 */
const CHART_DATA = {
    degradacao: {
        labels: ['Agricultura Intensiva', 'Desmatamento/Erosão', 'Pastagem Excessiva', 'Poluição Industrial', 'Mineração'],
        data: [35, 28, 20, 12, 5],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#9B59B6']
    },
    erosao: {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
        data: [18.5, 19.2, 20.1, 19.8, 19.5, 18.9]
    },
    desertificacao: {
        labels: ['Cunene', 'Huíla', 'Namibe', 'Benguela', 'Kwanza Sul', 'Outras Províncias'],
        data: [25, 18, 15, 12, 8, 22],
        colors: ['#E74C3C', '#F39C12', '#F1C40F', '#27AE60', '#3498DB', '#95A5A6']
    },
    recuperacao: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        data: [2.1, 2.8, 3.2, 4.1, 5.3, 6.7, 8.2]
    }
};

/**
 * Inicializa os gráficos Chart.js.
 */
function initCharts() {
    try {
        // Verificar se Chart.js está disponível
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js não está carregado');
        }

        // Destrói instâncias anteriores para evitar erros de desenho
        if (chartDegradacaoInstance) {
            chartDegradacaoInstance.destroy();
            chartDegradacaoInstance = null;
        }
        if (chartErosaoInstance) {
            chartErosaoInstance.destroy();
            chartErosaoInstance = null;
        }
        if (chartDesertificacaoInstance) {
            chartDesertificacaoInstance.destroy();
            chartDesertificacaoInstance = null;
        }
        if (chartRecuperacaoInstance) {
            chartRecuperacaoInstance.destroy();
            chartRecuperacaoInstance = null;
        }

        // Verificar se os elementos canvas existem
        const canvasDegradacao = document.getElementById('chartDegradacao');
        const canvasErosao = document.getElementById('chartErosao');
        const canvasDesertificacao = document.getElementById('chartDesertificacao');
        const canvasRecuperacao = document.getElementById('chartRecuperacao');
        
        if (!canvasDegradacao || !canvasErosao) {
            throw new Error('Elementos canvas principais não encontrados');
        }

        // 1. Gráfico de Rosca (Áreas Degradadas por Causa)
        const ctxDegradacao = canvasDegradacao.getContext('2d');
        chartDegradacaoInstance = new Chart(ctxDegradacao, {
            type: 'doughnut',
            data: {
                labels: CHART_DATA.degradacao.labels,
                datasets: [{
                    label: 'Percentagem de Degradação',
                    data: CHART_DATA.degradacao.data,
                    backgroundColor: CHART_DATA.degradacao.colors,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: false
                    }
                }
            }
        });

        // 2. Gráfico de Linhas (Evolução da Erosão)
        const ctxErosao = canvasErosao.getContext('2d');
        chartErosaoInstance = new Chart(ctxErosao, {
            type: 'line',
            data: {
                labels: CHART_DATA.erosao.labels,
                datasets: [{
                    label: 'Erosão Anual (Bi Ton)',
                    data: CHART_DATA.erosao.data,
                    borderColor: '#795548', // Marrom-solo
                    backgroundColor: 'rgba(121, 85, 72, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Bilhões de Toneladas'
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        console.log('Gráficos inicializados com sucesso');
        
        // 3. Gráfico de Barras (Desertificação por Província) - se canvas existir
        if (canvasDesertificacao) {
            const ctxDesertificacao = canvasDesertificacao.getContext('2d');
            chartDesertificacaoInstance = new Chart(ctxDesertificacao, {
                type: 'bar',
                data: {
                    labels: CHART_DATA.desertificacao.labels,
                    datasets: [{
                        label: 'Área Desertificada (%)',
                        data: CHART_DATA.desertificacao.data,
                        backgroundColor: CHART_DATA.desertificacao.colors,
                        borderColor: CHART_DATA.desertificacao.colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Percentagem (%)'
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: false
                        }
                    }
                }
            });
        }

        // 4. Gráfico de Linha (Recuperação de Solos) - se canvas existir
        if (canvasRecuperacao) {
            const ctxRecuperacao = canvasRecuperacao.getContext('2d');
            chartRecuperacaoInstance = new Chart(ctxRecuperacao, {
                type: 'line',
                data: {
                    labels: CHART_DATA.recuperacao.labels,
                    datasets: [{
                        label: 'Área Recuperada (mil hectares)',
                        data: CHART_DATA.recuperacao.data,
                        borderColor: '#27AE60',
                        backgroundColor: 'rgba(39, 174, 96, 0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Mil hectares'
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        // Adicionar evento de redimensionamento
        window.addEventListener('resize', () => {
            if (chartDegradacaoInstance) {
                chartDegradacaoInstance.resize();
            }
            if (chartErosaoInstance) {
                chartErosaoInstance.resize();
            }
            if (chartDesertificacaoInstance) {
                chartDesertificacaoInstance.resize();
            }
            if (chartRecuperacaoInstance) {
                chartRecuperacaoInstance.resize();
            }
        });
    } catch (error) {
        console.error('Erro ao inicializar gráficos:', error);
        showFallbackContent('chartDegradacao');
        showFallbackContent('chartErosao');
    }
}

/**
 * Mostra conteúdo alternativo quando gráficos falham
 */
function showFallbackContent(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const container = canvas.parentElement;
        container.innerHTML = `
            <div class="p-8 text-center text-gray-500">
                <p class="text-lg font-semibold mb-2">Gráfico temporariamente indisponível</p>
                <p class="text-sm">Os dados estão sendo carregados. Tente recarregar a página.</p>
            </div>
        `;
    }
}

/**
 * Destrói todas as instâncias de gráficos
 */
function destroyCharts() {
    if (chartDegradacaoInstance) {
        chartDegradacaoInstance.destroy();
        chartDegradacaoInstance = null;
    }
    if (chartErosaoInstance) {
        chartErosaoInstance.destroy();
        chartErosaoInstance = null;
    }
    if (chartDesertificacaoInstance) {
        chartDesertificacaoInstance.destroy();
        chartDesertificacaoInstance = null;
    }
    if (chartRecuperacaoInstance) {
        chartRecuperacaoInstance.destroy();
        chartRecuperacaoInstance = null;
    }
}

// Exportar funções para uso global
window.initCharts = initCharts;
window.showFallbackContent = showFallbackContent;
window.destroyCharts = destroyCharts;
