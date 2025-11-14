/**
 * TerraViva - Inicialização Global de Módulos
 * Este arquivo coordena a inicialização de todos os módulos da aplicação
 */

/**
 * Configuração Global
 */
const APP_CONFIG = {
    version: '2.0.0',
    debug: true,
    env: 'development',
    features: {
        analytics: true,
        dashboard: true,
        alerts: true,
        widgets: true,
        realtime: true,
    },
    performance: {
        enableCaching: true,
        lazyLoadCharts: true,
        lazyLoadMap: true,
    },
};

/**
 * Logger Global
 */
const logger = {
    info: (msg, data) => {
        if (APP_CONFIG.debug) {
            console.log(`[INFO] ${msg}`, data || '');
        }
    },
    warn: (msg, data) => {
        console.warn(`[WARN] ${msg}`, data || '');
    },
    error: (msg, data) => {
        console.error(`[ERROR] ${msg}`, data || '');
    },
    success: (msg, data) => {
        if (APP_CONFIG.debug) {
            console.log(`✅ ${msg}`, data || '');
        }
    },
};

/**
 * Inicialização de Módulos
 */
const ModuleInitializer = {
    initialized: {},

    /**
     * Inicializa módulo de análise
     */
    initializeAnalytics() {
        try {
            logger.info('Inicializando módulo de análise...');
            
            if (APP_CONFIG.features.analytics) {
                inicializarAnalise();
                this.initialized.analytics = true;
                logger.success('Módulo de análise inicializado');
            }
        } catch (erro) {
            logger.error('Erro ao inicializar análise', erro);
            this.initialized.analytics = false;
        }
    },

    /**
     * Inicializa dashboard
     */
    initializeDashboard() {
        try {
            logger.info('Inicializando dashboard interativo...');
            
            if (APP_CONFIG.features.dashboard) {
                dashboard.carregarDados();
                this.initialized.dashboard = true;
                logger.success('Dashboard inicializado');
            }
        } catch (erro) {
            logger.error('Erro ao inicializar dashboard', erro);
            this.initialized.dashboard = false;
        }
    },

    /**
     * Inicializa sistema de alertas
     */
    initializeAlerts() {
        try {
            logger.info('Inicializando sistema de alertas...');
            
            if (APP_CONFIG.features.alerts) {
                // Criar alerta de boas-vindas
                alertas.criarAlerta(
                    'info',
                    'Bem-vindo ao TerraViva v2.0',
                    'Novas funcionalidades disponíveis: Dashboard interativo, análise avançada e alertas em tempo real.'
                );
                
                this.initialized.alerts = true;
                logger.success('Sistema de alertas inicializado');
            }
        } catch (erro) {
            logger.error('Erro ao inicializar alertas', erro);
            this.initialized.alerts = false;
        }
    },

    /**
     * Inicializa sistema de widgets
     */
    initializeWidgets() {
        try {
            logger.info('Inicializando sistema de widgets...');
            
            if (APP_CONFIG.features.widgets) {
                widgets.carregarLayout();
                
                // Adicionar widgets padrão se não houver
                if (widgets.widgets.length === 0) {
                    widgets.adicionarWidget('estatisticas', { titulo: 'Estatísticas' });
                    widgets.adicionarWidget('graficos', { titulo: 'Gráficos' });
                    widgets.adicionarWidget('alertas', { titulo: 'Alertas' });
                }
                
                this.initialized.widgets = true;
                logger.success('Sistema de widgets inicializado');
            }
        } catch (erro) {
            logger.error('Erro ao inicializar widgets', erro);
            this.initialized.widgets = false;
        }
    },

    /**
     * Inicializa dashboard em tempo real
     */
    initializeRealtime() {
        try {
            logger.info('Inicializando dashboard em tempo real...');
            
            if (APP_CONFIG.features.realtime) {
                dashboard.iniciarAtualizacoes(60000); // 60 segundos
                
                // Subscrever a atualizações
                dashboard.subscrever((dados) => {
                    logger.info('Dashboard atualizado', dados);
                });
                
                this.initialized.realtime = true;
                logger.success('Dashboard em tempo real ativado');
            }
        } catch (erro) {
            logger.error('Erro ao inicializar realtime', erro);
            this.initialized.realtime = false;
        }
    },

    /**
     * Inicializa todos os módulos
     */
    initializeAll() {
        logger.info('🌱 Iniciando TerraViva v' + APP_CONFIG.version);
        
        // 1. Analytics
        this.initializeAnalytics();
        
        // 2. Dashboard
        this.initializeDashboard();
        
        // 3. Alertas
        this.initializeAlerts();
        
        // 4. Widgets
        this.initializeWidgets();
        
        // 5. Realtime
        this.initializeRealtime();
        
        // Relatório de inicialização
        this.reportInitialization();
    },

    /**
     * Relatório de inicialização
     */
    reportInitialization() {
        logger.success('=== RELATÓRIO DE INICIALIZAÇÃO ===');
        
        const status = Object.entries(this.initialized).map(([modulo, ok]) => {
            return `  ${ok ? '✅' : '❌'} ${modulo}`;
        }).join('\n');
        
        logger.success('Módulos inicializados:\n' + status);
        
        const total = Object.keys(this.initialized).length;
        const iniciados = Object.values(this.initialized).filter(v => v).length;
        
        logger.success(`Total: ${iniciados}/${total} módulos ativos`);
        logger.success('==================================');
    },
};

