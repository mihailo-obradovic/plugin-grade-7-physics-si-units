import { createRoot } from 'react-dom/client';
import { useState, useSyncExternalStore, useCallback } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx

// src/content.ts
var quizContent = {
  en: {
    questions: [
      {
        prompt: 'What does the abbreviation "m" mean?',
        choices: ["Metre", "Mile", "Minute", "Mass"],
        answerIndex: 0
      },
      {
        prompt: "Which of these is a unit of mass?",
        choices: ["Metre (m)", "Kilogram (kg)", "Second (s)", "Kelvin (K)"],
        answerIndex: 1
      },
      {
        prompt: "Which abbreviation stands for the second?",
        choices: ["sec", "s", "sec.", "sr"],
        answerIndex: 1
      },
      {
        prompt: "Kilogram (kg) is a unit of:",
        choices: ["Length", "Mass", "Time", "Temperature"],
        answerIndex: 1
      },
      {
        prompt: "Which abbreviation represents the ampere (unit of electric current)?",
        choices: ["Amp", "A", "Am", "Ap"],
        answerIndex: 1
      }
    ]
  },
  "sr-latn": {
    questions: [
      {
        prompt: '\u0160ta skra\u0107enica "m" ozna\u010Dava?',
        choices: ["Metar", "Milja", "Minuta", "Masa"],
        answerIndex: 0
      },
      {
        prompt: "Koja od ovih je jedinica za masu?",
        choices: ["Metar (m)", "Kilogram (kg)", "Sekunda (s)", "Kelvin (K)"],
        answerIndex: 1
      },
      {
        prompt: "Koja skra\u0107enica ozna\u010Dava sekundu?",
        choices: ["sec", "s", "sec.", "sr"],
        answerIndex: 1
      },
      {
        prompt: "Kilogram (kg) je jedinica za:",
        choices: ["Du\u017Einu", "Masu", "Vrijeme", "Temperaturu"],
        answerIndex: 1
      },
      {
        prompt: "Koja skra\u0107enica predstavlja amper (jedinicu elektri\u010Dne struje)?",
        choices: ["Amp", "A", "Am", "Ap"],
        answerIndex: 1
      }
    ]
  },
  "sr-cyrl": {
    questions: [
      {
        prompt: '\u0428\u0442\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 "\u043C" \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430?',
        choices: ["\u041C\u0435\u0442\u0430\u0440", "\u041C\u0438\u0459\u0430", "\u041C\u0438\u043D\u0443\u0442\u0430", "\u041C\u0430\u0441\u0430"],
        answerIndex: 0
      },
      {
        prompt: "\u041A\u043E\u0458\u0430 \u043E\u0434 \u043E\u0432\u0438\u0445 \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430 \u043C\u0430\u0441\u0443?",
        choices: ["\u041C\u0435\u0442\u0430\u0440 (m)", "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg)", "\u0421\u0435\u043A\u0443\u043D\u0434\u0430 (s)", "\u041A\u0435\u043B\u0432\u0438\u043D (K)"],
        answerIndex: 1
      },
      {
        prompt: "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430 \u0441\u0435\u043A\u0443\u043D\u0434\u0443?",
        choices: ["sec", "s", "sec.", "sr"],
        answerIndex: 1
      },
      {
        prompt: "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg) \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430:",
        choices: ["\u0414\u0443\u0436\u0438\u043D\u0443", "\u041C\u0430\u0441\u0443", "\u0412\u0440\u0435\u043C\u0435", "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0443"],
        answerIndex: 1
      },
      {
        prompt: "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0459\u0430 \u0430\u043C\u043F\u0435\u0440 (\u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0443 \u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0435 \u0441\u0442\u0440\u0443\u0458\u0435)?",
        choices: ["Amp", "A", "Am", "Ap"],
        answerIndex: 1
      }
    ]
  }
};

