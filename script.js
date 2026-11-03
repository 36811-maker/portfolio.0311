/**
 * ============================================================================
 * PORTFÓLIO PESSOAL — EMILLY BARBOSA
 * ETAPA 1: SEÇÃO HERO
 * Tecnologias: JavaScript Puro (Vanilla JS)
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

    // Atualiza coordenadas do ponteiro
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        interactiveGlow.style.opacity = '1';
        requestAnimationFrame(updateGlowPosition);
      }
    });

    // Interpolação suave (lerp) via requestAnimationFrame para fluidez visual
    function updateGlowPosition() {
      const ease = 0.12;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      interactiveGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

      // Continua animando enquanto houver diferença perceptível
      if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
        requestAnimationFrame(updateGlowPosition);
      } else {
        isMoving = false;
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 2. INTERATIVIDADE DO BOTÃO CTA E MODAL DA ETAPA (Inspiração Elespacio & Sphere)
   * -------------------------------------------------------------------------- */
  const btnExplore = document.getElementById('btnExplore');
  const stageModalBackdrop = document.getElementById('stageModalBackdrop');
  const stageModalClose = document.getElementById('stageModalClose');
  const stageModalConfirm = document.getElementById('stageModalConfirm');

  // Abre o modal de status da etapa atual
  function openStageModal() {
    if (!stageModalBackdrop) return;
    stageModalBackdrop.classList.add('active');
    stageModalBackdrop.setAttribute('aria-hidden', 'false');
    if (btnExplore) btnExplore.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Evita rolagem com modal aberto
  }

  // Fecha o modal
  function closeStageModal() {
    if (!stageModalBackdrop) return;
    stageModalBackdrop.classList.remove('active');
    stageModalBackdrop.setAttribute('aria-hidden', 'true');
    if (btnExplore) {
      btnExplore.setAttribute('aria-expanded', 'false');
      btnExplore.focus();
    }
    document.body.style.overflow = '';
  }

  if (btnExplore) {
    btnExplore.addEventListener('click', openStageModal);

    // Efeito magnético suave no botão CTA (Elespacio) em telas com cursor de precisão
    if (window.matchMedia('(pointer: fine)').matches) {
      btnExplore.addEventListener('mousemove', (e) => {
        const rect = btnExplore.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btnExplore.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-4px) scale(1.02)`;
      });

      btnExplore.addEventListener('mouseleave', () => {
        btnExplore.style.transform = '';
      });
    }
  }

  if (stageModalClose) {
    stageModalClose.addEventListener('click', closeStageModal);
  }

  if (stageModalConfirm) {
    stageModalConfirm.addEventListener('click', closeStageModal);
  }

  // Fechar clicando fora do modal (backdrop)
  if (stageModalBackdrop) {
    stageModalBackdrop.addEventListener('click', (e) => {
      if (e.target === stageModalBackdrop) {
        closeStageModal();
      }
    });
  }

  // Fechar com a tecla ESC para acessibilidade
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && stageModalBackdrop && stageModalBackdrop.classList.contains('active')) {
      closeStageModal();
    }
  });

  /* --------------------------------------------------------------------------
   * 3. LOG INFORMATIVO NO CONSOLE
   * -------------------------------------------------------------------------- */
  console.log(
    '%c✨ Portfólio de Emilly Barbosa — Etapa 1 (Hero) inicializada com sucesso!',
    'color: #FF758F; font-weight: bold; font-size: 12px; background: #FFF0F3; padding: 4px 8px; border-radius: 4px;'
  );

});

