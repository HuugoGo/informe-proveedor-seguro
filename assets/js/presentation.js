/* Navegación del deck de presentación: sólo mediante los botones "<"/">"
   o las flechas del teclado. La rueda del mouse / gestos de scroll jamás
   cambian de lámina — como mucho, hacen scroll DENTRO de la lámina activa
   si su contenido es más alto que la pantalla. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var deck = document.querySelector(".deck");
    if (!deck) return;
    var slides = Array.prototype.slice.call(deck.querySelectorAll(".slide"));
    var total = slides.length;
    var dotsWrap = document.querySelector(".slide-dots");
    var btnPrev = document.querySelector("[data-deck-prev]");
    var btnNext = document.querySelector("[data-deck-next]");
    var current = 0;

    slides.forEach(function (s, i) {
      s.setAttribute("data-index", i + 1);
      s.setAttribute("data-total", total);
    });

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.setAttribute("aria-label", "Ir a la lámina " + (i + 1));
        b.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(b);
      });
    }

    function render(index) {
      current = index;
      slides.forEach(function (s, i) {
        s.classList.toggle("active", i === index);
        if (i === index) s.scrollTop = 0;
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (b, i) {
          b.classList.toggle("active", i === index);
        });
      }
      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) btnNext.disabled = index === total - 1;
    }

    function goTo(index) {
      index = Math.max(0, Math.min(total - 1, index));
      if (index !== current) render(index);
    }

    if (btnPrev) btnPrev.addEventListener("click", function () { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener("click", function () { goTo(current + 1); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goTo(current - 1); }
    });

    render(0);
  });
})();
