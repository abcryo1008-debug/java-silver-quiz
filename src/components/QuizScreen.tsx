import { useEffect, useRef, useState } from "react";
import type { ChoiceLabel, Question } from "../types";
import { CodeBlock } from "./CodeBlock";
import { ExplanationView } from "./ExplanationView";

type Props = {
  question: Question;
  index: number; // 0始まり
  total: number;
  isLater: boolean;
  onToggleLater: (questionId: number) => void;
  onAnswered: (q: Question, selected: ChoiceLabel, timeSpent: number, withinTarget: boolean) => void;
  onNext: () => void;
  onQuit: () => void;
};

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizScreen({
  question,
  index,
  total,
  isLater,
  onToggleLater,
  onAnswered,
  onNext,
  onQuit,
}: Props) {
  const [selected, setSelected] = useState<ChoiceLabel | null>(null);
  const [answered, setAnswered] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(Date.now());

  // 問題が変わったら状態リセット
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setElapsed(0);
    startRef.current = Date.now();
  }, [question.id]);

  // タイマー（回答するまで進む）
  useEffect(() => {
    if (answered) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 500);
    return () => clearInterval(t);
  }, [answered, question.id]);

  const over = elapsed > question.targetTime;

  function confirm() {
    if (selected == null || answered) return;
    const timeSpent = Math.floor((Date.now() - startRef.current) / 1000);
    const withinTarget = timeSpent <= question.targetTime;
    setAnswered(true);
    onAnswered(question, selected, timeSpent, withinTarget);
  }

  return (
    <div className="screen quiz">
      <div className="quiz__bar">
        <button className="link-btn" onClick={onQuit}>
          ← 終了
        </button>
        <span className="quiz__count">
          第 {index + 1} 問 / {total}
        </span>
        <span className={`quiz__timer ${over ? "quiz__timer--over" : ""}`}>
          ⏱ {formatTime(elapsed)} / {formatTime(question.targetTime)}
        </span>
      </div>

      {over && !answered && (
        <div className="quiz__warn">⚠ 目標時間を超えました。本番なら見切る判断を。</div>
      )}

      <CodeBlock code={question.code} />

      <div className="choices">
        {question.choices.map((c) => {
          const isSel = selected === c.label;
          const isCorrect = c.label === question.correctAnswer;
          let cls = "choice";
          if (answered) {
            if (isCorrect) cls += " choice--correct";
            else if (isSel) cls += " choice--wrong";
            else cls += " choice--dim";
          } else if (isSel) {
            cls += " choice--selected";
          }
          return (
            <button
              key={c.label}
              className={cls}
              onClick={() => !answered && setSelected(c.label)}
              disabled={answered}
            >
              <span className="choice__label">{c.label}</span>
              <span className="choice__text">{c.text}</span>
            </button>
          );
        })}
      </div>

      {!answered ? (
        <button
          className="btn btn--primary btn--full"
          onClick={confirm}
          disabled={selected == null}
        >
          回答する
        </button>
      ) : (
        <>
          <ExplanationView question={question} selected={selected!} />
          <label className="later-check">
            <input
              type="checkbox"
              checked={isLater}
              onChange={() => onToggleLater(question.id)}
            />
            あとで復習する
          </label>
          <button className="btn btn--primary btn--full" onClick={onNext}>
            {index + 1 < total ? "次の問題へ →" : "結果を見る →"}
          </button>
        </>
      )}
    </div>
  );
}
