/**
 * TerraViva - Módulo Avançado de Análise e Monitoramento
 * Fornece funcionalidades de análise sofisticada e monitoramento em tempo real
 */

/**
 * Classe de Análise de Degradação
 * Processa dados em tempo real e fornece insights
 */
class DegradacaoAnalyzer {
    constructor() {
        this.historico = [];
        this.alertas = [];
        this.metricas = this.inicializarMetricas();
    }

    /**
     * Inicializa métricas padrão
     */
    inicializarMetricas() {
        return {
            taxaMediaErosao: 19.5,
            areaDesertificada: 100, // km²
            areaRecuperada: 8.2, // mil hectares
            tendencia: 'estavel', // estavel, piora, melhora
            ultimaAtualizacao: new Date(),
        };
    }

    /**
     * Adiciona novo ponto de dados ao histórico
     */
    adicionarDado(dados) {
        if (!this.validarDado(dados)) {
            throw new Error('Dados inválidos');
        }
        
        this.historico.push({
            ...dados,
            timestamp: new Date(),
        });
        
        this.analisarTendencia();
        this.verificarAlertas();
    }

    /**
     * Valida estrutura de dados
     */
    validarDado(dados) {
        return (
            typeof dados === 'object' &&
            typeof dados.erosao === 'number' &&
            typeof dados.provincia === 'string' &&
            dados.erosao >= 0 &&
            dados.erosao <= 100
        );
    }

    /**
     * Analisa tendência de degradação
     */
    analisarTendencia() {
        if (this.historico.length < 2) {
            return;
        }

        const ultimos = this.historico.slice(-5);
        const mediaUltimos = 
            ultimos.reduce((sum, d) => sum + d.erosao, 0) / ultimos.length;
        
        const anterior = this.historico[this.historico.length - 6]?.erosao || 
            this.metricas.taxaMediaErosao;
        
        if (mediaUltimos > anterior) {
            this.metricas.tendencia = 'piora';
        } else if (mediaUltimos < anterior) {
            this.metricas.tendencia = 'melhora';
        } else {
            this.metricas.tendencia = 'estavel';
        }
    }

    /**
     * Verifica e gera alertas baseado em limites
     */
    verificarAlertas() {
        this.alertas = [];
        
        if (this.historico.length === 0) {
            return;
        }

        const ultimoDado = this.historico[this.historico.length - 1];
        
        // Alerta crítico (erosão > 25%)
        if (ultimoDado.erosao > 25) {
            this.alertas.push({
                nivel: 'critico',
                mensagem: `Erosão crítica detectada em ${ultimoDado.provincia}: ${ultimoDado.erosao}%`,
                timestamp: new Date(),
            });
        }
        // Alerta moderado (erosão > 15%)
        else if (ultimoDado.erosao > 15) {
            this.alertas.push({
                nivel: 'moderado',
                mensagem: `Erosão moderada em ${ultimoDado.provincia}: ${ultimoDado.erosao}%`,
                timestamp: new Date(),
            });
        }
    }

    /**
     * Calcula índice de saúde do solo (0-100)
     */
    calcularIndiceScores() {
        const mediaErosao = 
            this.historico.reduce((sum, d) => sum + d.erosao, 0) / 
            this.historico.length || 0;
        
        // Índice inverso: menor erosão = maior saúde
        const indiceScore = Math.max(0, 100 - mediaErosao * 2);
        
        return {
            indiceScore: Math.round(indiceScore),
            saude: indiceScore > 70 ? 'Excelente' : 
                   indiceScore > 50 ? 'Bom' : 
                   indiceScore > 30 ? 'Preocupante' : 
                   'Crítico',
        };
    }

    /**
     * Obtém estatísticas por província
     */
    obterEstatisticasPorProvincia() {
        const stats = {};
        
        this.historico.forEach(dado => {
            if (!stats[dado.provincia]) {
                stats[dado.provincia] = {
                    total: 0,
                    media: 0,
                    max: 0,
                    min: 100,
                    count: 0,
                };
            }
            
            stats[dado.provincia].total += dado.erosao;
            stats[dado.provincia].count++;
            stats[dado.provincia].max = Math.max(stats[dado.provincia].max, dado.erosao);
            stats[dado.provincia].min = Math.min(stats[dado.provincia].min, dado.erosao);
        });
        
        // Calcular médias
        Object.keys(stats).forEach(provincia => {
            stats[provincia].media = 
                Math.round(stats[provincia].total / stats[provincia].count);
        });
        
        return stats;
    }

