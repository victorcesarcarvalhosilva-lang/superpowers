(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5511971172817";
  const DEFAULT_MESSAGE =
    "Olá! Vi o site da Boutique da Rah e queria saber mais sobre as peças disponíveis.";

  function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Generic WhatsApp buttons (header, hero, location, footer, floating CTA)
  document
    .querySelectorAll("#header-whats, #hero-whats, #location-whats, #footer-whats, #float-whats")
    .forEach((el) => {
      el.setAttribute("href", waLink(DEFAULT_MESSAGE));
    });

  // Per-item "Comprar" buttons
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.dataset.item || "uma peça do catálogo";
      const message = `Olá! Vi no site da Boutique da Rah e quero comprar: ${item}. Podem confirmar disponibilidade, preço e forma de pagamento?`;
      window.open(waLink(message), "_blank", "noopener");
    });
  });

  // Per-item "Reservar" buttons
  document.querySelectorAll(".reserve-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.dataset.item || "uma peça do catálogo";
      const message = `Olá! Vi no site da Boutique da Rah e quero reservar: ${item}. Ainda está disponível?`;
      window.open(waLink(message), "_blank", "noopener");
    });
  });

  // Hero entrance animation
  window.requestAnimationFrame(() => {
    document.querySelectorAll(".reveal-hero").forEach((el) => el.classList.add("is-in"));
  });

  // Scroll-reveal for sections/cards
  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // Catalog occasion tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const catalogItems = document.querySelectorAll(".item-card");

  function setFilter(filter) {
    tabButtons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    catalogItems.forEach((card) => {
      const show = card.dataset.category === filter;
      card.classList.toggle("is-shown", show);
      if (show) {
        card.classList.add("reveal");
        requestAnimationFrame(() => card.classList.add("is-visible"));
      }
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-q");
    const wrap = item.querySelector(".faq-a-wrap");

    function sync(open) {
      item.classList.toggle("is-open", open);
      question.setAttribute("aria-expanded", String(open));
      wrap.style.maxHeight = open ? `${wrap.scrollHeight}px` : "0px";
    }

    sync(item.classList.contains("is-open"));

    question.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      sync(willOpen);
    });
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
