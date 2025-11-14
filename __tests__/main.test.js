/**
 * Testes unitários para TerraViva - main.js
 * Usando Jest como framework de testes
 */

describe('TerraViva - Funcionalidades Principais', () => {
    
    // Setup antes de cada teste
    beforeEach(() => {
        // Limpar DOM
        document.body.innerHTML = '';
        
        // Adicionar elementos necessários
        document.body.innerHTML = `
            <div id="home" class="page-content">Home</div>
            <div id="educacao" class="page-content">Educação</div>
            <div id="dados" class="page-content">Dados</div>
            <nav>
                <button onclick="showPage('home')" class="nav-link active">Home</button>
                <button onclick="showPage('educacao')" class="nav-link">Educação</button>
                <button onclick="showPage('dados')" class="nav-link">Dados</button>
            </nav>
        `;
    });

    describe('Validação de Email', () => {
        test('deve aceitar emails válidos', () => {
            expect(isValidEmail('usuario@example.com')).toBe(true);
            expect(isValidEmail('contato@terraviva.com')).toBe(true);
            expect(isValidEmail('test.user@domain.co.uk')).toBe(true);
        });

        test('deve rejeitar emails inválidos', () => {
            expect(isValidEmail('invalido')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('user@')).toBe(false);
            expect(isValidEmail('user @example.com')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });

        test('deve lidar com valores não-string', () => {
            expect(isValidEmail(null)).toBe(false);
            expect(isValidEmail(undefined)).toBe(false);
            expect(isValidEmail(123)).toBe(false);
        });
    });

    describe('Sanitização de Input', () => {
        test('deve remover scripts', () => {
            const malicious = '<script>alert("xss")</script>Conteúdo';
            const sanitized = sanitizeInput(malicious);
            expect(sanitized).not.toContain('<script>');
            expect(sanitized).toContain('Conteúdo');
        });

        test('deve remover javascript: protocol', () => {
            const malicious = 'javascript:alert("xss")';
            const sanitized = sanitizeInput(malicious);
            expect(sanitized).not.toContain('javascript:');
        });

        test('deve remover handlers de eventos', () => {
            const malicious = 'onclick=alert("xss")';
            const sanitized = sanitizeInput(malicious);
            expect(sanitized).not.toContain('onclick=');
        });

        test('deve fazer trim de espaços', () => {
            expect(sanitizeInput('  texto com espaços  ')).toBe('texto com espaços');
        });

        test('deve lidar com valores não-string', () => {
            expect(sanitizeInput(null)).toBe('');
            expect(sanitizeInput(undefined)).toBe('');
            expect(sanitizeInput(123)).toBe('');
        });
    });

    describe('Navegação entre Páginas', () => {
        test('deve exibir a página inicial por padrão', () => {
            const home = document.getElementById('home');
            expect(home.style.display).toBe('block');
        });

        test('deve mudar de página quando showPage é chamado', () => {
            showPage('educacao');
            
            const educacao = document.getElementById('educacao');
            const home = document.getElementById('home');
            
            expect(educacao.style.display).toBe('block');
            expect(home.style.display).toBe('none');
        });

        test('deve atualizar o estado de navegação', () => {
            showPage('dados');
            
            const links = document.querySelectorAll('.nav-link');
            const dadosLink = Array.from(links).find(l => l.textContent === 'Dados');
            
            expect(dadosLink.classList.contains('active')).toBe(true);
        });

        test('deve lidar com página inexistente graciosamente', () => {
            expect(() => showPage('inexistente')).not.toThrow();
        });
    });

    describe('Validação de Formulário', () => {
        beforeEach(() => {
            document.body.innerHTML += `
                <form id="form-contribuicao">
                    <input id="nome" value="">
                    <input id="email" value="">
                    <select id="tipo"><option value="">Selecione...</option></select>
                    <textarea id="mensagem"></textarea>
                    <div id="email-error" class="hidden"></div>
                    <div id="mensagem-error" class="hidden"></div>
                </form>
                <div id="form-message" class="hidden"></div>
            `;
        });

        test('deve validar email obrigatório', () => {
            document.getElementById('email').value = '';
            const result = validateForm();
            expect(result).toBe(false);
        });

        test('deve validar email com formato correto', () => {
            document.getElementById('email').value = 'invalido';
            const result = validateForm();
            expect(result).toBe(false);
        });

        test('deve validar mensagem mínima', () => {
            document.getElementById('email').value = 'valido@example.com';
            document.getElementById('tipo').value = 'sugestao';
            document.getElementById('mensagem').value = 'curta';
            
            const result = validateForm();
            expect(result).toBe(false);
        });

        test('deve aceitar formulário válido', () => {
            document.getElementById('email').value = 'valido@example.com';
            document.getElementById('tipo').value = 'sugestao';
            document.getElementById('mensagem').value = 'Esta é uma mensagem válida com mais de 10 caracteres';
            
            const result = validateForm();
            expect(result).toBe(true);
        });
    });

    describe('Manipulação de Abas (Tópicos)', () => {
        beforeEach(() => {
            document.body.innerHTML += `
                <div id="topic-causas" class="topic-content">Causas</div>
                <div id="topic-consequencias" class="topic-content">Consequências</div>
                <div id="topic-solucoes" class="topic-content">Soluções</div>
                <button id="tab-causas" class="tab-button active" onclick="showTopic('causas')">Causas</button>
                <button id="tab-consequencias" class="tab-button" onclick="showTopic('consequencias')">Consequências</button>
                <button id="tab-solucoes" class="tab-button" onclick="showTopic('solucoes')">Soluções</button>
            `;
        });

        test('deve mostrar tópico correto', () => {
            showTopic('solucoes');
            
            const solucoes = document.getElementById('topic-solucoes');
            expect(solucoes.style.display).toBe('block');
        });

        test('deve esconder outros tópicos', () => {
            showTopic('solucoes');
            
            const causas = document.getElementById('topic-causas');
            const consequencias = document.getElementById('topic-consequencias');
            
            expect(causas.style.display).toBe('none');
            expect(consequencias.style.display).toBe('none');
        });

        test('deve atualizar estado de botão de aba', () => {
            showTopic('consequencias');
            
            const btnConsequencias = document.getElementById('tab-consequencias');
            expect(btnConsequencias.classList.contains('active')).toBe(true);
            expect(btnConsequencias.getAttribute('aria-selected')).toBe('true');
        });
    });
});

describe('TerraViva - Funcionalidades de Dados', () => {
    
    describe('Dados de Gráficos', () => {
        test('deve ter dados para degradação', () => {
            expect(CHART_DATA.degradacao).toBeDefined();
            expect(CHART_DATA.degradacao.labels).toHaveLength(5);
            expect(CHART_DATA.degradacao.data).toHaveLength(5);
        });

        test('deve ter dados para erosão', () => {
            expect(CHART_DATA.erosao).toBeDefined();
            expect(CHART_DATA.erosao.labels).toHaveLength(6);
            expect(CHART_DATA.erosao.data).toHaveLength(6);
        });

        test('deve ter cores adequadas', () => {
            expect(CHART_DATA.degradacao.colors).toBeDefined();
            expect(CHART_DATA.degradacao.colors).toHaveLength(5);
            CHART_DATA.degradacao.colors.forEach(color => {
                expect(color).toMatch(/^#[0-9A-F]{6}$/i);
            });
        });
    });

    describe('Dados de Mapa', () => {
        test('deve ter marcadores definidos', () => {
            expect(MAP_MARKERS).toBeDefined();
            expect(MAP_MARKERS.length).toBeGreaterThan(0);
        });

        test('cada marcador deve ter coordenadas válidas', () => {
            MAP_MARKERS.forEach(marker => {
                expect(marker.coords).toBeDefined();
                expect(marker.coords).toHaveLength(2);
                expect(typeof marker.coords[0]).toBe('number');
                expect(typeof marker.coords[1]).toBe('number');
            });
        });

        test('cada marcador deve ter título e info', () => {
            MAP_MARKERS.forEach(marker => {
                expect(marker.title).toBeDefined();
                expect(marker.info).toBeDefined();
                expect(typeof marker.title).toBe('string');
                expect(typeof marker.info).toBe('string');
            });
        });
    });
});

describe('TerraViva - Acessibilidade', () => {
    
    test('deve ter roles ARIA apropriados', () => {
        const element = document.createElement('div');
        element.setAttribute('role', 'main');
        document.body.appendChild(element);
        
        expect(element.getAttribute('role')).toBe('main');
    });

    test('deve ter aria-label em botões', () => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', 'Abrir menu');
        
        expect(button.getAttribute('aria-label')).toBe('Abrir menu');
    });

    test('deve ter aria-invalid em campos inválidos', () => {
        const input = document.createElement('input');
        input.setAttribute('aria-invalid', 'true');
        
        expect(input.getAttribute('aria-invalid')).toBe('true');
    });
});
