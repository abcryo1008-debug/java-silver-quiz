// アプリ全体で使う型定義。
// 問題データ(data/sets/*.ts)はこの Question 型に従って書く。

export type ChoiceLabel = "A" | "B" | "C" | "D";

export type Difficulty = "normal" | "long" | "complex";

export type Question = {
  id: number;
  /** 目標時間（秒）。normal:90 / long:150 / complex:210〜240 */
  targetTime: number;
  difficulty: Difficulty;
  /** 分野タグ（結果画面の分野別分析に使う。問題画面には出さない） */
  tags: string[];
  /** 問題文（省略時は既定の文を表示）。「2つ選べ」等もここに書く */
  prompt?: string;
  /** 表示するJavaソースコード（コード無しの説明問題では省略可） */
  code?: string;
  choices: { label: ChoiceLabel; text: string }[];
  /** 正解ラベル。1個なら単一選択、2個以上なら複数選択(「2つ選べ」) */
  correctAnswers: ChoiceLabel[];
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
  /** 選んだラベル（複数選択にも対応） */
  selected: ChoiceLabel[];
  correct: boolean;
  /** 解答にかかった秒数 */
  timeSpent: number;
  /** 目標時間内に解けたか */
  withinTarget: boolean;
};

/** localStorage に保存する学習履歴 */
export type StudyHistory = {
  wrongQuestionIds: number[];
  laterReviewIds: number[];
  tagStats: Record<string, { correct: number; total: number }>;
  totalAnswered: number;
  totalCorrect: number;
  currentStreak: number;
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

/** 選んだ集合が正解集合と完全一致するか */
export function isAnswerCorrect(
  selected: ChoiceLabel[],
  correct: ChoiceLabel[]
): boolean {
  if (selected.length !== correct.length) return false;
  const s = new Set(selected);
  return correct.every((c) => s.has(c));
}
