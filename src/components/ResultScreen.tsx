import type { AnswerRecord, Question } from "../types";

type Props = {
  records: AnswerRecord[];
  questions: Question[]; // 今回出題した問題
  onReviewWrong: () => void;
  onRandom: () => void;
  onHome: () => void;
};

export function ResultScreen({
  records,
  questions,
  onReviewWrong,
  onRandom,
  onHome,
}: Props) {
  const total = records.length;
  const correct = records.filter((r) => r.correct).length;
  const rate = total === 0 ? 0 : Math.round((correct / total) * 100);

  const qById = new Map(questions.map((q) => [q.id, q]));

  // 分野別正答率（今回分）
  const tagAgg: Record<string, { correct: number; total: number }> = {};
  for (const r of records) {
    const q = qById.get(r.questionId);
    if (!q) continue;
    for (const tag of q.tags) {
      tagAgg[tag] ??= { correct: 0, total: 0 };
      tagAgg[tag].total += 1;
      if (r.correct) tagAgg[tag].correct += 1;
    }
  }
  const tagRows = Object.entries(tagAgg).sort(
    (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total
  );

  const wrong = records.filter((r) => !r.correct);
  const withinCount = records.filter((r) => r.withinTarget).length;

  return (
    <div className="screen result">
      <h1 className="result__title">結果</h1>

      <div className="result__score card">
        <div className="result__big">
          {correct} / {total}
        </div>
        <div className="result__rate">正答率 {rate}%</div>
        <div className="result__sub">目標時間内: {withinCount} / {total} 問</div>
      </div>

      <div className="result__section">
        <h2 className="result__section-title">分野別正答率</h2>
        <ul className="tag-bars">
          {tagRows.map(([tag, s]) => {
            const r = Math.round((s.correct / s.total) * 100);
            return (
              <li key={tag} className="tag-bar">
                <div className="tag-bar__head">
                  <span>{tag}</span>
                  <span>
                    {s.correct}/{s.total}（{r}%）
                  </span>
                </div>
                <div className="tag-bar__track">
                  <div
                    className="tag-bar__fill"
                    style={{
                      width: `${r}%`,
                      background: r >= 70 ? "#16a34a" : r >= 40 ? "#d97706" : "#dc2626",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="result__section">
        <h2 className="result__section-title">
          間違えた問題（{wrong.length}問）
        </h2>
        {wrong.length === 0 ? (
          <p className="result__perfect">全問正解！素晴らしい 🎉</p>
        ) : (
          <ul className="wrong-list">
            {wrong.map((r) => {
              const q = qById.get(r.questionId);
              return (
                <li key={r.questionId}>
                  <span className="wrong-list__id">#{r.questionId}</span>
                  <span className="wrong-list__tags">
                    {q?.tags.slice(0, 3).join(" / ")}
                  </span>
                  <span className="wrong-list__ans">
                    あなた {[...r.selected].sort().join(",") || "—"} / 正解{" "}
                    {q ? [...q.correctAnswers].sort().join(",") : "?"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="result__buttons">
        <button
          className="btn btn--primary"
          onClick={onReviewWrong}
          disabled={wrong.length === 0}
        >
          間違えた問題を復習
        </button>
        <button className="btn" onClick={onRandom}>
          もう一度ランダム出題
        </button>
        <button className="btn btn--ghost" onClick={onHome}>
          トップへ戻る
        </button>
      </div>
    </div>
  );
}