    /**
     * Prediz tendência futura com base em dados históricos
     */
    predizertendencia(meses = 6) {
        if (this.historico.length < 3) {
            return null;
        }

        const dados = this.historico.slice(-12);
        const n = dados.length;
        const sumX = (n * (n + 1)) / 2;
        const sumY = dados.reduce((sum, d) => sum + d.erosao, 0);
        const sumXY = dados.reduce((sum, d, i) => sum + (i + 1) * d.erosao, 0);
        const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;

        // Regressão linear
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        const predicoes = [];
        for (let i = 1; i <= meses; i++) {
            predicoes.push({
                mes: i,
                erosaoPredita: Math.max(0, Math.min(100, intercept + slope * (n + i))),
            });
        }

        return {
            predicoes,
            tendenciaGeral: slope > 0 ? 'aumento' : 'diminuição',
            taxa: Math.abs(slope).toFixed(2),
        };
    }

    /**
     * Exporta dados em formato CSV
     */
    exportarCSV() {
        let csv = 'Data,Provincia,Erosao\n';
        
        this.historico.forEach(dado => {
            const data = dado.timestamp.toISOString().split('T')[0];
            csv += `${data},${dado.provincia},${dado.erosao}\n`;
        });

        return csv;
    }

    /**
     * Limpa dados mais antigos que N dias
     */
    limparDadosAntigos(dias = 90) {
        const limite = new Date();
        limite.setDate(limite.getDate() - dias);
        
        this.historico = this.historico.filter(
            d => new Date(d.timestamp) > limite
        );
    }
}

/**
 * Classe de Calculadora de Impacto
 * Calcula impacto ambiental e benefícios de ações
 */
class CalculadoraImpacto {
    /**
     * Calcula benefício potencial de reflorestamento
     */
    static calcularBeneficioReflorestamento(areakm2) {
        const arvoresPorKm2 = 1000; // média
        const cO2PorArvore = 25; // kg/ano
        const carbonoSequestrado = (areakm2 * arvoresPorKm2 * cO2PorArvore) / 1000; // toneladas
        
        return {
            areakm2,
            arvoresPlantadas: areakm2 * arvoresPorKm2,
            cO2Sequestrado: carbonoSequestrado.toFixed(2),
            beneficioAmbiental: 'Alto',
            tempoRecuperacao: '10-15 anos',
        };
    }

    /**
     * Calcula economia de água com técnicas de conservação
     */
    static calcularEconomiaAgua(areaHectares) {
        const consumoNormal = 15000; // litros/hectare/ano
        const economiaComTecnica = 0.30; // 30% de economia
        const liturosEconomizados = areaHectares * consumoNormal * economiaComTecnica;
        
        return {
            areaHectares,
            litrosEconomizados: Math.round(liturosEconomizados),
            economiaPercentual: (economiaComTecnica * 100).toFixed(1),
            custoAnual: (liturosEconomizados * 0.001).toFixed(2), // R$ por 1000L
        };
    }

    /**
     * Calcula impacto de plantio direto
     */
    static calcularImpactoPlantoDireto(areaHectares) {
        const erosaoReduzida = 0.80; // 80% redução
        const produçãoAumentada = 0.15; // 15% aumento
        const custosReduzidos = 0.25; // 25% redução de custos
        
        return {
            areaHectares,
            erosaoReduzida: (erosaoReduzida * 100).toFixed(1),
            producaoAumentada: (produçãoAumentada * 100).toFixed(1),
            custosReduzidos: (custosReduzidos * 100).toFixed(1),
            roiAnos: 2,
        };
    }

    /**
     * Pontua uma ação ambiental
     */
    static atribuirPontuacao(tipoAcao, intensidade) {
        const acoes = {
            reflorestamento: { base: 50, multiplicador: 1.5 },
            agricultura_sustentavel: { base: 40, multiplicador: 1.3 },
            compostagem: { base: 20, multiplicador: 1.2 },
            educacao_ambiental: { base: 30, multiplicador: 1.1 },
            protecao_margem: { base: 45, multiplicador: 1.4 },
        };

        const acao = acoes[tipoAcao];
        if (!acao) {
            return 0;
        }

        return Math.round(acao.base * Math.pow(acao.multiplicador, intensidade));
    }
}

