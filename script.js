// ========== PARTÍCULAS DE FUNDO ==========
function criarParticulas() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = Math.random() * 4 + 1 + 'px';
        p.style.height = p.style.width;
        p.style.background = `rgba(${Math.random() * 100 + 80}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 50}, ${Math.random() * 0.3 + 0.1})`;
        p.style.borderRadius = '50%';
        p.style.top = Math.random() * 100 + '%';
        p.style.left = Math.random() * 100 + '%';
        p.style.animation = `flutuar ${Math.random() * 10 + 5}s linear infinite`;
        container.appendChild(p);
    }
}

const estiloAnimacao = document.createElement('style');
estiloAnimacao.textContent = `@keyframes flutuar { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh) translateX(40px); opacity: 0; } }`;
document.head.appendChild(estiloAnimacao);
criarParticulas();

// ========== BARRA DE PROGRESSO DO SCROLL ==========
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = (winScroll / height) * 100 + '%';
});

// ========== EFEITO DE DIGITAÇÃO ==========
function typingEffect(element, text, speed = 120) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const typingElement = document.getElementById('typingTitle');
if (typingElement) typingEffect(typingElement, 'TerraByte', 120);

// ========== MODO CLARO/ESCURO ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// ========== MENU MOBILE ==========
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('nav ul li a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
}

// ========== ROLAGEM SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== DESTAQUE DO MENU ATIVO ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    let current = '';
    const pos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop, height = section.clientHeight;
        if (pos >= top && pos < top + height) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// ========== QUIZ ==========
let perguntaAtual = 0, pontuacao = 0, respostaDada = false;
const perguntas = [
    { texto: "O que uma IA consegue fazer hoje no campo?", opcoes: ["Todas as acima", "Prever o preço do tomate", "Identificar lagarta por foto", "Dirigir um trator sozinho"], correta: 0, explicacao: "Correto! A IA já faz todas essas tarefas." },
    { texto: "Qual o benefício do uso de sensores + IA na irrigação?", opcoes: ["Aumentar o uso de água", "Economizar até 40% de água", "Substituir a chuva", "Diminuir a produtividade"], correta: 1, explicacao: "Isso mesmo! Economia de até 40% de água." },
    { texto: "Como a IA ajuda no combate a pragas?", opcoes: ["Aplicando veneno em tudo", "Câmeras identificam e aplicam só onde precisa", "Ignorando as pragas", "Substituindo o produtor"], correta: 1, explicacao: "Exato! Drones com IA identificam pragas precocemente." }
];

function carregarPergunta() {
    const q = perguntas[perguntaAtual];
    document.getElementById('quizQuestion').innerHTML = `<h3>${q.texto}</h3>`;
    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    q.opcoes.forEach((opcao, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opcao;
        btn.onclick = () => responder(btn, idx === q.correta);
        container.appendChild(btn);
    });
    document.getElementById('quizFeedback').innerHTML = '';
    document.getElementById('nextQuizBtn').style.display = 'none';
    respostaDada = false;
}

function responder(botao, acertou) {
    if (respostaDada) return;
    respostaDada = true;
    document.querySelectorAll('.quiz-option').forEach(btn => btn.style.pointerEvents = 'none');
    if (acertou) {
        botao.classList.add('correct');
        pontuacao++;
        document.getElementById('quizFeedback').innerHTML = `<p style="color:#52B788;">✅ ${perguntas[perguntaAtual].explicacao}</p>`;
    } else {
        botao.classList.add('wrong');
        const botoes = document.querySelectorAll('.quiz-option');
        botoes[perguntas[perguntaAtual].correta].classList.add('correct');
        document.getElementById('quizFeedback').innerHTML = `<p style="color:#e74c3c;">❌ ${perguntas[perguntaAtual].explicacao}</p>`;
    }
    document.getElementById('nextQuizBtn').style.display = 'block';
}

