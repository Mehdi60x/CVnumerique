let menuIcon = document.querySelector('#menu-icon');
let menuIconI = menuIcon.querySelector('i');
let navbar = document.querySelector('.navbar');
let navOverlay = document.querySelector('.nav-overlay');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
let header = document.querySelector('.header');
let progressBar = document.querySelector('.scroll-progress');
let backToTop = document.querySelector('.back-to-top');
let announcementBar = document.querySelector('.announcement-bar');
let announcementClose = document.querySelector('.announcement-close');
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        }
    });

    header.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('show', window.scrollY > 600);

    let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});

announcementClose.addEventListener('click', () => {
    announcementBar.classList.add('closed');
});

function openMenu() {
    navbar.classList.add('active');
    navOverlay.classList.add('active');
    menuIconI.classList.replace('bx-menu', 'bx-x');
    menuIcon.setAttribute('aria-expanded', 'true');
    menuIcon.setAttribute('aria-label', 'Fermer le menu');
}

function closeMenu() {
    navbar.classList.remove('active');
    navOverlay.classList.remove('active');
    menuIconI.classList.replace('bx-x', 'bx-menu');
    menuIcon.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('aria-label', 'Ouvrir le menu');
}

menuIcon.addEventListener('click', () => {
    navbar.classList.contains('active') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) closeMenu();
});

navlinks.forEach(link => link.addEventListener('click', closeMenu));

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// Animations d'apparition au scroll
let revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => {
    el.style.setProperty('--i', i % 6);
});

let revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Effet machine à écrire (rotation de mots)
let typedEl = document.querySelector('.text-animation .typed');
let words = ['Concepteur Développeur d\'Applications', 'Développeur Front-End', 'Passionné d\'IA & Automatisation'];

if (typedEl) {
    if (prefersReducedMotion) {
        typedEl.textContent = words[0];
    } else {
        (function typeLoop(wordIndex = 0, charIndex = 0, deleting = false) {
            let current = words[wordIndex];
            let delay = deleting ? 45 : 90;

            if (!deleting) {
                charIndex++;
                typedEl.textContent = current.slice(0, charIndex);
                if (charIndex === current.length) {
                    deleting = true;
                    delay = 1800;
                }
            } else {
                charIndex--;
                typedEl.textContent = current.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            setTimeout(() => typeLoop(wordIndex, charIndex, deleting), delay);
        })();
    }
}

// Ciel nocturne étoilé en fond du hero
let starfield = document.querySelector('.starfield');
if (starfield) {
    let starCount = prefersReducedMotion ? 60 : 130;
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        let big = Math.random() < 0.1;
        star.className = 'star' + (big ? ' big' : '');
        star.style.left = (Math.random() * 100).toFixed(2) + '%';
        star.style.top = (Math.random() * 100).toFixed(2) + '%';
        if (prefersReducedMotion) {
            star.style.animation = 'none';
            star.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
        } else {
            star.style.animationDuration = (1.6 + Math.random() * 3.2).toFixed(2) + 's';
            star.style.animationDelay = (Math.random() * -4).toFixed(2) + 's';
        }
        starfield.appendChild(star);
    }

    if (!prefersReducedMotion) {
        let shootingCount = 3;
        for (let i = 0; i < shootingCount; i++) {
            let trail = document.createElement('div');
            trail.className = 'shooting-star';
            trail.style.top = (Math.random() * 50).toFixed(2) + '%';
            trail.style.left = (40 + Math.random() * 55).toFixed(2) + '%';
            trail.style.animationDuration = (4 + Math.random() * 5).toFixed(2) + 's';
            trail.style.animationDelay = (Math.random() * -8).toFixed(2) + 's';
            starfield.appendChild(trail);
        }
    }
}

// Agent IA interactif : les yeux suivent le curseur de la souris
let botEl = document.querySelector('.bot');
let botPupils = document.querySelectorAll('.bot-pupil');
if (botEl && botPupils.length && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        let rect = botEl.getBoundingClientRect();
        let cx = rect.left + rect.width / 2;
        let cy = rect.top + rect.height / 2;
        let dx = e.clientX - cx;
        let dy = e.clientY - cy;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        let reach = 3;
        let px = (dx / dist) * reach;
        let py = (dy / dist) * reach;
        botPupils.forEach((pupil) => {
            pupil.style.transform = 'translate(' + px.toFixed(1) + 'px, ' + py.toFixed(1) + 'px)';
        });
    });
}

// Parallax léger au mouvement de la souris dans le hero (desktop uniquement)
let homeSection = document.querySelector('.home');
let homeImgEl = document.querySelector('.home-img');
if (homeSection && homeImgEl && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    homeSection.addEventListener('mousemove', (e) => {
        let rect = homeSection.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;
        homeImgEl.style.transform = 'translate3d(' + (x * 18) + 'px, ' + (y * 18) + 'px, 0)';
        if (starfield) {
            starfield.style.transform = 'translate3d(' + (x * -10) + 'px, ' + (y * -6) + 'px, 0)';
        }
    });

    homeSection.addEventListener('mouseleave', () => {
        homeImgEl.style.transform = '';
        if (starfield) starfield.style.transform = '';
    });
}

// Effet tilt 3D au survol des cartes "papier" (desktop uniquement)
let tiltCards = document.querySelectorAll('.porfolio-item, .timeline-content, .formation-box, .skill-card, .contact-info, .contact form');
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            let rect = card.getBoundingClientRect();
            let x = (e.clientX - rect.left) / rect.width - 0.5;
            let y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = 'perspective(800px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-6px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
