import { createRoot } from 'react-dom/client';
import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx

// src/content.ts
var QUESTIONS_BY_LOCALE = {
  "en": [
    {
      "prompt": 'What does the abbreviation "m" mean?',
      "choices": [
        "Metre",
        "Mile",
        "Minute",
        "Mass"
      ],
      "answerIndex": 0,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "Which of these is a unit of mass?",
      "choices": [
        "Metre (m)",
        "Kilogram (kg)",
        "Second (s)",
        "Kelvin (K)"
      ],
      "answerIndex": 1,
      "emoji": "\u2696\uFE0F"
    },
    {
      "prompt": "Which abbreviation stands for the second?",
      "choices": [
        "sec",
        "s",
        "sec.",
        "sr"
      ],
      "answerIndex": 1,
      "emoji": "\u23F1\uFE0F"
    },
    {
      "prompt": "Kilogram (kg) is a unit of:",
      "choices": [
        "Length",
        "Mass",
        "Time",
        "Temperature"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F3CB}\uFE0F"
    },
    {
      "prompt": "Which abbreviation represents the ampere (unit of electric current)?",
      "choices": [
        "Amp",
        "A",
        "Am",
        "Ap"
      ],
      "answerIndex": 1,
      "emoji": "\u26A1"
    }
  ],
  "sr-latn": [
    {
      "prompt": '\u0160ta skra\u0107enica "m" ozna\u010Dava?',
      "choices": [
        "Metar",
        "Milja",
        "Minuta",
        "Masa"
      ],
      "answerIndex": 0,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "Koja od ovih je jedinica za masu?",
      "choices": [
        "Metar (m)",
        "Kilogram (kg)",
        "Sekunda (s)",
        "Kelvin (K)"
      ],
      "answerIndex": 1,
      "emoji": "\u2696\uFE0F"
    },
    {
      "prompt": "Koja skra\u0107enica ozna\u010Dava sekundu?",
      "choices": [
        "sec",
        "s",
        "sec.",
        "sr"
      ],
      "answerIndex": 1,
      "emoji": "\u23F1\uFE0F"
    },
    {
      "prompt": "Kilogram (kg) je jedinica za:",
      "choices": [
        "Du\u017Einu",
        "Masu",
        "Vrijeme",
        "Temperaturu"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F3CB}\uFE0F"
    },
    {
      "prompt": "Koja skra\u0107enica predstavlja amper (jedinicu elektri\u010Dne struje)?",
      "choices": [
        "Amp",
        "A",
        "Am",
        "Ap"
      ],
      "answerIndex": 1,
      "emoji": "\u26A1"
    }
  ],
  "sr-cyrl": [
    {
      "prompt": '\u0428\u0442\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 "\u043C" \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430?',
      "choices": [
        "\u041C\u0435\u0442\u0430\u0440",
        "\u041C\u0438\u0459\u0430",
        "\u041C\u0438\u043D\u0443\u0442\u0430",
        "\u041C\u0430\u0441\u0430"
      ],
      "answerIndex": 0,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "\u041A\u043E\u0458\u0430 \u043E\u0434 \u043E\u0432\u0438\u0445 \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430 \u043C\u0430\u0441\u0443?",
      "choices": [
        "\u041C\u0435\u0442\u0430\u0440 (m)",
        "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg)",
        "\u0421\u0435\u043A\u0443\u043D\u0434\u0430 (s)",
        "\u041A\u0435\u043B\u0432\u0438\u043D (K)"
      ],
      "answerIndex": 1,
      "emoji": "\u2696\uFE0F"
    },
    {
      "prompt": "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430 \u0441\u0435\u043A\u0443\u043D\u0434\u0443?",
      "choices": [
        "sec",
        "s",
        "sec.",
        "sr"
      ],
      "answerIndex": 1,
      "emoji": "\u23F1\uFE0F"
    },
    {
      "prompt": "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg) \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430:",
      "choices": [
        "\u0414\u0443\u0436\u0438\u043D\u0443",
        "\u041C\u0430\u0441\u0443",
        "\u0412\u0440\u0438\u0458\u0435\u043C\u0435",
        "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0443"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F3CB}\uFE0F"
    },
    {
      "prompt": "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0459\u0430 \u0430\u043C\u043F\u0435\u0440 (\u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0443 \u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0435 \u0441\u0442\u0440\u0443\u0458\u0435)?",
      "choices": [
        "Amp",
        "A",
        "Am",
        "Ap"
      ],
      "answerIndex": 1,
      "emoji": "\u26A1"
    }
  ]
};