/**
 * Classe de Dashboard em Tempo Real
 */
class DashboardTempo {
    constructor() {
        this.atualizacaoIntervalo = null;
        this.subscritores = [];
    }

    /**
     * Inicia atualizações em tempo real
     */
    iniciarAtualizacoes(intervaloMs = 30000) {
        this.atualizacaoIntervalo = setInterval(() => {
            this.atualizarDados();
        }, intervaloMs);
    }

    /**
     * Para atualizações em tempo real
     */
    pararAtualizacoes() {
        if (this.atualizacaoIntervalo) {
            clearInterval(this.atualizacaoIntervalo);
            this.atualizacaoIntervalo = null;
        }
    }

    /**
     * Atualiza dados do dashboard
     */
    atualizarDados() {
        // Simular atualização de dados
        const dadosAtuais = {
            timestamp: new Date(),
            erosaoMedia: (Math.random() * 20 + 15).toFixed(1),
            areaRecuperada: (Math.random() * 5 + 5).toFixed(1),
            projetos: Math.floor(Math.random() * 3 + 10),
            contribuintes: Math.floor(Math.random() * 100 + 200),
        };

        this.notificarSubscritores(dadosAtuais);
    }

    /**
     * Subscreve a atualizações
     */
    subscrever(callback) {
        this.subscritores.push(callback);
    }

    /**
     * Remove subscrição
     */
    desinscrever(callback) {
        this.subscritores = this.subscritores.filter(c => c !== callback);
    }

    /**
     * Notifica todos os subscritores
     */
    notificarSubscritores(dados) {
        this.subscritores.forEach(callback => callback(dados));
    }
}

// Instâncias globais
const analyzer = new DegradacaoAnalyzer();
const dashboard = new DashboardTempo();

/**
 * Inicializa o módulo de análise
 */
function inicializarAnalise() {
    // Adicionar dados históricos de exemplo
    const provincias = ['Cunene', 'Huíla', 'Namibe', 'Benguela', 'Kwanza Sul'];
    
    for (let i = 0; i < 20; i++) {
        provincias.forEach(provincia => {
            analyzer.adicionarDado({
                erosao: Math.random() * 30 + 10,
                provincia: provincia,
            });
        });
    }

    // Iniciar dashboard em tempo real
    dashboard.iniciarAtualizacoes(60000);

    console.log('Módulo de análise inicializado');
}

/**
 * Exibe relatório completo de análise
 */
function exibirRelatorioAnalise() {
    const indice = analyzer.calcularIndiceScores();
    const estatisticas = analyzer.obterEstatisticasPorProvincia();
    const predicoes = analyzer.predizertendencia(6);

    return {
        indice,
        estatisticas,
        predicoes,
        alertas: analyzer.alertas,
        tendencia: analyzer.metricas.tendencia,
    };
}

/**
 * Exibe métricas de impacto
 */
function exibirMetricasImpacto() {
    return {
        reflorestamento: CalculadoraImpacto.calcularBeneficioReflorestamento(100),
        conservacaoAgua: CalculadoraImpacto.calcularEconomiaAgua(500),
        plantoDireto: CalculadoraImpacto.calcularImpactoPlantoDireto(1000),
        pontuacoes: {
            reflorestamento: CalculadoraImpacto.atribuirPontuacao('reflorestamento', 3),
            agricultura: CalculadoraImpacto.atribuirPontuacao('agricultura_sustentavel', 2),
            compostagem: CalculadoraImpacto.atribuirPontuacao('compostagem', 1),
        },
    };
}

// Exportar para uso global
window.DegradacaoAnalyzer = DegradacaoAnalyzer;
window.CalculadoraImpacto = CalculadoraImpacto;
window.DashboardTempo = DashboardTempo;
window.analyzer = analyzer;
window.dashboard = dashboard;
window.inicializarAnalise = inicializarAnalise;
window.exibirRelatorioAnalise = exibirRelatorioAnalise;
window.exibirMetricasImpacto = exibirMetricasImpacto;
