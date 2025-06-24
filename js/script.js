// Efeito da Navbar ao rolar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Altura em pixels antes do efeito
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Hamburger para Mobile
const navToggle = document.getElementById('nav-toggle');
const navRightUl = document.querySelector('.nav-right ul');
const navbarHeader = document.getElementById('navbar'); // Para fechar ao clicar fora

if (navToggle && navRightUl && navbarHeader) {
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique no toggle feche o menu imediatamente
        navRightUl.classList.toggle('active');
        navToggle.classList.toggle('active'); // Para animar o ícone do hamburger
    });

    // Fecha o menu se clicar em um link dentro dele (no mobile)
    const navLinks = navRightUl.querySelectorAll('li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navRightUl.classList.contains('active')) {
                navRightUl.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Fecha o menu se clicar fora da área da navbar (no mobile)
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navbarHeader.contains(event.target);
        if (!isClickInsideNav && navRightUl.classList.contains('active')) {
            navRightUl.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}


// Simulação do Formulário de Relato de Incidente
const formRelato = document.getElementById('form-relato');
const mensagemConfirmacaoRelato = document.getElementById('mensagem-confirmacao-relato');

if (formRelato && mensagemConfirmacaoRelato) {
    formRelato.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio real do formulário

        // Simula um pequeno atraso, como se estivesse processando
        setTimeout(() => {
            mensagemConfirmacaoRelato.style.display = 'block';
            formRelato.reset(); // Limpa o formulário

            // Esconde a mensagem de confirmação depois de alguns segundos
            setTimeout(() => {
                mensagemConfirmacaoRelato.style.display = 'none';
            }, 5000); // 5 segundos
        }, 300); // Pequeno atraso
    });
}


function simularNotificacao(mensagem, tipo = 'info') { // tipo pode ser 'info', 'sucesso', 'erro'
    const notificacaoExistente = document.querySelector('.notificacao-simulada');
    if (notificacaoExistente) { // Remove notificação anterior se houver
        notificacaoExistente.remove();
    }

    const notificacaoDiv = document.createElement('div');
    notificacaoDiv.classList.add('notificacao-simulada', `notificacao-${tipo}`);
    
    let iconeHtml = '';
    if (tipo === 'info') iconeHtml = '<i class="fas fa-info-circle" style="margin-right: 10px;"></i>';
    if (tipo === 'sucesso') iconeHtml = '<i class="fas fa-check-circle" style="margin-right: 10px;"></i>';
    if (tipo === 'erro') iconeHtml = '<i class="fas fa-exclamation-circle" style="margin-right: 10px;"></i>';

    notificacaoDiv.innerHTML = `${iconeHtml}<p>${mensagem}</p><button class="notificacao-fechar">×</button>`;
    document.body.appendChild(notificacaoDiv);

    // Força reflow para garantir que a transição ocorra
    void notificacaoDiv.offsetWidth; 

    // Mostrar a notificação
    notificacaoDiv.classList.add('visivel');

    const fecharBtn = notificacaoDiv.querySelector('.notificacao-fechar');
    fecharBtn.onclick = () => {
        notificacaoDiv.classList.remove('visivel');
        setTimeout(() => notificacaoDiv.remove(), 500); // Remove após transição de saída
    };

    // Remover automaticamente após alguns segundos
    setTimeout(() => {
        if (notificacaoDiv.classList.contains('visivel')) {
            notificacaoDiv.classList.remove('visivel');
            setTimeout(() => {
                if (notificacaoDiv.parentElement) { // Verifica se ainda existe antes de remover
                    notificacaoDiv.remove();
                }
            }, 500);
        }
    }, 7000); // 7 segundos para a notificação ficar visível
}

