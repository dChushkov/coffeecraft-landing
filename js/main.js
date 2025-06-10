let testimonialsObserver = null;

// Mobile menu functionality
const mobileMenuButton = document.querySelector('[aria-label="Toggle menu"]');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50';
mobileMenu.innerHTML = `
    <button class="absolute top-4 right-4" aria-label="Close menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    <nav class="mt-8 space-y-4">
        <a href="#products" class="block text-lg hover:text-coffee-600 transition-colors">Products</a>
        <a href="#benefits" class="block text-lg hover:text-coffee-600 transition-colors">Benefits</a>
        <a href="#testimonials" class="block text-lg hover:text-coffee-600 transition-colors">Testimonials</a>
        <a href="#contact" class="block text-lg hover:text-coffee-600 transition-colors">Contact</a>
    </nav>
`;
document.body.appendChild(mobileMenu);

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    fadeInObserver.observe(section);
});

// Scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.className = 'fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 z-50';
scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
scrollToTopButton.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.opacity = '1';
    } else {
        scrollToTopButton.style.opacity = '0';
    }
});

// Scroll to top functionality
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- LAZY LOADING IMAGES ---
// Only for images with data-src (not hero)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      obs.unobserve(img);
    }
  });
}, { rootMargin: '100px', threshold: 0.01 });
lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// --- DEMO POPUP LOGIC ---
const demoPopup = document.getElementById('demo-popup');
const demoPopupContent = document.getElementById('demo-popup-content');
const orderBtns = document.querySelectorAll('.order-btn');

let popupTimeout = null;

orderBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    demoPopupContent.textContent = `This is a demo! No real order will be placed for "${btn.getAttribute('data-product')}".`;
    demoPopup.classList.remove('hidden');
    // Auto-hide popup after 2 seconds
    const hidePopup = () => {
      demoPopup.classList.add('hidden');
      document.removeEventListener('click', onOverlayClick, true);
      if (popupTimeout) {
        clearTimeout(popupTimeout);
        popupTimeout = null;
      }
    };
    // Hide popup when clicking outside the message
    function onOverlayClick(event) {
      if (event.target === demoPopup) {
        hidePopup();
      }
    }
    document.removeEventListener('click', onOverlayClick, true); // Remove previous
    document.addEventListener('click', onOverlayClick, true);
    if (popupTimeout) {
      clearTimeout(popupTimeout);
    }
    popupTimeout = setTimeout(hidePopup, 2000);
  });
});

// --- SCROLL TO TOP BUTTON COLOR CHANGE ON FOOTER ---
const footer = document.querySelector('footer');
const scrollIcon = scrollToTopButton.querySelector('svg');

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Footer is visible: make button light
      scrollToTopButton.classList.remove('bg-gray-800', 'hover:bg-gray-900', 'text-white');
      scrollToTopButton.classList.add('bg-white', 'hover:bg-gray-200', 'text-gray-900', 'border', 'border-gray-300');
      scrollIcon.setAttribute('stroke', '#1a202c'); // dark gray
    } else {
      // Footer not visible: make button dark
      scrollToTopButton.classList.add('bg-gray-800', 'hover:bg-gray-900', 'text-white');
      scrollToTopButton.classList.remove('bg-white', 'hover:bg-gray-200', 'text-gray-900', 'border', 'border-gray-300');
      scrollIcon.setAttribute('stroke', '#fff');
    }
  });
}, { threshold: 0.1 });
if (footer) {
  footerObserver.observe(footer);
}

// --- LAZY YOUTUBE EMBED ---
const loadVideoBtn = document.getElementById('load-video-btn');
const videoThumb = document.getElementById('video-thumb');
const videoEmbed = document.getElementById('video-embed');

if (loadVideoBtn && videoThumb && videoEmbed) {
  loadVideoBtn.addEventListener('click', () => {
    // Hide button and thumbnail
    loadVideoBtn.style.display = 'none';
    videoThumb.style.display = 'none';
    // Show iframe
    videoEmbed.classList.remove('hidden');
    videoEmbed.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/87eb45AYeBE?autoplay=1&rel=0" title="Coffee video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="w-full h-full rounded-xl"></iframe>
    `;
  });
}

// --- TESTIMONIALS DATA & RENDER ---
const testimonials = [
  {
    img: 'assets/img/user1.webp',
    name: 'Margie H.',
    text: '“I absolutely love the medium roast! I have heart and digestion issues and had stopped drinking coffee entirely. Lifeboost is the best coffee ever!”',
  },
  {
    img: 'assets/img/user2.webp',
    name: 'Gwen O.',
    text: '“After some research and trials of other brands, this is by far the best low acid decaf! I have zero stomach upset and I absolutely love the taste.”',
  },
  {
    img: 'assets/img/user3.webp',
    name: 'Debbie N.',
    text: '“This Decaf is so good that even my husband can\'t tell the difference from his regular coffee. It\'s a winner.”',
  },
  {
    img: 'assets/img/user4.webp',
    name: 'Ivan T.',
    text: '“As a coffee lover, I can say this is the smoothest decaf I\'ve ever tried. No jitters, just pure taste!”',
  },
  {
    img: 'assets/img/user5.webp',
    name: 'Martin S.',
    text: '“Great coffee, great service. My mornings are so much better now. Highly recommend!”',
  },
  {
    img: 'assets/img/user6.webp',
    name: 'Petar D.',
    text: '“I never thought decaf could taste this good. CoffeeCraft changed my mind!”',
  },
];

let current = 0;
let autoplayInterval = null;

function renderCurrentTestimonial() {
  const t = testimonials[current];
  document.getElementById('testimonial-current').innerHTML = `
    <div class="w-full max-w-md mx-auto px-4 flex flex-col items-center text-center min-h-[340px] justify-center">
      <img src="${t.img}" alt="${t.name}" width="80" height="80" class="mb-4 rounded-full object-cover w-20 h-20" loading="lazy">
      <p class="text-gray-700 mb-4">${t.text}</p>
      <span class="font-semibold text-coffee-700">${t.name}</span>
      <div class="flex justify-center mt-2">
        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      </div>
    </div>
  `;
  renderTestimonialDots();
}

function renderTestimonialDots() {
  const dotsContainer = document.getElementById('testimonial-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < testimonials.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-3 h-3 rounded-full bg-gray-300 focus:outline-none' + (i === current ? ' bg-red-600' : '');
    dot.addEventListener('click', () => {
      current = i;
      renderCurrentTestimonial();
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  }
}

document.getElementById('testimonial-prev').addEventListener('click', () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  renderCurrentTestimonial();
  resetAutoplay();
});
document.getElementById('testimonial-next').addEventListener('click', () => {
  current = (current + 1) % testimonials.length;
  renderCurrentTestimonial();
  resetAutoplay();
});

function startAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  if (testimonials.length < 2) return;
  autoplayInterval = setInterval(() => {
    current = (current + 1) % testimonials.length;
    renderCurrentTestimonial();
  }, 4000);
}

function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = null;
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

function observeTestimonialsSection() {
  const section = document.getElementById('testimonials');
  if (!section) return;
  if (testimonialsObserver) testimonialsObserver.disconnect();
  testimonialsObserver = new window.IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }, { threshold: 0.2 });
  testimonialsObserver.observe(section);
}

window.addEventListener('resize', renderCurrentTestimonial);

// Initial
renderCurrentTestimonial();
observeTestimonialsSection(); 