// src/i18n/messages/en.json
var en_default = {
  title: "SI abbreviations and units",
  progress: "Question {done} of {total}",
  correct: "Great job!",
  wrong: "Not yet \u2014 try again!",
  completeTitle: "You did it!",
  completeBody: "You answered all {count} questions!",
  playAgain: "Play again"
};

// src/i18n/messages/sr-cyrl.json
var sr_cyrl_default = {
  title: "\u0421\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0435 \u0438 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0435 SI \u0441\u0438\u0441\u0442\u0435\u043C\u0430",
  progress: "\u041F\u0438\u0442\u0430\u045A\u0435 {done} \u043E\u0434 {total}",
  correct: "\u0411\u0440\u0430\u0432\u043E!",
  wrong: "\u0408\u043E\u0448 \u043D\u0435 \u2014 \u043F\u043E\u043A\u0443\u0448\u0430\u0458 \u043F\u043E\u043D\u043E\u0432\u043E!",
  completeTitle: "\u0421\u0458\u0430\u0458\u043D\u043E!",
  completeBody: "\u0420\u0438\u0458\u0435\u0448\u0435\u043D\u0430 \u0441\u0443 \u0441\u0432\u0430 \u043F\u0438\u0442\u0430\u045A\u0430 \u2014 \u0441\u0432\u0438\u0445 {count}!",
  playAgain: "\u0418\u0433\u0440\u0430\u0458 \u043F\u043E\u043D\u043E\u0432\u043E"
};

// src/i18n/messages/sr-latn.json
var sr_latn_default = {
  title: "Skra\u0107enice i jedinice SI sistema",
  progress: "Pitanje {done} od {total}",
  correct: "Bravo!",
  wrong: "Jo\u0161 ne \u2014 poku\u0161aj ponovo!",
  completeTitle: "Sjajno!",
  completeBody: "Rije\u0161ena su sva pitanja \u2014 svih {count}!",
  playAgain: "Igraj ponovo"
};

// src/i18n/messages.ts
var pluginMessages = {
  en: en_default,
  "sr-latn": sr_latn_default,
  "sr-cyrl": sr_cyrl_default
};

