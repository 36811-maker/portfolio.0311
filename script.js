/**
 * ============================================================================
 * PORTFÓLIO PESSOAL — EMILLY BARBOSA
 * Interatividades e Lógica em JavaScript Puro (Vanilla JS)
 * Regras: Sem frameworks, código semântico, performático e acessível.
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * 1. EFEITO GLOW QUE ACOMPANHA O CURSOR (Inspiração Studio Nikita)
   * -------------------------------------------------------------------------- */
  const interactiveGlow = document.getElementById('interactiveGlow');

  if (interactiveGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        interactiveGlow.style.opacity = '1';
        requestAnimationFrame(updateGlowPosition);
      }
    });

    function updateGlowPosition() {
      const ease = 0.12;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      interactiveGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

      if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
        requestAnimationFrame(updateGlowPosition);
      } else {
        isMoving = false;
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 2. HEADER FIXO, SCROLL SPY & MENU MOBILE
   * -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header encolhe e ganha blur ao rolar
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Menu Hambúrguer para telas menores
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha menu ao clicar em um link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Spy: Destaca o link ativo da seção atual
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 220;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* --------------------------------------------------------------------------
   * 3. ROLAGEM SUAVE DOS BOTÕES E LINKS DE ÂNCORA
   * -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 4. EFEITO MAGNÉTICO NO BOTÃO CTA DO HERO (Inspiração Elespacio)
   * -------------------------------------------------------------------------- */
  const btnExplore = document.getElementById('btnExplore');
  if (btnExplore && window.matchMedia('(pointer: fine)').matches) {
    btnExplore.addEventListener('mousemove', (e) => {
      const rect = btnExplore.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btnExplore.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px) translateY(-3px) scale(1.02)`;
    });

    btnExplore.addEventListener('mouseleave', () => {
      btnExplore.style.transform = '';
    });
  }

  /* --------------------------------------------------------------------------
   * 5. ANIMAÇÕES DE ROLAGEM / REVEAL (Inspiração Sphere Digital)
   * -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback para navegadores legados
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  /* --------------------------------------------------------------------------
   * 6. CARDS 3D FLIP INTERATIVOS (Inspiração Studio Nikita)
   * Suporte para toque em celulares e tablets
   * -------------------------------------------------------------------------- */
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 7. BASE DE DADOS DOS PROJETOS & MODAL DINÂMICO (John Gearhart & Nikita)
   * -------------------------------------------------------------------------- */
  const projectsData = {
    'batalha-pokemon': {
      title: 'Batalha Pokémon',
      tag: 'Web Game Interativo',
      imgSrc: 'img/projetos/batalha-pokemon.jpg',
      imgAlt: 'Capa ilustrativa do jogo Batalha Pokémon com Pikachu e Mewtwo',
      desc: 'O Batalha Pokémon é um jogo interativo desenvolvido para navegador, no qual os jogadores podem escolher seus Pokémon, enfrentar adversários e participar de diferentes modos de jogo, como Aventura e Desafio de Chefes. O projeto conta com batalhas estratégicas, habilidades especiais, vantagens entre tipos, sistema de conquistas, missões, recompensas e desbloqueio de novos Pokémon.',
      goal: 'Proporcionar uma experiência divertida e dinâmica, unindo programação, criatividade e elementos do universo Pokémon.',
      technologies: [
        { name: 'HTML5', desc: 'Estruturação semântica de todas as telas, arenas e componentes.' },
        { name: 'CSS3', desc: 'Identidade visual temática, estilização responsiva e animações de batalha.' },
        { name: 'JavaScript', desc: 'Lógica por turnos, cálculo de vantagens elementais, IA do adversário e interatividade.' },
        { name: 'LocalStorage', desc: 'Salvamento persistente do progresso, conquistas e moedas do jogador diretamente no navegador.' }
      ],
      githubUrl: 'https://github.com/36811-maker/atualiza-o-do-jogo'
    },
    'pokemon-cards': {
      title: 'Pokémon Cards',
      tag: 'Cards 3D Colecionáveis',
      imgSrc: 'img/projetos/pokemon-cards.jpg',
      imgAlt: 'Capa ilustrativa do site Pokémon Cards com cartas 3D de Pikachu, Charizard e Mewtwo',
      desc: 'O Pokémon Cards é um site interativo desenvolvido utilizando HTML, CSS e JavaScript, que apresenta cards temáticos de Pokémon em um estilo visual 3D. Cada card contém imagens, descrições e diversas informações sobre os personagens, como características, tipos e habilidades. O projeto conta com efeitos visuais, animações e interatividade, proporcionando uma experiência dinâmica inspirada nas tradicionais cartas colecionáveis de Pokémon.',
      goal: 'Apresentar informações sobre diferentes Pokémon de maneira visual, interativa e criativa, utilizando o conceito de cartas colecionáveis.',
      technologies: [
        { name: 'HTML5', desc: 'Estruturação do catálogo de cards e painéis informativos.' },
        { name: 'CSS3', desc: 'Efeitos 3D de profundidade (perspective, rotateX/Y), brilhos holográficos e animações.' },
        { name: 'JavaScript', desc: 'Manipulação do DOM, interatividade na rotação dos cards e filtros dinâmicos.' }
      ],
      githubUrl: 'https://github.com/36811-maker/pokemon.cards'
    }
  };

  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalClose = document.getElementById('projectModalClose');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const modalProjectImg = document.getElementById('modalProjectImg');
  const modalProjectTag = document.getElementById('modalProjectTag');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectDesc = document.getElementById('modalProjectDesc');
  const modalProjectGoal = document.getElementById('modalProjectGoal');
  const modalProjectTechList = document.getElementById('modalProjectTechList');
  const modalProjectGithubLink = document.getElementById('modalProjectGithubLink');

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !projectModalBackdrop) return;

    modalProjectImg.src = project.imgSrc;
    modalProjectImg.alt = project.imgAlt;
    modalProjectTag.textContent = project.tag;
    modalProjectTitle.textContent = project.title;
    modalProjectDesc.textContent = project.desc;
    modalProjectGoal.textContent = project.goal;
    modalProjectGithubLink.href = project.githubUrl;

    // Popula lista de tecnologias
    modalProjectTechList.innerHTML = '';
    project.technologies.forEach((tech) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${tech.name}:</strong> ${tech.desc}`;
      modalProjectTechList.appendChild(li);
    });

    projectModalBackdrop.classList.add('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModalBackdrop) return;
    projectModalBackdrop.classList.remove('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Ouvinte nos botões de detalhes dos cards
  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeProjectModal);

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalBackdrop && projectModalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* --------------------------------------------------------------------------
   * 8. VALIDAÇÃO DO FORMULÁRIO DE CONTATO (Vanilla JS)
   * -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userSubject = document.getElementById('userSubject');
  const userMessage = document.getElementById('userMessage');
  const formAlert = document.getElementById('formAlert');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Validação simples de formato de e-mail
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(input, errorElement, message) {
    input.classList.add('is-invalid');
    errorElement.textContent = message;
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove('is-invalid');
    errorElement.textContent = '';
  }

  // Limpa mensagens de erro em tempo real ao digitar
  [userName, userEmail, userSubject, userMessage].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const errSpan = input.parentElement.querySelector('.form-error');
        if (errSpan) errSpan.textContent = '';
        if (formAlert) formAlert.style.display = 'none';
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validação do Nome
      if (!userName.value.trim()) {
        setFieldError(userName, nameError, 'Por favor, informe seu nome.');
        isValid = false;
      } else if (userName.value.trim().length < 3) {
        setFieldError(userName, nameError, 'O nome deve ter no mínimo 3 caracteres.');
        isValid = false;
      } else {
        clearFieldError(userName, nameError);
      }

      // Validação do E-mail
      if (!userEmail.value.trim()) {
        setFieldError(userEmail, emailError, 'Por favor, informe seu e-mail.');
        isValid = false;
      } else if (!isValidEmail(userEmail.value.trim())) {
        setFieldError(userEmail, emailError, 'Por favor, insira um endereço de e-mail válido.');
        isValid = false;
      } else {
        clearFieldError(userEmail, emailError);
      }

      // Validação do Assunto
      if (!userSubject.value.trim()) {
        setFieldError(userSubject, subjectError, 'Por favor, informe o assunto da mensagem.');
        isValid = false;
      } else if (userSubject.value.trim().length < 3) {
        setFieldError(userSubject, subjectError, 'O assunto deve ter no mínimo 3 caracteres.');
        isValid = false;
      } else {
        clearFieldError(userSubject, subjectError);
      }

      // Validação da Mensagem
      if (!userMessage.value.trim()) {
        setFieldError(userMessage, messageError, 'Por favor, escreva sua mensagem.');
        isValid = false;
      } else if (userMessage.value.trim().length < 10) {
        setFieldError(userMessage, messageError, 'A mensagem deve conter pelo menos 10 caracteres.');
        isValid = false;
      } else {
        clearFieldError(userMessage, messageError);
      }

      // Se tudo estiver válido, exibe feedback de sucesso
      if (isValid) {
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = '✨ <strong>Mensagem registrada com sucesso!</strong> Agradeço pelo contato e retornarei em breve.';
        contactForm.reset();

        // Oculta a mensagem de sucesso suavemente após 6 segundos
        setTimeout(() => {
          if (formAlert) {
            formAlert.style.display = 'none';
          }
        }, 6000);
      } else {
        formAlert.className = 'form-alert error';
        formAlert.textContent = 'Por favor, corrija os campos destacados antes de enviar.';
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 9. LOG INFORMATIVO NO CONSOLE
   * -------------------------------------------------------------------------- */
  console.log(
    '%c✨ Portfólio de Emilly Barbosa — Todas as seções e interações carregadas com sucesso!',
    'color: #FF758F; font-weight: bold; font-size: 13px; background: #FFF0F3; padding: 6px 10px; border-radius: 6px;'
  );

});
