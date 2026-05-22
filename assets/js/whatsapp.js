(function () {
  "use strict";

  const phone = "917905791668";
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);
  const buildUrl = (message) => {
    const base = isMobile() ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    return `${base}?phone=${phone}&text=${encodeURIComponent(message || "Hello Adeena Interiors, I want to discuss an interior design project.")}`;
  };

  function hydrateLinks() {
    document.querySelectorAll(".whatsapp-link").forEach((link) => {
      const message = link.dataset.message || "Hello Adeena Interiors, I want to discuss an interior design project.";
      link.setAttribute("href", buildUrl(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  function handleForms() {
    document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const message = [
          "Hello Adeena Interiors, I want to discuss a project.",
          `Name: ${data.get("name") || ""}`,
          `Phone: ${data.get("phone") || ""}`,
          `Email: ${data.get("email") || ""}`,
          `Service: ${data.get("service") || ""}`,
          `Message: ${data.get("message") || ""}`
        ].join("\n");
        window.open(buildUrl(message), "_blank", "noopener");
        form.reset();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateLinks();
    handleForms();
    setTimeout(hydrateLinks, 120);
  });
}());
