document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40
  });

  const header = document.querySelector('.main-nav');
  const pageTop = () => window.scrollY || document.documentElement.scrollTop;

  const handleScroll = () => {
    if (pageTop() > 80) {
      header?.classList.add('navbar-shrink');
    } else {
      header?.classList.remove('navbar-shrink');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('d-none');
        document.body.classList.add('is-loaded');
      }, 500);
    });
  }

  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (element) => {
    const target = Number(element.getAttribute('data-counter'));
    const decimals = target % 1 !== 0;
    const startValue = 0;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      element.textContent = `${value}${target >= 100 && !decimals ? '%' : ''}${target < 100 && target >= 10 && decimals ? ' LPA' : ''}${target === 14 ? ' LPA' : ''}${target === 5.2 ? ' LPA' : ''}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = `${target}${target >= 100 && !decimals ? '%' : ''}${target < 100 && target >= 10 && decimals ? ' LPA' : ''}${target === 14 ? ' LPA' : ''}${target === 5.2 ? ' LPA' : ''}`;
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
  }

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
      }
    });
  }

  const swiper = document.querySelector('.testimonial-slider');
  if (swiper && window.Swiper) {
    new Swiper(swiper, {
      loop: true,
      slidesPerView: 1,
      pagination: { el: '.swiper-pagination', clickable: true },
      autoplay: { delay: 2600, disableOnInteraction: false },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  if (window.typed && document.querySelector('[data-typed]')) {
    const typedTarget = document.querySelector('[data-typed]');
    new Typed('[data-typed]', {
      strings: ['Programming', 'Networking', 'Web Development', 'Career Coaching'],
      typeSpeed: 40,
      backSpeed: 18,
      loop: true
    });
  }

  const courseFilters = document.querySelectorAll('[data-filter]');
  if (courseFilters.length) {
    courseFilters.forEach((filter) => {
      filter.addEventListener('click', () => {
        courseFilters.forEach((item) => item.classList.toggle('active', item === filter));
      });
    });
  }
});
