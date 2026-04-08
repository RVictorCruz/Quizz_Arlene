// Banco de Dados
const bancoDeDadosOriginal = [
    // --- VIAS DE ADMINISTRAÇÃO ---
    {
        dicas: [
            "Sou uma via parenteral onde não ocorre a etapa de absorção.",
            "Minha biodisponibilidade é de 100% por definição.",
            "Sou a via de escolha para emergências por ter efeito imediato."
        ],
        resposta: "Via Intravenosa",
        tema: "Vias de Administração"
    },
    {
        dicas: [
            "Sou uma via enteral que evita parcialmente o efeito de primeira passagem.",
            "O fármaco é colocado debaixo da língua para rápida absorção pelos capilares.",
            "Sou muito utilizada para comprimidos de nitratos em casos de angina."
        ],
        resposta: "Via Sublingual",
        tema: "Vias de Administração"
    },
    {
        dicas: [
            "Sou a via enteral mais comum e segura.",
            "Os fármacos que passam por mim sofrem metabolismo de primeira passagem no fígado.",
            "A absorção ocorre principalmente no estômago e intestino delgado."
        ],
        resposta: "Via Oral",
        tema: "Vias de Administração"
    },

    // --- SNA PARASSIMPÁTICO (COLINÉRGICOS) ---
    {
        dicas: [
            "Sou um antagonista muscarínico clássico extraído de plantas.",
            "Sou o antídoto de escolha para intoxicações por organofosforados.",
            "Causo midríase, boca seca e sou usado para tratar a bradicardia."
        ],
        resposta: "Atropina",
        tema: "SNA Parassimpático"
    },
    {
        dicas: [
            "Sou o principal neurotransmissor do sistema parassimpático.",
            "Ajo em receptores nicotínicos e muscarínicos.",
            "Minha ação é finalizada pela enzima Acetilcolinesterase."
        ],
        resposta: "Acetilcolina",
        tema: "SNA Parassimpático"
    },
    {
        dicas: [
            "Sou um fármaco anticolinérgico muito usado para cólicas.",
            "Atuo impedindo a contração da musculatura lisa do trato gastrointestinal.",
            "Muitas vezes sou associada à Dipirona em medicamentos comerciais."
        ],
        resposta: "Escopolamina",
        tema: "SNA Parassimpático"
    },

    // --- SNA SIMPÁTICO (ADRENÉRGICOS) ---
    {
        dicas: [
            "Sou um agonista adrenérgico que atua tanto em receptores Alfa quanto Beta.",
            "Sou o fármaco de escolha para o choque anafilático.",
            "Promovo broncodilatação e aumento da frequência cardíaca."
        ],
        resposta: "Adrenalina",
        tema: "SNA Simpático"
    },
    {
        dicas: [
            "Sou um fármaco 'Betabloqueador' não seletivo (Beta-1 e Beta-2).",
            "Sou usado para tratar hipertensão, arritmias e tremores de ansiedade.",
            "Não devo ser usado em asmáticos pois posso causar broncoconstrição."
        ],
        resposta: "Propranolol",
        tema: "SNA Simpático"
    },
    {
        dicas: [
            "Sou um antagonista seletivo de receptores Alfa-1.",
            "Minha principal utilidade clínica é o tratamento da Hiperplasia Prostática Benigna (HPB).",
            "Ajudo no relaxamento do músculo liso da próstata e colo da bexiga."
        ],
        resposta: "Tansulosina",
        tema: "SNA Simpático"
    },

    // --- PRINCÍPIOS E FARMACOCINÉTICA ---
    {
        dicas: [
            "Sou o parâmetro que indica a dose necessária para produzir 50% do efeito máximo.",
            "Quanto menor o meu valor, mais 'forte' ou potente é o fármaco.",
            "Refiro-me à afinidade do fármaco pelo seu receptor."
        ],
        resposta: "Potência",
        tema: "Farmacodinâmica"
    },
    {
        dicas: [
            "Sou a principal organela (ou local) onde ocorre o metabolismo de fármacos.",
            "Utilizo o sistema enzimático Citocromo P450.",
            "Minha função é transformar fármacos lipossolúveis em hidrossolúveis para excreção."
        ],
        resposta: "Fígado",
        tema: "Farmacocinética"
    },
    {
        dicas: [
            "Sou a fase da farmacocinética que estuda a saída do fármaco do sangue para os tecidos.",
            "Dependo da ligação a proteínas plasmáticas como a Albumina.",
            "Fármacos muito lipossolúveis costumam ter esse volume muito alto."
        ],
        resposta: "Distribuição",
        tema: "Farmacocinética"
    }
];


