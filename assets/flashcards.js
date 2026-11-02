/**
 * Flitskaarten: #flashcards[data-cards] = JSON [{front, back}, ...]
 * Toets ruimte / klik kaart = omdraaien; knoppen = vorige/volgende/shuffle.
 */
(function () {
  function parseCards(el) {
    try {
      return JSON.parse(el.getAttribute("data-cards") || "[]");
    } catch (e) {
      return [];
    }
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function init(root) {
    var cards = parseCards(root);
    if (!cards.length) return;

    var order = cards.map(function (_, i) {
      return i;
    });
    var idx = 0;
    var flipped = false;

    var face = root.querySelector(".fc-face");
    var meta = root.querySelector(".fc-meta");
    var btnPrev = root.querySelector("[data-fc=prev]");
    var btnNext = root.querySelector("[data-fc=next]");
    var btnShuffle = root.querySelector("[data-fc=shuffle]");
    var btnFlip = root.querySelector("[data-fc=flip]");

    function current() {
      return cards[order[idx]];
    }

    function render() {
      var c = current();
      flipped = false;
      if (face) {
        face.textContent = c.front;
        face.setAttribute("data-side", "front");
      }
      if (meta) meta.textContent = idx + 1 + " / " + cards.length;
    }

    function flip() {
      var c = current();
      flipped = !flipped;
      if (face) {
        face.textContent = flipped ? c.back : c.front;
        face.setAttribute("data-side", flipped ? "back" : "front");
      }
    }

    function go(delta) {
      idx = (idx + delta + cards.length) % cards.length;
      render();
    }

    if (face) face.addEventListener("click", flip);
    if (btnFlip) btnFlip.addEventListener("click", flip);
    if (btnPrev) btnPrev.addEventListener("click", function () { go(-1); });
    if (btnNext) btnNext.addEventListener("click", function () { go(1); });
    if (btnShuffle) {
      btnShuffle.addEventListener("click", function () {
        order = shuffle(order);
        idx = 0;
        render();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!root.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flip();
      } else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    });

    render();
  }

  document.querySelectorAll("#flashcards, .flashcards").forEach(init);
})();
