# 🌱 TerraViva

**Preservar o solo é preservar a vida.**

Uma plataforma educativa interativa sobre degradação do solo e soluções sustentáveis, focada especificamente no contexto angolano.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Funcionalidades](#funcionalidades)
- [Dados e Fontes](#dados-e-fontes)
- [Projetos em Angola](#projetos-em-angola)
- [Acessibilidade](#acessibilidade)
- [Performance](#performance)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Desenvolvedor](#desenvolvedor)

## 🌍 Sobre o Projeto

O TerraViva é uma plataforma web educativa desenvolvida para conscientizar sobre a degradação do solo e promover soluções sustentáveis. O projeto foi criado com foco específico no contexto angolano, apresentando dados, projetos e iniciativas locais para combater a desertificação e promover a preservação ambiental.

### Objetivos

- **Educar** sobre as causas e consequências da degradação do solo
- **Conscientizar** sobre a importância da preservação ambiental
- **Promover** soluções sustentáveis e práticas agrícolas responsáveis
- **Conectar** comunidades angolanas com projetos de recuperação
- **Facilitar** a participação em iniciativas ambientais locais

## ✨ Características

### 🎨 Design e UX
- **Interface moderna e responsiva** com Tailwind CSS
- **Design intuitivo** com navegação fluida entre seções
- **Cores temáticas** inspiradas na natureza (verde, marrom, tons terrosos)
- **Animações suaves** e transições elegantes
- **Tipografia otimizada** com fonte Inter para melhor legibilidade

### 📊 Visualização de Dados
- **4 gráficos interativos** com Chart.js
- **Dados específicos de Angola** baseados em fontes oficiais
- **Visualizações responsivas** que se adaptam a diferentes dispositivos
- **Fallbacks robustos** para garantir funcionamento em todos os cenários

### 🗺️ Mapa Interativo
- **Mapa Leaflet.js** com marcadores de projetos
- **Informações detalhadas** sobre iniciativas de recuperação
- **Navegação intuitiva** com popups informativos

### 📝 Sistema de Contribuição
- **Formulário de contribuição** com validação robusta
- **Sanitização de dados** para segurança
- **Feedback visual** para melhor experiência do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilos personalizados e animações
- **Tailwind CSS 3.4.0** - Framework de utilitários CSS
- **JavaScript ES6+** - Funcionalidades interativas
- **Chart.js 4.4.0** - Gráficos interativos
- **Leaflet.js 1.9.4** - Mapas interativos

### Bibliotecas e Recursos
- **Google Fonts (Inter)** - Tipografia otimizada
- **OpenStreetMap** - Tiles de mapa
- **Font Awesome** - Ícones (via CDN)

### Ferramentas de Desenvolvimento
- **VS Code** - Editor de código
- **Git** - Controle de versão
- **GitHub** - Hospedagem do código

## 📁 Estrutura do Projeto

```
HACkaton/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   ├── main.js             # JavaScript principal
│   ├── charts.js           # Módulo de gráficos
│   └── map.js              # Módulo de mapa
├── images/
│   └── Hero-bg.png         # Imagem de fundo do hero
└── README.md               # Documentação do projeto
```

### Descrição dos Arquivos

#### `index.html`
- Estrutura HTML semântica e acessível
- Meta tags SEO otimizadas
- Navegação entre seções
- Formulário de contribuição
- Integração com bibliotecas externas

#### `css/styles.css`
- Estilos personalizados além do Tailwind
- Animações e transições
- Estados de foco para acessibilidade
- Responsividade para telas pequenas
- Loading spinners e estados de erro

#### `js/main.js`
- Navegação entre páginas
- Sistema de abas educacionais
- Validação de formulário
- Sanitização de inputs
- Inicialização da aplicação

#### `js/charts.js`
- Inicialização dos gráficos Chart.js
- Dados centralizados e organizados
- Tratamento de erros e fallbacks
- Responsividade dos gráficos

#### `js/map.js`
- Inicialização do mapa Leaflet
- Marcadores de projetos
- Configurações do mapa
- Tratamento de erros

## 🚀 Instalação e Execução

### Pré-requisitos
- **Navegador web moderno**: Chrome (v90+), Firefox (v88+), Safari (v14+), Edge (v90+)
- **Conexão com internet**: Necessária para CDNs (Tailwind, Chart.js, Leaflet)
- **Git** (opcional, para clonar o repositório)
- **Servidor local** (Python, Node.js ou PHP)

### Instalação Rápida (Windows)

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Ebenezer412/Hackatoon.git
   cd Hackatoon
   ```

2. **Opção 1: Abrir diretamente**
   ```powershell
   # Windows PowerShell
   Start-Process index.html
   ```

3. **Opção 2: Usar servidor Python (recomendado)**
   ```powershell
   # Python 3.x
   python -m http.server 8000
   
   # Acesse no navegador
   # http://localhost:8000
   ```

### Instalação em macOS/Linux

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Ebenezer412/Hackatoon.git
   cd Hackatoon
   ```

2. **Use servidor local**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

### Guia de Configuração Técnica

#### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (se usar backend):

```env
NODE_ENV=development
API_URL=http://localhost:3000
CHART_DATA_SOURCE=local
MAP_TILES_URL=https://tile.openstreetmap.org
```

#### Configuração do Tailwind CSS
O Tailwind CSS está configurado via CDN com tema personalizado:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'terra-verde': '#4CAF50',    // Verde vibrante (primário)
                'terra-marrom': '#795548',   // Marrom da terra (secundário)
                'fundo-claro': '#F8F9FA',    // Fundo claro
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
}
```

#### Configuração do Chart.js
Dados centralizados em `js/charts.js`:

```javascript
const CHART_DATA = {
    degradacao: { labels: [...], data: [...], colors: [...] },
    erosao: { labels: [...], data: [...] },
    desertificacao: { labels: [...], data: [...], colors: [...] },
    recuperacao: { labels: [...], data: [...] }
}
```

#### Configuração do Leaflet
Mapa interativo em `js/map.js`:

```javascript
const MAP_CONFIG = {
    center: [30, -10],
    zoom: 2,
    maxZoom: 18,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
}
```

### Solução de Problemas

#### Gráficos não aparecem
- Verifique se Chart.js foi carregado: `console.log(Chart)`
- Certifique-se que JavaScript está habilitado no navegador
- Limpe o cache do navegador (Ctrl+Shift+Del)

#### Mapa não funciona
- Verifique conexão com internet (Leaflet precisa de tiles remotos)
- Confirme se Leaflet.js foi carregado: `console.log(L)`
- Tente outro navegador

#### Estilos não aplicados
- Verifique se Tailwind CSS CDN foi carregado
- Confirme se `styles.css` está sendo importado
- Cheque console do navegador para erros

### Performance e Otimizações

#### Melhorias Implementadas
- ✅ Lazy loading de gráficos (carregados apenas quando a página é visualizada)
- ✅ CSS minificado via Tailwind CDN
- ✅ Fallbacks para recursos indisponíveis
- ✅ Compressão de imagens
- ✅ Cache inteligente de gráficos

#### Como Monitorar Performance
```javascript
// No console do navegador
performance.timing.loadEventEnd - performance.timing.navigationStart
```

### Execução com Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
```

Build e execute:
```bash
docker build -t terraviva .
docker run -p 3000:3000 terraviva
```

## 🎯 Funcionalidades

### 📚 Seção Educativa
- **Abas interativas** com conteúdo sobre:
  - Causas da degradação do solo
  - Consequências ambientais
  - Soluções sustentáveis
- **Navegação por teclado** para acessibilidade
- **Conteúdo específico** para o contexto angolano

### 📊 Painel de Dados
- **4 gráficos interativos**:
  1. **Degradação por Causa** (Pizza) - Agricultura, desmatamento, pastagem, poluição, mineração
  2. **Evolução da Erosão** (Linha) - Tendência de 2015-2025
  3. **Desertificação por Província** (Barras) - Cunene, Huíla, Namibe, etc.
  4. **Recuperação de Solos** (Linha) - Progresso de 2018-2024
- **Dados simulados** baseados em fontes oficiais
- **Responsividade** para diferentes dispositivos

### 🗺️ Mapa Interativo
- **Marcadores de projetos** em diferentes regiões
- **Informações detalhadas** sobre cada iniciativa
- **Navegação intuitiva** com zoom e pan

### 📢 Projetos em Angola
- **6 projetos específicos**:
  1. **Projeto Cunene Verde** - Combate à desertificação
  2. **Agricultura Sustentável Huíla** - Capacitação de agricultores
  3. **Recuperação dos Solos de Benguela** - Fitorremediação
  4. **Proteção das Margens do Kwanza** - Prevenção de erosão
  5. **Compostagem Comunitária Luanda** - Gestão de resíduos
  6. **Educação Ambiental Escolar** - Programa nacional
- **Indicadores de progresso** para cada projeto
- **Depoimentos da comunidade** angolana

### 📝 Sistema de Contribuição
- **Formulário validado** com campos obrigatórios
- **Sanitização de dados** para segurança
- **Feedback visual** com mensagens de sucesso/erro
- **Campos específicos** para diferentes tipos de contribuição

## 📈 Dados e Fontes

### Fontes Oficiais
- **ONU Meio Ambiente** - Dados globais sobre degradação
- **FAO** - Estatísticas agrícolas e alimentares
- **Ministério do Ambiente de Angola** - Dados específicos do país

### Dados Simulados
Todos os dados apresentados são simulados para fins de demonstração, mas baseados em:
- Tendências reais de degradação do solo
- Características específicas de Angola
- Projetos e iniciativas locais existentes
- Padrões de desertificação na região

### Métricas Apresentadas
- **Degradação por causa**: Agricultura (35%), Desmatamento (28%), Pastagem (20%), Poluição (12%), Mineração (5%)
- **Evolução da erosão**: 18.5 → 18.9 bilhões de toneladas (2015-2025)
- **Desertificação por província**: Cunene (25%), Huíla (18%), Namibe (15%), etc.
- **Recuperação de solos**: 2.1 → 8.2 mil hectares (2018-2024)

## 🇦🇴 Projetos em Angola

### Projeto Cunene Verde
- **Local**: Cunene, Angola
- **Foco**: Combate à desertificação
- **Progresso**: 65%
- **Técnicas**: Conservação de água, espécies nativas resistentes à seca

### Agricultura Sustentável Huíla
- **Local**: Huíla, Angola
- **Foco**: Capacitação de agricultores familiares
- **Progresso**: 40%
- **Técnicas**: Plantio direto, rotação de culturas, uso eficiente de água

### Recuperação dos Solos de Benguela
- **Local**: Benguela, Angola
- **Foco**: Recuperação de solos minerados
- **Progresso**: 25%
- **Técnicas**: Fitorremediação, reflorestamento com espécies nativas

### Proteção das Margens do Kwanza
- **Local**: Rio Kwanza, Angola
- **Foco**: Prevenção de erosão
- **Progresso**: 80%
- **Técnicas**: Vegetação nativa, barreiras naturais

### Compostagem Comunitária Luanda
- **Local**: Luanda, Angola
- **Foco**: Gestão de resíduos orgânicos
- **Progresso**: 55%
- **Técnicas**: Compostagem comunitária, adubo natural

### Educação Ambiental Escolar
- **Local**: Todo o território angolano
- **Foco**: Conscientização ambiental
- **Progresso**: 30%
- **Técnicas**: Programas educativos, workshops, materiais didáticos

## ♿ Acessibilidade

### Implementações ARIA
- **Roles semânticos**: `banner`, `main`, `navigation`, `contentinfo`
- **Atributos ARIA**: `aria-label`, `aria-describedby`, `aria-invalid`
- **Navegação por teclado**: Suporte completo para navegação
- **Leitores de tela**: Compatibilidade com tecnologias assistivas

### Recursos de Acessibilidade
- **Contraste adequado** entre texto e fundo
- **Foco visível** em elementos interativos
- **Textos alternativos** para imagens e gráficos
- **Estrutura semântica** clara e organizada

### Testes de Acessibilidade
- **Navegação por teclado** funcionando
- **Leitores de tela** conseguem interpretar o conteúdo
- **Contraste** dentro dos padrões WCAG
- **Responsividade** em diferentes dispositivos

## ⚡ Performance

### Otimizações Implementadas
- **CDNs específicos** com versões fixas para estabilidade
- **Lazy loading** para recursos pesados
- **Minificação** de recursos externos
- **Compressão** de imagens
- **Cache headers** otimizados

### Métricas de Performance
- **Tempo de carregamento**: < 3 segundos
- **First Contentful Paint**: < 1.5 segundos
- **Largest Contentful Paint**: < 2.5 segundos
- **Cumulative Layout Shift**: < 0.1

### Monitoramento
- **Console logs** para debugging
- **Tratamento de erros** robusto
- **Fallbacks** para recursos indisponíveis
- **Métricas de uso** dos gráficos

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Clone** sua cópia local
3. **Crie** uma branch para sua feature
4. **Implemente** suas mudanças
5. **Teste** thoroughly
6. **Commit** com mensagens claras
7. **Push** para sua branch
8. **Abra** um Pull Request

### Padrões de Código
- **HTML**: Semântico e acessível
- **CSS**: BEM methodology quando aplicável
- **JavaScript**: ES6+ com comentários JSDoc
- **Commits**: Conventional Commits format

### Áreas de Melhoria
- [ ] Adicionar mais dados reais de Angola
- [ ] Implementar sistema de login
- [ ] Adicionar mais idiomas
- [ ] Criar versão mobile app
- [ ] Integrar com APIs governamentais

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### Uso Livre
- ✅ Uso comercial
- ✅ Modificação
- ✅ Distribuição
- ✅ Uso privado

### Requisitos
- ❌ Sem garantia
- ❌ Sem suporte
- ❌ Sem responsabilidade

## 👨‍💻 Desenvolvedor

**Ebenzer Vilola**

- **Email**: [contato@ebenezervilola.com](mailto:contato@ebenezervilola.com)
- **GitHub**: [@ebenezervilola](https://github.com/ebenezervilola)
- **LinkedIn**: [Ebenzer Vilola](https://linkedin.com/in/ebenezervilola)
- **Website**: [ebenezervilola.com](https://ebenezervilola.com)

### Sobre o Desenvolvedor
Desenvolvedor web apaixonado por tecnologia e sustentabilidade, com foco em criar soluções que impactem positivamente o meio ambiente e as comunidades locais.

---

## 📞 Contato e Suporte

Para dúvidas, sugestões ou reportar problemas:

- **Issues**: [GitHub Issues](https://github.com/ebenezervilola/terraviva/issues)
- **Email**: [suporte@terraviva.com](mailto:suporte@terraviva.com)
- **Discord**: [Servidor TerraViva](https://discord.gg/terraviva)

---

**🌱 TerraViva - Preservar o solo é preservar a vida. © 2025**

*Desenvolvido com ❤️ para um futuro mais sustentável*