// Sistema de Embaralhamento (Fisher-Yates)
function embaralharArray(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}

// Gerenciador de Banco de Dados Aleatório
class BancoAleatorio {
    constructor(dados) {
        this.dadosOriginais = dados;
        this.perguntasRestantes = [];
        this.perguntasRespondidas = [];
        this.inicializar();
    }

    inicializar() {
        this.perguntasRestantes = embaralharArray(this.dadosOriginais);
        this.perguntasRespondidas = [];
    }

    proximaPergunta() {
        if (this.perguntasRestantes.length === 0) {
            // Se acabaram as perguntas, reinicia o ciclo
            this.inicializar();
        }
        
        const proxima = this.perguntasRestantes.shift();
        this.perguntasRespondidas.push(proxima);
        return proxima;
    }

    getProgresso() {
        const total = this.dadosOriginais.length;
        const respondidas = this.perguntasRespondidas.length;
        return {
            respondidas: respondidas % total,
            total: total,
            porcentagem: ((respondidas % total) / total) * 100
        };
    }

    resetar() {
        this.inicializar();
    }
}

// Sistema de Som Nativo (Web Audio API)
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }

    init() {
        if (!this.audioContext && window.AudioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);
        oscillator.stop(now + 0.5);
        
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode2 = this.audioContext.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(this.audioContext.destination);
        oscillator2.frequency.value = 1100;
        gainNode2.gain.value = 0.3;
        oscillator2.start(now + 0.1);
        gainNode2.gain.exponentialRampToValueAtTime(0.00001, now + 0.6);
        oscillator2.stop(now + 0.6);
    }
    
    playError() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.3);
        oscillator.stop(now + 0.3);
    }
    
    playTick() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.15;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
        oscillator.stop(now + 0.1);
    }
    
    playLevelUp() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioContext) return;
        
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, index) => {
            const now = this.audioContext.currentTime + index * 0.15;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = freq;
            gainNode.gain.value = 0.2;
            
            oscillator.start(now);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.3);
            oscillator.stop(now + 0.3);
        });
    }
}

// Game Manager
let bancoAleatorio;
let indiceAtual = 0;
let tempoRestante = 25;
let intervalo;
let dicasExibidas = 0;
let pontos = 0;
let podeResponder = true;
let estaPausado = false;
let perguntasFeitas = 0;

const soundSystem = new SoundSystem();

// Elementos DOM
const elementoDica = document.getElementById('lista-dicas');
const elementoResposta = document.getElementById('resposta-usuario');
const elementoTempo = document.getElementById('segundos');
const elementoFeedback = document.getElementById('feedback');
const elementoTema = document.getElementById('tema');
const elementoPontos = document.getElementById('score');
const elementoLevelBadge = document.getElementById('level-badge');
const elementoDicasCount = document.getElementById('dicas-count');
const btnPause = document.getElementById('btn-pause');
const modalPause = document.getElementById('pause-modal');
const btnResume = document.getElementById('btn-resume');
const btnRestart = document.getElementById('btn-restart');
const progressBar = document.getElementById('progress-bar');

function atualizarUI() {
    elementoPontos.innerText = `Pontos: ${pontos}`;
    const progresso = bancoAleatorio.getProgresso();
    elementoLevelBadge.innerText = `Desafio ${progresso.respondidas + 1}/${bancoAleatorio.dadosOriginais.length}`;
    progressBar.style.width = `${progresso.porcentagem}%`;
}

