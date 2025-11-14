# Documentação Técnica - TerraViva

## Arquitetura

### Camadas da Aplicação

```
┌─────────────────────────────────────┐
│     Frontend (HTML/CSS/JS)          │
│  Apresentação e Interação do Usuário│
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Lógica de Aplicação (JS)        │
│ - main.js (navegação)               │
│ - charts.js (visualização)          │
│ - map.js (mapa interativo)          │
│ - analytics.js (análise avançada)   │
│ - interativo.js (dashboard)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     APIs e Serviços Externos        │
│ - Chart.js (gráficos)               │
│ - Leaflet.js (mapas)                │
│ - OpenStreetMap (tiles)             │
│ - Google Fonts (tipografia)         │
│ - Backend Node.js (futuro)          │
└─────────────────────────────────────┘
```

## Fluxo de Dados

### Visualização de Dados
```
1. Carregamento de Página
   └─> initializeApp()
       ├─> showPage('home')
       ├─> showTopic('causas')
       └─> EventListeners configurados

2. Clique em "Dados"
   └─> showPage('dados')
       └─> initializePageResources('dados')
           └─> initCharts()
               ├─> CHART_DATA.degradacao
               ├─> CHART_DATA.erosao
               ├─> CHART_DATA.desertificacao
               └─> CHART_DATA.recuperacao

3. Renderização de Gráficos
   └─> Chart.js processa dados
       └─> Canvas renderizado
```

## Módulos Disponíveis

### 1. main.js - Funcionalidades Principais
**Responsabilidades:**
- Gerenciamento de navegação
- Alternância entre páginas
- Sistema de abas
- Validação de formulários
- Sanitização de inputs

**Principais Funções:**
```javascript
showPage(pageId)              // Muda de página
showTopic(topicId)            // Muda aba educacional
validateForm()                // Valida formulário
sanitizeInput(input)          // Sanitiza dados
isValidEmail(email)           // Valida email
handleFormSubmission(e)       // Processa envio
```

### 2. charts.js - Visualização de Dados
**Responsabilidades:**
- Inicialização de gráficos Chart.js
- Gerenciamento de dados
- Tratamento de erros

**Principais Funções:**
```javascript
initCharts()                  // Inicializa todos os gráficos
destroyCharts()              // Limpa gráficos
```

**Gráficos Implementados:**
- Rosca: Degradação por causa
- Linha: Evolução da erosão
- Barras: Desertificação por província
- Linha: Recuperação de solos

### 3. map.js - Mapa Interativo
**Responsabilidades:**
- Inicialização de mapa Leaflet
- Gerenciamento de marcadores
- Tratamento de erros

**Principais Funções:**
```javascript
initMap()                     // Inicializa mapa
addMarkersToMap()            // Adiciona marcadores
destroyMap()                 // Limpa mapa
```

### 4. analytics.js - Análise Avançada ⭐ NOVO
**Responsabilidades:**
- Análise sofisticada de dados
- Cálculo de tendências
- Detecção de alertas
- Predição de degradação

**Classes Principais:**
```javascript
DegradacaoAnalyzer           // Análise de degradação
CalculadoraImpacto           // Cálculo de impacto
DashboardTempo               // Dashboard em tempo real
```

**Métodos Principais:**
```javascript
analyzer.adicionarDado()     // Adiciona ponto de dado
analyzer.calcularIndiceScores() // Calcula índice de saúde
analyzer.predizertendencia() // Prediz próximos 6 meses
analyzer.exportarCSV()       // Exporta dados em CSV
```

### 5. interativo.js - Dashboard Interativo ⭐ NOVO
**Responsabilidades:**
- Dashboard customizável
- Sistema de filtros avançados
- Comparação de dados
- Gerenciamento de alertas
- Sistema de widgets

**Classes Principais:**
```javascript
DashboardInterativo          // Dashboard com filtros
ComparadorDados             // Compara períodos
FiltrosAvancados            // Sistema de filtros
GerenciadorAlertas          // Gerencia alertas
GerenciadorWidgets          // Gerencia widgets
```

## Fluxo de Contribuição

```
Usuário preenche formulário
    │
    └─> validateForm()
        ├─ Email obrigatório?
        ├─ Email válido?
        ├─ Tipo selecionado?
        └─ Mensagem com 10+ caracteres?
    │
    ├─ Se SIM
    │   └─> sanitizeInput()
    │       └─> handleFormSubmission()
    │           └─> Simulação de envio
    │               └─> Mensagem de sucesso
    │
    └─ Se NÃO
        └─> Mostrar erros
            └─> Aguardar correção
```

