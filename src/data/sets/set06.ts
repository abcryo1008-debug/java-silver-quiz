import type { Question } from "../../types";

// 第6セット（id 101-120）: switch文 / switch式 / enum
export const set06: Question[] = [
  {
    id: 101,
    targetTime: 120,
    difficulty: "normal",
    tags: ["switch文", "フォールスルー", "break"],
    code: `public class Main {
    public static void main(String[] args) {
        int x = 2;
        switch (x) {
            case 1: System.out.print("1");
            case 2: System.out.print("2");
            case 3: System.out.print("3");
            default: System.out.print("D");
        }
    }
}`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "23D" },
      { label: "C", text: "23" },
      { label: "D", text: "123D" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "従来の switch 文(コロン)は break が無いとフォールスルー。x=2 から case2,3,default まで連続実行され \"23D\"。",
      executionOrder: ["case 2 にマッチ → \"2\"", "break無し → case3 \"3\"", "default \"D\"", "\"23D\""],
      whyOthersAreWrong: {
        A: "break が無いので 2 で止まらない。",
        C: "default まで落ちる。",
        D: "case 1 はマッチせず実行されない。",
      },
      examPoint: "コロン式 switch は break が無いと次の case へ落ちる(フォールスルー)。",
      quickJudgePoint: "コロン switch で break が無ければ下へ流れる。",
      oneLineMemory: "コロンswitchはbreak無しでフォールスルー。",
    },
  },
  {
    id: 102,
    targetTime: 90,
    difficulty: "normal",
    tags: ["switch式", "アロー"],
    code: `public class Main {
    public static void main(String[] args) {
        int x = 2;
        switch (x) {
            case 1 -> System.out.print("1");
            case 2 -> System.out.print("2");
            default -> System.out.print("D");
        }
    }
}`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "2D" },
      { label: "C", text: "23D" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "アロー構文はフォールスルーしない。x=2 の case だけ実行され \"2\"。",
      executionOrder: ["case 2 -> のみ実行 → \"2\""],
      whyOthersAreWrong: {
        B: "アローは次に落ちない。",
        C: "同上。",
        D: "アロー構文の switch 文は合法。",
      },
      examPoint: "アロー(->)はフォールスルー無し・break不要。",
      quickJudgePoint: "アロー switch は1つの分岐だけ実行。",
      oneLineMemory: "アローswitchはフォールスルー無し。",
    },
  },
  {
    id: 103,
    targetTime: 90,
    difficulty: "normal",
    tags: ["switch式", "String"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "b";
        String r = switch (s) {
            case "a" -> "A";
            case "b" -> "B";
            default -> "?";
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "B" },
      { label: "B", text: "A" },
      { label: "C", text: "?" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "switch は String を扱える。s=\"b\" は case \"b\" にマッチ → \"B\"。",
      executionOrder: ["s=\"b\"", "case \"b\" → \"B\""],
      whyOthersAreWrong: {
        B: "\"a\" にはマッチしない。",
        C: "default は他がマッチしない時のみ。",
        D: "String の switch は合法(equals 比較)。",
      },
      examPoint: "switch は int系/char/String/enum を扱える(long/float/doubleは不可)。",
      quickJudgePoint: "switch の String 比較は equals 相当。",
      oneLineMemory: "switchはStringを扱える(equals比較)。",
    },
  },
  {
    id: 104,
    targetTime: 120,
    difficulty: "normal",
    tags: ["switch式", "yield"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 2;
        int r = switch (n) {
            case 1 -> 10;
            case 2 -> {
                int t = n * 100;
                yield t;
            }
            default -> 0;
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "200" },
      { label: "B", text: "2" },
      { label: "C", text: "10" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "case 2 のブロックで t=200、yield t で200を返す。r=200。ブロックからの値返却は yield。",
      executionOrder: ["n=2 → case 2 のブロック", "t=2*100=200", "yield t → r=200"],
      whyOthersAreWrong: {
        B: "n そのものではなく n*100。",
        C: "case 1 ではない。",
        D: "ブロック+yield は正しい構文。",
      },
      examPoint: "switch式のブロックからの戻りは yield(return ではない)。",
      quickJudgePoint: "ブロック {} 内の値返却は yield。",
      oneLineMemory: "switch式ブロックの戻りはyield。",
    },
  },
  {
    id: 105,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch式", "yield", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 1;
        int r = switch (n) {
            case 1 -> { int t = 5; }
            default -> 0;
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "0" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "switch式の各分岐は値を生まなければならない。case 1 のブロックは yield していないためコンパイルエラー。",
      executionOrder: ["switch式は全分岐が値を返す必要", "case1 のブロックは yield 無し", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "値を返していないため成立しない。",
        B: "case1 が値を返さずビルド不可。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "switch『式』のブロック分岐は必ず yield で値を返す必要がある。",
      quickJudgePoint: "switch式のブロックに yield が無ければエラー。",
      oneLineMemory: "switch式の各分岐は値必須(ブロックはyield)。",
    },
  },
  {
    id: 106,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "ordinal", "values"],
    code: `enum Color { RED, GREEN, BLUE }

public class Main {
    public static void main(String[] args) {
        System.out.println(Color.GREEN.ordinal() + " " + Color.values().length);
    }
}`,
    choices: [
      { label: "A", text: "1 3" },
      { label: "B", text: "2 3" },
      { label: "C", text: "1 2" },
      { label: "D", text: "0 3" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "ordinal は0始まりの定義順。GREEN は2番目なので1。values() は全定数の配列で長さ3。",
      executionOrder: ["RED=0, GREEN=1, BLUE=2", "GREEN.ordinal()=1", "values().length=3"],
      whyOthersAreWrong: {
        B: "ordinal は0始まり。GREEN は1。",
        C: "定数は3つ。",
        D: "GREEN は0ではない。",
      },
      examPoint: "ordinal は宣言順0始まり。values() は定数配列を返す。",
      quickJudgePoint: "最初の定数 ordinal は0、values().length は定数数。",
      oneLineMemory: "ordinalは0始まり、values()は全定数配列。",
    },
  },
  {
    id: 107,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "valueOf"],
    code: `enum Day { MON, TUE }

public class Main {
    public static void main(String[] args) {
        Day d = Day.valueOf("TUE");
        System.out.println(d);
    }
}`,
    choices: [
      { label: "A", text: "TUE" },
      { label: "B", text: "1" },
      { label: "C", text: "Day.TUE" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "valueOf(\"TUE\") は名前一致する定数を返す。enum の toString は既定で定数名なので println は \"TUE\"。",
      executionOrder: ["valueOf(\"TUE\") → Day.TUE", "toString は定数名 → \"TUE\""],
      whyOthersAreWrong: {
        B: "println は ordinal ではなく名前を出す。",
        C: "toString は \"TUE\" のみ(クラス名は付かない)。",
        D: "valueOf は正しい静的メソッド。",
      },
      examPoint: "valueOf(name) は名前一致の定数を返す。enum の toString 既定は定数名。",
      quickJudgePoint: "enum を println すると定数名が出る。",
      oneLineMemory: "valueOf(name)は名前一致定数、toStringは定数名。",
    },
  },
  {
    id: 108,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "valueOf", "例外"],
    code: `enum Day { MON, TUE }

public class Main {
    public static void main(String[] args) {
        Day d = Day.valueOf("WED");
        System.out.println(d);
    }
}`,
    choices: [
      { label: "A", text: "WED" },
      { label: "B", text: "null" },
      { label: "C", text: "実行時に IllegalArgumentException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "valueOf に存在しない名前 \"WED\" を渡すと、実行時に IllegalArgumentException がスローされる。",
      executionOrder: ["valueOf(\"WED\")", "WED は定義に無い", "実行時 IllegalArgumentException"],
      whyOthersAreWrong: {
        A: "WED は存在しない。",
        B: "null は返さず例外を投げる。",
        D: "文字列は実行時に評価されるためコンパイルは通る。",
      },
      examPoint: "valueOf は不一致名で IllegalArgumentException(nullではない)。",
      quickJudgePoint: "valueOf に無効名を渡すと実行時 IllegalArgumentException。",
      oneLineMemory: "valueOfの無効名はIllegalArgumentException。",
    },
  },
  {
    id: 109,
    targetTime: 120,
    difficulty: "normal",
    tags: ["enum", "コンストラクタ", "フィールド"],
    code: `enum Planet {
    EARTH(9.8), MARS(3.7);
    final double g;
    Planet(double g) { this.g = g; }
    double gravity() { return g; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Planet.MARS.gravity());
    }
}`,
    choices: [
      { label: "A", text: "3.7" },
      { label: "B", text: "9.8" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "0.0" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "enum 定数はコンストラクタ引数を持てる。MARS は g=3.7 で初期化され、gravity() が3.7を返す。",
      executionOrder: ["MARS(3.7) でコンストラクタ呼び出し", "g=3.7", "gravity() → 3.7"],
      whyOthersAreWrong: {
        B: "EARTH の値。MARS は3.7。",
        C: "enum のコンストラクタ・フィールド・メソッドは合法。",
        D: "g は3.7に初期化されている。",
      },
      examPoint: "enum は定数ごとにコンストラクタ引数・フィールド・メソッドを持てる。",
      quickJudgePoint: "enum 定数の (値) はコンストラクタ引数。",
      oneLineMemory: "enum定数はコンストラクタ引数とフィールドを持てる。",
    },
  },
  {
    id: 110,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "コンパイルエラー"],
    code: `enum E { A, B }

public class Main {
    public static void main(String[] args) {
        E e = new E();
        System.out.println(e);
    }
}`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "enum は new でインスタンス化できない(定数のみが唯一のインスタンス)。new E() はコンパイルエラー。",
      executionOrder: ["enum のコンストラクタは外部から呼べない", "new E() → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "new できない。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "enum は new 不可。コンストラクタは暗黙 private 扱い。",
      quickJudgePoint: "enum を new していたらコンパイルエラー。",
      oneLineMemory: "enumはnewできない。",
    },
  },
  {
    id: 111,
    targetTime: 120,
    difficulty: "normal",
    tags: ["switch式", "enum", "網羅性"],
    code: `enum Size { S, M, L }

public class Main {
    public static void main(String[] args) {
        Size sz = Size.M;
        String r = switch (sz) {
            case S -> "small";
            case M -> "medium";
            case L -> "large";
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "medium" },
      { label: "B", text: "small" },
      { label: "C", text: "コンパイルエラー（default が必要）" },
      { label: "D", text: "large" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "enum の case は『修飾なしの定数名』で書く。全定数を列挙すれば default 無しでも網羅的。sz=M → \"medium\"。",
      executionOrder: ["case は S/M/L と無修飾", "全定数を網羅 → default 不要", "M → \"medium\""],
      whyOthersAreWrong: {
        B: "sz は M。",
        C: "全 enum 定数を列挙すれば default 無しで合法。",
        D: "sz は L ではない。",
      },
      examPoint: "enum の switch式は全定数列挙で網羅。case は無修飾の定数名。",
      quickJudgePoint: "enum switch式は全定数あれば default 不要。",
      oneLineMemory: "enum switch式は全定数列挙でdefault不要。",
    },
  },
  {
    id: 112,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch文", "enum", "コンパイルエラー"],
    code: `enum Size { S, M, L }

public class Main {
    public static void main(String[] args) {
        Size sz = Size.M;
        switch (sz) {
            case Size.M -> System.out.println("m");
            default -> {}
        }
    }
}`,
    choices: [
      { label: "A", text: "m" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "何も出力されない" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "enum を switch する case ラベルは『修飾なしの定数名(M)』でなければならない。case Size.M のように修飾するとコンパイルエラー。",
      executionOrder: ["case Size.M は修飾付き", "enum の case は無修飾必須", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "修飾名 case はビルド不可。",
        C: "ビルド自体が失敗。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "enum の case は『定数名のみ』(Size.M ではなく M)。",
      quickJudgePoint: "case に EnumType.CONST と書いていたらエラー。",
      oneLineMemory: "enumのcaseは無修飾の定数名。",
    },
  },
  {
    id: 113,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch式", "enum", "網羅性", "コンパイルエラー"],
    code: `enum Size { S, M, L }

public class Main {
    public static void main(String[] args) {
        Size sz = Size.M;
        String r = switch (sz) {
            case S -> "small";
            case M -> "medium";
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "medium" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "small" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "switch式は網羅必須。enum で L を欠き default も無いため非網羅でコンパイルエラー。",
      executionOrder: ["L が case にも default にも無い", "非網羅 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "網羅していないためビルド不可。",
        C: "同上。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "switch式は全 enum 定数 or default が必須。1つでも欠けると非網羅でエラー。",
      quickJudgePoint: "enum switch式で定数が抜けて default も無ければエラー。",
      oneLineMemory: "switch式は全enum定数かdefaultが必須。",
    },
  },
  {
    id: 114,
    targetTime: 90,
    difficulty: "normal",
    tags: ["switch式", "char", "複数ラベル"],
    code: `public class Main {
    public static void main(String[] args) {
        char c = 'e';
        String type = switch (c) {
            case 'a', 'e', 'i', 'o', 'u' -> "vowel";
            default -> "consonant";
        };
        System.out.println(type);
    }
}`,
    choices: [
      { label: "A", text: "vowel" },
      { label: "B", text: "consonant" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "char も switch 可能。'e' は母音ラベル(a,e,i,o,u)にマッチ → \"vowel\"。",
      executionOrder: ["c='e'", "母音ラベルにマッチ", "\"vowel\""],
      whyOthersAreWrong: {
        B: "'e' は母音。",
        C: "char の switch・複数ラベルは合法。",
        D: "例外なし。",
      },
      examPoint: "case は複数値をカンマ区切りで指定可。char も switch 対象。",
      quickJudgePoint: "case 'a','e',... は複数ラベル。",
      oneLineMemory: "caseは複数値カンマ区切り可、charもswitch可。",
    },
  },
  {
    id: 115,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch式", "yield", "コロン"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 1;
        int r = switch (n) {
            case 1: yield 100;
            default: yield 0;
        };
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "100" },
      { label: "B", text: "0" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "switch式はコロン構文でも書け、その場合は yield で値を返す。n=1 → yield 100。",
      executionOrder: ["コロン形式の switch式", "case 1: yield 100", "r=100"],
      whyOthersAreWrong: {
        B: "n=1 は default ではない。",
        C: "コロン+yield の switch式は合法。",
        D: "例外なし。",
      },
      examPoint: "switch式はアロー(->)でもコロン(:+yield)でも書ける。値返却は yield。",
      quickJudgePoint: "コロン switch式は yield で値を返す。",
      oneLineMemory: "コロンswitch式はyieldで値を返す。",
    },
  },
  {
    id: 116,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch文", "default", "フォールスルー"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        switch (n) {
            default: System.out.print("D");
            case 1: System.out.print("1");
        }
    }
}`,
    choices: [
      { label: "A", text: "D" },
      { label: "B", text: "D1" },
      { label: "C", text: "1" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "default はどこに書いてもよい。n=5 は case 1 にマッチせず default が実行され、break が無いので case 1 にフォールスルー → \"D1\"。",
      executionOrder: ["n=5 はどの case にも非マッチ", "default 実行 → \"D\"", "break無し → case1 \"1\"", "\"D1\""],
      whyOthersAreWrong: {
        A: "break が無いので case 1 へ落ちる。",
        C: "default が先に実行される。",
        D: "default があるので何かは出力される。",
      },
      examPoint: "default は末尾でなくてもよく、フォールスルーの対象にもなる。",
      quickJudgePoint: "default も break が無ければ下の case に落ちる。",
      oneLineMemory: "defaultは位置自由・break無しで下へ落ちる。",
    },
  },
  {
    id: 117,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "=="],
    code: `enum Color { RED, BLUE }

public class Main {
    public static void main(String[] args) {
        Color c = Color.RED;
        System.out.println(c == Color.RED);
    }
}`,
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "enum 定数は唯一のインスタンス(シングルトン)なので == で比較できる。c は Color.RED そのもの → true。",
      executionOrder: ["c は Color.RED の参照", "Color.RED と同一インスタンス", "== は true"],
      whyOthersAreWrong: {
        B: "同一インスタンスなので true。",
        C: "enum の == 比較は合法かつ推奨。",
        D: "例外なし。",
      },
      examPoint: "enum は == で安全に比較できる(各定数は単一インスタンス)。",
      quickJudgePoint: "enum 比較は == でOK(equalsも可)。",
      oneLineMemory: "enum定数は==で比較できる(単一インスタンス)。",
    },
  },
  {
    id: 118,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch文", "null", "例外"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = null;
        switch (s) {
            case "a" -> System.out.println("a");
            default -> System.out.println("d");
        }
    }
}`,
    choices: [
      { label: "A", text: "d" },
      { label: "B", text: "実行時に NullPointerException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "a" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "従来型の switch は対象が null だと(null ラベルが無い限り)評価時に NullPointerException。default では捕まえられない。",
      executionOrder: ["s=null で switch", "null ラベルが無い", "実行時 NullPointerException"],
      whyOthersAreWrong: {
        A: "null は default に行く前に NPE。",
        C: "コンパイルは通る。",
        D: "\"a\" にはならない。",
      },
      examPoint: "null を switch すると(null ラベル無しなら)NPE。default では拾えない。",
      quickJudgePoint: "switch 対象が null になり得るなら NPE を疑う。",
      oneLineMemory: "switch(null)はNPE(default不可)。",
    },
  },
  {
    id: 119,
    targetTime: 90,
    difficulty: "normal",
    tags: ["enum", "name", "ordinal"],
    code: `enum Fruit { APPLE, BANANA }

public class Main {
    public static void main(String[] args) {
        Fruit f = Fruit.APPLE;
        System.out.println(f.name() + " " + f.ordinal());
    }
}`,
    choices: [
      { label: "A", text: "APPLE 0" },
      { label: "B", text: "APPLE 1" },
      { label: "C", text: "0 APPLE" },
      { label: "D", text: "apple 0" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "name() は定数名 \"APPLE\"、ordinal() は宣言順0始まりで APPLE は0。",
      executionOrder: ["name() → \"APPLE\"", "ordinal() → 0"],
      whyOthersAreWrong: {
        B: "APPLE は最初の定数で ordinal 0。",
        C: "順序が逆。",
        D: "name は宣言どおり大文字。",
      },
      examPoint: "name() は定義どおりの名前、ordinal() は0始まりの順序。",
      quickJudgePoint: "name=定数名そのまま、ordinal=0始まり順序。",
      oneLineMemory: "name()は定数名、ordinal()は0始まり順序。",
    },
  },
  {
    id: 120,
    targetTime: 120,
    difficulty: "long",
    tags: ["switch式", "throw", "yield"],
    code: `public class Main {
    static int f(int n) {
        return switch (n) {
            case 1 -> 10;
            case 2 -> 20;
            default -> throw new IllegalArgumentException("bad");
        };
    }

    public static void main(String[] args) {
        System.out.println(f(2));
    }
}`,
    choices: [
      { label: "A", text: "20" },
      { label: "B", text: "10" },
      { label: "C", text: "実行時に IllegalArgumentException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "switch式のアロー分岐は throw を書ける(その分岐は値を生まず例外で抜ける)。f(2) は case 2 → 20。default は実行されない。",
      executionOrder: ["f(2) → case 2 -> 20", "default(throw) は未到達", "20"],
      whyOthersAreWrong: {
        B: "n=2 は case 2。",
        C: "default に到達しないので例外は出ない。",
        D: "default -> throw は合法。",
      },
      examPoint: "switch式の分岐に throw を置ける。値を返さず例外送出として扱われる。",
      quickJudgePoint: "switch式の default -> throw は合法。マッチしなければ実行されない。",
      oneLineMemory: "switch式の分岐はthrowも書ける。",
    },
  },
];