function exibirPrimeiraDica() {
    const desafio = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    elementoDica.innerHTML = "";
    
    if (desafio && desafio.dicas.length > 0) {
        const li = document.createElement('li');
        li.innerText = `💡 ${desafio.dicas[0]}`;
        elementoDica.appendChild(li);
        dicasExibidas = 1;
        elementoDicasCount.innerText = `${dicasExibidas}/${desafio.dicas.length}`;
        
        li.style.animation = 'fadeInUp 0.4s ease-out';
    }
}

function atualizarDicas() {
    const desafio = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    if (desafio && dicasExibidas < desafio.dicas.length) {
        const li = document.createElement('li');
        li.innerText = `💡 ${desafio.dicas[dicasExibidas]}`;
        elementoDica.appendChild(li);
        dicasExibidas++;
        elementoDicasCount.innerText = `${dicasExibidas}/${desafio.dicas.length}`;
        
        li.style.animation = 'fadeInUp 0.4s ease-out';
        soundSystem.playTick();
    }
}

function contagemRegressiva() {
    if (!podeResponder || estaPausado) return;
    
    tempoRestante--;
    elementoTempo.innerText = tempoRestante;
    
    if (tempoRestante <= 5) {
        const timerElement = document.querySelector('.timer-card');
        timerElement.style.animation = 'pulse 0.5s infinite';
        if (tempoRestante <= 3 && tempoRestante > 0) {
            soundSystem.playTick();
        }
    }
    
    const desafio = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    if (desafio) {
        const dicasTotais = desafio.dicas.length;
        
        if (dicasTotais >= 2 && tempoRestante === 14 && dicasExibidas === 1) {
            atualizarDicas();
        }
        if (dicasTotais >= 3 && tempoRestante === 8 && dicasExibidas === 2) {
            atualizarDicas();
        }
    }
    
    if (tempoRestante <= 0) {
        finalizarRodada(false);
    }
}

function normalizarTexto(texto) {
    return texto.trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, '');
}

function verificarResposta() {
    if (!podeResponder || estaPausado) return;
    
    const palpite = normalizarTexto(elementoResposta.value);
    const desafioAtual = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    const respostaCorreta = normalizarTexto(desafioAtual.resposta);
    
    if (palpite === respostaCorreta) {
        soundSystem.playSuccess();
        finalizarRodada(true);
    } else if (palpite.length > 0) {
        soundSystem.playError();
        elementoFeedback.innerText = "❌ Ainda não... tente de novo!";
        elementoFeedback.style.background = "#fff3cd";
        elementoFeedback.style.color = "#856404";
        
        elementoResposta.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
            elementoResposta.style.animation = '';
        }, 300);
    }
}

function finalizarRodada(acertou) {
    clearInterval(intervalo);
    podeResponder = false;
    elementoResposta.disabled = true;
    
    const desafioAtual = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    const pontosGanhos = acertou ? (tempoRestante * 10) : 0;
    
    if (acertou) {
        pontos += pontosGanhos;
        elementoFeedback.innerHTML = `✅ Correto! +${pontosGanhos} pontos!`;
        elementoFeedback.style.background = "#d4edda";
        elementoFeedback.style.color = "#155724";
        
        const container = document.querySelector('.game-container');
        container.style.transform = 'scale(1.02)';
        setTimeout(() => {
            container.style.transform = '';
        }, 200);
    } else {
        elementoFeedback.innerHTML = `⏰ Tempo esgotado! A resposta era: <strong>${desafioAtual.resposta}</strong>`;
        elementoFeedback.style.background = "#f8d7da";
        elementoFeedback.style.color = "#721c24";
    }
    
    atualizarUI();
    
    const btnProximo = document.getElementById('btn-proximo');
    btnProximo.classList.remove('hidden');
    
    const timerElement = document.querySelector('.timer-card');
    timerElement.style.animation = '';
}

