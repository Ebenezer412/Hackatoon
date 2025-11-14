/**
 * TerraViva - Módulo de Recursos Interativos Avançados
 * Dashboard interativo, filtros avançados e visualizações customizáveis
 */

/**
 * Classe do Dashboard Interativo
 */
class DashboardInterativo {
    constructor() {
        this.filtros = {
            provincia: null,
            tipoAcao: null,
            dataInicio: null,
            dataFim: null,
            periodoTempo: '30dias',
        };
        this.dados = [];
        this.visualizacaoAtiva = 'tabela';
    }

    /**
     * Define filtros para visualização
     */
    definirFiltro(chave, valor) {
        if (this.filtros.hasOwnProperty(chave)) {
            this.filtros[chave] = valor;
            this.aplicarFiltros();
        }
    }

    /**
     * Aplicar filtros aos dados
     */
    aplicarFiltros() {
        let dadosFiltrados = [...this.dados];

        if (this.filtros.provincia) {
            dadosFiltrados = dadosFiltrados.filter(
                d => d.provincia === this.filtros.provincia
            );
        }

        if (this.filtros.tipoAcao) {
            dadosFiltrados = dadosFiltrados.filter(
                d => d.tipoAcao === this.filtros.tipoAcao
            );
        }

        if (this.filtros.dataInicio) {
            dadosFiltrados = dadosFiltrados.filter(
                d => new Date(d.data) >= new Date(this.filtros.dataInicio)
            );
        }

        if (this.filtros.dataFim) {
            dadosFiltrados = dadosFiltrados.filter(
                d => new Date(d.data) <= new Date(this.filtros.dataFim)
            );
        }

        return dadosFiltrados;
    }

