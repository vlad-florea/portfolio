// --- header ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- SCroll spy ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Check section in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 160)) {
            current = section.getAttribute('id');
        }
    });

    // check end of page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        current = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.gallery-grid img');

let currentIndex = 0;
const imageList = Array.from(images);

images.forEach(img => {
    img.addEventListener('click', () => {
        currentIndex = imageList.indexOf(img);
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightbox.classList.add('active');
    lightboxImg.src = src;
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex >= imageList.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = imageList.length - 1;
    lightboxImg.src = imageList[currentIndex].src;
}

// Keyboard Nav
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
});

// --- MOBILE MENU TOGGLE ---
const mobileHeader = document.querySelector('header');

function toggleMobileMenu(e) {
    if (window.innerWidth <= 1200) {
        
        if (e.target.closest('a')) {
            return; 
        }

        mobileHeader.classList.toggle('mobile-open');
    }
}

if(mobileHeader) mobileHeader.addEventListener('click', toggleMobileMenu);

const navLinksMobile = document.querySelectorAll('nav a');
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            setTimeout(() => {
                mobileHeader.classList.remove('mobile-open');
            }, 50);
        }
    });
});

// --- SCROLL TO TOP ---
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
