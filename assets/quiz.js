/**
 * Inline quiz: each .q has data-answer (0-based index of correct button.opt).
 * Options should be equal length to avoid answer cues.
 *
 * Optional richer feedback (backward compatible):
 * - data-explain on .q — why the correct answer is right
 * - data-source on .q — short citation shown after explain
 * - data-why on button.opt — why this wrong option fails (used when picked)
 *
 * Without those attributes, feedback stays the short legacy text.
 */
(function () {
  function buildFeedback(ok, q, chosenBtn, correctBtn) {
    var explain = (q.getAttribute("data-explain") || "").trim();
    var source = (q.getAttribute("data-source") || "").trim();
    var whyWrong = chosenBtn ? (chosenBtn.getAttribute("data-why") || "").trim() : "";
    var rich = !!(explain || source || whyWrong);

    if (!rich) {
      return ok ? "Klopt." : "Niet dit — zie het groene antwoord.";
    }

    var parts = [];
    if (ok) {
      parts.push("Klopt.");
      if (explain) parts.push(explain);
    } else {
      parts.push("Niet dit.");
      if (whyWrong) {
        parts.push(whyWrong);
      } else if (correctBtn) {
        parts.push("Juiste keuze: “" + correctBtn.textContent.trim() + "”.");
      }
      if (explain) parts.push(explain);
    }
    if (source) parts.push("Bron: " + source + ".");
    return parts.join(" ");
  }

  function initQuiz(root) {
    root.querySelectorAll(".q").forEach(function (q) {
      var answer = parseInt(q.getAttribute("data-answer"), 10);
      var feedback = q.querySelector(".feedback");
      var buttons = Array.prototype.slice.call(q.querySelectorAll("button.opt"));
      buttons.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.disabled = true;
          });
          var ok = i === answer;
          if (ok) {
            btn.classList.add("correct");
          } else {
            btn.classList.add("wrong");
            if (buttons[answer]) buttons[answer].classList.add("correct");
          }
          if (feedback) {
            feedback.textContent = buildFeedback(ok, q, btn, buttons[answer]);
          }
        });
      });
    });
  }

  document.querySelectorAll(".quiz").forEach(initQuiz);
})();
