// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';

html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {

  const current = html.getAttribute('data-theme');

  const next = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);

  localStorage.setItem('theme', next);

  updateThemeIcon(next);

});

function updateThemeIcon(theme) {

  themeIcon.className =
    theme === 'dark'
      ? 'fas fa-sun'
      : 'fas fa-moon';
}


// ===== SCROLL PROGRESS BAR =====

const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {

  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const pct =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  progressBar.style.width = pct + '%';

});


// ===== NAVBAR SCROLL EFFECT =====

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {

  navbar.style.boxShadow =
    window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.3)'
      : 'none';

});


// ===== MOBILE NAV TOGGLE =====

const hamburger = document.getElementById('hamburger');

const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {

  hamburger.classList.toggle('open');

  navLinks.classList.toggle('open');

});


// ===== CLOSE MOBILE NAV =====

document.querySelectorAll('.nav-link').forEach(link => {

  link.addEventListener('click', () => {

    hamburger.classList.remove('open');

    navLinks.classList.remove('open');

  });

});


// ===== ACTIVE NAV LINK =====

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', highlightNav);

function highlightNav() {

  const scrollY = window.scrollY + 100;

  sections.forEach(section => {

    const top = section.offsetTop;

    const height = section.offsetHeight;

    const id = section.getAttribute('id');

    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {

      if (scrollY >= top && scrollY < top + height) {

        document
          .querySelectorAll('.nav-link')
          .forEach(l => l.classList.remove('active'));

        link.classList.add('active');

      }

    }

  });

}


// ===== TYPING EFFECT =====

const words = [
  'Full Stack Applications.',
  'Modern Websites.',
  'Scalable Backend Systems.',
  'Responsive User Interfaces.',
  'AI-Powered Solutions.'
];

let wordIdx = 0;

let charIdx = 0;

let isDeleting = false;

const typedEl = document.getElementById('typed-text');

function typeEffect() {

  const current = words[wordIdx];

  if (isDeleting) {

    charIdx--;

    typedEl.textContent =
      current.substring(0, charIdx);

  } else {

    charIdx++;

    typedEl.textContent =
      current.substring(0, charIdx);

  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {

    delay = 1800;

    isDeleting = true;

  } else if (isDeleting && charIdx === 0) {

    isDeleting = false;

    wordIdx = (wordIdx + 1) % words.length;

    delay = 300;

  }

  setTimeout(typeEffect, delay);

}

typeEffect();


// ===== SCROLL REVEAL =====

function addRevealClasses() {

  const targets = document.querySelectorAll(
    '.about-card, .about-info, .skill-card, .project-card, .achievement-card, .contact-info, .contact-form, .section-header'
  );

  targets.forEach(el => el.classList.add('reveal'));

}

addRevealClasses();


const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const siblings = [...entry.target.parentElement.children];

      const idx = siblings.indexOf(entry.target);

      entry.target.style.transitionDelay =
        (idx * 80) + 'ms';

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document
  .querySelectorAll('.reveal')
  .forEach(el => revealObserver.observe(el));


// ===== SKILL TAB FILTER =====

const tabBtns = document.querySelectorAll('.tab-btn');

const skillCards = document.querySelectorAll('.skill-card');

tabBtns.forEach(btn => {

  btn.addEventListener('click', () => {

    tabBtns.forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    const tab = btn.dataset.tab;

    skillCards.forEach(card => {

      const show =
        tab === 'all' ||
        card.dataset.category === tab;

      card.style.display =
        show ? 'flex' : 'none';

      if (show) {

        card.classList.remove('visible');

        void card.offsetWidth;

        card.classList.add('visible');

      }

    });

  });

});


// ===== EMAILJS CONTACT FORM =====

// Initialize EmailJS
(function () {

  emailjs.init('service_v9wb4jt'); // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key

})();


const contactForm = document.getElementById('contact-form');

const formStatus = document.getElementById('form-status');

const sendBtn = document.getElementById('send-btn');


contactForm.addEventListener('submit', async (e) => {

  e.preventDefault();

  const name =
    document.getElementById('name').value.trim();

  const email =
    document.getElementById('email').value.trim();

  const subject =
    document.getElementById('subject').value.trim();

  const message =
    document.getElementById('message').value.trim();


  // Validation
  if (!name || !email || !subject || !message) {

    showStatus(
      'Please fill in all fields.',
      'error'
    );

    return;

  }


  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {

    showStatus(
      'Please enter a valid email address.',
      'error'
    );

    return;

  }


  // Loading Button
  sendBtn.disabled = true;

  sendBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Sending...';


  // EmailJS Parameters
  const templateParams = {

    from_name: name,

    from_email: email,

    subject: subject,

    message: message,

  };


  try {

    // Send Email
    await emailjs.send(
      'service_v9wb4jt',
      'template_csyzuo7',
      templateParams
    );

    showStatus(
      '✅ Message sent successfully!',
      'success'
    );

    contactForm.reset();

  } catch (error) {

    console.error('EmailJS Error:', error);

    showStatus(
      '❌ Failed to send message.',
      'error'
    );

  }


  // Reset Button
  sendBtn.disabled = false;

  sendBtn.innerHTML =
    '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';

});


// ===== STATUS FUNCTION =====

function showStatus(message, type) {

  formStatus.textContent = message;

  formStatus.className =
    `form-status ${type}`;

  setTimeout(() => {

    formStatus.textContent = '';

    formStatus.className = 'form-status';

  }, 5000);

}


// ===== ACTIVE NAV STYLE =====

document.head.insertAdjacentHTML('beforeend', `
<style>

.nav-link.active {
  color: var(--accent) !important;
}

.nav-link.active::after {
  width: 100% !important;
}

</style>
`);


// ===== PAGE LOAD ANIMATION =====

window.addEventListener('load', () => {

  document.body.style.opacity = '0';

  document.body.style.transition =
    'opacity 0.5s ease';

  requestAnimationFrame(() => {

    document.body.style.opacity = '1';

  });

});