// src/i18n/messages/en.json
var en_default = {
  title: "SI abbreviations and units",
  intro: "Answer all {total} questions, then submit to check your work.",
  submit: "Submit answers",
  progress: "{answered}/{total} answered",
  result: "You scored {score} out of {total}."
};

// src/i18n/messages/sr-cyrl.json
var sr_cyrl_default = {
  title: "\u0421\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0435 \u0438 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0435 SI \u0441\u0438\u0441\u0442\u0435\u043C\u0430",
  intro: "\u041E\u0434\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u0438\u0445 {total} \u043F\u0438\u0442\u0430\u045A\u0430, \u0430 \u0437\u0430\u0442\u0438\u043C \u043F\u043E\u0448\u0430\u0459\u0438\u0442\u0435 \u0434\u0430 \u043F\u0440\u043E\u0432\u0458\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435.",
  submit: "\u041F\u043E\u0448\u0430\u0459\u0438 \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435",
  progress: "{answered}/{total} \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043E",
  result: "\u041E\u0441\u0442\u0432\u0430\u0440\u0438\u043B\u0438 \u0441\u0442\u0435 {score} \u043E\u0434 {total}."
};

// src/i18n/messages/sr-latn.json
var sr_latn_default = {
  title: "Skra\u0107enice i jedinice SI sistema",
  intro: "Odgovorite na svih {total} pitanja, a zatim po\u0161aljite da provjerite odgovore.",
  submit: "Po\u0161alji odgovore",
  progress: "{answered}/{total} odgovoreno",
  result: "Osvojili ste {score} od {total}."
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
function QuizApp({ context }) {
  const locale = usePluginLocale(context.i18n);
  const t = usePluginTranslations(context.i18n);
  const questions = quizContent[locale].questions;
  const [selections, setSelections] = useState(
    () => Object.fromEntries(questions.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const answeredCount = questions.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === questions.length;
  function handleSelect(questionIndex, choiceIndex) {
    if (submitted) {
      return;
    }
    setSelections((current) => ({
      ...current,
      [questionIndex]: choiceIndex
    }));
  }
  function handleSubmit() {
    if (!allAnswered || submitted) {
      return;
    }
    const nextScore = questions.reduce((total, question, index) => {
      if (selections[index] === question.answerIndex) {
        return total + 1;
      }
      return total;
    }, 0);
    setScore(nextScore);
    setSubmitted(true);
    context.reportProgress({
      score: nextScore,
      completed: true
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-root", children: [
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-title", children: t("title") }),
    /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-intro", children: t("intro", { total: questions.length }) }),
    questions.map((question, questionIndex) => /* @__PURE__ */ jsxs(
      "section",
      {
        className: "pl-g7-physics-si-units-question",
        "aria-labelledby": `pl-g7-physics-si-units-q${questionIndex}-title`,
        children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              id: `pl-g7-physics-si-units-q${questionIndex}-title`,
              className: "pl-g7-physics-si-units-question-title",
              children: question.prompt
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "pl-g7-physics-si-units-options",
              role: "group",
              "aria-label": question.prompt,
              children: question.choices.map((choice, choiceIndex) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "pl-g7-physics-si-units-option",
                  "data-selected": selections[questionIndex] === choiceIndex,
                  "aria-pressed": selections[questionIndex] === choiceIndex,
                  onClick: () => handleSelect(questionIndex, choiceIndex),
                  children: choice
                },
                choiceIndex
              ))
            }
          )
        ]
      },
      questionIndex
    )),
    /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-actions", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "pl-g7-physics-si-units-submit",
          disabled: !allAnswered || submitted,
          onClick: handleSubmit,
          children: t("submit")
        }
      ),
      !allAnswered && !submitted ? /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-intro", children: t("progress", {
        answered: answeredCount,
        total: questions.length
      }) }) : null
    ] }),
    submitted && score !== null ? /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-result", children: t("result", { score, total: questions.length }) }) : null
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