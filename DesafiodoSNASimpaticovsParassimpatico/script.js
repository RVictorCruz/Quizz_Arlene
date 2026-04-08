const rodadas = [
    { orgao: "Pupila", sistema: "Simpático", contexto: "Luta ou Fuga", correta: "Dilatar", A: "Dilatar", B: "Contrair", classe: "dilatar", imagem: "images/pupila.png" },
    { orgao: "Coração", sistema: "Parassimpático", contexto: "Repouso", correta: "Diminuir Frequência", A: "Aumentar Frequência", B: "Diminuir Frequência", classe: "lento", imagem: "images/coracao.png" },
    { orgao: "Brônquios", sistema: "Simpático", contexto: "Luta ou Fuga", correta: "Relaxar (Dilatar)", A: "Relaxar (Dilatar)", B: "Contrair", classe: "dilatar", imagem: "images/pulmao.png" },
    { orgao: "Bexiga", sistema: "Parassimpático", contexto: "Repouso", correta: "Contrair (Esvaziar)", A: "Relaxar", B: "Contrair (Esvaziar)", classe: "contrair", imagem: "images/bexiga.png" },
    { orgao: "Glândulas Salivares", sistema: "Simpático", contexto: "Luta ou Fuga", correta: "Inibir", A: "Estimular", B: "Inibir", classe: "contrair", imagem: "images/boca.png" }
];

let rodadaAtual = {};
let score = 0;
let acertos = 0;
let tempo = 30;
let combo = 0;
let podeJogar = true;
let jogoPausado = false;
let cronometro;

// Elementos DOM
const visual = document.getElementById('organo-imagem');
const glow = document.getElementById('organ-glow');
const feedbackEffect = document.getElementById('feedback-effect');
const gameContainer = document.querySelector('.game-container');
const comboCounter = document.getElementById('combo-counter');
const comboValue = document.getElementById('combo-value');
const systemStatus = document.getElementById('system-status');
const organSystemBadge = document.getElementById('organ-system-badge');
const pauseModal = document.getElementById('pauseModal');
const botoesAcao = document.querySelectorAll('.btn-acao');

// Sons
const somAcerto = document.getElementById('som-acerto');
const somErro = document.getElementById('som-erro');

function playSound(soundElement) {
    if (soundElement && !jogoPausado) {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => console.log('Áudio não disponível'));
    }
}

function showFeedback(isCorrect) {
    feedbackEffect.style.opacity = '1';
    feedbackEffect.className = 'feedback-effect';
    feedbackEffect.innerText = isCorrect ? '✓ CORRETO!' : '✗ ERRO!';
    
    if (isCorrect) {
        feedbackEffect.classList.add('correct');
    } else {
        feedbackEffect.classList.add('wrong');
    }
    
    setTimeout(() => {
        feedbackEffect.style.opacity = '0';
    }, 600);
}

function updateComboUI() {
    if (combo > 0 && !jogoPausado) {
        comboCounter.classList.add('show');
        comboValue.innerText = combo;
    } else {
        comboCounter.classList.remove('show');
    }
}

function togglePause() {
    if (jogoPausado) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    if (jogoPausado) return;
    
    jogoPausado = true;
    clearInterval(cronometro);
    
    // Desabilita botões
    botoesAcao.forEach(btn => {
        btn.classList.add('disabled');
    });
    
    // Atualiza stats no modal
    document.getElementById('pauseScore').innerText = score;
    document.getElementById('pauseAcertos').innerText = acertos;
    document.getElementById('pauseTimer').innerText = tempo;
    
    // Mostra modal
    pauseModal.classList.add('active');
}

function resumeGame() {
    if (!jogoPausado) return;
    
    jogoPausado = false;
    
    // Reativa botões
    botoesAcao.forEach(btn => {
        btn.classList.remove('disabled');
    });
    
    // Reinicia timer
    iniciarTimer();
    
    // Esconde modal
    pauseModal.classList.remove('active');
    
    // Atualiza UI do combo
    updateComboUI();
}

function restartGame() {
    // Reseta todas as variáveis
    score = 0;
    acertos = 0;
    tempo = 30;
    combo = 0;
    jogoPausado = false;
    
    // Atualiza UI
    document.getElementById('score').innerText = score;
    document.getElementById('acertos').innerText = acertos;
    document.getElementById('timer').innerText = tempo;
    updateComboUI();
    
    // Para o timer antigo
    clearInterval(cronometro);
    
    // Fecha modal
    pauseModal.classList.remove('active');
    
    // Reativa botões
    botoesAcao.forEach(btn => {
        btn.classList.remove('disabled');
    });
    
    // Reinicia o jogo
    proximaRodada();
    iniciarTimer();
}