function avancarQuiz() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) carregarPergunta();
    else {
        document.getElementById('quizQuestion').innerHTML = `<h3>🎉 Quiz finalizado! 🎉</h3><p>Você acertou ${pontuacao} de ${perguntas.length} perguntas!</p><p>🚀 Com o <strong>TerraByte</strong>, você já está por dentro do futuro do agro!</p>`;
        document.getElementById('quizOptions').innerHTML = '';
        document.getElementById('quizFeedback').innerHTML = '';
        document.getElementById('nextQuizBtn').style.display = 'none';
    }
}

// ========== CALCULADORA ==========
const culturaDados = {
    soja: { produtividadeBase: 50, unidade: "sacas/hectare", precoSaca: 140 },
    milho: { produtividadeBase: 90, unidade: "sacas/hectare", precoSaca: 70 },
    cafe: { produtividadeBase: 35, unidade: "sacas/hectare", precoSaca: 1000 },
    cana: { produtividadeBase: 80, unidade: "toneladas/hectare", precoTonelada: 130 }
};

const conversoes = { hectare: 1, alqueire: 2.42, acre: 0.4047, m2: 0.0001 };

function converterParaHectares(valor, unidade) {
    return valor * conversoes[unidade];
}

function converterDeHectares(hectares, unidade) {
    return hectares / conversoes[unidade];
}

function atualizarConversor(origem, valor) {
    const hectares = converterParaHectares(valor, origem);
    document.getElementById('convHectares').value = hectares.toFixed(2);
    document.getElementById('convAlqueires').value = converterDeHectares(hectares, 'alqueire').toFixed(2);
    document.getElementById('convAcres').value = converterDeHectares(hectares, 'acre').toFixed(2);
    document.getElementById('convM2').value = (hectares * 10000).toFixed(0);
}

function configurarConversor() {
    const convInputs = ['convHectares', 'convAlqueires', 'convAcres', 'convM2'];
    const unidades = ['hectare', 'alqueire', 'acre', 'm2'];
    convInputs.forEach((id, idx) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                const val = parseFloat(input.value);
                if (!isNaN(val) && val > 0) atualizarConversor(unidades[idx], val);
            });
        }
    });
}

