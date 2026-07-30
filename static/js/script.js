// ===============================================
// PRELOADER
// ===============================================

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// ===============================================
// BACK TO TOP BUTTON
// ===============================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (!backToTop) return;

  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===============================================
// AOS ANIMATION
// ===============================================

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-in-out",
});

// ===============================================
// COUNTER ANIMATION
// ===============================================

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");

    const count = +counter.innerText;

    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);

      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// ===============================================
// SWIPER
// ===============================================

const analysisSwiper = document.querySelector(".analysisSwiper");

if (analysisSwiper) {
  new Swiper(".analysisSwiper", {
    direction: "horizontal",

    slidesPerView: 1,

    spaceBetween: 30,

    centeredSlides: true,

    speed: 800,

    loop: false,

    grabCursor: true,

    keyboard: {
      enabled: true,
    },

    mousewheel: {
      forceToAxis: true,
    },

    pagination: {
      el: ".swiper-pagination",

      clickable: true,

      dynamicBullets: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",

      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 6000,

      disableOnInteraction: false,

      pauseOnMouseEnter: true,
    },

    effect: "slide",

    breakpoints: {
      576: {
        slidesPerView: 1,
      },

      768: {
        slidesPerView: 1,
      },

      992: {
        slidesPerView: 1,
      },
    },
  });
}

// ===============================================
// CARD HOVER EFFECT
// ===============================================

const cards = document.querySelectorAll(".feature-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0px)";
  });
});

// ===============================================
// SMOOTH SCROLL
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ===============================================
// TOOLTIP
// ===============================================

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);

tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl);
});

// ===============================================
// ACTIVE NAV LINK
// ===============================================

const currentLocation = location.pathname;

const menuItems = document.querySelectorAll(".navbar-nav .nav-link");

menuItems.forEach((link) => {
  if (link.getAttribute("href") === currentLocation) {
    link.classList.add("active");
  }
});

// ===============================================
// PAGE FADE-IN
// ===============================================

document.body.classList.add("loaded");
