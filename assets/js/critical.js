(function () {
  "use strict";

  const business = {
    name: "Adeena Interiors",
    phoneDisplay: "+91 7905791668",
    phone: "917905791668",
    email: "arman07131khan@gmail.com",
    address: "FF-27, Petal Trillium, Before Navrachna International School, 24 Meter High Tension Road, TP2, Bhayli, Vadodara, Gujarat 391410",
    hours: "Mon–Sat 09am–09pm"
  };

  const links = [
    ["Home", "index.html", "home"],
    ["About", "about.html", "about"],
    ["Services", "services.html", "services"],
    ["Gallery", "gallery.html", "gallery"],
    ["Projects", "projects.html", "projects"],
    ["Contact", "contact.html", "contact"]
  ];

  const getPage = () => document.body.dataset.page || "home";

  function linkMarkup(isMobile) {
    const current = getPage();
    const className = isMobile ? "mobile-links" : "nav-links";
    return `<ul class="${className}" aria-label="${isMobile ? "Mobile" : "Primary"} navigation">
      ${links.map(([label, href, key]) => {
        const active = current === key || (current === "service-details" && key === "services");
        return `<li><a class="nav-link" href="${href}" ${active ? 'aria-current="page"' : ""}>${label}</a></li>`;
      }).join("")}
    </ul>`;
  }

  function injectPreloader() {
    if (document.querySelector(".preloader")) return;
    const loader = document.createElement("div");
    loader.className = "preloader";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-label", "Loading Adeena Interiors");
    document.body.prepend(loader);
    window.addEventListener("load", () => {
      loader.classList.add("is-hidden");
      setTimeout(() => loader.remove(), 520);
    }, { once: true });
  }

  function injectNavbar() {
    const header = document.getElementById("mainNavbar");
    if (!header) return;
    header.className = "site-header";
    header.innerHTML = `
      <nav class="navbar" aria-label="Main navigation">
        <a class="navbar-brand" href="index.html" aria-label="Adeena Interiors home">
          <img src="assets/images/logo.svg" width="212" height="54" alt="Adeena Interiors">
        </a>
        ${linkMarkup(false)}
        <div class="nav-actions">
          <a class="btn btn-secondary whatsapp-link" href="#" data-message="Hello Adeena Interiors, I want to discuss an interior design project." aria-label="Chat with Adeena Interiors on WhatsApp">
            <i data-lucide="message-circle" aria-hidden="true"></i>
            Consult
          </a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-controls="mobileMenu" aria-expanded="false">
            <i data-lucide="menu" aria-hidden="true"></i>
          </button>
        </div>
      </nav>
      <aside class="mobile-panel" id="mobileMenu" aria-label="Mobile menu">
        ${linkMarkup(true)}
        <a class="btn btn-primary whatsapp-link" href="#" data-message="Hello Adeena Interiors, I want to book a design consultation.">
          <i data-lucide="message-circle" aria-hidden="true"></i>
          Start on WhatsApp
        </a>
      </aside>`;

    const toggle = header.querySelector(".nav-toggle");
    const panel = header.querySelector(".mobile-panel");
    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function injectFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">

            <!-- Brand column -->
            <div class="footer-brand-col footer-brand-col-first">
              <img src="assets/images/logo.svg" width="212" height="54" alt="Adeena Interiors">
              <p>Premium interior design studio crafting calm, layered and functional spaces for homes, workspaces and hospitality environments in Vadodara.</p>
              <div class="footer-social" aria-label="Social media links">
                <a href="#" aria-label="Follow on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" aria-label="Follow on Pinterest">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.9 6.4 9.4-.1-.8-.1-2.1.2-3l1.3-5.6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.3-2.8 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.3.6 2.3 1.8 2.3 2.1 0 3.7-2.2 3.7-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1 1 2.7a.4.4 0 0 1 .1.4l-.4 1.5c-.1.3-.3.4-.5.3-1.9-.9-3-3.7-3-5.9 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.7 6.9-1.1 0-2.1-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.1-1.3 2.9.9.3 1.8.5 2.8.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                </a>
                <a href="#" aria-label="Connect on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.5M12 10v7m0-5c0-2.2 1.3-3 2.8-3 1.6 0 2.2 1.2 2.2 3v5"/></svg>
                </a>
                <a href="#" aria-label="Watch on YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10,9 10,15 15,12" fill="currentColor" stroke="none"/></svg>
                </a>
              </div>
            </div>

            <!-- Pages column -->
            <div class="footer-pages-col-2">
              <p class="footer-col-title">Pages</p>
              <nav class="footer-links" aria-label="Footer pages">
                ${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
              </nav>
            </div>

            <!-- Services column -->
            <div class="footer-pages-col-3">
              <p class="footer-col-title">Services</p>
              <nav class="footer-links" aria-label="Footer services">
                <a href="service-details.html">Residential Interiors</a>
                <a href="service-details.html">Commercial Interiors</a>
                <a href="service-details.html">Space Planning</a>
                <a href="service-details.html">Turnkey Execution</a>
                <a href="service-details.html">Design Consultation</a>
              </nav>
            </div>

            <!-- Contact column -->
            <div class="footer-pages-col-4"> 
              <p class="footer-col-title">Contact</p>
              <div class="footer-contact-list">
                <div class="footer-contact-item">
                  <i data-lucide="phone" aria-hidden="true"></i>
                  <span><a class="whatsapp-link" href="#" data-message="Hello Adeena Interiors, I would like to connect.">${business.phoneDisplay}</a></span>
                </div>
                <div class="footer-contact-item">
                  <i data-lucide="mail" aria-hidden="true"></i>
                  <span><a href="mailto:${business.email}">${business.email}</a></span>
                </div>
                <div class="footer-contact-item">
                  <i data-lucide="clock" aria-hidden="true"></i>
                  <span>${business.hours}</span>
                </div>
                <div class="footer-contact-item">
                  <i data-lucide="map-pin" aria-hidden="true"></i>
                  <span>${business.address}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-inner">
            <p class="footer-copyright">
              &copy; ${new Date().getFullYear()} All Rights Reserved By Adeena Interiors | Developed by <a href="https://shriiitrackingsolution.in/" target="_blank">
                    <b>Shriii&nbsp;Tracking&nbsp;Solution</b>
                  </a>
            </p>
          </div>
        </div>
      </div>`;
  }

  function handleScrollState() {
    const header = document.getElementById("mainNavbar");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectPreloader();
    injectNavbar();
    injectFooter();
    handleScrollState();
  });
}());