## Integração com IA (Preparação)

### Backend Node.js (server.js)
```javascript
// Endpoints disponíveis
POST /api/ia/predizer       // Predição com IA
POST /api/ia/analise-sentimento // Análise de texto
GET  /api/relatorio         // Gera relatório
```

### Fluxo de Integração Futuro
```
Frontend (Analytics)
    │
    └─> Fetch POST /api/ia/predizer
        │
        └─> Backend (server.js)
            │
            └─> OpenAI API
                │
                └─> Resposta
                    │
                    └─> Frontend (Exibir resultado)
```

## Padrões de Design Utilizados

### 1. Module Pattern
```javascript
// Encapsulação de funcionalidades
const modulo = (() => {
    const privado = 'não acessível';
    
    return {
        publico: () => privado,
    };
})();
```

### 2. Singleton
```javascript
// Única instância de um objeto
const analyzer = new DegradacaoAnalyzer();
window.analyzer = analyzer;
```

### 3. Observer Pattern (Dashboard)
```javascript
dashboard.subscrever(callback);
dashboard.notificarSubscritores(dados);
```

### 4. Strategy Pattern (Filtros)
```javascript
const estrategias = {
    '==': (a, b) => a === b,
    '>': (a, b) => a > b,
    'contém': (a, b) => a.includes(b),
};
```

## Performance

### Otimizações Implementadas

1. **Lazy Loading de Gráficos**
   - Gráficos renderizados apenas quando página é visualizada
   - Economiza recursos e tempo de carregamento

2. **Fallbacks Robustos**
   - Mensagens de erro amigáveis
   - Funcionalidades offline

3. **Caching de Dados**
   - localStorage para filtros e layout
   - Reduz requisições desnecessárias

4. **Compressão**
   - CSS minificado via Tailwind
   - JavaScript modularizado

### Métricas Esperadas

- **First Paint**: < 1.5s
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Acessibilidade (WCAG 2.1 AA)

### Implementações

- ✅ Navegação por teclado completa
- ✅ Roles ARIA semânticos
- ✅ Atributos aria-label e aria-describedby
- ✅ Contraste mínimo 4.5:1
- ✅ Suporte a leitores de tela
- ✅ Foco visível em elementos
- ✅ Formulários bem estruturados

## Testes

### Estrutura de Testes

```
__tests__/
└── main.test.js
    ├── Validação de Email
    ├── Sanitização de Input
    ├── Navegação
    ├── Validação de Formulário
    ├── Sistema de Abas
    ├── Dados de Gráficos
    ├── Dados de Mapa
    └── Acessibilidade
```

### Executar Testes
```bash
npm test              # Executa testes uma vez
npm run test:watch   # Modo watch
npm run test:coverage # Com cobertura
```

### Cobertura Esperada
- Funções: 70%+
- Linhas: 70%+
- Branches: 70%+
- Statements: 70%+

## Segurança

### Medidas Implementadas

1. **Sanitização**
   - Remoção de scripts maliciosos
   - Remoção de handlers de eventos
   - Remoção de javascript: protocol

2. **Validação**
   - Email com regex
   - Tamanho mínimo de mensagem
   - Campos obrigatórios

3. **CORS**
   - Configuração apropriada
   - Proteção contra ataques

4. **Environment Variables**
   - Não commitar .env
   - Usar .env.example como template

## Troubleshooting

### Gráficos não aparecem
1. Verificar console para erros
2. Confirmar Chart.js carregado: `console.log(Chart)`
3. Limpar cache: Ctrl+Shift+Del
4. Verificar elementos canvas existem

### Mapa não funciona
1. Verificar conexão internet
2. Confirmar Leaflet.js: `console.log(L)`
3. Verificar tiles do OpenStreetMap
4. Testar em outro navegador

### Performance lenta
1. Verificar tamanho do histórico do analyzer
2. Executar `analyzer.limparDadosAntigos()`
3. Desabilitar dashboard em tempo real se não usar
4. Verificar DevTools > Performance

## Roadmap Futuro

- [ ] Integração com APIs governamentais
- [ ] Sistema de login e autenticação
- [ ] Banco de dados robusto
- [ ] Suporte a múltiplos idiomas
- [ ] Versão mobile app
- [ ] Integração completa com IA/LLM
- [ ] Sistema de notificações em tempo real
- [ ] Exportação de relatórios em PDF
- [ ] API pública para desenvolvedores
- [ ] Sistema de rating de soluções