    /**
     * Gera visualização em tabela
     */
    renderizarTabela(dados) {
        let html = '<table class="tabela-interativa"><thead><tr>';
        html += '<th>Data</th><th>Província</th><th>Tipo de Ação</th>';
        html += '<th>Impacto</th><th>Status</th></tr></thead><tbody>';

        dados.forEach(d => {
            html += '<tr>';
            html += `<td>${d.data}</td>`;
            html += `<td>${d.provincia}</td>`;
            html += `<td>${d.tipoAcao}</td>`;
            html += `<td>${d.impacto}</td>`;
            html += `<td><span class="status-${d.status}">${d.status}</span></td>`;
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    /**
     * Gera gráfico de progresso
     */
    renderizarProgresso(dados) {
        const porcentagem = Math.min(100, (dados.length * 10) % 100);
        
        return `
            <div class="progresso-container">
                <div class="progresso-barra" style="width: ${porcentagem}%"></div>
                <p class="progresso-texto">${porcentagem}% Progresso</p>
            </div>
        `;
    }

    /**
     * Muda visualização ativa
     */
    mudarVisualizacao(tipo) {
        if (['tabela', 'grafico', 'mapa', 'progresso'].includes(tipo)) {
            this.visualizacaoAtiva = tipo;
        }
    }

    /**
     * Exporta dados filtrados como JSON
     */
    exportarJSON() {
        const dados = this.aplicarFiltros();
        return JSON.stringify(dados, null, 2);
    }

    /**
     * Exporta dados filtrados como CSV
     */
    exportarCSV() {
        const dados = this.aplicarFiltros();
        let csv = 'Data,Provincia,TipoAcao,Impacto,Status\n';

        dados.forEach(d => {
            csv += `${d.data},${d.provincia},${d.tipoAcao},${d.impacto},${d.status}\n`;
        });

        return csv;
    }

    /**
     * Salva dados em localStorage
     */
    salvarDados() {
        localStorage.setItem('dashboardDados', JSON.stringify(this.dados));
        localStorage.setItem('dashboardFiltros', JSON.stringify(this.filtros));
    }

    /**
     * Carrega dados do localStorage
     */
    carregarDados() {
        const dados = localStorage.getItem('dashboardDados');
        const filtros = localStorage.getItem('dashboardFiltros');

        if (dados) {
            this.dados = JSON.parse(dados);
        }
        if (filtros) {
            this.filtros = JSON.parse(filtros);
        }
    }
}

/**
 * Classe de Comparação de Dados
 */
class ComparadorDados {
    /**
     * Compara dados de dois períodos
     */
    static compararPeriodos(dados1, dados2) {
        const media1 = this.calcularMedia(dados1);
        const media2 = this.calcularMedia(dados2);
        const variacao = media2 - media1;
        const porcentagem = ((variacao / media1) * 100).toFixed(2);

        return {
            media1: media1.toFixed(2),
            media2: media2.toFixed(2),
            variacao: variacao.toFixed(2),
            porcentagem: porcentagem,
            tendencia: variacao > 0 ? 'aumento' : 'diminuição',
        };
    }

    /**
     * Calcula média de um array
     */
    static calcularMedia(dados) {
        if (dados.length === 0) return 0;
        return dados.reduce((sum, d) => sum + (d.valor || d), 0) / dados.length;
    }

    /**
     * Calcula mediana
     */
    static calcularMediana(dados) {
        const sorted = [...dados].sort((a, b) => (a.valor || a) - (b.valor || b));
        const meio = Math.floor(sorted.length / 2);

        return sorted.length % 2 === 0
            ? (sorted[meio - 1] + sorted[meio]) / 2
            : sorted[meio];
    }

    /**
     * Calcula desvio padrão
     */
    static calcularDesvio(dados) {
        const media = this.calcularMedia(dados);
        const variancia = 
            dados.reduce((sum, d) => sum + Math.pow((d.valor || d) - media, 2), 0) / 
            dados.length;

        return Math.sqrt(variancia);
    }

    /**
     * Identifica outliers
     */
    static identificarOutliers(dados) {
        const media = this.calcularMedia(dados);
        const desvio = this.calcularDesvio(dados);
        const limite = 2; // 2 desvios padrão

        return dados.filter(d => {
            const valor = d.valor || d;
            return Math.abs(valor - media) > limite * desvio;
        });
    }
}

/**
 * Classe de Filtros Avançados
 */
class FiltrosAvancados {
    constructor() {
        this.criterios = [];
    }

    /**
     * Adiciona critério de filtro
     */
    adicionarCriterio(campo, operador, valor) {
        this.criterios.push({
            campo,
            operador,
            valor,
        });
    }

    /**
     * Remove critério de filtro
     */
    removerCriterio(index) {
        this.criterios.splice(index, 1);
    }

    /**
     * Limpa todos os critérios
     */
    limparCriterios() {
        this.criterios = [];
    }

    /**
     * Aplica filtros aos dados
     */
    aplicar(dados) {
        return dados.filter(item => {
            return this.criterios.every(criterio => {
                const valor = item[criterio.campo];

                switch (criterio.operador) {
                    case '==':
                        return valor === criterio.valor;
                    case '!=':
                        return valor !== criterio.valor;
                    case '>':
                        return valor > criterio.valor;
                    case '<':
                        return valor < criterio.valor;
                    case '>=':
                        return valor >= criterio.valor;
                    case '<=':
                        return valor <= criterio.valor;
                    case 'contém':
                        return String(valor).includes(criterio.valor);
                    case 'começa_com':
                        return String(valor).startsWith(criterio.valor);
                    case 'termina_com':
                        return String(valor).endsWith(criterio.valor);
                    default:
                        return true;
                }
            });
        });
    }

    /**
     * Exporta critérios para localStorage
     */
    salvar() {
        localStorage.setItem('filtrosAvancados', JSON.stringify(this.criterios));
    }

    /**
     * Carrega critérios do localStorage
     */
    carregar() {
        const salvo = localStorage.getItem('filtrosAvancados');
        if (salvo) {
            this.criterios = JSON.parse(salvo);
        }
    }
}

/**
 * Classe de Alertas e Notificações
 */
class GerenciadorAlertas {
    constructor() {
        this.alertas = [];
        this.notificacoes = [];
        this.permissoes = {
            desktop: false,
            som: true,
        };
    }

    /**
     * Cria um alerta novo
     */
    criarAlerta(tipo, titulo, mensagem, acoes = []) {
        const alerta = {
            id: Math.random().toString(36).substr(2, 9),
            tipo, // 'sucesso', 'erro', 'aviso', 'info'
            titulo,
            mensagem,
            acoes,
            timestamp: new Date(),
            lido: false,
        };

        this.alertas.push(alerta);
        this.mostrarNotificacao(alerta);

        return alerta.id;
    }

    /**
     * Remove alerta por ID
     */
    removerAlerta(id) {
        this.alertas = this.alertas.filter(a => a.id !== id);
    }

    /**
     * Marca alerta como lido
     */
    marcarComoLido(id) {
        const alerta = this.alertas.find(a => a.id === id);
        if (alerta) {
            alerta.lido = true;
        }
    }

    /**
     * Mostra notificação na tela
     */
    mostrarNotificacao(alerta) {
        const cores = {
            sucesso: '#27AE60',
            erro: '#E74C3C',
            aviso: '#F39C12',
            info: '#3498DB',
        };

        const elemento = document.createElement('div');
        elemento.className = `alerta alerta-${alerta.tipo}`;
        elemento.style.backgroundColor = cores[alerta.tipo];
        elemento.innerHTML = `
            <strong>${alerta.titulo}</strong>
            <p>${alerta.mensagem}</p>
            ${alerta.acoes
                .map(a => `<button onclick="${a.funcao}">${a.label}</button>`)
                .join('')}
        `;

        // Simular adicionar ao DOM (em produção, adicionar ao body)
        console.log('Alerta exibido:', alerta);

        // Reproduzir som se habilitado
        if (this.permissoes.som) {
            this.reproduzirSom();
        }

        // Remover após 5 segundos
        setTimeout(() => this.removerAlerta(alerta.id), 5000);
    }

    /**
     * Reproduz som de notificação
     */
    reproduzirSom() {
        // Usar Web Audio API ou arquivo de áudio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    /**
     * Retorna alertas não lidos
     */
    obterNaoLidos() {
        return this.alertas.filter(a => !a.lido);
    }

    /**
     * Limpa todos os alertas
     */
    limparTodos() {
        this.alertas = [];
    }
}

/**
 * Classe de Widgets Customizáveis
 */
class GerenciadorWidgets {
    constructor() {
        this.widgets = [];
        this.layout = 'grid'; // 'grid', 'lista', 'personalizado'
    }

    /**
     * Adiciona widget
     */
    adicionarWidget(tipo, configuracao = {}) {
        const widget = {
            id: Math.random().toString(36).substr(2, 9),
            tipo,
            configuracao,
            posicao: this.widgets.length,
            visivel: true,
        };

        this.widgets.push(widget);
        return widget;
    }

    /**
     * Remove widget por ID
     */
    removerWidget(id) {
        this.widgets = this.widgets.filter(w => w.id !== id);
    }

    /**
     * Reordena widgets
     */
    reordenarWidgets(ordem) {
        if (ordem.length !== this.widgets.length) {
            return false;
        }
        this.widgets = ordem.map(id => this.widgets.find(w => w.id === id));
        return true;
    }

    /**
     * Alterna visibilidade de widget
     */
    alternarVisibilidade(id) {
        const widget = this.widgets.find(w => w.id === id);
        if (widget) {
            widget.visivel = !widget.visivel;
        }
    }

    /**
     * Salva layout personalizado
     */
    salvarLayout() {
        localStorage.setItem('widgetsLayout', JSON.stringify(this.widgets));
    }

    /**
     * Carrega layout salvo
     */
    carregarLayout() {
        const salvo = localStorage.getItem('widgetsLayout');
        if (salvo) {
            this.widgets = JSON.parse(salvo);
        }
    }

    /**
     * Retorna widgets visíveis
     */
    obterVisiveis() {
        return this.widgets.filter(w => w.visivel);
    }
}

// Instâncias globais
const dashboard = new DashboardInterativo();
const comparador = new ComparadorDados();
const filtros = new FiltrosAvancados();
const alertas = new GerenciadorAlertas();
const widgets = new GerenciadorWidgets();

// Exportar para uso global
window.DashboardInterativo = DashboardInterativo;
window.ComparadorDados = ComparadorDados;
window.FiltrosAvancados = FiltrosAvancados;
window.GerenciadorAlertas = GerenciadorAlertas;
window.GerenciadorWidgets = GerenciadorWidgets;
window.dashboard = dashboard;
window.comparador = comparador;
window.filtros = filtros;
window.alertas = alertas;
window.widgets = widgets;
