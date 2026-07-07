import { useState } from 'react';

import type { PluginContext } from './types';

type Question = {
  prompt: string;
  choices: string[];
  answerIndex: number;
};

const TITLE = 'Скраћенице и јединице SI система';

const QUESTIONS: Question[] = [
  {
    "prompt": "Шта скраћеница \"м\" означава?",
    "choices": [
      "Метар",
      "Миља",
      "Минута",
      "Маса"
    ],
    "answerIndex": 0
  },
  {
    "prompt": "Која од ових је јединица за масу?",
    "choices": [
      "Метар (m)",
      "Килограм (kg)",
      "Секунда (s)",
      "Келвин (K)"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "Која скраћеница означава секунду?",
    "choices": [
      "sec",
      "s",
      "sec.",
      "sr"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "Килограм (kg) је јединица за:?",
    "choices": [
      "Дужину",
      "Масу",
      "Време",
      "Температуру"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "Која скраћеница представља ампер (јединицу електричне струје)?",
    "choices": [
      "Amp",
      "A",
      "Am",
      "Ap"
    ],
    "answerIndex": 1
  }
];

type Props = {
  context: PluginContext;
};

export default function QuizApp({ context }: Props) {
  const [selections, setSelections] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(QUESTIONS.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const answeredCount = QUESTIONS.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleSelect(questionIndex: number, choiceIndex: number) {
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

  return (
    <div className="pl-g7-physics-si-units-root">
      {TITLE ? <h2 className="pl-g7-physics-si-units-title">{TITLE}</h2> : null}

      <p className="pl-g7-physics-si-units-intro">
        Answer all {QUESTIONS.length} questions, then submit to check your work.
      </p>

      {QUESTIONS.map((question, questionIndex) => (
        <section
          key={questionIndex}
          className="pl-g7-physics-si-units-question"
          aria-labelledby={`pl-g7-physics-si-units-q${questionIndex}-title`}
        >
          <h3
            id={`pl-g7-physics-si-units-q${questionIndex}-title`}
            className="pl-g7-physics-si-units-question-title"
          >
            {question.prompt}
          </h3>

          <div
            className="pl-g7-physics-si-units-options"
            role="group"
            aria-label={question.prompt}
          >
            {question.choices.map((choice, choiceIndex) => (
              <button
                key={choiceIndex}
                type="button"
                className="pl-g7-physics-si-units-option"
                data-selected={selections[questionIndex] === choiceIndex}
                aria-pressed={selections[questionIndex] === choiceIndex}
                onClick={() => handleSelect(questionIndex, choiceIndex)}
              >
                {choice}
              </button>
            ))}
          </div>
        </section>
      ))}

      <div className="pl-g7-physics-si-units-actions">
        <button
          type="button"
          className="pl-g7-physics-si-units-submit"
          disabled={!allAnswered || submitted}
          onClick={handleSubmit}
        >
          Submit answers
        </button>

        {!allAnswered && !submitted ? (
          <p className="pl-g7-physics-si-units-intro">
            {answeredCount}/{QUESTIONS.length} answered
          </p>
        ) : null}
      </div>

      {submitted && score !== null ? (
        <p className="pl-g7-physics-si-units-result">
          You scored {score} out of {QUESTIONS.length}.
        </p>
      ) : null}
    </div>
  );
}
