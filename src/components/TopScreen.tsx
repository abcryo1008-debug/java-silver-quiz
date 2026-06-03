import type { StudyHistory } from "../types";

type Props = {
  history: StudyHistory;
  allTags: string[];
  onStart: () => void;
  onRandom: () => void;
  onReview: () => void;
  onTagSelect: (tag: string) => void;
};

export function TopScreen({
  history,
  allTags,
  onStart,
  onRandom,
  onReview,
  onTagSelect,
}: Props) {
  const rate =
    history.totalAnswered === 0
      ? 0
      : Math.round((history.totalCorrect / history.totalAnswered) * 100);

  // 苦手タグランキング（正答率の低い順、出題2回以上のみ）
  const weakTags = Object.entries(history.tagStats)
    .filter(([, s]) => s.total >= 2)
    .map(([tag, s]) => ({ tag, rate: s.correct / s.total, total: s.total }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 5);

  return (
    <div className="screen top">
      <h1 className="top__title">Java Silver SE17 演習</h1>
      <p className="top__subtitle">通勤中に1問ずつ。本番より少し難しめ。</p>

      <div className="top__progress card">
        <div className="top__progress-row">
          <span>累計解答</span>
          <strong>{history.totalAnswered} 問</strong>
        </div>
        <div className="top__progress-row">
          <span>累計正答率</span>
          <strong>{rate}%</strong>
        </div>
        <div className="top__progress-row">
          <span>連続正解</span>
          <strong>
            {history.currentStreak}（最高 {history.bestStreak}）
          </strong>
        </div>
        <div className="top__progress-row">
          <span>復習対象</span>
          <strong>
            {new Set([...history.wrongQuestionIds, ...history.laterReviewIds]).size} 問
          </strong>
        </div>
      </div>

      <div className="top__buttons">
        <button className="btn btn--primary" onClick={onStart}>
          学習開始（全問）
        </button>
        <button className="btn" onClick={onRandom}>
          ランダム出題
        </button>
        <button
          className="btn"
          onClick={onReview}
          disabled={
            new Set([...history.wrongQuestionIds, ...history.laterReviewIds])
              .size === 0
          }
        >
          復習モード
        </button>
      </div>

      <div className="top__section">
        <h2 className="top__section-title">弱点分野別に学習</h2>
        <div className="tag-grid">
          {allTags.map((tag) => (
            <button key={tag} className="tag-btn" onClick={() => onTagSelect(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {weakTags.length > 0 && (
        <div className="top__section">
          <h2 className="top__section-title">苦手タグランキング</h2>
          <ol className="weak-list">
            {weakTags.map((w) => (
              <li key={w.tag}>
                <span>{w.tag}</span>
                <span className="weak-list__rate">
                  {Math.round(w.rate * 100)}%（{w.total}問）
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
