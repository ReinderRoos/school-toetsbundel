/**
 * Inline quiz: each .q has data-answer (0-based index of correct button.opt).
 * Options should be equal length to avoid answer cues.
 */
(function () {
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
          if (i === answer) {
            btn.classList.add("correct");
            if (feedback) feedback.textContent = "Klopt.";
          } else {
            btn.classList.add("wrong");
            if (buttons[answer]) buttons[answer].classList.add("correct");
            if (feedback) feedback.textContent = "Niet dit — zie het groene antwoord.";
          }
        });
      });
    });
  }

  document.querySelectorAll(".quiz").forEach(initQuiz);
})();