// src/i18n/usePluginTranslations.ts
function formatMessage(template, values) {
  if (!values) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = values[key];
    return value === void 0 ? `{${key}}` : String(value);
  });
}
function usePluginLocale(i18n) {
  return useSyncExternalStore(i18n.subscribe, i18n.getLocale, i18n.getLocale);
}
function usePluginTranslations(i18n) {
  const locale = usePluginLocale(i18n);
  const catalog = pluginMessages[locale];
  return useCallback(
    (key, values) => formatMessage(catalog[key], values),
    [catalog]
  );
}
var CELEBRATE_MS = 1500;
var LONG_CHOICE_CHARS = 28;
var cx = (...names) => names.filter(Boolean).join(" ");
function optionsLayout(choices) {
  if (choices.some((choice) => choice.length > LONG_CHOICE_CHARS)) {
    return "column";
  }
  return choices.length === 3 ? "row" : "grid";
}
function stepStyle(i) {
  return { ["--pl-i"]: i };
}
function Confetti({ pieces = 28 }) {
  return /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-confetti", "aria-hidden": "true", children: Array.from({ length: pieces }).map((_, i) => {
    const style = {
      ["--pl-x"]: `${i * 37 % 100}%`,
      ["--pl-hue"]: i * 47 % 360,
      ["--pl-delay"]: `${i % 7 * 90}ms`,
      ["--pl-dur"]: `${1400 + i * 53 % 900}ms`
    };
    return /* @__PURE__ */ jsx("span", { className: "pl-g7-physics-si-units-confetti-piece", style }, i);
  }) });
}
function SlideView({
  question,
  index,
  total,
  points,
  t,
  onSolved
}) {
  const { prompt, choices, answerIndex, emoji } = question;
  const [wrong, setWrong] = useState(() => /* @__PURE__ */ new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState(null);
  const solved = solvedIndex !== null;
  const handlePick = (choiceIndex) => {
    if (solved || wrong.has(choiceIndex)) {
      return;
    }
    if (choiceIndex === answerIndex) {
      const earned = Math.max(
        0,
        points * (1 - wrongCount / (choices.length - 1))
      );
      setSolvedIndex(choiceIndex);
      onSolved(index, earned);
      return;
    }
    setWrong((prev) => new Set(prev).add(choiceIndex));
    setWrongCount((count) => count + 1);
  };
  const feedback = solved ? t("correct") : wrongCount > 0 ? t("wrong") : "";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx(
        "pl-g7-physics-si-units-slide",
        solved ? "pl-g7-physics-si-units-slide-solved" : ""
      ),
      children: [
        emoji ? /* @__PURE__ */ jsx("span", { className: "pl-g7-physics-si-units-emoji", "aria-hidden": "true", children: emoji }) : null,
        /* @__PURE__ */ jsx("h3", { className: "pl-g7-physics-si-units-prompt", children: prompt }),
        /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-options", "data-layout": optionsLayout(choices), children: choices.map((choice, choiceIndex) => {
          const isWrong = wrong.has(choiceIndex);
          const isRight = solvedIndex === choiceIndex;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: cx(
                "pl-g7-physics-si-units-option",
                isWrong ? "pl-g7-physics-si-units-option-wrong" : "",
                isRight ? "pl-g7-physics-si-units-option-right" : ""
              ),
              style: stepStyle(choiceIndex),
              onClick: () => handlePick(choiceIndex),
              disabled: solved || isWrong,
              children: choice
            },
            choiceIndex
          );
        }) }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-sr-only", "aria-live": "polite", children: feedback }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-step", children: t("progress", { done: index + 1, total }) }),
        solved ? /* @__PURE__ */ jsx(Confetti, {}) : null
      ]
    }
  );
}
function QuizApp({ context }) {
  const t = usePluginTranslations(context.i18n);
  const locale = usePluginLocale(context.i18n);
  const questions = QUESTIONS_BY_LOCALE[locale];
  const total = questions.length;
  const points = 100 / total;
  const [slideIndex, setSlideIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const earnedRef = useRef(0);
  const advanceTimer = useRef(null);
  const clearAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };
  useEffect(() => clearAdvance, []);
  const handleSolved = useCallback(
    (index, earned) => {
      earnedRef.current += earned;
      const isLast = index === total - 1;
      context.reportProgress({
        score: Math.round(earnedRef.current),
        completed: isLast
      });
      clearAdvance();
      advanceTimer.current = setTimeout(() => {
        if (isLast) {
          setCompleted(true);
        } else {
          setSlideIndex(index + 1);
        }
      }, CELEBRATE_MS);
    },
    [context, total]
  );
  const restart = () => {
    clearAdvance();
    earnedRef.current = 0;
    setSlideIndex(0);
    setCompleted(false);
  };
  const safeIndex = Math.min(slideIndex, total - 1);
  if (completed) {
    return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-root", children: [
      /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-complete", children: [
        /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-parade", "aria-hidden": "true", children: questions.map((question, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "pl-g7-physics-si-units-parade-obj",
            style: stepStyle(i),
            children: question.emoji ?? "\u2B50"
          },
          i
        )) }),
        /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-complete-title", children: t("completeTitle") }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-complete-body", children: t("completeBody", { count: total }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "pl-g7-physics-si-units-play-again",
            onClick: restart,
            children: t("playAgain")
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Confetti, { pieces: 40 })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-root", children: [
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-title", children: t("title") }),
    /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-trail", "aria-hidden": "true", children: questions.map((question, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: cx(
          "pl-g7-physics-si-units-trail-icon",
          i < safeIndex ? "pl-g7-physics-si-units-trail-done" : "",
          i === safeIndex ? "pl-g7-physics-si-units-trail-active" : ""
        ),
        children: question.emoji ?? i + 1
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-stage", children: /* @__PURE__ */ jsx(
      SlideView,
      {
        question: questions[safeIndex],
        index: safeIndex,
        total,
        points,
        t,
        onSolved: handleSolved
      },
      safeIndex
    ) })
  ] });
}
var roots = /* @__PURE__ */ new WeakMap();
function mount(root, context) {
  const reactRoot = createRoot(root);
  roots.set(root, reactRoot);
  reactRoot.render(/* @__PURE__ */ jsx(QuizApp, { context }));
  return () => {
    reactRoot.unmount();
    roots.delete(root);
  };
}

export { mount };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map