function calcularImpacto() {
    let areaValor = parseFloat(document.getElementById('areaHectares').value);
    const unidade = document.getElementById('unidadeEntrada').value;
    const cultura = document.getElementById('cultura').value;
    const errorDiv = document.getElementById('inputError');
    if (isNaN(areaValor) || areaValor <= 0) {
        errorDiv.style.display = 'block';
        return;
    }
    errorDiv.style.display = 'none';
    const hectares = converterParaHectares(areaValor, unidade);
    const dados = culturaDados[cultura];
    const economiaAgua = hectares * 8000 * 0.4;
    const aumentoProdutividade = dados.produtividadeBase * 0.25;
    const novaProdutividade = dados.produtividadeBase + aumentoProdutividade;
    let economiaDinheiro = 0;
    if (cultura === 'cana') economiaDinheiro = hectares * aumentoProdutividade * dados.precoTonelada;
    else economiaDinheiro = hectares * aumentoProdutividade * dados.precoSaca;
    const reducaoDefensivos = 70;
    let equivalente = economiaAgua > 1000000 ? `${(economiaAgua / 2500000).toFixed(1)} piscinas olímpicas` : `${Math.floor(economiaAgua).toLocaleString()} litros`;
    document.getElementById('economiaAgua').innerHTML = Math.floor(economiaAgua).toLocaleString('pt-BR');
    document.getElementById('economiaDinheiro').innerHTML = `R$ ${Math.floor(economiaDinheiro).toLocaleString('pt-BR')}`;
    document.getElementById('produtividade').innerHTML = `${novaProdutividade.toFixed(1)} ${dados.unidade} (+${aumentoProdutividade.toFixed(1)})`;
    document.getElementById('reducaoDefensivos').innerHTML = reducaoDefensivos;
    document.getElementById('equivalente').innerHTML = `📊 ${equivalente} de água economizada`;
    document.getElementById('resultadosArea').style.display = 'block';
    document.getElementById('resultadosArea').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function atualizarPlaceholder() {
    const unidade = document.getElementById('unidadeEntrada').value;
    const input = document.getElementById('areaHectares');
    if (unidade === 'hectare') input.placeholder = 'Ex: 10';
    else if (unidade === 'alqueire') input.placeholder = 'Ex: 4';
    else if (unidade === 'acre') input.placeholder = 'Ex: 25';
    else if (unidade === 'm2') input.placeholder = 'Ex: 100000';
}

const calcularBtn = document.getElementById('calcularBtn');
if (calcularBtn) calcularBtn.addEventListener('click', calcularImpacto);
const unidadeSelect = document.getElementById('unidadeEntrada');
if (unidadeSelect) unidadeSelect.addEventListener('change', atualizarPlaceholder);
configurarConversor();
atualizarPlaceholder();
if (document.getElementById('convHectares').value === '10') atualizarConversor('hectare', 10);

// ========== MAPA DE CALOR ==========
const canvas = document.getElementById('farmCanvas');
const ctx = canvas.getContext('2d');
const talhoes = [
    { x: 30, y: 30, w: 100, h: 100, umidade: "42%", pragas: "Baixa", produtividade: "52 sacas/ha", recomendacao: "Irrigar por 2h" },
    { x: 150, y: 30, w: 100, h: 100, umidade: "71%", pragas: "Média", produtividade: "48 sacas/ha", recomendacao: "Aplicar defensivo localizado" },
    { x: 270, y: 30, w: 100, h: 100, umidade: "33%", pragas: "Alta", produtividade: "38 sacas/ha", recomendacao: "Irrigação de emergência" },
    { x: 30, y: 150, w: 100, h: 100, umidade: "68%", pragas: "Baixa", produtividade: "55 sacas/ha", recomendacao: "Monitorar clima" },
    { x: 150, y: 150, w: 100, h: 100, umidade: "55%", pragas: "Baixa", produtividade: "50 sacas/ha", recomendacao: "Solo saudável" },
    { x: 270, y: 150, w: 100, h: 100, umidade: "81%", pragas: "Média", produtividade: "60 sacas/ha", recomendacao: "Drenagem necessária" },
    { x: 30, y: 270, w: 100, h: 100, umidade: "47%", pragas: "Baixa", produtividade: "49 sacas/ha", recomendacao: "Fertilizar" },
    { x: 150, y: 270, w: 100, h: 100, umidade: "62%", pragas: "Baixa", produtividade: "53 sacas/ha", recomendacao: "Colheita próxima" },
    { x: 270, y: 270, w: 100, h: 100, umidade: "39%", pragas: "Alta", produtividade: "35 sacas/ha", recomendacao: "Pulverização urgente" }
];

function desenharMapa() {
    talhoes.forEach(t => {
        let cor;
        const umid = parseInt(t.umidade);
        if (umid < 40) cor = '#e74c3c';
        else if (umid < 60) cor = '#f39c12';
        else cor = '#2ecc71';
        ctx.fillStyle = cor;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(t.x, t.y, t.w, t.h);
    });
}

function mostrarDadosTalhao(index) {
    const t = talhoes[index];
    document.getElementById('umidadeValor').innerText = t.umidade;
    document.getElementById('pragasValor').innerText = t.pragas;
    document.getElementById('produtividadeTalhao').innerText = t.produtividade;
    document.getElementById('recomendacao').innerText = t.recomendacao;
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    let found = -1;
    for (let i = 0; i < talhoes.length; i++) {
        const t = talhoes[i];
        if (mouseX >= t.x && mouseX <= t.x + t.w && mouseY >= t.y && mouseY <= t.y + t.h) {
            found = i;
            break;
        }
    }
    if (found !== -1) mostrarDadosTalhao(found);
});
desenharMapa();
mostrarDadosTalhao(0);

// ========== INICIALIZAR QUIZ ==========
carregarPergunta();
const nextBtn = document.getElementById('nextQuizBtn');
if (nextBtn) nextBtn.addEventListener('click', avancarQuiz);

