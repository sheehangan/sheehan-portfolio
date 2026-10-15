const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const modalShell = document.getElementById('project-modal');
const modalOpeners = document.querySelectorAll('[data-project-open="rta"]');
const modalClosers = document.querySelectorAll('[data-modal-close]');
let lastFocusedElement = null;

function openModal() {
  if (!modalShell) return;
  lastFocusedElement = document.activeElement;
  modalShell.hidden = false;
  modalShell.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const closeButton = modalShell.querySelector('.modal-close');
  closeButton?.focus();
}

function closeModal() {
  if (!modalShell) return;
  modalShell.hidden = true;
  modalShell.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

modalOpeners.forEach((opener) => {
  opener.addEventListener('click', () => openModal());
  opener.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
  });
});

modalClosers.forEach((closer) => closer.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalShell && !modalShell.hidden) {
    closeModal();
  }
});
