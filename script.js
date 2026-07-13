document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Menu Mobile Hambúrguer
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em algum link em mobile
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 2. Transição do Header ao Rolagem (Scroll)
  // ==========================================================================
  const header = document.querySelector('.header');
  const scrollThreshold = 80;

  const handleScroll = () => {
    if (header) {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Executar uma vez no carregamento para caso comece com scroll
  handleScroll();

  // ==========================================================================
  // 3. Animações de Entrada (Reveal Scroll Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Desobservar após animar
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // ativa quando 15% do elemento estiver visível
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ==========================================================================
  // 4. Validação e Redirecionamento do Formulário de Contato (WhatsApp)
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');

      let isValid = true;

      // Resetar estilos de erro anteriores
      [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.style.borderColor = '';
      });

      // Validação do Nome
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = '#ff4d4d';
        isValid = false;
      }

      // Validação simples de E-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.style.borderColor = '#ff4d4d';
        isValid = false;
      }

      // Validação de Telefone
      if (!phoneInput.value.trim()) {
        phoneInput.style.borderColor = '#ff4d4d';
        isValid = false;
      }

      // Validação de Mensagem
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = '#ff4d4d';
        isValid = false;
      }

      if (!isValid) {
        alert('Por favor, preencha corretamente todos os campos destacados em vermelho.');
        return;
      }

      // Formatar texto para o WhatsApp
      const whatsappNumber = '5511914548956'; // Número oficial da LCO
      const text = `Olá, me chamo *${nameInput.value.trim()}*.\n\n` +
                   `*E-mail:* ${emailInput.value.trim()}\n` +
                   `*Telefone:* ${phoneInput.value.trim()}\n` +
                   `*Mensagem:* ${messageInput.value.trim()}`;
      
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Exibir overlay de carregamento e sucesso
      const submitOverlay = document.getElementById('submitOverlay');
      if (submitOverlay) {
        submitOverlay.classList.add('active');
      }

      // Redirecionar com atraso de 1.5s
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        contactForm.reset();
        if (submitOverlay) {
          submitOverlay.classList.remove('active');
        }
      }, 1500);
    });
  }

  // ==========================================================================
  // 5. Lógica dos Painéis Deslizantes Horizontais (Página de Atuação)
  // ==========================================================================
  const panesContainer = document.querySelector('.panes');
  if (panesContainer) {
    const paneItems = panesContainer.querySelectorAll('.panes__item');
    const totalPanes = paneItems.length;
    const triggerWidth = 80; // largura do trigger vertical

    const updatePanesLayout = (activeIndex) => {
      paneItems.forEach((item, index) => {
        if (index <= activeIndex) {
          // Painéis até o ativo ficam posicionados à esquerda
          item.style.left = `${index * triggerWidth}px`;
        } else {
          // Painéis após o ativo são empurrados para a direita
          item.style.left = `calc(100% - ${(totalPanes - index) * triggerWidth}px)`;
        }

        // Ajustar largura e classe ativa
        if (index === activeIndex) {
          item.style.width = `calc(100% - ${(totalPanes - 1) * triggerWidth}px)`;
          item.classList.add('active');
        } else {
          item.style.width = `100%`; // Permite ocupar o container mas é clipado pelo absolute left
          item.classList.remove('active');
        }
      });
    };

    // Inicializar no primeiro painel
    updatePanesLayout(0);

    // Adicionar eventos de clique nos triggers
    paneItems.forEach((item, index) => {
      const trigger = item.querySelector('.panes__vertical-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          updatePanesLayout(index);
        });
      }
    });
  }

  // ==========================================================================
  // 6. Efeito Parallax Sutil no Hero Imersivo (index.html)
  // ==========================================================================
  const heroBg = document.querySelector('.hero-immersive__bg img');
  if (heroBg) {
    // Escala inicial para evitar bordas brancas durante a translação
    heroBg.style.transform = 'scale(1.1)';
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Aplica translação suave no sentido contrário da rolagem
      heroBg.style.transform = `scale(1.1) translateY(${scrollY * -0.12}px)`;
    });
  }

});