// Inicialização do Mapa OpenStreetMap com Leaflet JS
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        simularNotificacao('<strong>Novo Alerta!</strong> Risco moderado de alagamento na Região Sul. <a href="#mapa-alertas-section" style="color: inherit; text-decoration: underline;">Ver detalhes</a>', 'info');
    }, 7000); // 7 segundos após o carregamento da página


    const mapaElement = document.getElementById('mapa-pharos');
    console.log(mapaElement);
    if (mapaElement) {
        // Coordenadas de Santos, SP (Exemplo) e Zoom inicial
        // Para encontrar coordenadas: vá no Google Maps, clique com o botão direito no local, a primeira opção são as coordenadas.
        const coordenadasIniciais = [-23.9608, -46.3339]; // Ex: Centro de Santos
        const zoomInicial = 13;

        // Remove o texto "Carregando mapa..." se ele ainda existir
        mapaElement.innerHTML = '';

        console.log("Inicializando mapa...");
        const map = L.map('mapa-pharos').setView(coordenadasIniciais, zoomInicial);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adicionar Marcadores Simulados
        // Ícones customizados (opcional, mas deixa mais parecido com o app)
        const iconRiscoAlto = L.icon({
            iconUrl: 'imagens/marker-pin-red.png',
            iconSize: [45, 45], // tamanho do ícone
            iconAnchor: [15, 40], // ponto do ícone que corresponderá à localização do marcador
            popupAnchor: [0, -40] // ponto a partir do qual o popup deve abrir em relação ao iconAnchor
        });
        const iconRiscoModerado = L.icon({
            iconUrl: 'imagens/marker-pin-yellow.png',
            iconSize: [37, 37],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
         const iconPontoApoio = L.icon({
            iconUrl: 'imagens/marker-pin-blue.png',
            iconSize: [33, 33],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });


        // Marcador 1: Enchente (Risco Alto)
        L.marker([-23.9695, -46.3330], { icon: iconRiscoAlto }) // Posição Exemplo
            .addTo(map)
            .bindPopup("<b>ALERTA DE ENCHENTE!</b><br>Rua João Pessoa - Risco Alto.<br>Evite a área. Procure locais elevados.");

        // Marcador 2: Deslizamento (Risco Moderado)
        L.marker([-23.9450, -46.3000], { icon: iconRiscoModerado }) // Posição Exemplo - Morro Santa Teresinha
            .addTo(map)
            .bindPopup("<b>Risco de Deslizamento</b><br>Morro Santa Teresinha - Risco Moderado.<br>Atenção ao solo instável.");

        // Marcador 3: Ponto de Abrigo
        L.marker([-23.9550, -46.3200], { icon: iconPontoApoio }) // Posição Exemplo
            .addTo(map)
            .bindPopup("<b>Ponto de Abrigo Seguro</b><br>Ginásio Municipal.<br>Vagas disponíveis.");

        // Marcador 4: Hospital
         L.marker([-23.9600, -46.3450], { icon: iconPontoApoio }) // Posição Exemplo
            .addTo(map)
            .bindPopup("<b>Hospital de Referência</b><br>Pronto atendimento 24h.");

    } else {
        console.warn("Elemento do mapa 'mapa-pharos' não encontrado.");
    }
})

// Simulação de Cadastro
const formCadastro = document.getElementById('form-cadastro');
const cadastroMsgSucesso = document.getElementById('cadastro-mensagem-sucesso');
const cadastroMsgErro = document.getElementById('cadastro-mensagem-erro'); // Para futuros erros

if (formCadastro) {
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        const senha = document.getElementById('cadastro-senha').value;
        const confirmaSenha = document.getElementById('cadastro-confirma-senha').value;
        const aceiteTermos = document.getElementById('aceite-termos').checked;

        if (cadastroMsgErro) cadastroMsgErro.style.display = 'none'; // Esconde erro anterior
        if (cadastroMsgSucesso) cadastroMsgSucesso.style.display = 'none';


        if (!aceiteTermos) {
            if(cadastroMsgErro) {
                cadastroMsgErro.textContent = 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.';
                cadastroMsgErro.style.display = 'block';
            }
            return;
        }

        if (senha !== confirmaSenha) {
            if(cadastroMsgErro) {
                cadastroMsgErro.textContent = 'As senhas não coincidem.';
                cadastroMsgErro.style.display = 'block';
            }
            return;
        }

        // Simulação de sucesso
        if(cadastroMsgSucesso) {
            cadastroMsgSucesso.textContent = 'Cadastro realizado com sucesso! (Simulação). Você já pode fazer o login.';
            cadastroMsgSucesso.style.display = 'block';
        }
        formCadastro.reset();

        setTimeout(() => {
            if(cadastroMsgSucesso) cadastroMsgSucesso.style.display = 'none';
            // Opcional: redirecionar para a página de login
            // window.location.href = 'login.html';
        }, 4000);
    });
}

