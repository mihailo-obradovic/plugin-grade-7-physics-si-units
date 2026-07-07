import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx
var TITLE = "\u0421\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0435 \u0438 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0435 SI \u0441\u0438\u0441\u0442\u0435\u043C\u0430";
var QUESTIONS = [
  {
    "prompt": '\u0428\u0442\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 "\u043C" \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430?',
    "choices": [
      "\u041C\u0435\u0442\u0430\u0440",
      "\u041C\u0438\u0459\u0430",
      "\u041C\u0438\u043D\u0443\u0442\u0430",
      "\u041C\u0430\u0441\u0430"
    ],
    "answerIndex": 0
  },
  {
    "prompt": "\u041A\u043E\u0458\u0430 \u043E\u0434 \u043E\u0432\u0438\u0445 \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430 \u043C\u0430\u0441\u0443?",
    "choices": [
      "\u041C\u0435\u0442\u0430\u0440 (m)",
      "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg)",
      "\u0421\u0435\u043A\u0443\u043D\u0434\u0430 (s)",
      "\u041A\u0435\u043B\u0432\u0438\u043D (K)"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043E\u0437\u043D\u0430\u0447\u0430\u0432\u0430 \u0441\u0435\u043A\u0443\u043D\u0434\u0443?",
    "choices": [
      "sec",
      "s",
      "sec.",
      "sr"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "\u041A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg) \u0458\u0435 \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430:?",
    "choices": [
      "\u0414\u0443\u0436\u0438\u043D\u0443",
      "\u041C\u0430\u0441\u0443",
      "\u0412\u0440\u0435\u043C\u0435",
      "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0443"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "\u041A\u043E\u0458\u0430 \u0441\u043A\u0440\u0430\u045B\u0435\u043D\u0438\u0446\u0430 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0459\u0430 \u0430\u043C\u043F\u0435\u0440 (\u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0443 \u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0435 \u0441\u0442\u0440\u0443\u0458\u0435)?",
    "choices": [
      "Amp",
      "A",
      "Am",
      "Ap"
    ],
    "answerIndex": 1
  }
];
function QuizApp({ context }) {
  const [selections, setSelections] = useState(
    () => Object.fromEntries(QUESTIONS.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const answeredCount = QUESTIONS.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === QUESTIONS.length;
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
    const nextScore = QUESTIONS.reduce((total, question, index) => {
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
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-title", children: TITLE }) ,
    /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-intro", children: [
      "Answer all ",
      QUESTIONS.length,
      " questions, then submit to check your work."
    ] }),
    QUESTIONS.map((question, questionIndex) => /* @__PURE__ */ jsxs(
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
          children: "Submit answers"
        }
      ),
      !allAnswered && !submitted ? /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-intro", children: [
        answeredCount,
        "/",
        QUESTIONS.length,
        " answered"
      ] }) : null
    ] }),
    submitted && score !== null ? /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-result", children: [
      "You scored ",
      score,
      " out of ",
      QUESTIONS.length,
      "."
    ] }) : null
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