function proximoDesafio() {
    // Move a pergunta atual para respondidas
    if (bancoAleatorio.perguntasRestantes.length > 0) {
        const atual = bancoAleatorio.perguntasRestantes.shift();
        bancoAleatorio.perguntasRespondidas.push(atual);
    }
    
    // Verifica se tem mais perguntas
    if (bancoAleatorio.perguntasRestantes.length > 0 || 
        (bancoAleatorio.perguntasRespondidas.length > 0 && bancoAleatorio.perguntasRestantes.length === 0 && 
         bancoAleatorio.perguntasRespondidas.length < bancoAleatorio.dadosOriginais.length)) {
        soundSystem.playLevelUp();
        iniciarDesafio();
    } else if (bancoAleatorio.perguntasRestantes.length === 0 && 
               bancoAleatorio.perguntasRespondidas.length >= bancoAleatorio.dadosOriginais.length) {
        // Ciclo completo, reinicia o jogo
        soundSystem.playSuccess();
        setTimeout(() => {
            alert(`🏆 Parabéns! Você completou um ciclo completo!\n🎯 Pontuação final: ${pontos} pontos\n🔄 Iniciando novo ciclo...`);
            reiniciarJogo();
        }, 100);
    } else {
        iniciarDesafio();
    }
}

function pausarJogo() {
    if (!podeResponder) return;
    
    estaPausado = true;
    clearInterval(intervalo);
    
    const desafioAtual = bancoAleatorio.perguntasRestantes.length > 0 ? 
        bancoAleatorio.perguntasRestantes[0] : 
        bancoAleatorio.perguntasRespondidas[bancoAleatorio.perguntasRespondidas.length - 1];
    
    document.getElementById('pause-desafio').innerText = desafioAtual?.tema || '---';
    document.getElementById('pause-tempo').innerText = tempoRestante;
    
    modalPause.classList.remove('hidden');
}

function retomarJogo() {
    estaPausado = false;
    modalPause.classList.add('hidden');
    intervalo = setInterval(contagemRegressiva, 1000);
}

function reiniciarJogo() {
    estaPausado = false;
    modalPause.classList.add('hidden');
    clearInterval(intervalo);
    
    bancoAleatorio.resetar();
    pontos = 0;
    perguntasFeitas = 0;
    
    iniciarDesafio();
    atualizarUI();
    
    elementoFeedback.innerText = "";
    elementoFeedback.className = "feedback-message";
}

function iniciarDesafio() {
    const desafio = bancoAleatorio.perguntasRestantes[0];
    
    if (!desafio) {
        // Se não tem desafio, reinicia
        bancoAleatorio.inicializar();
        iniciarDesafio();
        return;
    }
    
    elementoTema.innerText = desafio.tema;
    elementoDica.innerHTML = "";
    
    tempoRestante = 25;
    dicasExibidas = 0;
    podeResponder = true;
    elementoTempo.innerText = tempoRestante;
    elementoResposta.value = "";
    elementoResposta.disabled = false;
    elementoFeedback.innerText = "";
    elementoFeedback.className = "feedback-message";
    elementoDicasCount.innerText = `0/${desafio.dicas.length}`;
    
    const btnProximo = document.getElementById('btn-proximo');
    btnProximo.classList.add('hidden');
    
    exibirPrimeiraDica();
    
    if (intervalo) {
        clearInterval(intervalo);
    }
    intervalo = setInterval(contagemRegressiva, 1000);
    
    atualizarUI();
}

// Event Listeners
document.getElementById('btn-responder').addEventListener('click', verificarResposta);
document.getElementById('btn-proximo').addEventListener('click', proximoDesafio);
btnPause.addEventListener('click', pausarJogo);
btnResume.addEventListener('click', retomarJogo);
btnRestart.addEventListener('click', reiniciarJogo);

// Enter key support
elementoResposta.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && podeResponder && !estaPausado) {
        verificarResposta();
    }
});

// Escape para sair do pause
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalPause.classList.contains('hidden')) {
        retomarJogo();
    }
});

// Inicialização
bancoAleatorio = new BancoAleatorio(bancoDeDadosOriginal);
iniciarDesafio();

// Inicializar áudio na primeira interação
document.body.addEventListener('click', () => {
    soundSystem.init();
}, { once: true });
