import { useState } from "react";
import type { ReactNode } from "react";
import type { ChoiceLabel, Question } from "../types";

type Props = {
  question: Question;
  selected: ChoiceLabel;
};

// 折りたたみ可能なセクション
function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="exp-section">
      <button
        className="exp-section__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="exp-section__icon">{open ? "−" : "＋"}</span>
      </button>
      {open && <div className="exp-section__body">{children}</div>}
    </div>
  );
}

export function ExplanationView({ question, selected }: Props) {
  const e = question.explanation;
  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="explanation">
      <div className={`verdict ${isCorrect ? "verdict--ok" : "verdict--ng"}`}>
        {isCorrect ? "正解！" : "不正解"}
      </div>

      <div className="exp-answer-row">
        <div>
          <span className="exp-answer-label">あなたの回答</span>
          <span className={isCorrect ? "tag-ok" : "tag-ng"}>{selected}</span>
        </div>
        <div>
          <span className="exp-answer-label">正解</span>
          <span className="tag-ok">{question.correctAnswer}</span>
        </div>
      </div>

      <Section title="① 理由" defaultOpen>
        <p>{e.reason}</p>
      </Section>

      <Section title="② 処理順序" defaultOpen>
        <ol className="exp-order">
          {e.executionOrder.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section title="③ 他の選択肢が違う理由">
        <ul className="exp-others">
          {(["A", "B", "C", "D"] as ChoiceLabel[])
            .filter((l) => e.whyOthersAreWrong[l])
            .map((l) => (
              <li key={l}>
                <strong>{l}:</strong> {e.whyOthersAreWrong[l]}
              </li>
            ))}
        </ul>
      </Section>

      <Section title="④ 試験ポイント">
        <p>{e.examPoint}</p>
      </Section>

      <Section title="⑤ 本番での見切りポイント">
        <p>{e.quickJudgePoint}</p>
      </Section>

      <div className="exp-memo">
        <span className="exp-memo__label">覚えるべき1行</span>
        <code>{e.oneLineMemory}</code>
      </div>

      {e.similarTrap && (
        <Section title="⑥ 類似ひっかけパターン">
          <p>{e.similarTrap}</p>
        </Section>
      )}
    </div>
  );
}
