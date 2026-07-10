import type { PluginLocale } from './types';

type Question = {
  prompt: string;
  choices: string[];
  answerIndex: number;
};

type QuizContent = {
  questions: readonly Question[];
};

export const quizContent: Record<PluginLocale, QuizContent> = {
  en: {
    questions: [
      {
        prompt: 'What does the abbreviation "m" mean?',
        choices: ['Metre', 'Mile', 'Minute', 'Mass'],
        answerIndex: 0
      },
      {
        prompt: 'Which of these is a unit of mass?',
        choices: ['Metre (m)', 'Kilogram (kg)', 'Second (s)', 'Kelvin (K)'],
        answerIndex: 1
      },
      {
        prompt: 'Which abbreviation stands for the second?',
        choices: ['sec', 's', 'sec.', 'sr'],
        answerIndex: 1
      },
      {
        prompt: 'Kilogram (kg) is a unit of:',
        choices: ['Length', 'Mass', 'Time', 'Temperature'],
        answerIndex: 1
      },
      {
        prompt:
          'Which abbreviation represents the ampere (unit of electric current)?',
        choices: ['Amp', 'A', 'Am', 'Ap'],
        answerIndex: 1
      }
    ]
  },
  'sr-latn': {
    questions: [
      {
        prompt: 'Šta skraćenica "m" označava?',
        choices: ['Metar', 'Milja', 'Minuta', 'Masa'],
        answerIndex: 0
      },
      {
        prompt: 'Koja od ovih je jedinica za masu?',
        choices: ['Metar (m)', 'Kilogram (kg)', 'Sekunda (s)', 'Kelvin (K)'],
        answerIndex: 1
      },
      {
        prompt: 'Koja skraćenica označava sekundu?',
        choices: ['sec', 's', 'sec.', 'sr'],
        answerIndex: 1
      },
      {
        prompt: 'Kilogram (kg) je jedinica za:',
        choices: ['Dužinu', 'Masu', 'Vrijeme', 'Temperaturu'],
        answerIndex: 1
      },
      {
        prompt:
          'Koja skraćenica predstavlja amper (jedinicu električne struje)?',
        choices: ['Amp', 'A', 'Am', 'Ap'],
        answerIndex: 1
      }
    ]
  },
  'sr-cyrl': {
    questions: [
      {
        prompt: 'Шта скраћеница "м" означава?',
        choices: ['Метар', 'Миља', 'Минута', 'Маса'],
        answerIndex: 0
      },
      {
        prompt: 'Која од ових је јединица за масу?',
        choices: ['Метар (m)', 'Килограм (kg)', 'Секунда (s)', 'Келвин (K)'],
        answerIndex: 1
      },
      {
        prompt: 'Која скраћеница означава секунду?',
        choices: ['sec', 's', 'sec.', 'sr'],
        answerIndex: 1
      },
      {
        prompt: 'Килограм (kg) је јединица за:',
        choices: ['Дужину', 'Масу', 'Време', 'Температуру'],
        answerIndex: 1
      },
      {
        prompt:
          'Која скраћеница представља ампер (јединицу електричне струје)?',
        choices: ['Amp', 'A', 'Am', 'Ap'],
        answerIndex: 1
      }
    ]
  }
};