/**
 * Monitoramento de Performance
 */
const PerformanceMonitor = {
    marks: {},

    /**
     * Marca início de operação
     */
    mark(operacao) {
        this.marks[operacao] = performance.now();
    },

    /**
     * Calcula duração
     */
    measure(operacao) {
        if (!this.marks[operacao]) {
            logger.warn(`Marca '${operacao}' não encontrada`);
            return null;
        }
        
        const duracao = performance.now() - this.marks[operacao];
        delete this.marks[operacao];
        
        return duracao;
    },

    /**
     * Registra métrica
     */
    logMetric(operacao, duracao) {
        if (duracao > 1000) {
            logger.warn(`${operacao} levou ${duracao.toFixed(2)}ms`);
        } else {
            logger.info(`${operacao} levou ${duracao.toFixed(2)}ms`);
        }
    },

    /**
     * Relata métricas de Performance
     */
    reportMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        if (!navigation) return;
        
        logger.info('=== MÉTRICAS DE PERFORMANCE ===');
        logger.info(`DNS Lookup: ${navigation.domainLookupEnd - navigation.domainLookupStart}ms`);
        logger.info(`TCP Connection: ${navigation.connectEnd - navigation.connectStart}ms`);
        logger.info(`DOM Interactive: ${navigation.domInteractive - navigation.navigationStart}ms`);
        logger.info(`Load Complete: ${navigation.loadEventEnd - navigation.navigationStart}ms`);
        logger.info('===============================');
    },
};

/**
 * Tratamento de Erros Global
 */
window.addEventListener('error', (event) => {
    logger.error('Erro não capturado:', event.error);
    alertas.criarAlerta(
        'erro',
        'Erro na Aplicação',
        'Um erro inesperado ocorreu. Contate o suporte.'
    );
});

window.addEventListener('unhandledrejection', (event) => {
    logger.error('Promise rejection não capturada:', event.reason);
});

/**
 * Detecção de Offline
 */
window.addEventListener('offline', () => {
    logger.warn('Conexão perdida');
    alertas.criarAlerta(
        'aviso',
        'Sem Conexão',
        'Você está offline. Algumas funcionalidades podem não funcionar.'
    );
});

window.addEventListener('online', () => {
    logger.success('Conexão restaurada');
    alertas.criarAlerta(
        'sucesso',
        'Conectado',
        'Conexão com internet restaurada.'
    );
});

/**
 * Inicialização ao Carregar Página
 */
document.addEventListener('DOMContentLoaded', () => {
    logger.info('DOM carregado');
    
    // Inicializar módulos
    ModuleInitializer.initializeAll();
    
    // Relatar performance
    if (APP_CONFIG.debug) {
        setTimeout(() => {
            PerformanceMonitor.reportMetrics();
        }, 1000);
    }
});

/**
 * Limpeza ao Sair
 */
window.addEventListener('beforeunload', () => {
    logger.info('Aplicação sendo encerrada...');
    
    // Parar atualizações em tempo real
    if (APP_CONFIG.features.realtime) {
        dashboard.pararAtualizacoes();
    }
    
    // Limpar dados
    if (APP_CONFIG.features.dashboard) {
        dashboard.salvarDados();
    }
    
    // Chamar cleanup
    cleanup();
});

/**
 * Função de Limpeza
 */
function cleanup() {
    if (typeof destroyCharts === 'function') {
        destroyCharts();
    }
    
    if (typeof destroyMap === 'function') {
        destroyMap();
    }
    
    logger.info('Limpeza concluída');
}

/**
 * Expor API Global
 */
window.APP_CONFIG = APP_CONFIG;
window.logger = logger;
window.ModuleInitializer = ModuleInitializer;
window.PerformanceMonitor = PerformanceMonitor;

/**
 * Status da Aplicação
 */
function getAppStatus() {
    return {
        version: APP_CONFIG.version,
        environment: APP_CONFIG.env,
        modules: ModuleInitializer.initialized,
        online: navigator.onLine,
        timestamp: new Date().toISOString(),
    };
}

window.getAppStatus = getAppStatus;

// Mensagem de inicialização bem-sucedida
logger.success('🌱 TerraViva inicializado com sucesso!');
logger.info('Use window.getAppStatus() para ver o status da aplicação');
logger.info('Use window.logger para logging');
logger.info('Use window.ModuleInitializer para inicializar módulos');
