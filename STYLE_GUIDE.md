# Guia de Estilos de Código - TerraViva

## Convenções de Nomenclatura

### Variáveis e Constantes
```javascript
// Variáveis: camelCase
let nomeDoUsuario = 'João';
let contador = 0;

// Constantes: UPPER_SNAKE_CASE ou PascalCase
const MAX_TENTATIVAS = 3;
const API_URL = 'https://api.example.com';
const MESES_DO_ANO = ['Janeiro', 'Fevereiro'];
```

### Funções
```javascript
// Nomes descritivos, verbos na frente
function calcularMediaErosao(dados) {}
function validarEmail(email) {}
function inicializarApp() {}

// Arrow functions para callbacks simples
const filtrar = (item) => item.ativo;
```

### Classes e Construtores
```javascript
// PascalCase para nomes de classes
class GerenciadorDados {
    constructor() {}
}

class AnalisadorSolo {
    analisarDados(dados) {}
}
```

## Estrutura de Código JavaScript

### 1. Comentários JSDoc
```javascript
/**
 * Calcula a média de degradação do solo
 * @param {Array<number>} dados - Array com valores de degradação
 * @param {string} provincia - Nome da província
 * @returns {number} Média calculada
 * @throws {Error} Se dados estiverem vazios
 * @example
 * const media = calcularMedia([10, 20, 30], 'Cunene');
 */
function calcularMedia(dados, provincia) {
    if (!dados || dados.length === 0) {
        throw new Error('Dados não podem estar vazios');
    }
    return dados.reduce((a, b) => a + b) / dados.length;
}
```

### 2. Estrutura de Funções
```javascript
// 1. Validação de entrada
function processar(entrada) {
    if (!entrada) {
        throw new Error('Entrada inválida');
    }

    // 2. Processamento
    const resultado = transformar(entrada);

    // 3. Validação de saída
    if (!resultado) {
        console.warn('Resultado vazio');
    }

    // 4. Retorno
    return resultado;
}
```

### 3. Tratamento de Erros
```javascript
// ✅ BOM: Trate erros explicitamente
try {
    const dados = carregarDados();
    processar(dados);
} catch (erro) {
    console.error('Erro ao processar:', erro.message);
    // Fallback ou notificar usuário
}

// ❌ RUIM: Não ignore erros
try {
    const dados = carregarDados();
} catch (erro) {
    // sem tratamento
}
```

## Estrutura HTML

### 1. Semântica
```html
<!-- ✅ BOM: Usar tags semânticas -->
<header>
    <nav>Menu</nav>
</header>
<main>
    <article>Conteúdo</article>
</main>
<footer>Rodapé</footer>

<!-- ❌ RUIM: Divs genéricos -->
<div id="header">
    <div id="menu">Menu</div>
</div>
```

### 2. Acessibilidade
```html
<!-- ✅ BOM: Atributos ARIA -->
<button aria-label="Abrir menu" aria-expanded="false">Menu</button>
<div role="main" aria-label="Conteúdo principal">

<!-- Textos alternativos -->
<img src="grafico.png" alt="Gráfico de degradação do solo">
```

## Estrutura CSS

### 1. Organização
```css
/* 1. Variáveis */
:root {
    --cor-primaria: #4CAF50;
    --cor-secundaria: #795548;
}

/* 2. Reset e Base */
* {
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', sans-serif;
}

/* 3. Layouts */
.container {
    max-width: 1200px;
}

/* 4. Componentes */
.botao {
    padding: 0.5rem 1rem;
}

/* 5. Utilities */
.hidden {
    display: none;
}
```

### 2. BEM Methodology (quando necessário)
```css
/* Bloco */
.card { }

/* Elemento */
.card__titulo { }
.card__conteudo { }

/* Modificador */
.card--destaque { }
.card--erro { }
```

## Convenções de Commits

### Formato
```
<tipo>(<escopo>): <mensagem>

<descrição opcional>

<footer opcional>
```

### Tipos
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças de documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Adição de testes
- `chore`: Mudanças de build/deps

### Exemplos
```
feat(analise): adicionar análise de sentimento com IA

fix(grafico): corrigir renderização em telas pequenas

docs: atualizar guia de instalação

style: formatar código com prettier

refactor(api): modularizar handlers de requisição

test(validacao): adicionar testes para validação de email
```

## Testabilidade

### 1. Testes Unitários
```javascript
describe('Validação de Email', () => {
    test('deve aceitar emails válidos', () => {
        expect(isValidEmail('teste@example.com')).toBe(true);
    });

    test('deve rejeitar emails inválidos', () => {
        expect(isValidEmail('invalido')).toBe(false);
    });
});
```

### 2. Cobertura de Testes
- Mínimo 70% de cobertura
- Testar casos de sucesso e erro
- Testar edge cases

## Performance

### 1. Boas Práticas
```javascript
// ✅ BOM: Usar const para evitar reassignment
const dados = carregarDados();

// ✅ BOM: Arrow functions concisas
const filtrar = (item) => item.ativo;

// ❌ RUIM: Usar var
var dados = carregarDados();

// ❌ RUIM: Funções longas sem separação
function processarTudo() {
    // 500 linhas de código
}
```

### 2. Otimizações
- Lazy load de recursos
- Debounce para eventos
- Memoização de cálculos
- Compressão de assets

## Segurança

### 1. Sanitização
```javascript
// ✅ BOM: Sanitizar inputs
function sanitizeInput(input) {
    return DOMPurify.sanitize(input);
}

// ❌ RUIM: Usar HTML não sanitizado
element.innerHTML = userInput;
```

### 2. Validação
```javascript
// ✅ BOM: Validar e sanitizar
const email = sanitizeInput(input).trim();
if (!isValidEmail(email)) {
    throw new Error('Email inválido');
}
```

## Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
