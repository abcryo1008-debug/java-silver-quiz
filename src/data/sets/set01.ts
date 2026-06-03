import type { Question } from "../../types";

// 第1セット（id 1-20）: 総合・本番より少し高め
export const set01: Question[] = [
  {
    id: 1,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "ArrayList", "オーバーロード", "Wrapper"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(5, 10, 15, 20));
        list.remove(2);
        list.remove(Integer.valueOf(5));
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[10, 20]" },
      { label: "B", text: "[10, 15, 20]" },
      { label: "C", text: "[5, 10, 20]" },
      { label: "D", text: "実行時に例外がスローされる" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "remove(2) は int 引数なので『インデックス2』(=15)を削除し [5,10,20]。remove(Integer.valueOf(5)) は Object 引数なので『値5』を削除し [10,20]。",
      executionOrder: [
        "[5, 10, 15, 20]",
        "remove(2) → index2(=15)削除 → [5, 10, 20]",
        "remove(Integer.valueOf(5)) → 値5削除 → [10, 20]",
      ],
      whyOthersAreWrong: {
        B: "remove(2) を値2の削除と誤解した場合。実際はインデックス削除。",
        C: "remove(Integer.valueOf(5)) を無視した途中状態。",
        D: "正しいオーバーロードが両方存在し、要素も範囲内なので例外は出ない。",
      },
      examPoint: "remove(int)=インデックス, remove(Object)=値。Integer.valueOf(x) で値削除。",
      quickJudgePoint: "remove の引数がリテラル数値ならインデックス、Integer型なら値。",
      oneLineMemory: "remove(int)は添字, remove(Integer)は値を消す。",
      similarTrap: "list.remove((Object) 5) や list.remove((Integer) 5) でも値削除になる。",
    },
  },
  {
    id: 2,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "List.of", "例外", "不変"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        var list = List.of("A", "B", "C");
        list.set(0, "Z");
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[Z, B, C]" },
      { label: "B", text: "[A, B, C]" },
      { label: "C", text: "実行時に UnsupportedOperationException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "List.of は完全な不変リスト。set も変更操作なので実行時に UnsupportedOperationException。コンパイルは通る。",
      executionOrder: [
        "List.of(...) で不変リスト生成",
        "set(0,\"Z\") は変更操作 → 実行時例外",
      ],
      whyOthersAreWrong: {
        A: "不変なので置換できない。",
        B: "set が例外を投げるため println に到達しない。",
        D: "set は List のメソッドなのでコンパイルは成功。",
      },
      examPoint: "List.of は set も add も remove も不可（完全不変）。Arrays.asList は set のみ可。",
      quickJudgePoint: "List.of への変更操作はすべて実行時 UnsupportedOperationException。",
      oneLineMemory: "List.of=完全不変。変更系は実行時例外。",
      similarTrap: "Arrays.asList は set だけは成功する点と混同しない。",
    },
  },
  {
    id: 3,
    targetTime: 150,
    difficulty: "long",
    tags: ["初期化順序", "static", "コンストラクタ"],
    prompt: "次のコードを実行したときの出力順序として正しいものはどれか。",
    code: `public class Main {
    static int a = init("a");
    int b = init("b");
    static { init("static-block"); }
    { init("instance-block"); }

    Main() { init("constructor"); }

    static int init(String s) {
        System.out.println(s);
        return 0;
    }

    public static void main(String[] args) {
        new Main();
    }
}`,
    choices: [
      { label: "A", text: "a → static-block → b → instance-block → constructor" },
      { label: "B", text: "a → b → static-block → instance-block → constructor" },
      { label: "C", text: "static-block → a → b → instance-block → constructor" },
      { label: "D", text: "a → static-block → instance-block → b → constructor" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "クラスロード時に static 要素を記述順で実行(a→static-block)。new で インスタンス要素を記述順(b→instance-block)、最後にコンストラクタ本体(constructor)。",
      executionOrder: [
        "static: a, static-block（記述順）",
        "インスタンス: b, instance-block（記述順）",
        "コンストラクタ本体: constructor",
      ],
      whyOthersAreWrong: {
        B: "static-block は static 同士で a の直後（記述順）に実行される。",
        C: "static フィールド a の方が static ブロックより上に書かれている。",
        D: "instance-block より b（記述順で先）が先。",
      },
      examPoint: "順序は static(ロード時1回・記述順)→インスタンス初期化(記述順)→コンストラクタ。",
      quickJudgePoint: "static は1回・最初。残りは記述順で上から、コンストラクタは最後。",
      oneLineMemory: "static→フィールド/初期化子(記述順)→コンストラクタ。",
    },
  },
  {
    id: 4,
    targetTime: 120,
    difficulty: "normal",
    tags: ["main", "コマンドライン実行", "varargs"],
    prompt:
      "正しく実行可能（JVMのエントリポイントになる）main メソッドの宣言を選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "public static void main(String[] args)" },
      { label: "B", text: "public static int main(String[] args)" },
      { label: "C", text: "public static void main(String... args)" },
      { label: "D", text: "public void main(String[] args)" },
    ],
    correctAnswers: ["A", "C"],
    explanation: {
      reason:
        "エントリポイントは public static void、引数は String[] または String...(可変長は内部的にString[])。AとCが該当。",
      executionOrder: [
        "戻り値は void 必須 → B(int)は不可",
        "static 必須 → D は不可",
        "String[] と String... はどちらも可 → A, C",
      ],
      whyOthersAreWrong: {
        B: "戻り値が int。main は void でなければエントリにならない。",
        D: "static でないため JVM が main として実行できない（コンパイルは通る）。",
      },
      examPoint: "main は public static void main(String[]/String...)。引数名は自由。",
      quickJudgePoint: "void と static が両方あるか、引数が String[] か String... かを見る。",
      oneLineMemory: "public static void main(String[] args)。String...も可。",
      similarTrap: "引数名は args でなくてもよい。public と static の順序は入替可。",
    },
  },
  {
    id: 5,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "インスタンス変数", "コンパイルエラー"],
    code: `public class Main {
    int x = 10;
    static int y = 20;

    static void show() {
        System.out.println(x + y);
    }

    public static void main(String[] args) {
        show();
    }
}`,
    choices: [
      { label: "A", text: "30" },
      { label: "B", text: "20" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "static メソッドはインスタンスに属さないため、インスタンス変数 x を直接参照できずコンパイルエラー。",
      executionOrder: [
        "show() は static",
        "x はインスタンス変数 → どのインスタンスのxか不定",
        "コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "x を参照できないので計算に至らない。",
        B: "y は static で参照可能だが、x がエラーになるため。",
        D: "実行時ではなくコンパイル時に弾かれる。",
      },
      examPoint: "static メソッド/ブロックからインスタンスメンバは直接参照不可。static同士はOK。",
      quickJudgePoint: "static の中で『thisが必要なメンバ』を触っていたらコンパイルエラーを疑う。",
      oneLineMemory: "staticからインスタンス変数の直接参照は不可。",
    },
  },
  {
    id: 6,
    targetTime: 90,
    difficulty: "normal",
    tags: ["switch式", "分岐"],
    code: `public class Main {
    public static void main(String[] args) {
        int day = 6;
        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> "平日";
            case 6, 7 -> "週末";
            default -> "不明";
        };
        System.out.println(type);
    }
}`,
    choices: [
      { label: "A", text: "平日" },
      { label: "B", text: "週末" },
      { label: "C", text: "不明" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason: "day=6 は case 6,7 にマッチ。アロー構文はフォールスルーしない。",
      executionOrder: ["day=6", "case 6,7 にマッチ → \"週末\""],
      whyOthersAreWrong: {
        A: "1〜5 にはマッチしない。",
        C: "default は他がマッチしない時のみ。",
        D: "default があり網羅的、構文も正しいのでエラーにならない。",
      },
      examPoint: "switch式アローは複数値をカンマ区切り可、フォールスルー無し、default で網羅。",
      quickJudgePoint: "アロー(->)はbreak不要・フォールスルー無し。",
      oneLineMemory: "switch式 case 6,7 -> ... はフォールスルーしない。",
    },
  },
  {
    id: 7,
    targetTime: 120,
    difficulty: "normal",
    tags: ["switch式", "網羅性", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 2;
        int r = switch (n) {
            case 1 -> 10;
            case 2 -> 20;
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "20" },
      { label: "B", text: "10" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "switch式は値を返すため網羅的でなければならない。int で case 1,2 のみ・default なしは非網羅でコンパイルエラー。",
      executionOrder: [
        "switch式は全ケースを網羅する必要あり",
        "int の全値を case 1,2 ではカバーできず default も無い",
        "コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "コンパイルできないため実行されない。",
        B: "同上。",
        D: "実行時ではなくコンパイル時のエラー。",
      },
      examPoint: "switch『式』は網羅必須。switch『文』なら default 無しでも可（対比）。",
      quickJudgePoint: "= switch(...) で値を受ける式は default か全列挙が無いとエラー。",
      oneLineMemory: "switch式は網羅性必須。intはdefaultが要る。",
      similarTrap: "enum で全定数を列挙すれば default 無しでも網羅とみなされる。",
    },
  },
  {
    id: 8,
    targetTime: 120,
    difficulty: "long",
    tags: ["String", "equals", "==", "定数畳み込み"],
    code: `public class Main {
    public static void main(String[] args) {
        String a = "Java";
        String b = "Ja" + "va";
        String c = new String("Java");
        System.out.println((a == b) + " " + (a == c) + " " + a.equals(c));
    }
}`,
    choices: [
      { label: "A", text: "true false true" },
      { label: "B", text: "true true true" },
      { label: "C", text: "false false true" },
      { label: "D", text: "true false false" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "\"Ja\"+\"va\" はコンパイル時定数で \"Java\" に畳み込まれ、プール上で a と同一参照 → a==b は true。new String は別オブジェクト → a==c は false。内容は等しく equals は true。",
      executionOrder: [
        "a は文字列プールの \"Java\"",
        "b はコンパイル時定数畳み込みで同じプール参照 → a==b true",
        "c は new で別オブジェクト → a==c false",
        "a.equals(c) は内容比較 → true",
      ],
      whyOthersAreWrong: {
        B: "new String は == では別物。",
        C: "定数同士の連結はプール参照になり a==b は true。",
        D: "equals は内容比較なので true。",
      },
      examPoint: "リテラル/定数連結はプールで共有(==true)、new String は別物(==false)、equalsは内容。",
      quickJudgePoint: "new があれば == は false、リテラル同士なら == true を疑う。",
      oneLineMemory: "リテラルは共有、new Stringは別物、equalsは中身。",
      similarTrap: "変数を含む連結（実行時連結）は新オブジェクトになり == は false。",
    },
  },
  {
    id: 9,
    targetTime: 90,
    difficulty: "normal",
    tags: ["StringBuilder", "メソッドチェーン"],
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("abc");
        sb.append("de").insert(0, "X").reverse();
        System.out.println(sb);
    }
}`,
    choices: [
      { label: "A", text: "edcbaX" },
      { label: "B", text: "Xedcba" },
      { label: "C", text: "Xabcde" },
      { label: "D", text: "abcdeX" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "abc→append(de)→abcde→insert(0,X)→Xabcde→reverse→edcbaX。StringBuilder は破壊的に変化し各メソッドが自身を返す。",
      executionOrder: [
        "\"abc\"",
        "append(\"de\") → \"abcde\"",
        "insert(0,\"X\") → \"Xabcde\"",
        "reverse() → \"edcbaX\"",
      ],
      whyOthersAreWrong: {
        B: "reverse 前に X を頭に付けるので、反転すると X は末尾へ。",
        C: "reverse を忘れた状態。",
        D: "操作順を誤った場合。",
      },
      examPoint: "StringBuilder は可変・破壊的。連結は呼び出し順に適用される。",
      quickJudgePoint: "チェーンは左から順に状態が変わる。reverse は最後の状態を反転。",
      oneLineMemory: "SBチェーンは順に破壊的変更。reverseは現状態を反転。",
    },
  },
  {
    id: 10,
    targetTime: 120,
    difficulty: "normal",
    tags: ["配列", "多次元配列", "null"],
    code: `public class Main {
    public static void main(String[] args) {
        int[][] a = new int[3][];
        a[0] = new int[]{1, 2};
        a[1] = new int[]{3, 4, 5};
        System.out.println(a.length + " " + a[1].length + " " + a[2]);
    }
}`,
    choices: [
      { label: "A", text: "3 3 null" },
      { label: "B", text: "3 2 0" },
      { label: "C", text: "2 3 null" },
      { label: "D", text: "実行時に NullPointerException" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "new int[3][] は外側だけ確保し内側は null。a.length=3、a[1].length=3、a[2] は未代入で null（参照を出力するだけなのでNPEにならない）。",
      executionOrder: [
        "a.length = 3",
        "a[1] = {3,4,5} → length 3",
        "a[2] は未初期化 → null（println(null)はOK）",
      ],
      whyOthersAreWrong: {
        B: "a[1] は3要素。a[2] は 0 でなく null。",
        C: "a.length は 3。",
        D: "a[2] そのものを出力するだけ。a[2].length ならNPEだった。",
      },
      examPoint: "ジャグ配列は外側のみ確保で内側は null。配列の既定要素値の理解。",
      quickJudgePoint: "new T[n][] の内側要素は null。.length まで触るとNPE。",
      oneLineMemory: "new int[3][] の内側は null。",
    },
  },
  {
    id: 11,
    targetTime: 120,
    difficulty: "normal",
    tags: ["interface", "default method", "private method"],
    prompt:
      "インターフェース（Java SE17）に関する説明として正しいものを選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "フィールドは暗黙的に public static final である" },
      { label: "B", text: "default メソッドは実装クラスでオーバーライドできない" },
      { label: "C", text: "private メソッドを定義できる" },
      { label: "D", text: "抽象メソッドに private 修飾子を付けられる" },
    ],
    correctAnswers: ["A", "C"],
    explanation: {
      reason:
        "A: インターフェースのフィールドは暗黙 public static final で正しい。C: Java 9以降 private メソッド可で正しい。",
      executionOrder: [
        "A 正: 定数のみ(public static final)",
        "B 誤: default はオーバーライド可能",
        "C 正: private(本体必須)を持てる",
        "D 誤: 抽象メソッドは暗黙public、privateにできない",
      ],
      whyOthersAreWrong: {
        B: "default メソッドは実装クラスで上書きできる。",
        D: "抽象メソッドは暗黙 public。private は本体を持つメソッドにのみ可。",
      },
      examPoint: "interfaceのメンバ: 定数=public static final, メソッド=public abstract/default/static/private。",
      quickJudgePoint: "『フィールドは定数』『privateは本体付きのみ』を軸に判定。",
      oneLineMemory: "interfaceのフィールドは定数、privateメソッドは本体必須。",
    },
  },
  {
    id: 12,
    targetTime: 120,
    difficulty: "long",
    tags: ["interface", "default method", "衝突", "コンパイルエラー"],
    code: `interface A { default String hello() { return "A"; } }
interface B { default String hello() { return "B"; } }

class C implements A, B { }

public class Main {
    public static void main(String[] args) {
        System.out.println(new C().hello());
    }
}`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "同名 default メソッドを持つ2つのインターフェースを実装し、オーバーライドしないと継承が曖昧でコンパイルエラー。",
      executionOrder: [
        "A.hello と B.hello が衝突",
        "C で hello() を override していない",
        "コンパイルエラー(inherits unrelated defaults)",
      ],
      whyOthersAreWrong: {
        A: "どちらを使うか決まらず自動でAにはならない。",
        B: "同上。",
        D: "コンパイル時点で弾かれる。",
      },
      examPoint: "default メソッド衝突は override で解決(A.super.hello() 等で明示呼び出し可)。",
      quickJudgePoint: "複数interfaceの同名defaultを未overrideならコンパイルエラー。",
      oneLineMemory: "defaultメソッド衝突は要override(InterfaceName.super.m())。",
    },
  },
  {
    id: 13,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "catch順序", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            throw new RuntimeException("x");
        } catch (Exception e) {
            System.out.println("Exception");
        } catch (RuntimeException e) {
            System.out.println("RuntimeException");
        }
    }
}`,
    choices: [
      { label: "A", text: "Exception" },
      { label: "B", text: "RuntimeException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "RuntimeException は Exception のサブクラス。広い catch(Exception) を先に書くと後続の catch(RuntimeException) は到達不能でコンパイルエラー。",
      executionOrder: [
        "catch は上から評価される",
        "Exception が RuntimeException も捕捉",
        "2つ目は到達不能 → コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "コンパイルできないため実行されない。",
        B: "到達不能なため。",
        D: "コンパイル時エラー。",
      },
      examPoint: "catch は狭い例外→広い例外の順。逆順は到達不能でコンパイルエラー。",
      quickJudgePoint: "親例外を子例外より上に catch していたらエラー。",
      oneLineMemory: "catchは子→親の順。親が先だと到達不能エラー。",
    },
  },
  {
    id: 14,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "finally", "return"],
    code: `public class Main {
    static int test() {
        try {
            return 1;
        } finally {
            return 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "12" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "finally は必ず実行される。finally 内の return 2 が try の return 1 を上書きするため 2。",
      executionOrder: [
        "try で return 1 を評価",
        "finally が実行され return 2",
        "finally の return が優先 → 2",
      ],
      whyOthersAreWrong: {
        A: "finally の return が try の return を捨てる。",
        C: "値が連結されることはない。",
        D: "構文上は正しい（推奨されないが）。",
      },
      examPoint: "finally の return/throw は try の return/例外を上書きする。",
      quickJudgePoint: "finally に return があれば、それが最終結果。",
      oneLineMemory: "finallyのreturnはtryのreturnを上書きする。",
    },
  },
  {
    id: 15,
    targetTime: 120,
    difficulty: "long",
    tags: ["try-with-resources", "AutoCloseable", "実行順序"],
    code: `public class Main {
    static class R implements AutoCloseable {
        String n;
        R(String n) { this.n = n; }
        public void close() { System.out.print("C" + n + " "); }
    }

    public static void main(String[] args) {
        try (R x = new R("1"); R y = new R("2")) {
            System.out.print("body ");
        }
    }
}`,
    choices: [
      { label: "A", text: "body C1 C2 " },
      { label: "B", text: "body C2 C1 " },
      { label: "C", text: "C2 C1 body " },
      { label: "D", text: "body C1 " },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "リソースは宣言順に open、close は逆順。本体 body の後、後から宣言した y(2)→x(1) の順に close。",
      executionOrder: [
        "x=R(1), y=R(2) を宣言順に生成",
        "本体 → body",
        "close は逆順 → C2, C1",
      ],
      whyOthersAreWrong: {
        A: "close が宣言順になっている。実際は逆順。",
        C: "body は close より前。",
        D: "両方 close される。",
      },
      examPoint: "try-with-resources は close を宣言の逆順(後入れ先出し)で呼ぶ。",
      quickJudgePoint: "複数リソースは『最後に開いたものを最初に閉じる』。",
      oneLineMemory: "twrのcloseは宣言の逆順。",
    },
  },
  {
    id: 16,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = 42;
        if (o instanceof Integer i && i > 10) {
            System.out.println(i * 2);
        } else {
            System.out.println("no");
        }
    }
}`,
    choices: [
      { label: "A", text: "84" },
      { label: "B", text: "42" },
      { label: "C", text: "no" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "o は Integer。パターン変数 i に42が束縛され i>10 は true。&& の右は左がtrueの時のみ評価されるので i は束縛済み。42*2=84。",
      executionOrder: [
        "o instanceof Integer i → true、i=42",
        "i > 10 → true",
        "i * 2 → 84",
      ],
      whyOthersAreWrong: {
        B: "2倍されるため42ではない。",
        C: "条件はtrueなのでelseに行かない。",
        D: "&& の右でiは束縛済みなので合法。",
      },
      examPoint: "instanceof + && は合法（短絡で束縛保証）。Integer のオートボクシングにも注意。",
      quickJudgePoint: "instanceof 型 i && i.xxx はOK。|| はNG。",
      oneLineMemory: "instanceof 型 i && は合法。",
    },
  },
  {
    id: 17,
    targetTime: 120,
    difficulty: "long",
    tags: ["instanceof", "パターンマッチング", "スコープ"],
    code: `public class Main {
    static String f(Object o) {
        if (!(o instanceof String s)) {
            return "not string";
        }
        return s.toUpperCase();
    }

    public static void main(String[] args) {
        System.out.println(f("abc"));
    }
}`,
    choices: [
      { label: "A", text: "ABC" },
      { label: "B", text: "abc" },
      { label: "C", text: "not string" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "!(o instanceof String s) が false（=Stringだった）の場合、早期returnを通らずその先へ。否定+早期returnのため、後続では s が確定して使える。",
      executionOrder: [
        "f(\"abc\") 呼び出し",
        "!(instanceof) は false → return しない",
        "後続で s が有効 → \"abc\".toUpperCase() = ABC",
      ],
      whyOthersAreWrong: {
        B: "toUpperCase で大文字化される。",
        C: "文字列なので not string には行かない。",
        D: "このスコープでは s が定義済みで合法。",
      },
      examPoint: "パターン変数のスコープは『その型と確定する経路』に及ぶ。否定+早期returnで後続も使える。",
      quickJudgePoint: "if(!(x instanceof T t)) return; の後では t が使える。",
      oneLineMemory: "否定instanceof+早期returnの後ろではパターン変数が有効。",
    },
  },
  {
    id: 18,
    targetTime: 90,
    difficulty: "normal",
    tags: ["var", "型推論", "コンパイルエラー"],
    prompt: "次のうち、コンパイルエラーになる行はどれか。",
    code: `public class Main {
    public static void main(String[] args) {
        var a = 10;              // (A)
        var b = "hello";         // (B)
        var c = null;            // (C)
        var d = new int[]{1, 2}; // (D)
    }
}`,
    choices: [
      { label: "A", text: "(A) の行" },
      { label: "B", text: "(B) の行" },
      { label: "C", text: "(C) の行" },
      { label: "D", text: "(D) の行" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "var は初期化子から型を推論する。null は型が定まらず推論できないためコンパイルエラー。",
      executionOrder: [
        "a→int, b→String, d→int[] と推論可",
        "c は null で型不明 → コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "10 から int と推論できる。",
        B: "\"hello\" から String と推論できる。",
        D: "配列初期化子から int[] と推論できる。",
      },
      examPoint: "var はローカル変数のみ。null初期化・初期化子なし・配列{}の直接代入(var x={}は不可)等が不可。",
      quickJudgePoint: "var に null や初期化子なしが来たらコンパイルエラー。",
      oneLineMemory: "var = null は型推論不能でエラー。",
      similarTrap: "フィールド・メソッド引数・戻り値には var 不可。ラムダ引数の var は可。",
    },
  },
  {
    id: 19,
    targetTime: 120,
    difficulty: "normal",
    tags: ["record"],
    code: `public class Main {
    record Point(int x, int y) {}

    public static void main(String[] args) {
        Point p = new Point(1, 2);
        Point q = new Point(1, 2);
        System.out.println(p.equals(q) + " " + p.x() + " " + p);
    }
}`,
    choices: [
      { label: "A", text: "true 1 Point[x=1, y=2]" },
      { label: "B", text: "false 1 Point@1b6d3586" },
      { label: "C", text: "true 1 Point(1, 2)" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "record は equals(全成分比較)・アクセサ x()・toString(型名[成分=値,…])を自動生成。p.equals(q)=true、p.x()=1、p の toString は Point[x=1, y=2]。",
      executionOrder: [
        "equals は全成分比較 → true",
        "アクセサは x()（getXではない）→ 1",
        "toString → Point[x=1, y=2]",
      ],
      whyOthersAreWrong: {
        B: "record は equals/toString を自動生成するのでデフォルトの@hashにならない。",
        C: "toString 形式は『型名[成分=値]』で丸括弧ではない。",
        D: "record は正しい構文でコンパイルできる。",
      },
      examPoint: "record は equals/hashCode/toString/アクセサ(名前は成分名)/全引数コンストラクタを自動生成。",
      quickJudgePoint: "record のアクセサは getX() ではなく x()。toString は角括弧。",
      oneLineMemory: "recordのアクセサはx()、toStringはPoint[x=1, y=2]。",
    },
  },
  {
    id: 20,
    targetTime: 120,
    difficulty: "long",
    tags: ["sealed class", "継承", "コンパイルエラー"],
    prompt: "次のコードをコンパイルした結果として正しいものはどれか。",
    code: `sealed class Animal permits Dog {}

class Dog extends Animal {}

public class Main {
    public static void main(String[] args) {
        System.out.println("ok");
    }
}`,
    choices: [
      { label: "A", text: "正常にコンパイル・実行でき ok が出力される" },
      { label: "B", text: "コンパイルエラー（Dog に final/sealed/non-sealed が必要）" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "コンパイルエラー（Animal に abstract が必要）" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "sealed クラスの許可サブクラス(permits対象)は final/sealed/non-sealed のいずれかを必ず指定する必要がある。Dog に修飾子が無いためコンパイルエラー。",
      executionOrder: [
        "Animal は sealed で permits Dog",
        "Dog は Animal を継承するが修飾子なし",
        "コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "Dog に修飾子が無いため通らない。",
        C: "コンパイル時のエラー。",
        D: "sealed クラスに abstract は必須ではない。",
      },
      examPoint: "sealed の子は final / sealed(さらにpermits) / non-sealed のいずれか必須。",
      quickJudgePoint: "sealed の子クラスに3修飾子のどれも無ければエラー。",
      oneLineMemory: "sealedの子はfinal/sealed/non-sealedのどれかが必須。",
      similarTrap: "同一ファイル内なら permits は省略可。別ファイルなら permits 必須。",
    },
  },
];
