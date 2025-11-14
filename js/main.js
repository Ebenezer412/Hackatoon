/**
 * TerraViva - JavaScript Principal
 * Gerencia navegação, formulários e funcionalidades principais
 */

/**
 * Alterna a visibilidade das diferentes seções (simula navegação).
 * @param {string} pageId - O ID da div da página a ser exibida.
 */
function showPage(pageId) {
    try {
        // Esconder todas as páginas
        document.querySelectorAll('.page-content').forEach(div => {
            div.style.display = 'none';
            div.classList.remove('active');
        });
        
        // Mostrar a página solicitada
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
            activePage.classList.add('active');

            // Atualizar o estado 'active' do menu
            updateNavigationState(pageId);

            // Inicializar recursos pesados apenas quando a página é mostrada
            initializePageResources(pageId);
        }
    } catch (error) {
        console.error('Erro ao mostrar página:', error);
    }
}

/**
 * Atualiza o estado visual da navegação
 */
function updateNavigationState(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    const activeLink = document.querySelector(`[onclick*="'${pageId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }
}

/**
 * Inicializa recursos específicos de cada página
 */
function initializePageResources(pageId) {
    switch (pageId) {
        case 'dados':
            // Espera um ciclo para garantir que o canvas está visível antes de desenhar
            setTimeout(() => {
                if (typeof window.initCharts === 'function') {
                    window.initCharts();
                } else {
                    console.error('initCharts não está disponível');
                    // Fallback: mostrar mensagem de erro
                    document.getElementById('chartDegradacao').parentElement.innerHTML = `
                        <div class="p-8 text-center text-gray-500">
                            <p class="text-lg font-semibold mb-2">Gráfico temporariamente indisponível</p>
                            <p class="text-sm">Os dados estão sendo carregados. Tente recarregar a página.</p>
                        </div>
                    `;
                    document.getElementById('chartErosao').parentElement.innerHTML = `
                        <div class="p-8 text-center text-gray-500">
                            <p class="text-lg font-semibold mb-2">Gráfico temporariamente indisponível</p>
                            <p class="text-sm">Os dados estão sendo carregados. Tente recarregar a página.</p>
                        </div>
                    `;
                }
            }, 200);
            break;
        case 'mapa':
            setTimeout(() => {
                if (typeof window.initMap === 'function') {
                    // Verificar se Leaflet está disponível
                    if (typeof window.L !== 'undefined' && window.L.map) {
                        window.initMap();
                    } else {
                        console.warn('Leaflet não carregado, tentando novamente...');
                        // Tentar novamente em 500ms
                        setTimeout(() => {
                            if (typeof window.L !== 'undefined' && window.L.map) {
                                window.initMap();
                            } else {
                                console.error('Leaflet ainda não está disponível');
                                showMapFallback();
                            }
                        }, 500);
                    }
                } else {
                    console.error('initMap não está disponível');
                }
            }, 100);
            break;
    }
}

/**
 * Alterna o conteúdo dentro da seção de Educação (abas).
 * @param {string} topicId - O ID do tópico (causas, consequencias, solucoes).
 */
function showTopic(topicId) {
    try {
        // Esconder todos os conteúdos de tópico
        document.querySelectorAll('.topic-content').forEach(div => {
            div.style.display = 'none';
        });
        
        // Mostrar o tópico solicitado
        const activeTopic = document.getElementById(`topic-${topicId}`);
        if (activeTopic) {
            activeTopic.style.display = 'block';
        }

        // Atualizar o estilo dos botões da aba
        updateTabButtons(topicId);
    } catch (error) {
        console.error('Erro ao mostrar tópico:', error);
    }
}

/**
 * Atualiza o estado visual dos botões das abas
 */
function updateTabButtons(activeTopicId) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active', 'border-terra-verde', 'text-terra-verde');
        btn.classList.add('border-transparent', 'hover:border-gray-300', 'text-gray-600');
        btn.setAttribute('aria-selected', 'false');
    });
    
    const activeButton = document.getElementById(`tab-${activeTopicId}`);
    if (activeButton) {
        activeButton.classList.add('active', 'border-terra-verde', 'text-terra-verde');
        activeButton.classList.remove('border-transparent', 'hover:border-gray-300', 'text-gray-600');
        activeButton.setAttribute('aria-selected', 'true');
    }
}

/**
 * Validação de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitização de input para segurança
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
               .replace(/javascript:/gi, '')
               .replace(/on\w+\s*=/gi, '')
               .trim();
}

/**
 * Validação do formulário
 */
function validateForm() {
    const email = document.getElementById('email').value.trim();
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    
    let isValid = true;
    
    // Validar email
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');
    if (!email) {
        emailError.textContent = 'Email é obrigatório';
        emailError.classList.remove('hidden');
        emailInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Por favor, insira um email válido';
        emailError.classList.remove('hidden');
        emailInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
        emailInput.setAttribute('aria-invalid', 'false');
    }
    
    // Validar tipo
    if (!tipo) {
        document.getElementById('tipo').focus();
        isValid = false;
    }
    
    // Validar mensagem
    const mensagemError = document.getElementById('mensagem-error');
    const mensagemInput = document.getElementById('mensagem');
    if (!mensagem) {
        mensagemError.textContent = 'Mensagem é obrigatória';
        mensagemError.classList.remove('hidden');
        mensagemInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else if (mensagem.length < 10) {
        mensagemError.textContent = 'A mensagem deve ter pelo menos 10 caracteres';
        mensagemError.classList.remove('hidden');
        mensagemInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        mensagemError.classList.add('hidden');
        mensagemInput.setAttribute('aria-invalid', 'false');
    }
    
    return isValid;
}

/**
 * Limpa estados de erro do formulário
 */
function clearFormErrors() {
    document.querySelectorAll('[aria-invalid="true"]').forEach(el => {
        el.setAttribute('aria-invalid', 'false');
    });
    document.querySelectorAll('.text-red-500').forEach(el => {
        el.classList.add('hidden');
    });
}

/**
 * Lógica de submissão do formulário de contribuição.
 */
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
        return;
    }
    
    const messageDiv = document.getElementById('form-message');
    
    // Sanitizar inputs
    const nome = sanitizeInput(document.getElementById('nome').value) || 'Membro Anônimo';
    const email = sanitizeInput(document.getElementById('email').value);
    const tipo = document.getElementById('tipo').options[document.getElementById('tipo').selectedIndex].text;
    const mensagem = sanitizeInput(document.getElementById('mensagem').value);
    
    // Simulação de envio
    messageDiv.textContent = `Obrigado, ${nome}! A sua contribuição (${tipo}) foi enviada com sucesso e será analisada pela nossa equipa.`;
    messageDiv.classList.remove('hidden');

    // Limpa o formulário após 3 segundos
    setTimeout(() => {
        document.getElementById('form-contribuicao').reset();
        messageDiv.classList.add('hidden');
        clearFormErrors();
    }, 3000);
}

/**
 * Inicialização da aplicação
 */
function initializeApp() {
    try {
        // Configurar evento do formulário
        const form = document.getElementById('form-contribuicao');
        if (form) {
            form.addEventListener('submit', handleFormSubmission);
        }

        // Inicializar página padrão
        showPage('home');
        showTopic('causas');

        console.log('Aplicação TerraViva inicializada com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
    }
}

/**
 * Limpeza ao sair da página
 */
function cleanup() {
    // Destruir gráficos se existirem
    if (typeof destroyCharts === 'function') {
        destroyCharts();
    }
    
    // Destruir mapa se existir
    if (typeof destroyMap === 'function') {
        destroyMap();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeApp);
window.addEventListener('beforeunload', cleanup);

// Exportar funções para uso global
window.showPage = showPage;
window.showTopic = showTopic;
window.validateForm = validateForm;
window.sanitizeInput = sanitizeInput;
window.isValidEmail = isValidEmail;
