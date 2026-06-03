// スマホで読みやすいコード表示。
// ・等幅フォント
// ・横スクロール可能（折り返さない）
// ・行番号付き
type Props = { code: string };

export function CodeBlock({ code }: Props) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div className="code-block">
      <pre>
        <code>
          {lines.map((line, i) => (
            <span className="code-line" key={i}>
              <span className="code-line__no">{i + 1}</span>
              <span className="code-line__text">{line === "" ? " " : line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
