(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── REVEAL ON SCROLL ── */
  function revealOnScroll() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -70px" });
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
      observer.observe(item);
    });
  }

  /* ── COUNTER ANIMATION ── */
  function counters() {
    const countersList = document.querySelectorAll("[data-counter]");
    if (!countersList.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.dataset.counter || "0");
        const suffix = node.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    }, { threshold: 0.5 });
    countersList.forEach((node) => observer.observe(node));
  }

  /* ── PARALLAX ── */
  function parallax() {
    const layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length || prefersReducedMotion) return;
    let ticking = false;
    const update = () => {
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallax || ".08");
        const rect = layer.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * speed;
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── SWIPER SLIDERS ── */
  function initSliders() {
    if (!window.Swiper) return;

    /* Portfolio swiper on home page */
    document.querySelectorAll(".portfolio-swiper").forEach((element) => {
      new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 700,
        autoplay: { delay: 3600, disableOnInteraction: false },
        pagination: {
          el: element.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: element.querySelector(".swiper-button-next"),
          prevEl: element.querySelector(".swiper-button-prev")
        },
        breakpoints: {
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 }
        }
      });
    });

    /* Testimonial swiper */
    document.querySelectorAll(".testimonial-swiper").forEach((element) => {
      new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: {
          el: element.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: element.querySelector(".swiper-button-next"),
          prevEl: element.querySelector(".swiper-button-prev")
        },
        breakpoints: {
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 }
        }
      });
    });
  }

  /* ── ISOTOPE FILTRATION ── */
  function initIsotope() {
    const grids = document.querySelectorAll(".isotope-grid");
    if (!grids.length) return;

    grids.forEach((grid) => {
      /* Wait for images to load before init */
      const doInit = () => {
        if (!window.Isotope) return;
        const iso = new Isotope(grid, {
          itemSelector: ".grid-item",
          layoutMode: "fitRows",
          transitionDuration: "0.4s"
        });

        /* Wire up filter buttons for this grid */
        const section = grid.closest("section") || document.body;
        const buttons = section.querySelectorAll("[data-filter]");

        buttons.forEach((btn) => {
          btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            const filter = btn.dataset.filter;
            iso.arrange({
              filter: filter === "all" ? "*" : `[data-category="${filter}"]`
            });
          });
        });
      };

      /* Use imagesLoaded if available, else init directly */
      if (window.imagesLoaded) {
        imagesLoaded(grid, doInit);
      } else {
        doInit();
      }
    });
  }

  /* ── FANCYBOX LIGHTBOX ── */
  function initFancybox() {
    if (!window.Fancybox) return;
    Fancybox.bind("[data-fancybox]", {
      animated: true,
      showClass: "fancybox-zoomIn",
      hideClass: "fancybox-zoomOut",
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [],
          right: ["slideshow", "fullscreen", "thumbs", "close"]
        }
      },
      Images: {
        zoom: true
      }
    });
  }

  /* ── SIMPLE FILTER (fallback for non-Isotope pages) ── */
  function filterCards() {
    /* Only run on pages that don't have an isotope-grid */
    if (document.querySelector(".isotope-grid")) return;
    const buttons = document.querySelectorAll("[data-filter]");
    if (!buttons.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        document.querySelectorAll("[data-category]").forEach((card) => {
          const visible = filter === "all" || card.dataset.category === filter;
          card.style.display = visible ? "" : "none";
        });
      });
    });
  }

  /* ── FLOATING ACTIONS ── */
  function floatingActions() {
    const actions = document.createElement("div");
    actions.className = "floating-actions";
    actions.innerHTML = `
      <a class="icon-button whatsapp-link" href="#" data-message="Hello Adeena Interiors, I want to start an interior project." aria-label="Chat on WhatsApp">
        <i data-lucide="message-circle" aria-hidden="true"></i>
      </a>
      <button class="icon-button back-to-top" type="button" aria-label="Back to top">
        <i data-lucide="arrow-up" aria-hidden="true"></i>
      </button>`;
    document.body.append(actions);
    const topButton = actions.querySelector(".back-to-top");
    topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    const update = () => topButton.classList.toggle("is-visible", window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ── CUSTOM CURSOR ── */
  function cursor() {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const cursorNode = document.createElement("div");
    cursorNode.className = "custom-cursor";
    document.body.append(cursorNode);
    window.addEventListener("mousemove", (event) => {
      cursorNode.style.left = `${event.clientX}px`;
      cursorNode.style.top = `${event.clientY}px`;
    }, { passive: true });
    document.addEventListener("mouseover", (event) => {
      if (event.target.closest("a, button, .project-card, .article-card, .image-frame, .gallery-item")) {
        cursorNode.classList.add("is-hovering");
      }
    });
    document.addEventListener("mouseout", (event) => {
      if (event.target.closest("a, button, .project-card, .article-card, .image-frame, .gallery-item")) {
        cursorNode.classList.remove("is-hovering");
      }
    });
  }

  /* ── GSAP HERO ANIMATION ── */
  function gsapMoments() {
    if (!window.gsap || prefersReducedMotion) return;
    gsap.from(".hero-copy > *", {
      y: 24, opacity: 0, duration: .85, ease: "power3.out", stagger: .12
    });
    gsap.from(".hero-card", {
      y: 42, opacity: 0, duration: .9, delay: .25, ease: "power3.out"
    });
  }

  /* ── LUCIDE ICONS ── */
  function lucideIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  /* ── INIT ── */
  document.addEventListener("DOMContentLoaded", () => {
    revealOnScroll();
    counters();
    parallax();
    initSliders();
    initIsotope();
    initFancybox();
    filterCards();
    floatingActions();
    cursor();
    gsapMoments();
    lucideIcons();
    setTimeout(lucideIcons, 80);
  });
}());
