document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. SISTEMA DE ACESSIBILIDADE FLUTUANTE
       ========================================================================== */
    const body = document.body;
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    const btnStartVoice = document.getElementById('btn-start-voice');
    const btnStopVoice = document.getElementById('btn-stop-voice');

    let currentFontScale = 100; // Percentual base

    // Controle de Tamanho de Fonte
    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontScale < 140) {
            currentFontScale += 10;
            body.style.fontSize = `${currentFontScale / 100}rem`;
        }
    });

    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontScale > 85) {
            currentFontScale -= 10;
            body.style.fontSize = `${currentFontScale / 100}rem`;
        }
    });

    // Alternar Tema (Claro / Cyberpunk Escuro)
    btnToggleTheme.addEventListener('click', () => {
        body.classList.toggle('light-theme');
    });

    /* ==========================================================================
       2. SPEECH SYNTHESIS API (LEITURA POR VOZ)
       ========================================================================== */
    let synthUtterance = null;

    btnStartVoice.addEventListener('click', () => {
        // Parar qualquer leitura ativa antes de iniciar
        window.speechSynthesis.cancel();

        // Captura apenas o conteúdo principal do manifesto e pilares conforme requisito
        const mainTextContent = document.getElementById('main-content').innerText;

        synthUtterance = new SpeechSynthesisUtterance(mainTextContent);
        synthUtterance.lang = 'pt-BR';
        synthUtterance.rate = 1.0;

        window.speechSynthesis.speak(synthUtterance);
        
        btnStartVoice.style.borderColor = 'var(--color-green-light)';
    });

    btnStopVoice.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        btnStartVoice.style.borderColor = 'var(--color-blue-sky)';
    });


    /* ==========================================================================
       3. SEÇÕES EXPANSÍVEIS (ACCORDION JAVASCRIPT)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isAlreadyActive = item.classList.contains('active');
            
            // Fecha todos os painéis antes de abrir o atual (comportamento clássico controlado)
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                i.querySelector('.accordion-content').setAttribute('hidden', 'true');
            });

            if (!isAlreadyActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                item.querySelector('.accordion-content').removeAttribute('hidden');
            }
        });
    });


    /* ==========================================================================
       4. ÁREA DE COMENTÁRIOS / INTERAÇÃO (LOGS DESCENTRALIZADOS)
       ========================================================================== */
    const commentForm = document.getElementById('comment-form');
    const txtComment = document.getElementById('txt-comment');
    const commentsList = document.getElementById('comments-list');
    const commentStatus = document.getElementById('comment-status');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const commentValue = txtComment.value.trim();
        if (commentValue === '') return;

        // Feedback visual e acessível de envio de dados
        commentStatus.style.color = 'var(--color-green-light)';
        commentStatus.textContent = 'Transmitindo pacote de dados para o solo...';

        setTimeout(() => {
            // Criação do elemento de comentário estruturado de forma limpa
            const li = document.createElement('li');
            li.className = 'comment-item';
            
            const spanUser = document.createElement('span');
            spanUser.className = 'comment-user';
            spanUser.textContent = `User_${Math.floor(Math.random() * 9000 + 1000)} //`;
            
            const pText = document.createElement('p');
            pText.className = 'comment-text';
            pText.textContent = commentValue;

            li.appendChild(spanUser);
            li.appendChild(pText);
            
            // Insere no início da lista para simular feeds em tempo real
            commentsList.insertBefore(li, commentsList.firstChild);

            // Limpa o formulário e status
            txtComment.value = '';
            commentStatus.textContent = 'Dados sincronizados com sucesso!';
            
            setTimeout(() => {
                commentStatus.textContent = '';
            }, 3000);

        }, 800); // Delay simulado para imersão estética
    });
});