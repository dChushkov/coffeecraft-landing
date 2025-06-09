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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
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