import { useMemo, useState } from "react";
import "./styles.css";
import { questions as ALL_QUESTIONS } from "./data/questions";
import type { AnswerRecord, ChoiceLabel, Question, StudyHistory } from "./types";
import { emptyHistory, isAnswerCorrect } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TopScreen } from "./components/TopScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";

type Screen = "top" | "quiz" | "result";

// 弱点分野別ボタン（10カテゴリ）。各カテゴリは関連タグをまとめて出題する。
const CATEGORIES: { label: string; tags: string[] }[] = [
  { label: "List・コレクション", tags: ["List", "ArrayList", "Arrays.asList", "List.of", "ジェネリクス"] },
  { label: "instanceof・パターン", tags: ["instanceof", "パターンマッチング"] },
  { label: "static", tags: ["static", "クラス変数", "メソッド隠蔽"] },
  { label: "継承・多態性", tags: ["継承", "多態性", "フィールド隠蔽", "キャスト"] },
  { label: "オーバーライド/ロード", tags: ["オーバーライド", "オーバーロード", "共変戻り値", "解決順序"] },
  { label: "interface・abstract", tags: ["interface", "default method", "private method", "abstract class"] },
  { label: "switch・分岐", tags: ["switch式", "switch文", "分岐", "yield"] },
  { label: "例外", tags: ["例外", "try-with-resources", "AutoCloseable", "checked", "unchecked", "finally"] },
  { label: "String・配列", tags: ["String", "StringBuilder", "配列", "多次元配列", "拡張for"] },
  { label: "ラムダ/Stream/新機能", tags: ["ラムダ式", "Stream", "record", "sealed class", "enum", "var"] },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("top");
  const [quizSet, setQuizSet] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  const [history, setHistory] = useLocalStorage<StudyHistory>(
    "java-silver-history-v1",
    emptyHistory
  );
  const [dark, setDark] = useLocalStorage<boolean>("java-silver-dark", true);

  // 出題数のあるカテゴリだけ表示する
  const categories = useMemo(
    () =>
      CATEGORIES.filter((c) =>
        ALL_QUESTIONS.some((q) => q.tags.some((t) => c.tags.includes(t)))
      ),
    []
  );

  function beginQuiz(qs: Question[]) {
    if (qs.length === 0) return;
    setQuizSet(qs);
    setIndex(0);
    setRecords([]);
    setScreen("quiz");
  }

  const startAll = () => beginQuiz(ALL_QUESTIONS);
  const startRandom = () => beginQuiz(shuffle(ALL_QUESTIONS));
  const startCategory = (tags: string[]) =>
    beginQuiz(ALL_QUESTIONS.filter((q) => q.tags.some((t) => tags.includes(t))));
  const startReview = () => {
    const ids = new Set([
      ...history.wrongQuestionIds,
      ...history.laterReviewIds,
    ]);
    beginQuiz(ALL_QUESTIONS.filter((q) => ids.has(q.id)));
  };
  const reviewWrongFromResult = () => {
    const wrongIds = new Set(
      records.filter((r) => !r.correct).map((r) => r.questionId)
    );
    beginQuiz(ALL_QUESTIONS.filter((q) => wrongIds.has(q.id)));
  };

  function handleAnswered(
    q: Question,
    selected: ChoiceLabel[],
    timeSpent: number,
    withinTarget: boolean
  ) {
    const correct = isAnswerCorrect(selected, q.correctAnswers);
    setRecords((prev) => [
      ...prev,
      { questionId: q.id, selected, correct, timeSpent, withinTarget },
    ]);

    // 学習履歴(localStorage)を更新
    setHistory((prev) => {
      const tagStats = { ...prev.tagStats };
      for (const tag of q.tags) {
        const cur = tagStats[tag] ?? { correct: 0, total: 0 };
        tagStats[tag] = {
          correct: cur.correct + (correct ? 1 : 0),
          total: cur.total + 1,
        };
      }
      const wrongSet = new Set(prev.wrongQuestionIds);
      if (correct) wrongSet.delete(q.id); // 正解したら復習対象から外す
      else wrongSet.add(q.id);

      const currentStreak = correct ? prev.currentStreak + 1 : 0;
      return {
        ...prev,
        tagStats,
        wrongQuestionIds: [...wrongSet],
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        currentStreak,
        bestStreak: Math.max(prev.bestStreak, currentStreak),
      };
    });
  }

  function toggleLater(questionId: number) {
    setHistory((prev) => {
      const set = new Set(prev.laterReviewIds);
      if (set.has(questionId)) set.delete(questionId);
      else set.add(questionId);
      return { ...prev, laterReviewIds: [...set] };
    });
  }

  function next() {
    if (index + 1 < quizSet.length) setIndex((i) => i + 1);
    else setScreen("result");
  }

  function resetAll() {
    if (window.confirm("学習履歴をすべて消去します。よろしいですか？")) {
      setHistory(emptyHistory);
    }
  }

  return (
    <div className={dark ? "app app--dark" : "app app--light"}>
      <header className="app__header">
        <span className="app__logo">Java Silver SE17</span>
        <div className="app__header-actions">
          <button className="icon-btn" onClick={() => setDark((d) => !d)}>
            {dark ? "☀ ライト" : "🌙 ダーク"}
          </button>
          {screen === "top" && (
            <button className="icon-btn" onClick={resetAll}>
              履歴リセット
            </button>
          )}
        </div>
      </header>

      <main className="app__main">
        {screen === "top" && (
          <TopScreen
            history={history}
            categories={categories}
            onStart={startAll}
            onRandom={startRandom}
            onReview={startReview}
            onCategorySelect={startCategory}
          />
        )}

        {screen === "quiz" && quizSet[index] && (
          <QuizScreen
            question={quizSet[index]}
            index={index}
            total={quizSet.length}
            isLater={history.laterReviewIds.includes(quizSet[index].id)}
            onToggleLater={toggleLater}
            onAnswered={handleAnswered}
            onNext={next}
            onQuit={() => setScreen("top")}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            records={records}
            questions={quizSet}
            onReviewWrong={reviewWrongFromResult}
            onRandom={startRandom}
            onHome={() => setScreen("top")}
          />
        )}
      </main>
    </div>
  );
}
