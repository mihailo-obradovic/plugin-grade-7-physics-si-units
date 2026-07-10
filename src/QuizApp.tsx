import { useState } from 'react';

import { quizContent } from './content';
import {
  usePluginLocale,
  usePluginTranslations
} from './i18n/usePluginTranslations';

import type { PluginContext } from './types';

type Props = {
  context: PluginContext;
};

export default function QuizApp({ context }: Props) {
  const locale = usePluginLocale(context.i18n);
  const t = usePluginTranslations(context.i18n);
  const questions = quizContent[locale].questions;

  const [selections, setSelections] = useState<Record<number, number | null>>(
    () => Object.fromEntries(questions.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const answeredCount = questions.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === questions.length;

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

  return (
    <div className="pl-g7-physics-si-units-root">
      <h2 className="pl-g7-physics-si-units-title">{t('title')}</h2>

      <p className="pl-g7-physics-si-units-intro">
        {t('intro', { total: questions.length })}
      </p>

      {questions.map((question, questionIndex) => (
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
          {t('submit')}
        </button>

        {!allAnswered && !submitted ? (
          <p className="pl-g7-physics-si-units-intro">
            {t('progress', {
              answered: answeredCount,
              total: questions.length
            })}
          </p>
        ) : null}
      </div>

      {submitted && score !== null ? (
        <p className="pl-g7-physics-si-units-result">
          {t('result', { score, total: questions.length })}
        </p>
      ) : null}
    </div>
  );
}