// ========== CAMPO 3D (Three.js) ==========
import * as THREE from 'three';

function iniciarCampo3D() {
    const container = document.getElementById('canvas3d-container');
    if (!container) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a2a1a);
    scene.fog = new THREE.FogExp2(0x0a2a1a, 0.008);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(8, 5, 12);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3c9e3c, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);
    const gridHelper = new THREE.GridHelper(20, 20, 0x88ff88, 0x448844);
    gridHelper.position.y = -0.4;
    scene.add(gridHelper);
    const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x5cb85c, emissive: 0x226622, emissiveIntensity: 0.3 });
    for (let i = -4; i <= 4; i++) {
        for (let j = -2; j <= 2; j++) {
            const plant = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), plantMaterial);
            plant.position.set(i * 1.2, -0.3, j * 1.5);
            plant.castShadow = true;
            scene.add(plant);
        }
    }
    const sensorMaterial = new THREE.MeshStandardMaterial({ color: 0x1B98F5, emissive: 0x004466 });
    const sensores = [];
    for (let i = -3; i <= 3; i += 2) {
        for (let j = -1.5; j <= 1.5; j += 1.5) {
            const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.4), sensorMaterial);
            sensor.position.set(i * 1.5, -0.4, j * 1.8);
            sensor.castShadow = true;
            scene.add(sensor);
            sensores.push(sensor);
        }
    }
    const droneGroup = new THREE.Group();
    const droneBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.8), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.7 }));
    droneBody.castShadow = true;
    droneGroup.add(droneBody);
    const propellerMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const propeller1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 1.2), propellerMat);
    propeller1.position.set(0.5, 0.2, 0);
    droneGroup.add(propeller1);
    const propeller2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.1), propellerMat);
    propeller2.position.set(0, 0.2, 0.5);
    droneGroup.add(propeller2);
    const propeller3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 1.2), propellerMat);
    propeller3.position.set(-0.5, 0.2, 0);
    droneGroup.add(propeller3);
    const propeller4 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.1), propellerMat);
    propeller4.position.set(0, 0.2, -0.5);
    droneGroup.add(propeller4);
    droneGroup.position.set(2, 1.5, 2);
    scene.add(droneGroup);
    let targetTheta = 0.8, targetPhi = 0.5;
    let currentTheta = 0.8, currentPhi = 0.5;
    let dragging = false;
    const distancia = 14;
    container.addEventListener('mousedown', () => {
        dragging = true;
        container.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
        dragging = false;
        container.style.cursor = 'grab';
    });
    container.addEventListener('mousemove', (event) => {
        if (!dragging) return;
        const rect = container.getBoundingClientRect();
        const deltaX = (event.clientX - rect.left) / rect.width;
        const deltaY = (event.clientY - rect.top) / rect.height;
        targetTheta = deltaX * Math.PI * 1.5;
        targetPhi = deltaY * Math.PI / 2.5 + 0.5;
        targetPhi = Math.max(0.2, Math.min(1.2, targetPhi));
    });
    let time = 0, blink = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        blink += 0.05;
        currentTheta += (targetTheta - currentTheta) * 0.08;
        currentPhi += (targetPhi - currentPhi) * 0.08;
        const x = Math.sin(currentTheta) * Math.cos(currentPhi) * distancia;
        const z = Math.cos(currentTheta) * Math.cos(currentPhi) * distancia;
        const y = Math.sin(currentPhi) * distancia + 1;
        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);
        droneGroup.position.y = 1.5 + Math.sin(time * 1.5) * 0.2;
        droneGroup.rotation.y = Math.sin(time * 0.5) * 0.5;
        propeller1.rotation.z = time * 10;
        propeller2.rotation.x = time * 10;
        propeller3.rotation.z = time * 10;
        propeller4.rotation.x = time * 10;
        const intensity = 0.3 + Math.sin(blink * 5) * 0.2;
        sensores.forEach(s => s.material.emissiveIntensity = intensity);
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

if (document.getElementById('canvas3d-container')) iniciarCampo3D();