// Simulação de Login
const formLogin = document.getElementById('form-login');
const loginMsgErro = document.getElementById('login-mensagem-erro');

if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        if(loginMsgErro) loginMsgErro.style.display = 'none';

        // SIMULAÇÃO: Aceita qualquer e-mail/senha por enquanto, ou defina um par "correto"
        // if (email === "usuario@pharos.com" && senha === "123456") {
        if (email && senha) { // Aceita qualquer coisa preenchida por enquanto
            // Simular login bem-sucedido
            localStorage.setItem('usuarioPharosLogado', 'true'); // Simples flag
            localStorage.setItem('nomeUsuarioPharos', email.split('@')[0]); // Pega nome antes do @

            // Chama a função de notificação que já criamos
            simularNotificacao(`Login bem-sucedido! Bem-vindo(a) de volta, ${email.split('@')[0]}! (Simulação)`, 'sucesso');

            // Redireciona para a página principal após um pequeno delay para a notificação ser vista
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            if(loginMsgErro) {
                loginMsgErro.textContent = 'E-mail ou senha inválidos. (Simulação)';
                loginMsgErro.style.display = 'block';
            }
        }
    });
}

// Atualizar Navbar se usuário estiver "logado" (simulação)
// Este código deve rodar em todas as páginas que têm a navbar
function verificarEstadoLoginNavbar() {
    const usuarioLogado = localStorage.getItem('usuarioPharosLogado');
    const nomeUsuario = localStorage.getItem('nomeUsuarioPharos');
    const btnLoginNavElement = document.querySelector('.nav-right ul li a.btn-login-nav'); // Elemento do link de login

    if (btnLoginNavElement) { // Verifica se o elemento existe
        if (usuarioLogado === 'true' && nomeUsuario) {
            btnLoginNavElement.textContent = `Olá, ${nomeUsuario}`; // Ou "Minha Conta"
            btnLoginNavElement.href = "#"; // Ou para uma página de perfil (ex: perfil.html)
            // Adicionar opção de Logout
            let listItem = btnLoginNavElement.parentElement; // Pega o <li> pai
            if (!listItem.querySelector('.btn-logout-nav')) { // Evita adicionar múltiplos botões de logout
                const logoutLi = document.createElement('li');
                const logoutA = document.createElement('a');
                logoutA.href = "#";
                logoutA.textContent = "Sair";
                logoutA.classList.add('btn-logout-nav'); // Para estilização se necessário
                logoutA.onclick = (e) => {
                    e.preventDefault();
                    localStorage.removeItem('usuarioPharosLogado');
                    localStorage.removeItem('nomeUsuarioPharos');
                    simularNotificacao('Logout realizado com sucesso!', 'info');
                    // Força recarregamento ou redireciona para home/login para atualizar navbar
                    setTimeout(() => window.location.href = 'index.html', 1000);
                };
                logoutLi.appendChild(logoutA);
                listItem.parentElement.appendChild(logoutLi); // Adiciona <li> com link de logout à <ul>
            }
        } else {
            // Garante que o botão de login esteja como padrão se não estiver logado
            btnLoginNavElement.textContent = 'Login';
            btnLoginNavElement.href = 'login.html';
            // Remove botão de logout se existir
            const logoutBtn = document.querySelector('.nav-right ul li .btn-logout-nav');
            if (logoutBtn && logoutBtn.parentElement.tagName === 'LI') {
                logoutBtn.parentElement.remove();
            }
        }
    }
}

// Chamar a função para verificar o login quando o DOM estiver pronto em todas as páginas
document.addEventListener('DOMContentLoaded', verificarEstadoLoginNavbar);