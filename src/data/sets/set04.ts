import type { Question } from "../../types";

// 第4セット（id 61-80）: 継承 / ポリモーフィズム / オーバーライド・ロード / キャスト
export const set04: Question[] = [
  {
    id: 61,
    targetTime: 90,
    difficulty: "normal",
    tags: ["継承", "多態性", "オーバーライド"],
    code: `class A { String m() { return "A"; } }
class B extends A { String m() { return "B"; } }

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.m());
    }
}`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "AB" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "インスタンスメソッドは動的バインディング。参照型は A でも実体は B なので B.m() が呼ばれ \"B\"。",
      executionOrder: ["a の実体は B", "m() は動的解決 → B.m()", "\"B\""],
      whyOthersAreWrong: {
        A: "フィールドや static と違い、インスタンスメソッドは実体で解決。",
        C: "1つだけ呼ばれる。",
        D: "正しいオーバーライド。",
      },
      examPoint: "インスタンスメソッドの呼び出しは実体型で動的に解決(多態性)。",
      quickJudgePoint: "メソッド呼び出しは new した型を見る。",
      oneLineMemory: "インスタンスメソッドは実体型で解決(動的)。",
    },
  },
  {
    id: 62,
    targetTime: 150,
    difficulty: "long",
    tags: ["オーバーロード", "解決順序", "null"],
    code: `class A {
    void m(Object o) { System.out.print("obj "); }
    void m(String s) { System.out.print("str "); }
}

public class Main {
    public static void main(String[] args) {
        A a = new A();
        a.m("hi");
        a.m((Object) "hi");
        a.m(null);
    }
}`,
    choices: [
      { label: "A", text: "str obj str " },
      { label: "B", text: "obj obj obj " },
      { label: "C", text: "str obj obj " },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "オーバーロードは『コンパイル時の引数の型』で決まる。\"hi\"→最具体のString、(Object)\"hi\"→Object、null→より具体的なStringが選ばれる。",
      executionOrder: [
        "m(\"hi\") → String が最具体 → str",
        "m((Object)\"hi\") → 型は Object → obj",
        "m(null) → String が Object より具体的 → str",
      ],
      whyOthersAreWrong: {
        B: "\"hi\" は String 引数に最も適合。",
        C: "null は最具体の String が選ばれる。",
        D: "String と Object は継承関係があり、最具体が一意に決まる。",
      },
      examPoint: "オーバーロードは静的(コンパイル時型)解決。null は最も具体的な型が一意なら選べる。",
      quickJudgePoint: "オーバーロードは『見た目の型』で決まる。キャストで変わる。",
      oneLineMemory: "オーバーロードはコンパイル時の引数型で解決。",
      similarTrap: "互いに無関係な型(String/StringBuilder)で m(null) はあいまいでコンパイルエラー。",
    },
  },
  {
    id: 63,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オーバーライド", "共変戻り値", "多態性"],
    code: `class A { Object get() { return "A"; } }
class B extends A {
    @Override
    String get() { return "B"; }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.get());
    }
}`,
    choices: [
      { label: "A", text: "B" },
      { label: "B", text: "A" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "戻り値を親型のサブタイプ(Object→String)にするのは『共変戻り値』として合法なオーバーライド。動的解決で B.get() が呼ばれ \"B\"。",
      executionOrder: ["String は Object のサブタイプ → 共変戻り値で合法", "実体 B → B.get() → \"B\""],
      whyOthersAreWrong: {
        B: "実体は B なので B の実装。",
        C: "共変戻り値は許可される(エラーにならない)。",
        D: "例外は起きない。",
      },
      examPoint: "オーバーライドの戻り値は親メソッドの戻り型のサブタイプ(共変)ならOK。",
      quickJudgePoint: "戻り値が親型→子型に絞られていても合法。",
      oneLineMemory: "共変戻り値(親型→サブ型)のオーバーライドは合法。",
    },
  },
  {
    id: 64,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オーバーライド", "アクセス修飾子", "コンパイルエラー"],
    code: `class A { public void m() {} }
class B extends A {
    protected void m() {}
}

public class Main {
    public static void main(String[] args) {
        new B().m();
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
        "オーバーライドはアクセス範囲を狭められない。public を protected に下げるとコンパイルエラー。",
      executionOrder: ["親 m は public", "子で protected に縮小", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "アクセス範囲縮小は不可。",
        C: "コンパイル時のエラー。",
        D: "ビルドが失敗する。",
      },
      examPoint: "オーバーライド時のアクセス修飾子は『同じか広く』のみ。狭めるのは不可。",
      quickJudgePoint: "override で public→protected→default→private と狭めたらエラー。",
      oneLineMemory: "オーバーライドはアクセスを狭められない。",
    },
  },
  {
    id: 65,
    targetTime: 150,
    difficulty: "long",
    tags: ["オーバーライド", "例外", "throws", "コンパイルエラー"],
    code: `import java.io.*;

class A { void m() {} }
class B extends A {
    void m() throws IOException {}
}

public class Main {
    public static void main(String[] args) {
        new B().m();
    }
}`,
    choices: [
      { label: "A", text: "正常に実行される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "IOException が出力される" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "オーバーライドで新たな(より広い)チェック例外を throws に追加できない。親が throws 無しなのに子が IOException を投げる宣言はコンパイルエラー。",
      executionOrder: ["親 m は throws なし", "子で IOException(チェック例外)を追加", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "チェック例外の追加は不可。",
        C: "コンパイル時のエラー。",
        D: "実行に至らない。",
      },
      examPoint: "オーバーライドの throws は『同じか狭く』。チェック例外の新規追加・拡大は不可(非チェックはOK)。",
      quickJudgePoint: "子で親に無いチェック例外を throws したらエラー。",
      oneLineMemory: "オーバーライドのthrowsは狭める方向のみ。",
    },
  },
  {
    id: 66,
    targetTime: 120,
    difficulty: "long",
    tags: ["static", "メソッド隠蔽", "継承"],
    code: `class A { static String m() { return "A"; } }
class B extends A { static String m() { return "B"; } }

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.m());
    }
}`,
    choices: [
      { label: "A", text: "B" },
      { label: "B", text: "A" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "static メソッドはオーバーライドではなく『隠蔽』。参照変数経由でも参照型(A)で静的に解決され \"A\"。",
      executionOrder: ["m は static → 隠蔽", "参照型 A で解決 → A.m()", "\"A\""],
      whyOthersAreWrong: {
        A: "static は実体型で解決されない。",
        C: "インスタンス経由で static を呼ぶのは(非推奨だが)合法。",
        D: "例外なし。",
      },
      examPoint: "static メソッドは隠蔽。参照変数の宣言型で解決される(多態性なし)。",
      quickJudgePoint: "static メソッド呼び出しは左の型を見る。",
      oneLineMemory: "staticメソッドは隠蔽、参照型で解決。",
    },
  },
  {
    id: 67,
    targetTime: 120,
    difficulty: "normal",
    tags: ["キャスト", "例外"],
    code: `public class Main {
    public static void main(String[] args) {
        Object o = "hello";
        Integer i = (Integer) o;
        System.out.println(i);
    }
}`,
    choices: [
      { label: "A", text: "hello" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時に ClassCastException" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "実体は String なのに Integer へキャスト。コンパイルは通る(両方Object経由)が、実行時に ClassCastException。",
      executionOrder: ["o の実体は String", "(Integer) へキャスト → 型不一致", "実行時 ClassCastException"],
      whyOthersAreWrong: {
        A: "キャストに失敗して出力に至らない。",
        B: "Object→Integer のキャストはコンパイル上は許される。",
        D: "例外がスローされる。",
      },
      examPoint: "ダウンキャストはコンパイルでは通っても、実体が違えば実行時 ClassCastException。",
      quickJudgePoint: "実体型と違う型へのキャストは実行時 ClassCastException。",
      oneLineMemory: "実体に合わないキャストは実行時ClassCastException。",
    },
  },
  {
    id: 68,
    targetTime: 90,
    difficulty: "normal",
    tags: ["キャスト", "ダウンキャスト", "多態性"],
    code: `class A {}
