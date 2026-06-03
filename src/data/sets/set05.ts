import type { Question } from "../../types";

// 第5セット（id 81-100）: instanceof パターンマッチング / static 深掘り
export const set05: Question[] = [
  {
    id: 81,
    targetTime: 120,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = "x";
        if (o instanceof String s || s.length() > 0) {
            System.out.println(s);
        }
    }
}`,
    choices: [
      { label: "A", text: "x" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "何も出力されない" },
      { label: "D", text: "実行時に NullPointerException" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "|| の右側は左が false のときに評価される。左が false＝String でない＝s 未束縛なので、s.length() は未代入変数の使用でコンパイルエラー。",
      executionOrder: ["|| の右では s が未束縛の可能性", "未代入変数の使用 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "コンパイルできず実行されない。",
        C: "ビルド失敗。",
        D: "実行時ではなくコンパイル時。",
      },
      examPoint: "instanceof パターン変数は && の右では使えるが || の右では使えない。",
      quickJudgePoint: "instanceof の直後が || なら未束縛でコンパイルエラーを疑う。",
      oneLineMemory: "instanceof 型 s || s.xxx はコンパイルエラー。",
      similarTrap: "&& なら合法(左trueで右評価=束縛済み)。",
    },
  },
  {
    id: 82,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "再代入"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = "abc";
        if (o instanceof String s) {
            s = "xyz";
            System.out.println(s);
        }
    }
}`,
    choices: [
      { label: "A", text: "abc" },
      { label: "B", text: "xyz" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "パターン変数 s は final ではなく通常のローカル変数同様に再代入できる。s=\"xyz\" 後の出力は xyz。",
      executionOrder: ["s に \"abc\" を束縛", "s = \"xyz\" で再代入", "出力 xyz"],
      whyOthersAreWrong: {
        A: "再代入後なので abc ではない。",
        C: "パターン変数の再代入は許可される。",
        D: "例外なし。",
      },
      examPoint: "パターン変数は暗黙 final ではなく再代入可能(ただし可読性のため非推奨)。",
      quickJudgePoint: "パターン変数への代入はコンパイルエラーにならない。",
      oneLineMemory: "instanceofのパターン変数は再代入できる。",
    },
  },
  {
    id: 83,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "null"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = null;
        if (o instanceof String s) {
            System.out.println("yes " + s);
        } else {
            System.out.println("no");
        }
    }
}`,
    choices: [
      { label: "A", text: "no" },
      { label: "B", text: "yes null" },
      { label: "C", text: "実行時に NullPointerException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "null instanceof（どの型でも）は常に false。よって else が実行され \"no\"。NPE にはならない。",
      executionOrder: ["o は null", "null instanceof String → false", "else → \"no\""],
      whyOthersAreWrong: {
        B: "false なので then 節には行かない。",
        C: "instanceof は null に対して例外を出さず false を返す。",
        D: "正しい構文。",
      },
      examPoint: "null instanceof 任意の型 は false。instanceof は null セーフ。",
      quickJudgePoint: "null に対する instanceof は常に false(NPEではない)。",
      oneLineMemory: "null instanceof T は常に false。",
    },
  },
  {
    id: 84,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "スコープ", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = "abc";
        if (o instanceof String s) {
            System.out.println(s.length());
        }
        System.out.println(s);
    }
}`,
    choices: [
      { label: "A", text: "3 abc" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "3 null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "パターン変数 s のスコープは『型が確定する範囲(この if の then)』に限られる。if の外で s を使うとスコープ外でコンパイルエラー。",
      executionOrder: ["s は if の then 節内でのみ有効", "if 外の println(s) はスコープ外 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "if の外では s は見えない。",
        C: "スコープ外なので参照自体が不可。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "パターン変数のスコープは『真と確定する経路』のみ。範囲外参照はエラー。",
      quickJudgePoint: "if ブロックの外でパターン変数を使っていたらエラー。",
      oneLineMemory: "パターン変数のスコープは確定経路のみ。",
    },
  },
  {
    id: 85,
    targetTime: 120,
    difficulty: "long",
    tags: ["static", "メソッド呼び出し", "null"],
    code: `public class Main {
    static void hi() { System.out.println("hi"); }

    public static void main(String[] args) {
        Main m = null;
        m.hi();
    }
}`,
    choices: [
      { label: "A", text: "hi" },
      { label: "B", text: "実行時に NullPointerException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "static メソッドは参照変数の『型』で解決され、インスタンスを実際には参照しない。m が null でも Main.hi() として呼ばれ \"hi\"。NPE にならない。",
      executionOrder: ["m.hi() は static 呼び出し", "実体参照は不要 → Main.hi()", "\"hi\"(NPEなし)"],
      whyOthersAreWrong: {
        B: "static 呼び出しは m を参照しないので NPE にならない。",
        C: "コンパイルは通る(非推奨警告は出る)。",
        D: "hi() が実行される。",
      },
      examPoint: "インスタンス経由でも static メソッドは型で解決。null参照でもNPEにならない。",
      quickJudgePoint: "null.staticMethod() はNPEではなく正常実行。",
      oneLineMemory: "staticメソッドはnull参照経由でもNPEにならない。",
    },
  },
  {
    id: 86,
    targetTime: 120,
    difficulty: "long",
    tags: ["static", "初期化順序", "コンパイルエラー"],
    code: `public class Main {
    static int a = b + 1;
    static int b = 5;

    public static void main(String[] args) {
        System.out.println(a + " " + b);
    }
}`,
    choices: [
      { label: "A", text: "6 5" },
      { label: "B", text: "1 5" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "0 5" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "初期化子の中で、後で宣言される b を単純名で参照している(不正な前方参照=illegal forward reference)ためコンパイルエラー。",
      executionOrder: ["a = b + 1 が b の宣言より前にある", "単純名での前方参照は不正 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "コンパイルできず実行されない。",
        B: "前方参照が許されればこの値だが、実際はエラー。",
        D: "同上。",
      },
      examPoint: "フィールド初期化子での後続フィールドの単純名参照は『不正な前方参照』でコンパイルエラー。",
      quickJudgePoint: "下のフィールドを単純名で初期化に使っていたらエラーを疑う。",
      oneLineMemory: "初期化子での後続フィールド単純名参照はエラー(前方参照)。",
    },
  },
  {
    id: 87,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "ネストクラス"],
    code: `public class Main {
    static class Inner { int v = 9; }

    public static void main(String[] args) {
        Inner in = new Inner();
        System.out.println(in.v);
    }
}`,
    choices: [
      { label: "A", text: "9" },
      { label: "B", text: "0" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "static ネストクラスは外側インスタンス無しで new できる。v は9で初期化済み → 9。",
      executionOrder: ["Inner は static ネスト", "new Inner() は外側不要", "in.v → 9"],
      whyOthersAreWrong: {
        B: "v は9で初期化されている。",
        C: "static ネストクラスの生成は合法。",
        D: "例外なし。",
      },
      examPoint: "static ネストクラスは外側インスタンス不要。非staticの内部クラスは外側インスタンスが必要。",
      quickJudgePoint: "static ネストは単独で new 可能。",
      oneLineMemory: "staticネストクラスは外側インスタンス不要でnew可。",
    },
  },
  {
    id: 88,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "インスタンスメソッド", "コンパイルエラー"],
    code: `public class Main {
    void hi() {}

    public static void main(String[] args) {
        hi();
    }
}`,
    choices: [
      { label: "A", text: "正常に実行される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "何も出力されない（正常）" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "main は static。インスタンスメソッド hi() を、インスタンス無しに呼ぶことはできずコンパイルエラー。",
      executionOrder: ["main は static(インスタンス無し)", "hi() はインスタンスメソッド", "呼び出せず コンパイルエラー"],
      whyOthersAreWrong: {
        A: "インスタンスが無い。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "static から非staticメソッド/フィールドは『インスタンス経由』でしか呼べない。",
      quickJudgePoint: "static の中で素のインスタンスメソッド呼びはエラー。",
      oneLineMemory: "staticから非staticの直接呼び出しは不可。",
    },
  },
  {
    id: 89,
    targetTime: 120,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "三項演算子"],
    code: `public class Main {
    static String f(Object o) {
        return (o instanceof Integer i) ? "int:" + i : "other";
    }

    public static void main(String[] args) {
        System.out.println(f(7) + " " + f("x"));
    }
}`,
    choices: [
      { label: "A", text: "int:7 other" },
      { label: "B", text: "other other" },
      { label: "C", text: "int:7 int:0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "三項演算子の条件部でも instanceof パターンが使え、true 側で i が有効。f(7)→\"int:7\"、f(\"x\")→\"other\"。",
      executionOrder: ["f(7): Integer i=7 → \"int:7\"", "f(\"x\"): Integer でない → \"other\""],
      whyOthersAreWrong: {
        B: "7 は Integer なので true 側。",
        C: "\"x\" は Integer でない。",
        D: "三項条件での instanceof パターンは合法。",
      },
      examPoint: "instanceof パターンは if だけでなく三項演算子の条件でも使える。",
      quickJudgePoint: "? : の条件部でも instanceof パターンは有効。",
      oneLineMemory: "三項条件でもinstanceofパターンが使える。",
    },
  },
  {
    id: 90,
    targetTime: 120,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "String"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = "hello world";
        if (o instanceof String s && s.contains(" ") && s.length() > 5) {
            System.out.println("match");
        } else {
            System.out.println("no");
        }
    }
}`,
    choices: [
      { label: "A", text: "match" },
      { label: "B", text: "no" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "&& を連ねた各段で s が使える。\"hello world\" は空白を含み長さ11>5 → 全条件 true → \"match\"。",
      executionOrder: [
        "instanceof String s → true, s=\"hello world\"",
        "s.contains(\" \") → true",
        "s.length()>5 → 11>5 true",
        "\"match\"",
      ],
      whyOthersAreWrong: {
        B: "全条件 true なので no には行かない。",
        C: "&& 連結での s 使用は合法。",
        D: "例外なし。",
      },
      examPoint: "&& を複数連ねても、左側で束縛された s は以降ずっと使える。",
      quickJudgePoint: "instanceof + && の連鎖は全段で束縛済み。",
      oneLineMemory: "&&連鎖ではパターン変数を続けて使える。",
    },
  },
  {
    id: 91,
    targetTime: 120,
    difficulty: "normal",
    tags: ["static", "クラス変数", "共有"],
    code: `class C { static int x; }

public class Main {
    public static void main(String[] args) {
        C a = new C();
        C b = new C();
        a.x = 5;
        b.x = 10;
        System.out.println(a.x);
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "10" },
      { label: "C", text: "0" },
      { label: "D", text: "15" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "x は static でクラスに1つ。a.x も b.x も同じ変数を指す。最後の b.x=10 が反映され a.x も 10。",
      executionOrder: ["x はクラス共有", "a.x=5 → x=5", "b.x=10 → x=10", "a.x → 10"],
      whyOthersAreWrong: {
        A: "b.x=10 で上書きされる。",
        C: "代入されている。",
        D: "加算ではなく上書き。",
      },
      examPoint: "static フィールドはインスタンス経由でアクセスしても実体はクラスで1つ(共有)。",
      quickJudgePoint: "static は誰が書いても同じ1個の変数。",
      oneLineMemory: "staticはインスタンス経由でも共有の1個。",
    },
  },
  {
    id: 92,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "ダウンキャスト"],
    code: `class Animal {}
class Dog extends Animal {
    void bark() { System.out.println("woof"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        if (a instanceof Dog d) {
            d.bark();
        }
    }
}`,
    choices: [
      { label: "A", text: "woof" },
      { label: "B", text: "何も出力されない" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時に ClassCastException" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "a の実体は Dog なので instanceof Dog d は true、d に Dog として束縛される。明示キャスト不要で d.bark() を呼べる → \"woof\"。",
      executionOrder: ["a instanceof Dog d → true、d=Dog", "d.bark() → \"woof\""],
      whyOthersAreWrong: {
        B: "条件は true。",
        C: "パターンで型が確定し bark() を呼べる。",
        D: "実体が Dog なので例外なし。",
      },
      examPoint: "instanceof パターンは『判定＋キャスト＋変数束縛』を一度に行う。明示キャスト不要。",
      quickJudgePoint: "instanceof T t が true ならそのまま t で T のメソッドを使える。",
      oneLineMemory: "instanceofパターンは判定とキャストを同時に行う。",
    },
  },
  {
    id: 93,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "メソッド隠蔽"],
    code: `class A { static String m() { return "A"; } }
class B extends A { static String m() { return "B"; } }

public class Main {
    public static void main(String[] args) {
        System.out.println(A.m() + B.m());
    }
}`,
    choices: [
      { label: "A", text: "AB" },
      { label: "B", text: "AA" },
      { label: "C", text: "BB" },
      { label: "D", text: "BA" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "static メソッドはクラス名で明示的に呼ぶと、そのクラスの実装が使われる。A.m()=\"A\"、B.m()=\"B\" → \"AB\"。",
      executionOrder: ["A.m() → \"A\"", "B.m() → \"B\"", "\"AB\""],
      whyOthersAreWrong: {
        B: "B.m() は B の実装。",
        C: "A.m() は A の実装。",
        D: "順序は A.m() が先。",
      },
      examPoint: "static は隠蔽。どちらが呼ばれるかは『呼び出しに使ったクラス/参照型』で決まる。",
      quickJudgePoint: "ClassName.staticMethod() はそのクラスの実装。",
      oneLineMemory: "staticはクラス名で呼べばそのクラスの実装。",
    },
  },
  {
    id: 94,
    targetTime: 120,
    difficulty: "long",
    tags: ["instanceof", "パターンマッチング", "スコープ", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = 10;
        if (o instanceof String s) {
            System.out.println(s);
        } else {
            System.out.println(s);
        }
    }
}`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "null" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "肯定形 `o instanceof String s` の場合、else 節では『String でない』ため s は束縛されない。else で s を使うとコンパイルエラー。",
      executionOrder: ["then 節では s 有効", "else 節は『非String』→ s 未束縛", "else での s 使用 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "else 側で s を使えないためビルド不可。",
        C: "スコープ外で参照不可。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "肯定 instanceof の else ではパターン変数は使えない(否定形+早期returnなら後続で使える)。",
      quickJudgePoint: "肯定 instanceof の else でパターン変数を使ったらエラー。",
      oneLineMemory: "肯定instanceofのelseではパターン変数は未束縛。",
    },
  },
  {
    id: 95,
    targetTime: 120,
    difficulty: "long",
    tags: ["static", "クラス初期化", "実行順序"],
    prompt: "次のコードを実行したときの出力として正しいものはどれか。",
    code: `class C {
    static { System.out.print("init "); }
    static int VALUE = 42;
}

public class Main {
    public static void main(String[] args) {
        System.out.print("start ");
        System.out.println(C.VALUE);
    }
}`,
    choices: [
      { label: "A", text: "init start 42" },
      { label: "B", text: "start init 42" },
      { label: "C", text: "start 42" },
      { label: "D", text: "init 42" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "クラス C は初めてアクセスされた時(C.VALUE 参照時)に初期化される。先に \"start \" が出て、C.VALUE 参照で static ブロック \"init \" が走り、続けて 42。",
      executionOrder: [
        "main 開始 → \"start \"",
        "C.VALUE 初参照 → C 初期化 → static ブロック \"init \"",
        "VALUE=42 → 42",
      ],
      whyOthersAreWrong: {
        A: "C はアクセスされるまで初期化されない。\"start \" が先。",
        C: "static ブロックは初期化時に実行される。",
        D: "\"start \" も出力される。",
      },
      examPoint: "クラス初期化(static)は『最初に使われた時』に遅延実行される。",
      quickJudgePoint: "static ブロックはそのクラスが初めて使われた瞬間に走る。",
      oneLineMemory: "クラス初期化は初回アクセス時に遅延実行。",
      similarTrap: "VALUE が static final の定数なら inline され、初期化がトリガされない場合がある。",
    },
  },
  {
    id: 96,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング"],
    prompt:
      "Object o = \"5\"; のとき、if (o instanceof Integer i) {...} の挙動として正しいものを選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "条件は false になり、i は使われない" },
      { label: "B", text: "実行時に ClassCastException がスローされる" },
      { label: "C", text: "コンパイルエラーになる" },
      { label: "D", text: "i に null が束縛される" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "o の実体は String。Integer ではないので instanceof は false、i は束縛されず then 節も実行されない。例外も出ない。",
      executionOrder: ["o は String", "instanceof Integer → false", "i は使われず、then 節スキップ"],
      whyOthersAreWrong: {
        B: "instanceof は型が合わなければ false を返すだけ(例外なし)。",
        C: "String を Integer で判定するのは合法な比較。",
        D: "false の場合 i は束縛されない(nullでもない)。",
      },
      examPoint: "instanceof は安全。型が合わなければ false。手動キャストと違い例外を出さない。",
      quickJudgePoint: "instanceof パターンは型違いでも false で安全。",
      oneLineMemory: "型違いのinstanceofは例外でなくfalse。",
    },
  },
  {
    id: 97,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "final", "コンパイルエラー"],
    code: `public class Main {
    static final int MAX = 100;

    public static void main(String[] args) {
        MAX = 200;
        System.out.println(MAX);
    }
}`,
    choices: [
      { label: "A", text: "200" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "100" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "final 変数は初期化後に再代入できない。MAX=200 はコンパイルエラー。",
      executionOrder: ["MAX は static final 定数", "MAX=200 で再代入", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "再代入できない。",
        C: "再代入文があるためコンパイル自体失敗。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "final 変数は一度だけ代入可。再代入はコンパイルエラー。",
      quickJudgePoint: "final 変数への2度目の代入はエラー。",
      oneLineMemory: "final変数は再代入不可(コンパイルエラー)。",
    },
  },
  {
    id: 98,
    targetTime: 120,
    difficulty: "long",
    tags: ["instanceof", "パターンマッチング", "継承"],
    code: `public class Main {
    static String f(Object o) {
        if (o instanceof Integer i) return "I" + i;
        else if (o instanceof Number n) return "N" + n;
        else return "O";
    }

    public static void main(String[] args) {
        System.out.println(f(3) + " " + f(3.5) + " " + f("x"));
    }
}`,
    choices: [
      { label: "A", text: "I3 N3.5 O" },
      { label: "B", text: "N3 N3.5 O" },
      { label: "C", text: "I3 I3.5 O" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "f(3): Integer に一致 → \"I3\"。f(3.5): 3.5 は Double で Integer でないが Number → \"N3.5\"。f(\"x\"): どちらでもない → \"O\"。",
      executionOrder: [
        "3 は Integer → \"I3\"",
        "3.5 は Double(Number) → \"N3.5\"",
        "\"x\" は非数値 → \"O\"",
      ],
      whyOthersAreWrong: {
        B: "3 は Integer 分岐に先にマッチ。",
        C: "3.5 は Integer ではない。",
        D: "Number は Integer/Double の親で判定可能。",
      },
      examPoint: "複数 instanceof は上から評価。狭い型(Integer)を先に判定し、広い型(Number)は後。",
      quickJudgePoint: "instanceof の分岐は狭い型から順に並べる。",
      oneLineMemory: "instanceof分岐は狭い型→広い型の順で評価。",
    },
  },
  {
    id: 99,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "メソッド"],
    code: `public class Main {
    static int count = 3;
    static int get() { return count; }

    public static void main(String[] args) {
        System.out.println(get());
    }
}`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "3" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "static メソッド get() は static フィールド count を参照できる(両方ともクラスに属す)。count=3 → 3。",
      executionOrder: ["count=3", "get() は static→static 参照OK", "3"],
      whyOthersAreWrong: {
        A: "count は3で初期化済み。",
        C: "static から static の参照は合法。",
        D: "例外なし。",
      },
      examPoint: "static メソッドから static フィールドは直接参照できる(インスタンスメンバは不可)。",
      quickJudgePoint: "static同士のアクセスは問題なし。",
      oneLineMemory: "staticメソッドはstaticフィールドを参照できる。",
    },
  },
  {
    id: 100,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "三項演算子", "Wrapper"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = Integer.valueOf(50);
        String r = (o instanceof Integer i && i >= 50) ? "big" : "small";
        System.out.println(r);
    }
}`,
    choices: [
      { label: "A", text: "big" },
      { label: "B", text: "small" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "o は Integer(50)。instanceof Integer i → true、i=50。i>=50 も true → \"big\"。アンボクシングで比較される。",
      executionOrder: ["o は Integer 50", "instanceof → true, i=50", "i>=50 → true", "\"big\""],
      whyOthersAreWrong: {
        B: "50>=50 は true なので big。",
        C: "三項条件での instanceof + && は合法。",
        D: "例外なし。",
      },
      examPoint: "三項条件で instanceof パターン＋数値比較を組める。Integer は自動アンボクシングで比較。",
      quickJudgePoint: "instanceof i && i>=n のパターンは true 側で i が使える。",
      oneLineMemory: "三項+instanceof+&&でパターン変数を比較に使える。",
    },
  },
];
