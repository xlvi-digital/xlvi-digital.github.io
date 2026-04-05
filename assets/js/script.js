// Navbar Scroll Effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between hamburger and close
    if(navLinks.classList.contains('active')) {
      menuToggle.innerHTML = '<span>&times;</span>';
    } else {
      menuToggle.innerHTML = '<span>&#9776;</span>';
    }
  });
}



// Portfolio Filtering Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
        card.style.animation = 'slideInLeft 0.5s ease forwards';
      } else {
        if (card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'slideInLeft 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if(target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission (Index Page)
const contactForm = document.querySelector('#contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs gracefully
    const inputs = contactForm.querySelectorAll('input, textarea');
    const nama = inputs[0]?.value.trim() || '';
    const email = inputs[1]?.value.trim() || '';
    const pesan = inputs[2]?.value.trim() || '';

    // Target WhatsApp number
    const phone = '6282119502976';

    const message = `Halo XLVI.ID,

Saya menghubungi Anda melalui website. Berikut data saya:
*Nama:* ${nama}
*Kontak:* ${email}

*Pesan:* 
${pesan}

Terima kasih.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    contactForm.reset();
  });
}

// Simple Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.8s ease-out';
  observer.observe(section);
});