class B extends A {
    void hi() { System.out.println("hi"); }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        ((B) a).hi();
    }
}`,
    choices: [
      { label: "A", text: "hi" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時に ClassCastException" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "a の実体は B。(B) へのダウンキャストは成功し、B 固有の hi() を呼べる → \"hi\"。",
      executionOrder: ["a の実体は B", "(B)a は成功", "hi() → \"hi\""],
      whyOthersAreWrong: {
        B: "ダウンキャストの構文は合法。",
        C: "実体が B なので ClassCastException にならない。",
        D: "hi() が実行される。",
      },
      examPoint: "親型参照から子固有メソッドを呼ぶにはダウンキャストが必要(実体が一致すれば成功)。",
      quickJudgePoint: "実体が一致するダウンキャストは成功。",
      oneLineMemory: "実体一致のダウンキャストで子固有メソッドが呼べる。",
    },
  },
  {
    id: 69,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "継承"],
    code: `class A {}
class B extends A {}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println((a instanceof A) + " " + (a instanceof B));
    }
}`,
    choices: [
      { label: "A", text: "true true" },
      { label: "B", text: "true false" },
      { label: "C", text: "false true" },
      { label: "D", text: "false false" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "実体は B。B は A のサブタイプなので a instanceof A も a instanceof B も true。",
      executionOrder: ["a の実体は B", "B は A でもある", "両方 true"],
      whyOthersAreWrong: {
        B: "実体 B なので instanceof B も true。",
        C: "B は A のサブタイプで instanceof A も true。",
        D: "両方 true。",
      },
      examPoint: "instanceof は『その型またはサブタイプ』なら true。",
      quickJudgePoint: "実体型とその全ての親型に対して instanceof は true。",
      oneLineMemory: "instanceofは実体型と親型すべてにtrue。",
    },
  },
  {
    id: 70,
    targetTime: 90,
    difficulty: "normal",
    tags: ["final", "オーバーライド", "コンパイルエラー"],
    code: `class A { final void m() {} }
class B extends A {
    void m() {}
}

public class Main {
    public static void main(String[] args) {
        new B().m();
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
      reason: "final メソッドはオーバーライドできない。子で m() を再定義するとコンパイルエラー。",
      executionOrder: ["親 m は final", "子で再定義 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "final メソッドは上書き不可。",
        C: "コンパイル時のエラー。",
        D: "ビルドが失敗する。",
      },
      examPoint: "final メソッドはオーバーライド不可。final クラスは継承不可。",
      quickJudgePoint: "final メソッドを子で再定義していたらエラー。",
      oneLineMemory: "finalメソッドはオーバーライド不可。",
    },
  },
  {
    id: 71,
    targetTime: 120,
    difficulty: "long",
    tags: ["オーバーロード", "null", "あいまい", "コンパイルエラー"],
    code: `class A {
    void m(StringBuilder s) { System.out.print("sb"); }
    void m(String s) { System.out.print("str"); }
}

public class Main {
    public static void main(String[] args) {
        new A().m(null);
    }
}`,
    choices: [
      { label: "A", text: "str" },
      { label: "B", text: "sb" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "null は String にも StringBuilder にも渡せるが、両者に継承関係が無くどちらが『より具体的』か決まらない。あいまいでコンパイルエラー。",
      executionOrder: [
        "null は両方の引数型に適合",
        "String と StringBuilder は無関係",
        "最具体が一意でない → あいまいでコンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "String が選ばれる根拠がない(StringBuilderも同格)。",
        B: "同上。",
        D: "コンパイル時に弾かれる。",
      },
      examPoint: "互いに無関係な参照型同士のオーバーロードに null を渡すとあいまいでエラー。キャストで回避。",
      quickJudgePoint: "無関係な型のオーバーロード＋null引数＝あいまいエラーを疑う。",
      oneLineMemory: "無関係型オーバーロード+nullはあいまいエラー。",
    },
  },
  {
    id: 72,
    targetTime: 120,
    difficulty: "long",
    tags: ["継承", "フィールド隠蔽", "多態性"],
    code: `class A { String name = "A"; }
class B extends A { String name = "B"; }

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.name);
    }
}`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "AB" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "フィールドは多態性が効かず、参照型(A)で静的に解決される。a.name は A の name = \"A\"。",
      executionOrder: ["フィールドは参照型で解決", "参照型 A → A.name", "\"A\""],
      whyOthersAreWrong: {
        B: "フィールドはオーバーライドされず実体型で解決されない。",
        C: "1つだけ。",
        D: "合法(隠蔽)。",
      },
      examPoint: "フィールドは隠蔽され参照型で解決。メソッドだけが実体型で動的解決。",
      quickJudgePoint: "a.field は左の型を見る、a.method() は実体を見る。",
      oneLineMemory: "フィールドは参照型で解決(多態性なし)。",
    },
  },
  {
    id: 73,
    targetTime: 90,
    difficulty: "normal",
    tags: ["abstract class", "継承", "コンパイルエラー"],
    code: `abstract class A { abstract void m(); }
class B extends A {}

public class Main {
    public static void main(String[] args) {
        new B();
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
        "B は abstract メソッド m() を実装していない。具象クラスは全 abstract メソッドを実装する必要があるためコンパイルエラー。",
      executionOrder: ["A に abstract m()", "B が m() を未実装", "B も abstract でない → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "未実装の抽象メソッドが残る。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "具象クラスは継承した全 abstract メソッドを実装必須(さもなくば自身も abstract)。",
      quickJudgePoint: "abstract メソッド未実装の具象クラスはエラー。",
      oneLineMemory: "abstractメソッドは具象クラスで実装必須。",
    },
  },
  {
    id: 74,
    targetTime: 180,
    difficulty: "complex",
    tags: ["多態性", "コンストラクタ", "初期化順序"],
    prompt: "次のコードを実行したときの出力として正しいものはどれか。",
    code: `class A {
    A() { show(); }
    void show() { System.out.println("A"); }
}
class B extends A {
    int x = 5;
    void show() { System.out.println("B" + x); }
}

public class Main {
    public static void main(String[] args) {
        new B();
    }
}`,
    choices: [
      { label: "A", text: "B5" },
      { label: "B", text: "B0" },
      { label: "C", text: "A" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "new B() はまず super()=A() を実行。A() 内の show() は多態性で B.show() を呼ぶが、この時点で B の x はまだ初期化されておらず既定値0 → \"B0\"。",
      executionOrder: [
        "new B() → super()=A() 実行",
        "A() 内 show() は実体 B の show() を呼ぶ",
        "x はまだ未初期化(0)",
        "\"B0\"（その後 x=5 になる）",
      ],
      whyOthersAreWrong: {
        A: "x=5 の初期化は super() 完了後。コンストラクタ中の呼び出し時点では0。",
        C: "show() はオーバーライドされ B 版が呼ばれる。",
        D: "コードは合法。",
      },
      examPoint: "親コンストラクタ内のオーバーライド呼び出しは、子フィールド初期化前に走る危険パターン。",
      quickJudgePoint: "コンストラクタからオーバーライドメソッドを呼ぶとフィールドは既定値の恐れ。",
      oneLineMemory: "親コンストラクタ内のoverride呼びは子フィールド未初期化(既定値)。",
    },
  },
  {
    id: 75,
    targetTime: 150,
    difficulty: "long",
    tags: ["オーバーロード", "自動型変換", "boxing"],
    code: `class A {
    void m(long x) { System.out.print("long"); }
    void m(Integer x) { System.out.print("Integer"); }
}

public class Main {
    public static void main(String[] args) {
        int i = 5;
        new A().m(i);
    }
}`,
    choices: [
      { label: "A", text: "Integer" },
      { label: "B", text: "long" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "int を渡すとき、解決順は『拡大変換(int→long) ＞ ボクシング(int→Integer)』。よって m(long) が選ばれ \"long\"。",
      executionOrder: [
        "int 引数",
        "拡大変換 long が boxing Integer より優先",
        "m(long) → \"long\"",
      ],
      whyOthersAreWrong: {
        A: "ボクシングは拡大変換より後の優先順位。",
        C: "適合する候補があるためエラーにならない。",
        D: "例外なし。",
      },
      examPoint: "オーバーロード解決順: 完全一致＞拡大変換＞ボクシング＞可変長。",
      quickJudgePoint: "int に対し long(拡大)と Integer(boxing)なら long が勝つ。",
      oneLineMemory: "拡大変換はboxingより優先される。",
    },
  },
  {
    id: 76,
    targetTime: 90,
    difficulty: "normal",
    tags: ["多態性", "配列", "オーバーライド"],
    code: `class A { String m() { return "A"; } }
class B extends A { String m() { return "B"; } }

public class Main {
    public static void main(String[] args) {
        A[] arr = { new A(), new B() };
        for (A x : arr) {
            System.out.print(x.m());
        }
    }
}`,
    choices: [
      { label: "A", text: "AB" },
      { label: "B", text: "AA" },
      { label: "C", text: "BB" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "配列は A 型でも各要素の実体に応じて m() が動的解決される。new A()→\"A\"、new B()→\"B\" で \"AB\"。",
      executionOrder: ["要素0は実体A → \"A\"", "要素1は実体B → \"B\"", "\"AB\""],
      whyOthersAreWrong: {
        B: "2要素目は実体 B。",
        C: "1要素目は実体 A。",
        D: "B は A のサブタイプで配列に格納可能。",
      },
      examPoint: "親型配列に子インスタンスを混在でき、各メソッドは実体で解決される。",
      quickJudgePoint: "配列要素も実体型でメソッド解決。",
      oneLineMemory: "親型配列でも各要素は実体型でメソッド解決。",
    },
  },
  {
    id: 77,
    targetTime: 120,
    difficulty: "normal",
    tags: ["キャスト", "継承", "コンパイルエラー"],
    code: `class A {}
class B extends A {}
class C extends A {}

public class Main {
    public static void main(String[] args) {
        B b = new B();
        C c = (C) b;
        System.out.println(c);
    }
}`,
    choices: [
      { label: "A", text: "正常に実行される" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時に ClassCastException" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "B と C は共通の親 A を持つが互いに継承関係が無い『兄弟』。B→C のキャストは『変換不能な型』としてコンパイルエラー。",
      executionOrder: ["B と C は兄弟(無関係)", "(C) b は変換不能", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "兄弟間キャストは不可。",
        C: "実行時ではなくコンパイル時に弾かれる。",
        D: "ビルド失敗。",
      },
      examPoint: "継承関係のない型同士のキャストはコンパイルエラー(ClassCastExceptionですらない)。",
      quickJudgePoint: "兄弟クラス間のキャストはコンパイルエラー。",
      oneLineMemory: "兄弟クラス間キャストはコンパイルエラー。",
    },
  },
  {
    id: 78,
    targetTime: 90,
    difficulty: "normal",
    tags: ["オーバーライド", "toString"],
    code: `class P {
    int v = 7;
    public String toString() { return "P:" + v; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new P());
    }
}`,
    choices: [
      { label: "A", text: "P:7" },
      { label: "B", text: "P@(ハッシュ)" },
      { label: "C", text: "7" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "println(Object) は内部で toString() を呼ぶ。P は toString をオーバーライドしているため \"P:7\"。",
      executionOrder: ["println が toString() を呼ぶ", "オーバーライド版 → \"P:7\""],
      whyOthersAreWrong: {
        B: "toString をオーバーライドしているので既定の表現にならない。",
        C: "toString は \"P:\"+v を返す。",
        D: "正しいオーバーライド。",
      },
      examPoint: "println(Object) は toString() を暗黙に呼ぶ。オーバーライドで表示を制御できる。",
      quickJudgePoint: "オブジェクトを println すると toString() が呼ばれる。",
      oneLineMemory: "println(obj)はtoString()を呼ぶ。",
    },
  },
  {
    id: 79,
    targetTime: 120,
    difficulty: "normal",
    tags: ["オーバーロード", "char", "型変換"],
    code: `class A {
    void m(int x) { System.out.print("int"); }
    void m(char x) { System.out.print("char"); }
}

public class Main {
    public static void main(String[] args) {
        new A().m('A');
    }
}`,
    choices: [
      { label: "A", text: "int" },
      { label: "B", text: "char" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "65" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "'A' は char 型。m(char) という完全一致のオーバーロードがあるので、int への拡大変換より優先され \"char\"。",
      executionOrder: ["'A' は char", "m(char) が完全一致", "拡大変換 int より優先 → \"char\""],
      whyOthersAreWrong: {
        A: "char→int の拡大変換は完全一致に劣る。",
        C: "完全一致があるので一意。",
        D: "数値65に変換されるのは int 経由のときだけ。",
      },
      examPoint: "完全一致のオーバーロードがあれば拡大変換(char→int)より優先される。",
      quickJudgePoint: "引数の型と完全一致する候補が最優先。",
      oneLineMemory: "完全一致は拡大変換より優先(char→intしない)。",
    },
  },
  {
    id: 80,
    targetTime: 90,
    difficulty: "normal",
    tags: ["多態性", "参照型", "コンパイルエラー"],
    code: `class A { void a() {} }
class B extends A { void b() {} }

public class Main {
    public static void main(String[] args) {
        A x = new B();
        x.b();
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
        "x の参照型は A。A には b() が無いため、実体が B でも x.b() はコンパイルエラー。呼ぶには ((B)x).b() が必要。",
      executionOrder: ["x の参照型は A", "A に b() は無い", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "参照型 A 経由では b() は見えない。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "呼べるメソッドは『参照型』が持つものだけ。子固有メソッドはキャストが必要。",
      quickJudgePoint: "左の型に無いメソッドを呼んだらコンパイルエラー。",
      oneLineMemory: "呼べるのは参照型が持つメソッドだけ。",
    },
  },
];