function proximaRodada() {
    if (jogoPausado) return;
    
    podeJogar = true;
    
    // Reset visual
    visual.className = "";
    visual.style.animation = 'none';
    visual.offsetHeight; // Força reflow
    visual.style.animation = null;
    glow.classList.remove('active');
    
    rodadaAtual = rodadas[Math.floor(Math.random() * rodadas.length)];
    
    // Atualiza UI
    document.getElementById('modo-sistema').innerText = rodadaAtual.sistema;
    document.getElementById('situacao-texto').innerText = rodadaAtual.contexto;
    document.getElementById('nome-orgao').innerText = rodadaAtual.orgao;
    
    // Atualiza badge do sistema
    organSystemBadge.innerText = rodadaAtual.sistema === "Simpático" ? "⚡ SISTEMA SIMPÁTICO" : "🌿 SISTEMA PARASSIMPÁTICO";
    organSystemBadge.style.background = rodadaAtual.sistema === "Simpático" ? "rgba(255, 51, 102, 0.3)" : "rgba(51, 204, 255, 0.3)";
    
    // Carrega imagem - agora com object-fit: contain para mostrar imagem completa
    const imgElement = document.getElementById('organo-imagem');
    imgElement.src = rodadaAtual.imagem;
    imgElement.onerror = () => {
        console.error(`Imagem não encontrada: ${rodadaAtual.imagem}`);
        // Fallback visual
        imgElement.style.objectFit = 'contain';
        imgElement.style.padding = '40px';
        imgElement.style.background = rodadaAtual.sistema === "Simpático" ? '#ff336622' : '#33ccff22';
    };
    imgElement.style.display = 'block';
    imgElement.style.objectFit = 'contain';
    imgElement.style.objectPosition = 'center';
    
    const botoes = document.querySelectorAll('.btn-acao');
    botoes[0].querySelector('.btn-label').innerText = rodadaAtual.A;
    botoes[1].querySelector('.btn-label').innerText = rodadaAtual.B;
    
    // Muda cor do status
    if (rodadaAtual.sistema === "Simpático") {
        systemStatus.className = 'system-status simpatico';
    } else {
        systemStatus.className = 'system-status parassimpatico';
    }
}

function aplicarEfeitoVisual(classe) {
    visual.classList.add(classe);
    glow.classList.add('active');
    
    // Efeito de flash na cor correspondente
    const flashOverlay = document.createElement('div');
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.right = '0';
    flashOverlay.style.bottom = '0';
    flashOverlay.style.backgroundColor = rodadaAtual.sistema === "Simpático" ? 'rgba(255, 51, 102, 0.2)' : 'rgba(51, 204, 255, 0.2)';
    flashOverlay.style.pointerEvents = 'none';
    flashOverlay.style.zIndex = '999';
    document.body.appendChild(flashOverlay);
    
    setTimeout(() => {
        visual.classList.remove(classe);
        glow.classList.remove('active');
        flashOverlay.remove();
    }, 500);
}

function jogar(opcao) {
    if (!podeJogar || jogoPausado) return;
    
    const escolha = opcao === 'A' ? rodadaAtual.A : rodadaAtual.B;
    const isCorrect = (escolha === rodadaAtual.correta);
    
    podeJogar = false;
    
    if (isCorrect) {
        // Acerto
        score += 10;
        acertos++;
        combo++;
        playSound(somAcerto);
        showFeedback(true);
        aplicarEfeitoVisual(rodadaAtual.classe);
        
        // Efeito de glow na borda do container
        if (rodadaAtual.sistema === "Simpático") {
            gameContainer.style.boxShadow = '0 0 40px rgba(255, 51, 102, 0.6)';
        } else {
            gameContainer.style.boxShadow = '0 0 40px rgba(51, 204, 255, 0.6)';
        }
        setTimeout(() => {
            gameContainer.style.boxShadow = '';
        }, 300);
        
        setTimeout(() => {
            if (!jogoPausado) proximaRodada();
        }, 600);
    } else {
        // Erro
        score = Math.max(0, score - 5);
        combo = 0;
        playSound(somErro);
        showFeedback(false);
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 300);
        
        // Efeito de erro
        const errorFlash = document.createElement('div');
        errorFlash.style.position = 'fixed';
        errorFlash.style.top = '0';
        errorFlash.style.left = '0';
        errorFlash.style.right = '0';
        errorFlash.style.bottom = '0';
        errorFlash.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
        errorFlash.style.pointerEvents = 'none';
        errorFlash.style.zIndex = '999';
        document.body.appendChild(errorFlash);
        setTimeout(() => errorFlash.remove(), 200);
        
        setTimeout(() => {
            if (!jogoPausado) proximaRodada();
        }, 600);
    }
    
    // Atualiza UI
    document.getElementById('score').innerText = score;
    document.getElementById('acertos').innerText = acertos;
    updateComboUI();
}

// Timer com efeito visual
function iniciarTimer() {
    if (cronometro) clearInterval(cronometro);
    
    cronometro = setInterval(() => {
        if (!jogoPausado && tempo > 0) {
            tempo--;
            const timerElement = document.getElementById('timer');
            timerElement.innerText = tempo;
            
            // Efeito de urgência no tempo
            if (tempo <= 5) {
                timerElement.style.color = '#ff3366';
                timerElement.style.animation = 'pulse-red 0.5s infinite';
            } else {
                timerElement.style.color = 'white';
                timerElement.style.animation = 'none';
            }
            
            if (tempo <= 0) {
                clearInterval(cronometro);
                const mensagem = `🏁 TEMPO ESGOTADO!\n\n📊 Pontuação Final: ${score}\n✅ Acertos: ${acertos}\n\n${score >= 100 ? '🏆 PARABÉNS! Você dominou o SNA!' : '📚 Continue praticando!'}`;
                alert(mensagem);
                location.reload();
            }
        }
    }, 1000);
}

// Evento de tecla ESC para pause
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
    }
});

// Inicia o jogo
proximaRodada();
iniciarTimer();