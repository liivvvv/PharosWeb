// === efeito da navbar ao rolar ===
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Altura em pixels antes do efeito
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// === menu hamburger para mobile ===
const navToggle = document.getElementById('nav-toggle');
const navRightUl = document.querySelector('.nav-right ul');
const navbarHeader = document.getElementById('navbar');

if (navToggle && navRightUl && navbarHeader) {
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        navRightUl.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    const navLinks = navRightUl.querySelectorAll('li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navRightUl.classList.contains('active')) {
                navRightUl.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideNav = navbarHeader.contains(event.target);
        if (!isClickInsideNav && navRightUl.classList.contains('active')) {
            navRightUl.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}


// === simulação do formulário de relato de incidente ===
const formRelato = document.getElementById('form-relato');
const mensagemConfirmacaoRelato = document.getElementById('mensagem-confirmacao-relato');

if (formRelato && mensagemConfirmacaoRelato) {
    formRelato.addEventListener('submit', function(event) {
        event.preventDefault();

        setTimeout(() => {
            mensagemConfirmacaoRelato.style.display = 'block';
            formRelato.reset(); 

            setTimeout(() => {
                mensagemConfirmacaoRelato.style.display = 'none';
            }, 5000);
        }, 300);
    });
}


// === simulação de notificação ===
function simularNotificacao(mensagem, tipo = 'info') { // tipo pode ser 'info', 'sucesso', 'erro'
    const notificacaoExistente = document.querySelector('.notificacao-simulada');
    if (notificacaoExistente) { 
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

    void notificacaoDiv.offsetWidth; 

    notificacaoDiv.classList.add('visivel');

    const fecharBtn = notificacaoDiv.querySelector('.notificacao-fechar');
    fecharBtn.onclick = () => {
        notificacaoDiv.classList.remove('visivel');
        setTimeout(() => notificacaoDiv.remove(), 500); 
    };

    setTimeout(() => {
        if (notificacaoDiv.classList.contains('visivel')) {
            notificacaoDiv.classList.remove('visivel');
            setTimeout(() => {
                if (notificacaoDiv.parentElement) { 
                    notificacaoDiv.remove();
                }
            }, 500);
        }
    }, 10000); 
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    simularNotificacao(
      '<strong>Novo alerta!</strong> Risco alto de deslizamento no Morro dos Ventos Uivantes! <a href="#mapa-alertas-section" style="color: inherit; text-decoration: underline;">Ver detalhes</a>', 'erro');
  }, 35000);
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        simularNotificacao('<strong>Novo alerta!</strong> Risco moderado de alagamento na Região Sul. <a href="#mapa-alertas-section" style="color: inherit; text-decoration: underline;">Ver detalhes</a>', 'info');
    }, 13000);


    const mapaElement = document.getElementById('mapa-pharos');
    console.log(mapaElement);
    if (mapaElement) {
        const coordenadasIniciais = [-23.9608, -46.3339]; // Santos, SP
        const zoomInicial = 13;

        mapaElement.innerHTML = '';

        console.log("Inicializando mapa...");
        const map = L.map('mapa-pharos').setView(coordenadasIniciais, zoomInicial);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // marcadores simulados
        const iconRiscoAlto = L.icon({
            iconUrl: 'imagens/marker-pin-red.png',
            iconSize: [45, 45], // tamanho do ícone
            iconAnchor: [15, 40], // ponto do ícone que corresponderá à localização do marcador
            popupAnchor: [0, -40] // ponto a partir do qual o popup deve abrir em relação ao iconAnchor
        });
        const iconRiscoModerado = L.icon({
            iconUrl: 'imagens/marker-pin-yellow.png',
            iconSize: [44, 44],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        const iconPontoApoio = L.icon({
            iconUrl: 'imagens/marker-pin-blue.png',
            iconSize: [30, 30],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        const iconRiscoBaixo = L.icon({
            iconUrl: 'imagens/marker-pin-green.png',
            iconSize: [43, 43],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        const iconSocorro = L.icon({
            iconUrl: 'imagens/marker-pin-white-red-cross.png',
            iconSize: [30, 30],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        const iconComida = L.icon({
            iconUrl: 'imagens/marker-pin-food.png',
            iconSize: [40, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        const iconEnergia = L.icon({
            iconUrl: 'imagens/marker-pin-bolt.png',
            iconSize: [40, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });


        // marcador 1: enchente
        L.marker([-23.9695, -46.3330], { icon: iconRiscoAlto })
            .addTo(map)
            .bindPopup("<b>ALERTA DE ENCHENTE!</b><br>Rua das Palmeiras - Risco Alto.<br>Evite a área. Procure locais elevados.");

        // marcador 2: deslizamento
        L.marker([-23.9450, -46.3000], { icon: iconRiscoModerado }) 
            .addTo(map)
            .bindPopup("<b>Risco de Deslizamento</b><br>Morro da Esperança - Risco Moderado.<br>Atenção ao solo instável.");

        // marcador 3: ponto de abrigo
        L.marker([-23.9550, -46.3200], { icon: iconPontoApoio })
            .addTo(map)
            .bindPopup("<b>Ponto de Abrigo Seguro</b><br>Ginásio Municipal.<br>Vagas disponíveis.");

        // marcador 4: hospital
         L.marker([-23.9605, -46.3460], { icon: iconPontoApoio }) 
            .addTo(map)
            .bindPopup("<b>Hospital de Referência</b><br>Pronto atendimento 24h.");

        // marcador 5: vento moderado
        L.marker([-23.9260, -46.3430], { icon: iconRiscoBaixo })
            .addTo(map)
            .bindPopup("<b>Alerta de Vento Moderado</b><br>Bairro Jardim das Orquídeas - Risco Baixo.<br>Possíveis quedas de galhos.");

        // marcador 6: posto de socorro
        L.marker([-23.5874, -46.5847], { icon: iconSocorro })
            .addTo(map)
            .bindPopup("<b>Posto de Socorro</b><br>Unidade Básica de Saúde Central.<br>Atendimento 24h para primeiros socorros.");

        // marcador 7: ponto de distribuição de alimentos
        L.marker([-23.6486, -46.6353], { icon: iconComida })
            .addTo(map)
            .bindPopup("<b>Ponto de Distribuição de Alimentos</b><br>Centro Comunitário Vila Nova.<br>Refeições e água disponíveis.");

        // marcador 8: inspetor de energia
        L.marker([-23.5519, -46.7036], { icon: iconEnergia })
            .addTo(map)
            .bindPopup("<b>Aviso: Falta de Energia</b><br>Rua das Acácias.<br>Equipe de manutenção a caminho.");

        // enchente - Guarulhos
        L.marker([-23.4546, -46.5333], { icon: iconRiscoAlto })
            .addTo(map)
            .bindPopup("<b>Alerta de Enchente</b><br>Guarulhos Centro – Risco Alto.<br>Evacue áreas baixas.");

        // deslizamento – São Bernardo
        L.marker([-23.6896, -46.5649], { icon: iconRiscoModerado })
            .addTo(map)
            .bindPopup("<b>Risco de Deslizamento</b><br>S. Bernardo – Risco Moderado.<br>Atenção ao solo instável.");

        // ponto de abrigo seguro – Santo André
        L.marker([-23.6637, -46.5388], { icon: iconPontoApoio })
            .addTo(map)
            .bindPopup("<b>Ponto de Abrigo Seguro</b><br>S. André Ginásio Poliesportivo.<br>Vagas disponíveis.");

        // hospital de referência – Itaquera
        L.marker([-23.5925, -46.4781], { icon: iconPontoApoio })
            .addTo(map)
            .bindPopup("<b>Hospital de Referência</b><br>Itaquera – Pronto Atendimento 24h.");

        // Brasília – Cheias no Lago Paranoá
        L.marker([-15.7955, -47.8828], { icon: iconRiscoAlto })
            .addTo(map)
            .bindPopup("<b>Alerta de Cheias</b><br>Lago Paranoá – Risco Alto.<br>Evacuar margem do lago.");

        // Rio de Janeiro – Deslizamento em Santa Teresa
        L.marker([-22.9098, -43.1836], { icon: iconRiscoModerado })
            .addTo(map)
            .bindPopup("<b>Risco de Deslizamento</b><br>Santa Teresa – Risco Moderado.<br>Solo encharcado.");

        // Belo Horizonte – Vento Forte na Pampulha
        L.marker([-19.8207, -43.9542], { icon: iconRiscoBaixo })
            .addTo(map)
            .bindPopup("<b>Alerta de Vento Forte</b><br>Pampulha – Risco Baixo.<br>Rajadas de até 60 km/h.");

        // Porto Alegre – Posto de Socorro na Redenção
        L.marker([-30.0346, -51.2177], { icon: iconSocorro })
            .addTo(map)
            .bindPopup("<b>Posto de Socorro</b><br>Parque da Redenção UBS.<br>Atendimento 24h.");

        // Salvador – Distribuição de Água Potável em Itapuã
        L.marker([-12.9798, -38.5011], { icon: iconComida })
            .addTo(map)
            .bindPopup("<b>Ponto de Distribuição de Água</b><br>Itapuã – Centro Comunitário.<br>Água potável disponível.");

        // Fortaleza – Aviso de Falta de Energia no Meireles
        L.marker([-3.7319, -38.5267], { icon: iconEnergia })
            .addTo(map)
            .bindPopup("<b>Aviso: Falta de Energia</b><br>Meireles – Manutenção em andamento.");

        // Manaus – Alerta de Inundações no Centro Histórico
        L.marker([-3.1186, -60.0212], { icon: iconRiscoAlto })
            .addTo(map)
            .bindPopup("<b>Alerta de Inundações</b><br>Centro Histórico – Risco Alto.<br>Procure áreas mais altas.");

        // Curitiba – Risco de Vendaval na Praça Tiradentes
        L.marker([-25.4284, -49.2733], { icon: iconRiscoModerado })
            .addTo(map)
            .bindPopup("<b>Risco de Vendaval</b><br>Praça Tiradentes – Risco Moderado.<br>Proteja-se de possíveis destelhamentos.");

        // Recife – Ponto de Abrigo no Bairro do Recife
        L.marker([-8.0638, -34.8711], { icon: iconPontoApoio })
            .addTo(map)
            .bindPopup("<b>Ponto de Abrigo Seguro</b><br>Bairro do Recife – Igreja Matriz.<br>Vagas abertas.");

        // Belém – Posto de Socorro em Nazaré
        L.marker([-1.4558, -48.5039], { icon: iconSocorro })
            .addTo(map)
            .bindPopup("<b>Posto de Socorro</b><br>Nazaré UBS.<br>Atendimento prioritário.");

        // Porto Velho – Distribuição de Kits de Emergência
        L.marker([-8.7616, -63.9036], { icon: iconComida })
            .addTo(map)
            .bindPopup("<b>Distribuição de Kits</b><br>Centro – Secretaria de Assistência Social.");

        // Florianópolis – Falta de Energia
        L.marker([-27.5976, -48.5495], { icon: iconEnergia })
            .addTo(map)
            .bindPopup("<b>Aviso: Falta de Energia</b><br>Beira-Mar Norte<br>Equipe de manutenção a caminho.");

    } else {
        console.warn("Elemento do mapa 'mapa-pharos' não encontrado.");
    }
})


// === simulação de cadastro ===
const formCadastro = document.getElementById('form-cadastro');
const cadastroMsgSucesso = document.getElementById('cadastro-mensagem-sucesso');
const cadastroMsgErro = document.getElementById('cadastro-mensagem-erro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        const senha = document.getElementById('cadastro-senha').value;
        const confirmaSenha = document.getElementById('cadastro-confirma-senha').value;
        const aceiteTermos = document.getElementById('aceite-termos').checked;

        if (cadastroMsgErro) cadastroMsgErro.style.display = 'none'; 
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

        // simulação de sucesso
        if(cadastroMsgSucesso) {
            cadastroMsgSucesso.textContent = 'Cadastro realizado com sucesso! (Simulação). Você já pode fazer o login.';
            cadastroMsgSucesso.style.display = 'block';
        }
        formCadastro.reset();

        setTimeout(() => {
            if(cadastroMsgSucesso) cadastroMsgSucesso.style.display = 'none';
            window.location.href = 'login.html';
        }, 2000);
    });
}


// === simulação de login ===
const formLogin = document.getElementById('form-login');
const loginMsgErro = document.getElementById('login-mensagem-erro');

if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        if(loginMsgErro) loginMsgErro.style.display = 'none';

        // if (email === "usuario@pharos.com" && senha === "123456") {
        if (email && senha) { 
            localStorage.setItem('usuarioPharosLogado', 'true'); 
            localStorage.setItem('nomeUsuarioPharos', email.split('@')[0]);

            simularNotificacao(`Login bem-sucedido! Bem-vindo(a) de volta, ${email.split('@')[0]}! (Simulação)`, 'sucesso');

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


// === perfil ===
function carregarDadosPerfil() {
    const nomeUsuarioElemento = document.getElementById('nome-usuario-perfil');
    if (nomeUsuarioElemento) {
        const nomeUsuario = localStorage.getItem('nomeUsuarioPharos');
        
        if (nomeUsuario) {
            nomeUsuarioElemento.textContent = nomeUsuario;
        } else {
            window.location.href = 'login.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', carregarDadosPerfil);

const btnLogoutPerfil = document.getElementById('btn-logout-perfil');
if (btnLogoutPerfil) {
    btnLogoutPerfil.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioPharosLogado');
        localStorage.removeItem('nomeUsuarioPharos');
        simularNotificacao('Logout realizado com sucesso!', 'info');
        setTimeout(() => window.location.href = 'index.html', 1000);
    });
}

function verificarEstadoLoginNavbar() {
    const usuarioLogado = localStorage.getItem('usuarioPharosLogado');
    const nomeUsuario = localStorage.getItem('nomeUsuarioPharos');
    const btnLoginNavElement = document.querySelector('.nav-right ul li a[href="login.html"]'); 
    const btnMinhaContaElement = document.querySelector('.nav-right ul li a[href="perfil.html"]'); 
    let linkElement = btnLoginNavElement || btnMinhaContaElement;


    if (linkElement) {
        if (usuarioLogado === 'true' && nomeUsuario) {
            linkElement.textContent = `Olá, ${nomeUsuario}`;
            linkElement.href = "perfil.html"; 
            linkElement.classList.remove('btn-login-nav'); 

            // adiciona botão de sair
            const logoutBtnExistente = document.querySelector('.btn-logout-nav');
            if (!logoutBtnExistente) {
                const logoutLi = document.createElement('li');
                logoutLi.innerHTML = `<a href="#" class="btn-logout-nav">Sair</a>`;
                linkElement.closest('ul').appendChild(logoutLi);

                logoutLi.querySelector('.btn-logout-nav').onclick = (e) => {
                    e.preventDefault();
                    localStorage.removeItem('usuarioPharosLogado');
                    localStorage.removeItem('nomeUsuarioPharos');
                    window.location.href = 'index.html';
                };
            }

        } else {
            linkElement.textContent = 'Login';
            linkElement.href = 'login.html';
            linkElement.classList.add('btn-login-nav');
            
            const logoutBtn = document.querySelector('.btn-logout-nav');
            if (logoutBtn && logoutBtn.parentElement) {
                logoutBtn.parentElement.remove();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', verificarEstadoLoginNavbar);


// === acordeão FAQ ===
function setupFaqAcordeao() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta');

            if (pergunta) {
                pergunta.addEventListener('click', () => {
                    const estaAberto = item.classList.contains('aberto');
                    // faqItems.forEach(i => i.classList.remove('aberto'));
                    if (!estaAberto) {
                        item.classList.add('aberto');
                    } else {
                        item.classList.remove('aberto');
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', setupFaqAcordeao);


// === abas fórum ===
function setupForumAbas() {
    const abasContainer = document.querySelector('.forum-abas');
    if (!abasContainer) return; 

    const abas = abasContainer.querySelectorAll('.aba-forum');
    const conteudos = document.querySelectorAll('.conteudo-aba');

    abas.forEach(aba => {
        aba.addEventListener('click', () => {
            abas.forEach(a => a.classList.remove('ativa'));
            conteudos.forEach(c => c.classList.remove('ativo'));

            aba.classList.add('ativa');

            const targetId = aba.dataset.aba;
            const targetConteudo = document.getElementById('aba-' + targetId);

            if (targetConteudo) {
                targetConteudo.classList.add('ativo');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupForumAbas);