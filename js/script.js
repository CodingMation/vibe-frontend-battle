  // Loader
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").style.opacity = "0";
      document.getElementById("loader").style.visibility = "hidden";
    }, 1000);
  });

  // Dark/Light Mode
  const toggle = document.getElementById("mode-toggle");
  const modeIcon = toggle.querySelector('i');
  
  // Check for saved user preference or use system preference
  if (localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    modeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  
  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    
    if (isDark) {
      modeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      modeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Create ripple effect
    createRipple(event);
  });

  // Mobile Menu
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const mobileMenu = document.getElementById("mobile-nav");
  const closeMenuBtn = document.getElementById("close-menu");
  
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  
  closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  });
  
  // Close menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Carousel Navigation
  const carousel = document.getElementById("carousel");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  scrollLeftBtn.onclick = () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
    updateIndicators();
  };
  
  scrollRightBtn.onclick = () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
    updateIndicators();
  };
  
  // Touch support for carousel
  let isDown = false;
  let startX;
  let scrollLeft;
  
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    updateIndicators();
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
  
  // Update indicators based on scroll position
  function updateIndicators() {
    setTimeout(() => {
      const scrollPosition = carousel.scrollLeft;
      const itemWidth = carousel.querySelector('.flex-shrink-0').offsetWidth;
      const currentIndex = Math.round(scrollPosition / itemWidth);
      
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('bg-primary-light');
          indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        } else {
          indicator.classList.remove('bg-primary-light');
          indicator.classList.add('bg-gray-300', 'dark:bg-gray-600');
        }
      });
    }, 300);
  }
  
  // Click on indicator to scroll to that item
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.getAttribute('data-index'));
      const itemWidth = carousel.querySelector('.flex-shrink-0').offsetWidth;
      carousel.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    });
  });
  
  // Initialize indicators
  updateIndicators();
  
  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Ripple Effect
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Add ripple effect to all buttons with ripple class
  document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });