/**
 * TerraViva Backend - Servidor Node.js
 * Fornece APIs para integração com serviços de IA, análise e dados
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Configuração
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

/**
 * Classe do Servidor TerraViva
 */
class ServidorTerraviva {
    constructor() {
        this.servidor = null;
        this.rotas = new Map();
        this.middleware = [];
        this.dados = {
            usuarios: [],
            contribuicoes: [],
            analises: [],
        };
    }

    /**
     * Inicia o servidor
     */
    iniciar() {
        this.servidor = http.createServer((req, res) => {
            this.processarRequisicao(req, res);
        });

        this.servidor.listen(PORT, HOST, () => {
            console.log(`🌱 TerraViva Backend iniciado em http://${HOST}:${PORT}`);
        });
    }

    /**
     * Para o servidor
     */
    parar() {
        if (this.servidor) {
            this.servidor.close(() => {
                console.log('Servidor encerrado');
            });
        }
    }

    /**
     * Processa requisição HTTP
     */
    async processarRequisicao(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        // Middleware de CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Rotear requisição
        try {
            switch (pathname) {
                case '/api/saude':
                    this.handleSaude(req, res);
                    break;
                case '/api/analise':
                    this.handleAnalise(req, res);
                    break;
                case '/api/contribuicoes':
                    this.handleContribuicoes(req, res);
                    break;
                case '/api/ia/predizer':
                    await this.handleIAPredizer(req, res);
                    break;
                case '/api/ia/analise-sentimento':
                    await this.handleIAAnaliseSentimento(req, res);
                    break;
                case '/api/relatorio':
                    this.handleRelatorio(req, res);
                    break;
                case '/api/dados/exportar':
                    this.handleExportarDados(req, res);
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
            }
        } catch (erro) {
            console.error('Erro ao processar requisição:', erro);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ erro: 'Erro interno do servidor' }));
        }
    }

    /**
     * Handler: Saúde do servidor
     */
    handleSaude(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            versao: '2.0.0',
        }));
    }

    /**
     * Handler: Análise de dados
     */
    handleAnalise(req, res) {
        if (req.method === 'GET') {
            // Retorna análises disponíveis
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                analises: [
                    { id: 1, nome: 'Degradação por Causa', tipo: 'pizza' },
                    { id: 2, nome: 'Evolução da Erosão', tipo: 'linha' },
                    { id: 3, nome: 'Desertificação por Província', tipo: 'barras' },
                    { id: 4, nome: 'Recuperação de Solos', tipo: 'linha' },
                ],
            }));
        } else if (req.method === 'POST') {
            // Recebe nova análise
            let corpo = '';
            req.on('data', chunk => {
                corpo += chunk;
            });
            req.on('end', () => {
                const analise = JSON.parse(corpo);
                this.dados.analises.push(analise);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ sucesso: true, id: analise.id }));
            });
        }
    }

    /**
     * Handler: Contribuições de usuários
     */
    handleContribuicoes(req, res) {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                total: this.dados.contribuicoes.length,
                contribuicoes: this.dados.contribuicoes,
            }));
        } else if (req.method === 'POST') {
            let corpo = '';
            req.on('data', chunk => {
                corpo += chunk;
            });
            req.on('end', () => {
                const contribuicao = JSON.parse(corpo);
                contribuicao.id = Math.random().toString(36).substr(2, 9);
                contribuicao.data = new Date();
                this.dados.contribuicoes.push(contribuicao);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    sucesso: true,
                    mensagem: 'Contribuição recebida com sucesso',
                    id: contribuicao.id,
                }));
            });
        }
    }

    /**
     * Handler: Integração com IA - Predição
     */
    async handleIAPredizer(req, res) {
        if (req.method !== 'POST') {
            res.writeHead(405);
            res.end();
            return;
        }

        let corpo = '';
        req.on('data', chunk => {
            corpo += chunk;
        });

        req.on('end', async () => {
            try {
                const dados = JSON.parse(corpo);

                // Simular chamada a API de IA (em produção, chamar OpenAI, etc)
                const predicao = await this.predizerComIA(dados);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    sucesso: true,
                    predicao: predicao,
                }));
            } catch (erro) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ erro: erro.message }));
            }
        });
    }

    /**
     * Prediz tendência usando IA (simulado)
     */
    async predizerComIA(dados) {
        // Em produção, conectar a API real de IA
        return {
            mensagem: 'Com base nos dados analisados...',
            probabilidade: Math.random() * 100,
            recomendacao: 'Continuar monitorando',
            confianca: 0.85,
        };
    }

    /**
     * Handler: Análise de Sentimento
     */
    async handleIAAnaliseSentimento(req, res) {
        let corpo = '';
        req.on('data', chunk => {
            corpo += chunk;
        });

        req.on('end', async () => {
            const dados = JSON.parse(corpo);

            // Simular análise de sentimento
            const sentimento = this.analisarSentimento(dados.texto);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                texto: dados.texto,
                sentimento: sentimento.tipo,
                pontuacao: sentimento.pontuacao,
            }));
        });
    }

    /**
     * Analisa sentimento de texto (simulado)
     */
    analisarSentimento(texto) {
        const positivos = ['bom', 'excelente', 'ótimo', 'amo', 'perfeito'];
        const negativos = ['ruim', 'horrível', 'ódio', 'terrível', 'pior'];

        const textoBaixo = texto.toLowerCase();
        let pontos = 0;

        positivos.forEach(p => {
            if (textoBaixo.includes(p)) pontos += 10;
        });

        negativos.forEach(n => {
            if (textoBaixo.includes(n)) pontos -= 10;
        });

        return {
            tipo: pontos > 0 ? 'positivo' : pontos < 0 ? 'negativo' : 'neutro',
            pontuacao: pontos,
        };
    }

    /**
     * Handler: Geração de Relatório
     */
    handleRelatorio(req, res) {
        const relatorio = {
            titulo: 'Relatório TerraViva - Análise Completa',
            data: new Date().toISOString(),
            secoes: [
                {
                    titulo: 'Resumo Executivo',
                    conteudo: 'Análise completa de degradação do solo',
                },
                {
                    titulo: 'Métricas Principais',
                    dados: {
                        erosaoMedia: 19.5,
                        areaDesertificada: 100,
                        areaRecuperada: 8.2,
                    },
                },
                {
                    titulo: 'Recomendações',
                    items: [
                        'Expandir projetos de reflorestamento',
                        'Intensificar educação ambiental',
                        'Aumentar monitoramento em tempo real',
                    ],
                },
            ],
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(relatorio));
    }

    /**
     * Handler: Exportar dados
     */
    handleExportarDados(req, res) {
        const formato = url.parse(req.url, true).query.formato || 'json';

        let conteudo;
        let tipo;

        if (formato === 'json') {
            conteudo = JSON.stringify(this.dados, null, 2);
            tipo = 'application/json';
        } else if (formato === 'csv') {
            conteudo = this.converterParaCSV(this.dados);
            tipo = 'text/csv';
        }

        res.writeHead(200, {
            'Content-Type': tipo,
            'Content-Disposition': `attachment; filename="terraviva.${formato}"`,
        });
        res.end(conteudo);
    }

    /**
     * Converte dados para CSV
     */
    converterParaCSV(dados) {
        let csv = 'Tipo,ID,Data\n';

        dados.contribuicoes.forEach(c => {
            csv += `Contribuição,${c.id},${c.data}\n`;
        });

        dados.analises.forEach(a => {
            csv += `Análise,${a.id},${a.data}\n`;
        });

        return csv;
    }
}

// Instanciar e iniciar servidor
const servidor = new ServidorTerraviva();
servidor.iniciar();

// Exportar para testes
module.exports = ServidorTerraviva;
