// アプリ全体で使う型定義。
// 問題データ(questions.ts)はこの Question 型に従って書く。

export type ChoiceLabel = "A" | "B" | "C" | "D";

export type Difficulty = "normal" | "long" | "complex";

export type Question = {
  id: number;
  /** 目標時間（秒）。normal:90 / long:150 / complex:210〜240 */
  targetTime: number;
  difficulty: Difficulty;
  /** 分野タグ（結果画面の分野別分析に使う。問題画面には出さない） */
  tags: string[];
  /** 表示するJavaソースコード */
  code: string;
  choices: { label: ChoiceLabel; text: string }[];
  correctAnswer: ChoiceLabel;
  explanation: {
    reason: string;
    executionOrder: string[];
    whyOthersAreWrong: Partial<Record<ChoiceLabel, string>>;
    examPoint: string;
    quickJudgePoint: string;
    oneLineMemory: string;
    similarTrap?: string;
  };
};

/** 1問の解答記録 */
export type AnswerRecord = {
  questionId: number;
  selected: ChoiceLabel;
  correct: boolean;
  /** 解答にかかった秒数 */
  timeSpent: number;
  /** 目標時間内に解けたか */
  withinTarget: boolean;
};

/** localStorage に保存する学習履歴 */
export type StudyHistory = {
  /** 間違えた問題ID（重複なし） */
  wrongQuestionIds: number[];
  /** 「あとで復習」チェックした問題ID */
  laterReviewIds: number[];
  /** タグごとの正答数・出題数 */
  tagStats: Record<string, { correct: number; total: number }>;
  /** 累計の解答数 */
  totalAnswered: number;
  /** 累計の正答数 */
  totalCorrect: number;
  /** 現在の連続正解数 */
  currentStreak: number;
  /** 最大連続正解数 */
  bestStreak: number;
};

export const emptyHistory: StudyHistory = {
  wrongQuestionIds: [],
  laterReviewIds: [],
  tagStats: {},
  totalAnswered: 0,
  totalCorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
};
