import type { Question } from "../../types";

// 第3セット（id 41-60）: クラス定義 / 初期化 / this / super / コンストラクタ
export const set03: Question[] = [
  {
    id: 41,
    targetTime: 90,
    difficulty: "normal",
    tags: ["継承", "コンストラクタ", "暗黙のsuper"],
    code: `class A { A() { System.out.print("A"); } }
class B extends A { B() { System.out.print("B"); } }

public class Main {
    public static void main(String[] args) {
        new B();
    }
}`,
    choices: [
      { label: "A", text: "BA" },
      { label: "B", text: "AB" },
      { label: "C", text: "B" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "B() の先頭には暗黙の super() が挿入され、まず A() が実行されてから B() 本体が実行される → AB。",
      executionOrder: ["new B()", "暗黙 super() → A() 実行 → \"A\"", "B() 本体 → \"B\""],
      whyOthersAreWrong: {
        A: "親が先。子は後。",
        C: "親コンストラクタも必ず実行される。",
        D: "A は no-arg コンストラクタを持つので問題なし。",
      },
      examPoint: "サブクラスのコンストラクタ先頭には暗黙の super() が入り、親が先に構築される。",
      quickJudgePoint: "親→子の順でコンストラクタが走る。",
      oneLineMemory: "コンストラクタは親→子の順(暗黙super())。",
    },
  },
  {
    id: 42,
    targetTime: 120,
    difficulty: "normal",
    tags: ["継承", "コンストラクタ", "super", "コンパイルエラー"],
    code: `class A { A(int x) {} }
class B extends A { B() {} }

public class Main {
    public static void main(String[] args) {
        new B();
    }
}`,
    choices: [
      { label: "A", text: "正常に実行される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "0 が出力される" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "B() に暗黙の super() が入るが、A には no-arg コンストラクタが無い（A(int) のみ）ためコンパイルエラー。",
      executionOrder: [
        "B() 先頭に暗黙 super()",
        "A に no-arg コンストラクタが無い",
        "コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "親に呼べる no-arg コンストラクタが無い。",
        C: "コンパイル時点で失敗。",
        D: "実行に至らない。",
      },
      examPoint: "親に no-arg コンストラクタが無ければ、子は明示的に super(引数) を呼ぶ必要がある。",
      quickJudgePoint: "親が引数付きコンストラクタのみ＋子で super 明示なし＝コンパイルエラー。",
      oneLineMemory: "親にno-argが無いと子は明示super(...)が必須。",
    },
  },
  {
    id: 43,
    targetTime: 120,
    difficulty: "long",
    tags: ["コンストラクタ", "this", "コンストラクタチェーン"],
    code: `class P {
    int v;
    P() {
        this(10);
        System.out.print("no-arg ");
    }
    P(int v) {
        this.v = v;
        System.out.print("int" + v + " ");
    }
}

public class Main {
    public static void main(String[] args) {
        new P();
    }
}`,
    choices: [
      { label: "A", text: "no-arg int10 " },
      { label: "B", text: "int10 no-arg " },
      { label: "C", text: "no-arg " },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "P() は先頭で this(10) を呼ぶため、先に P(int) が実行され \"int10 \"、戻ってから P() 本体の \"no-arg \"。",
      executionOrder: [
        "new P() → this(10) を先に実行",
        "P(int) 本体 → \"int10 \"",
        "P() 本体に戻る → \"no-arg \"",
      ],
      whyOthersAreWrong: {
        A: "this(10) が先に完了するので順序が逆。",
        C: "P(int) も実行される。",
        D: "this() は正しく先頭にあり合法。",
      },
      examPoint: "this(引数) は別コンストラクタへの委譲。委譲先が先に完了する。",
      quickJudgePoint: "this(...) があれば委譲先が先、呼び出し元本体は後。",
      oneLineMemory: "this(...)委譲先が先に実行される。",
    },
  },
  {
    id: 44,
    targetTime: 90,
    difficulty: "normal",
    tags: ["コンストラクタ", "this", "コンパイルエラー"],
    code: `class P {
    P() {
        System.out.println("hi");
        this(5);
    }
    P(int x) {}
}

public class Main {
    public static void main(String[] args) {
        new P();
    }
}`,
    choices: [
      { label: "A", text: "hi が出力される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "this(...) や super(...) はコンストラクタの『最初の文』でなければならない。println の後に書くとコンパイルエラー。",
      executionOrder: ["this(5) が先頭でない", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "コンパイルできず実行されない。",
        C: "コンパイル時のエラー。",
        D: "ビルド自体が失敗する。",
      },
      examPoint: "this()/super() はコンストラクタの先頭(最初の文)に1つだけ書ける。",
      quickJudgePoint: "this()/super() の前に文があったらコンパイルエラー。",
      oneLineMemory: "this()/super()はコンストラクタの最初の文。",
    },
  },
  {
    id: 45,
    targetTime: 90,
    difficulty: "normal",
    tags: ["フィールド", "初期化", "既定値"],
    code: `public class Main {
    static int i;
    static boolean b;
    static String s;

    public static void main(String[] args) {
        System.out.println(i + " " + b + " " + s);
    }
}`,
    choices: [
      { label: "A", text: "0 true null" },
      { label: "B", text: "0 false null" },
      { label: "C", text: "null false null" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "フィールドは既定値で初期化される。int=0、boolean=false、参照型(String)=null。",
      executionOrder: ["int i → 0", "boolean b → false", "String s → null"],
      whyOthersAreWrong: {
        A: "boolean の既定値は false。",
        C: "int の既定値は 0(nullではない)。",
        D: "フィールドは明示初期化なしでも既定値を持つ。",
      },
      examPoint: "フィールドは既定値あり(数値0/boolean false/参照null)。ローカル変数は既定値なし。",
      quickJudgePoint: "フィールドは0/false/null、ローカルは未初期化エラー。",
      oneLineMemory: "フィールド既定値: 数値0, boolean false, 参照null。",
    },
  },
  {
    id: 46,
    targetTime: 90,
    difficulty: "normal",
    tags: ["変数", "スコープ", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        int x;
        System.out.println(x);
    }
}`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "ローカル変数は既定値を持たない。初期化せずに使用するとコンパイルエラー(未初期化)。",
      executionOrder: ["int x は未初期化", "使用 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "ローカル変数は0で初期化されない（フィールドとは違う）。",
        C: "int に null は無関係。",
        D: "コンパイル時に検出。",
      },
      examPoint: "ローカル変数は使用前に必ず明示的に初期化が必要(既定値なし)。",
      quickJudgePoint: "ローカル変数を初期化せず使用していたらコンパイルエラー。",
      oneLineMemory: "ローカル変数は既定値なし、未初期化使用はエラー。",
    },
  },
  {
    id: 47,
    targetTime: 120,
    difficulty: "normal",
    tags: ["継承", "super", "オーバーライド"],
    code: `class A { String name() { return "A"; } }
class B extends A {
    String name() { return "B"; }
    String both() { return super.name() + name(); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new B().both());
    }
}`,
    choices: [
      { label: "A", text: "BB" },
      { label: "B", text: "AA" },
      { label: "C", text: "AB" },
      { label: "D", text: "BA" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "super.name() は親の実装 \"A\"、name() は自身のオーバーライド \"B\"。連結して \"AB\"。",
      executionOrder: ["super.name() → \"A\"", "name() → \"B\"", "\"A\"+\"B\" = AB"],
      whyOthersAreWrong: {
        A: "super.name() は親の実装。",
        B: "name() は B のオーバーライド版。",
        D: "順序は super が先。",
      },
      examPoint: "super.method() は親の実装を直接呼ぶ。通常呼び出しは動的に解決される。",
      quickJudgePoint: "super. が付けば親実装、付かなければ実体の実装。",
      oneLineMemory: "super.m()は親実装、m()は実体の実装。",
    },
  },
  {
    id: 48,
    targetTime: 120,
    difficulty: "long",
    tags: ["コンストラクタ", "メソッド", "ライフサイクル"],
    code: `class P {
    int x;
    void P() { x = 5; }
    P() { x = 1; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new P().x);
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "1" },
      { label: "C", text: "0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "void P() は『戻り値型を持つ』ので、コンストラクタではなく P という名前の通常メソッド。new P() が呼ぶのはコンストラクタ P() で x=1。",
      executionOrder: [
        "void P() はメソッド(呼ばれていない)",
        "new P() はコンストラクタ P() を実行 → x=1",
      ],
      whyOthersAreWrong: {
        A: "void P() はメソッドで、new では呼ばれない。",
        C: "コンストラクタ P() が x=1 に設定する。",
        D: "メソッドとコンストラクタが同名でも合法。",
      },
      examPoint: "戻り値型を書いたら『メソッド』。コンストラクタは戻り値型を書かない。",
      quickJudgePoint: "クラス名と同名でも void 等が付いていればただのメソッド。",
      oneLineMemory: "戻り値型付きはメソッド、無しがコンストラクタ。",
    },
  },
  {
    id: 49,
    targetTime: 90,
    difficulty: "normal",
    tags: ["final", "フィールド", "コンパイルエラー"],
    code: `class P {
    final int x;
    P() {
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new P().x);
    }
}`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "final インスタンスフィールドは宣言時かコンストラクタで必ず初期化が必要。未初期化のためコンパイルエラー。",
      executionOrder: ["final x が宣言時にもコンストラクタでも未代入", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "final は既定値0のままにできない。",
        C: "コンパイル時のエラー。",
        D: "int に null は無関係。",
      },
      examPoint: "final フィールドは『宣言時 or 全コンストラクタ』で必ず1回初期化。",
      quickJudgePoint: "final フィールドが初期化されていなければコンパイルエラー。",
      oneLineMemory: "finalフィールドは初期化必須(宣言時かコンストラクタ)。",
    },
  },
  {
    id: 50,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "クラス変数"],
    code: `class Counter {
    static int count = 0;
    Counter() { count++; }
}

public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        new Counter();
        System.out.println(Counter.count);
    }
}`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "3" },
      { label: "C", text: "0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "static 変数 count は全インスタンスで共有。3回 new するたびに count++ され 3。",
      executionOrder: ["static count はクラスに1つ", "3回生成 → count=3"],
      whyOthersAreWrong: {
        A: "static はインスタンスごとに別々ではない。",
        C: "コンストラクタで加算される。",
        D: "正しいコード。",
      },
      examPoint: "static フィールドはクラスに1つ、全インスタンスで共有される。",
      quickJudgePoint: "static変数はインスタンス数に関係なくクラスで1個。",
      oneLineMemory: "static変数は全インスタンス共有。",
    },
  },
  {
    id: 51,
    targetTime: 180,
    difficulty: "complex",
    tags: ["初期化順序", "インスタンス初期化子", "this"],
    prompt: "次のコードを実行したときの出力として正しいものはどれか。",
    code: `class P {
    { System.out.print("init "); }
    P() { System.out.print("ctor "); }
    P(int x) {
        this();
        System.out.print("intctor ");
    }
}

public class Main {
    public static void main(String[] args) {
        new P(5);
    }
}`,
    choices: [
      { label: "A", text: "ctor init intctor " },
      { label: "B", text: "init ctor intctor " },
      { label: "C", text: "init intctor ctor " },
      { label: "D", text: "init ctor " },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "インスタンス初期化子は『this() で委譲しないコンストラクタ』の本体直前に実行される。P(int)→this()→P()が起点なので、P()本体直前に init→\"init \"→\"ctor \"、戻って\"intctor \"。",
      executionOrder: [
        "new P(5) → this() に委譲",
        "起点 P() の本体直前に初期化子 → \"init \"",
        "P() 本体 → \"ctor \"",
        "P(int) に戻る → \"intctor \"",
      ],
      whyOthersAreWrong: {
        A: "初期化子は本体より前。",
        C: "委譲先 P() が先に完了する。",
        D: "P(int) 本体の intctor も実行される。",
      },
      examPoint: "インスタンス初期化子は this() 委譲しない側のコンストラクタで1回だけ実行される。",
      quickJudgePoint: "this()委譲時は初期化子が二重実行されない。起点で1回。",
      oneLineMemory: "初期化子はthis()委譲しないコンストラクタで1回実行。",
    },
  },
  {
    id: 52,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オブジェクト", "ライフサイクル", "GC"],
    prompt: "オブジェクトのライフサイクルに関する説明として正しいものを選べ。",
    code: `String s = new String("x");
s = null;`,
    choices: [
      { label: "A", text: "s に null を代入した時点で参照を失った \"x\" は GC の対象になり得る" },
      { label: "B", text: "null 代入は実行時に NullPointerException を起こす" },
      { label: "C", text: "オブジェクトは明示的に delete しないと解放されない" },
      { label: "D", text: "ローカル変数 s 自体を手動で解放する必要がある" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "どこからも参照されなくなったオブジェクトは GC の対象になり得る。Java に明示的な delete は無く、GC が自動回収する。",
      executionOrder: [
        "s が \"x\" を参照",
        "s = null で参照が無くなる",
        "\"x\" は到達不能 → GC 対象",
      ],
      whyOthersAreWrong: {
        B: "null 代入自体は例外を起こさない（null参照のメソッド呼び出しがNPE）。",
        C: "Java に delete は無い。GC が回収する。",
        D: "ローカル変数はスコープ終了で消える。手動解放は不要。",
      },
      examPoint: "参照が無くなった(到達不能)オブジェクトは GC 対象。明示的解放は不要。",
      quickJudgePoint: "『どこからも参照されない』= GC 対象。",
      oneLineMemory: "到達不能オブジェクトはGC対象(delete不要)。",
    },
  },
  {
    id: 53,
    targetTime: 90,
    difficulty: "normal",
    tags: ["アクセス修飾子", "private", "カプセル化", "コンパイルエラー"],
    code: `class P { private int x = 5; }

public class Main {
    public static void main(String[] args) {
        P p = new P();
        System.out.println(p.x);
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "0" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "private フィールドは宣言クラス(P)の外からアクセスできない。別クラス Main から p.x を参照するとコンパイルエラー。",
      executionOrder: ["x は private", "Main から p.x 参照 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "アクセスできないため値を読めない。",
        C: "コンパイル自体が失敗。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "private は同一クラス内のみ。別クラスからは不可(getter等が必要)。",
      quickJudgePoint: "private メンバを別クラスから触っていたらコンパイルエラー。",
      oneLineMemory: "privateは同一クラス内のみアクセス可。",
    },
  },
  {
    id: 54,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オーバーロード", "コンストラクタ", "型変換"],
    code: `class P {
    P(int x) { System.out.print("int"); }
    P(long x) { System.out.print("long"); }
}

public class Main {
    public static void main(String[] args) {
        new P(5);
    }
}`,
    choices: [
      { label: "A", text: "long" },
      { label: "B", text: "int" },
      { label: "C", text: "コンパイルエラー（あいまい）" },
      { label: "D", text: "intlong" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "5 は int リテラル。オーバーロード解決はより具体的(変換の少ない)な型を選ぶため P(int) が呼ばれ \"int\"。",
      executionOrder: [
        "5 は int",
        "P(int) は完全一致、P(long) は拡大変換",
        "完全一致を優先 → \"int\"",
      ],
      whyOthersAreWrong: {
        A: "long は拡大変換が必要で、int の完全一致に劣る。",
        C: "完全一致があるためあいまいではない。",
        D: "呼ばれるのは1つだけ。",
      },
      examPoint: "オーバーロード解決は『完全一致＞拡大変換＞ボクシング＞可変長』の優先順。",
      quickJudgePoint: "完全一致のオーバーロードがあればそれが最優先。",
      oneLineMemory: "オーバーロードは完全一致を最優先。",
    },
  },
  {
    id: 55,
    targetTime: 120,
    difficulty: "long",
    tags: ["継承", "フィールド隠蔽", "this", "super"],
    code: `class A { int x = 1; }
class B extends A {
    int x = 2;
    int get() { return super.x + this.x; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new B().get());
    }
}`,
    choices: [
      { label: "A", text: "4" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "1" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "B は A の x を隠蔽(hiding)。super.x は親の 1、this.x は自身の 2。和は 3。",
      executionOrder: ["super.x → 1(親)", "this.x → 2(自身)", "1+2 = 3"],
      whyOthersAreWrong: {
        A: "this.x は2、super.x は1で和は3。",
        B: "super.x(1)も加算される。",
        D: "this.x(2)も加算される。",
      },
      examPoint: "同名フィールドは隠蔽され、super.x と this.x で別々に参照できる。",
      quickJudgePoint: "フィールドはオーバーライドされず隠蔽。super/this で区別。",
      oneLineMemory: "フィールドは隠蔽。super.xとthis.xは別物。",
    },
  },
  {
    id: 56,
    targetTime: 180,
    difficulty: "complex",
    tags: ["初期化順序", "継承", "static"],
    prompt: "次のコードを実行したときの出力として正しいものはどれか。",
    code: `class A {
    static { System.out.print("As "); }
    { System.out.print("Ai "); }
    A() { System.out.print("Ac "); }
}
class B extends A {
    static { System.out.print("Bs "); }
    { System.out.print("Bi "); }
    B() { System.out.print("Bc "); }
}

public class Main {
    public static void main(String[] args) {
        new B();
    }
}`,
    choices: [
      { label: "A", text: "As Ai Ac Bs Bi Bc " },
      { label: "B", text: "As Bs Ai Ac Bi Bc " },
      { label: "C", text: "Bs As Ai Ac Bi Bc " },
      { label: "D", text: "As Bs Bi Bc Ai Ac " },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "まずクラス初期化(static)が親→子: As Bs。次にインスタンス生成で親の初期化子+コンストラクタ(Ai Ac)、続いて子(Bi Bc)。",
      executionOrder: [
        "クラス初期化(1回): 親static→子static = As Bs",
        "new B(): 親インスタンス初期化子+親ctor = Ai Ac",
        "子インスタンス初期化子+子ctor = Bi Bc",
      ],
      whyOthersAreWrong: {
        A: "static は親子まとめて先に実行される。",
        C: "static も親(As)が先。",
        D: "親の Ai Ac が子より先。",
      },
      examPoint: "順序: 親static→子static→親(初期化子+ctor)→子(初期化子+ctor)。",
      quickJudgePoint: "staticが全部先、その後インスタンスは親→子。",
      oneLineMemory: "親static→子static→親inst→子inst。",
    },
  },
  {
    id: 57,
    targetTime: 90,
    difficulty: "normal",
    tags: ["static", "this", "コンパイルエラー"],
    code: `public class Main {
    int x = 5;

    public static void main(String[] args) {
        System.out.println(this.x);
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "0" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "main は static。static コンテキストには this が存在しないため this.x はコンパイルエラー。",
      executionOrder: ["main は static", "this は存在しない", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "this が使えないため値を取れない。",
        C: "コンパイル自体が失敗。",
        D: "無関係。",
      },
      examPoint: "static メソッド/ブロックでは this は使えない(インスタンスが無い)。",
      quickJudgePoint: "static の中の this はコンパイルエラー。",
      oneLineMemory: "staticの中ではthis不可。",
    },
  },
  {
    id: 58,
    targetTime: 120,
    difficulty: "normal",
    tags: ["コンストラクタ", "private", "アクセス修飾子", "コンパイルエラー"],
    code: `class P {
    private P() {}
}

public class Main {
    public static void main(String[] args) {
        P p = new P();
        System.out.println(p);
    }
}`,
    choices: [
      { label: "A", text: "P のハッシュ表現が出力される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "P のコンストラクタが private のため、別クラス Main から new P() できずコンパイルエラー。",
      executionOrder: ["P() は private", "Main から new P() 不可 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "インスタンス化できない。",
        C: "コンパイル時のエラー。",
        D: "無関係。",
      },
      examPoint: "private コンストラクタは外部から new 不可（同一クラス内の static ファクトリ等で生成）。",
      quickJudgePoint: "別クラスから private コンストラクタを new していたらエラー。",
      oneLineMemory: "privateコンストラクタは外部からnew不可。",
    },
  },
  {
    id: 59,
    targetTime: 150,
    difficulty: "long",
    tags: ["初期化順序", "フィールド", "メソッド呼び出し"],
    code: `public class Main {
    int a = getB();
    int b = 10;

    int getB() { return b; }

    public static void main(String[] args) {
        System.out.println(new Main().a);
    }
}`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "0" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "フィールド初期化は記述順。a = getB() が先に実行されるが、その時点で b はまだ既定値0。よって a=0。後で b=10 になる。",
      executionOrder: [
        "a = getB() を先に評価",
        "この時点で b は未初期化(=0)",
        "a = 0、その後 b = 10",
      ],
      whyOthersAreWrong: {
        A: "b の初期化は a より後。getB() 時点では0。",
        C: "前方参照のメソッド呼び出しは合法。",
        D: "例外は起きない。",
      },
      examPoint: "フィールドは記述順に初期化。後ろのフィールドを先に参照すると既定値が見える。",
      quickJudgePoint: "上のフィールドが下のフィールドを参照したら既定値(0/null)を疑う。",
      oneLineMemory: "フィールド初期化は記述順。未初期化参照は既定値。",
    },
  },
  {
    id: 60,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オブジェクト", "==", "equals"],
    code: `public class Main {
    static class P {}

    public static void main(String[] args) {
        P a = new P();
        P b = new P();
        P c = a;
        System.out.println((a == b) + " " + (a == c) + " " + a.equals(c));
    }
}`,
    choices: [
      { label: "A", text: "false false true" },
      { label: "B", text: "false true true" },
      { label: "C", text: "true true true" },
      { label: "D", text: "false true false" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "a と b は別オブジェクト → a==b false。c=a で同一参照 → a==c true。Object.equals は既定で == と同じ → a.equals(c) true。",
      executionOrder: [
        "a, b は別インスタンス → a==b false",
        "c=a → 同一参照 → a==c true",
        "equals 未オーバーライド → ==と同義 → a.equals(c) true",
      ],
      whyOthersAreWrong: {
        A: "c は a と同一参照なので a==c は true。",
        C: "a と b は別物。",
        D: "a.equals(c) は同一参照なので true。",
      },
      examPoint: "equals を未オーバーライドなら Object.equals(=参照比較)。== と同じ結果。",
      quickJudgePoint: "equals 未定義クラスの equals は == と同じ。",
      oneLineMemory: "未オーバーライドのequalsは参照比較(==と同じ)。",
    },
  },
];
