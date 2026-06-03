import type { Question } from "../../types";

// 第7セット（id 121-140）: アクセス修飾子 / パッケージ / インターフェース深掘り
export const set07: Question[] = [
  {
    id: 121,
    targetTime: 120,
    difficulty: "normal",
    tags: ["アクセス修飾子", "トップレベル型"],
    prompt: "トップレベル(ファイル直下)のクラスに使えない修飾子を選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "public" },
      { label: "B", text: "abstract" },
      { label: "C", text: "private" },
      { label: "D", text: "protected" },
    ],
    correctAnswers: ["C", "D"],
    explanation: {
      reason:
        "トップレベルクラスに使えるのは public / (パッケージプライベート=修飾子なし) / final / abstract / sealed など。private と protected はネスト型にしか使えない。",
      executionOrder: [
        "トップレベル: public/abstract/final/sealed はOK",
        "private/protected はメンバ(ネスト型)専用 → トップレベル不可",
      ],
      whyOthersAreWrong: {
        A: "public はトップレベルで使える。",
        B: "abstract はトップレベルで使える。",
      },
      examPoint: "トップレベル型に private/protected は不可。これらはメンバ(フィールド/メソッド/ネスト型)用。",
      quickJudgePoint: "ファイル直下のクラスに private/protected があったらエラー。",
      oneLineMemory: "トップレベルにprivate/protectedは不可。",
    },
  },
  {
    id: 122,
    targetTime: 90,
    difficulty: "normal",
    tags: ["アクセス修飾子", "package"],
    prompt: "修飾子なし(パッケージプライベート)のメンバへのアクセスとして正しいものを選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "同一パッケージの別クラスからアクセスできる" },
      { label: "B", text: "別パッケージのサブクラスからアクセスできる" },
      { label: "C", text: "別パッケージの任意のクラスからアクセスできる" },
      { label: "D", text: "同一クラスからのみアクセスできる" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "修飾子なし(default)は『同一パッケージ』からのみアクセス可能。別パッケージはサブクラスでも不可。",
      executionOrder: [
        "default = 同一パッケージ内に公開",
        "別パッケージは(継承していても)不可",
      ],
      whyOthersAreWrong: {
        B: "別パッケージのサブクラスには公開されない(それは protected)。",
        C: "別パッケージには非公開。",
        D: "同一クラスのみは private。default はパッケージ全体。",
      },
      examPoint: "アクセス範囲: private<default(同一package)<protected(package+別packageサブクラス)<public。",
      quickJudgePoint: "修飾子なし＝同一パッケージのみ。",
      oneLineMemory: "default修飾子は同一パッケージのみ公開。",
    },
  },
  {
    id: 123,
    targetTime: 90,
    difficulty: "normal",
    tags: ["アクセス修飾子", "protected"],
    prompt: "protected メンバについて正しい説明を選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "同一クラスのみアクセス可能" },
      { label: "B", text: "同一パッケージ、および別パッケージのサブクラスからアクセス可能" },
      { label: "C", text: "どこからでもアクセス可能" },
      { label: "D", text: "同一パッケージのみ(サブクラスでも別パッケージは不可)" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "protected は『同一パッケージ』＋『別パッケージのサブクラス』からアクセスできる(default より広く public より狭い)。",
      executionOrder: ["protected = package内 + 別packageのサブクラス"],
      whyOthersAreWrong: {
        A: "同一クラスのみは private。",
        C: "どこからでもは public。",
        D: "別パッケージのサブクラスからもアクセスできる。",
      },
      examPoint: "protected は『パッケージ＋継承先』。default に継承先を足したもの。",
      quickJudgePoint: "protected は同一package＋サブクラス。",
      oneLineMemory: "protectedは同一package＋別packageサブクラス。",
    },
  },
  {
    id: 124,
    targetTime: 120,
    difficulty: "long",
    tags: ["interface", "アクセス修飾子", "コンパイルエラー"],
    code: `interface I { void m(); }

class C implements I {
    void m() {}
}

public class Main {
    public static void main(String[] args) {
        new C().m();
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
        "インターフェースの抽象メソッドは暗黙 public。実装側で修飾子なし(package)にするとアクセス範囲を狭めることになりコンパイルエラー。public が必要。",
      executionOrder: ["I.m() は暗黙 public", "C の m() は default(package) → 範囲縮小", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "public でないとオーバーライドとして不正。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "インターフェースメソッドの実装は必ず public。修飾子省略はエラー。",
      quickJudgePoint: "implements したメソッドに public が無ければエラー。",
      oneLineMemory: "interfaceメソッドの実装はpublic必須。",
    },
  },
  {
    id: 125,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "static method"],
    code: `interface I {
    static String hi() { return "hi"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(I.hi());
    }
}`,
    choices: [
      { label: "A", text: "hi" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "インターフェースの static メソッドはインターフェース名経由で呼ぶ。I.hi() → \"hi\"。",
      executionOrder: ["I.hi() を呼ぶ", "static メソッド実行 → \"hi\""],
      whyOthersAreWrong: {
        B: "インターフェースは static メソッドを持てる。",
        C: "値を返す。",
        D: "例外なし。",
      },
      examPoint: "インターフェースの static メソッドは『インターフェース名.メソッド』で呼ぶ。",
      quickJudgePoint: "interface の static は InterfaceName.method() で呼ぶ。",
      oneLineMemory: "interfaceのstaticはインターフェース名で呼ぶ。",
    },
  },
  {
    id: 126,
    targetTime: 120,
    difficulty: "long",
    tags: ["interface", "static method", "継承", "コンパイルエラー"],
    code: `interface I {
    static String hi() { return "hi"; }
}
class C implements I {}

public class Main {
    public static void main(String[] args) {
        System.out.println(C.hi());
    }
}`,
    choices: [
      { label: "A", text: "hi" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "インターフェースの static メソッドは実装クラスに継承されない。C.hi() は呼べずコンパイルエラー。I.hi() なら可。",
      executionOrder: ["static は継承されない", "C.hi() は存在しない → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "C 経由では呼べない。",
        C: "ビルド失敗。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "インターフェースの static メソッドは継承されない(実装クラス名では呼べない)。",
      quickJudgePoint: "ImplClass.interfaceStatic() はエラー。Interface 名で呼ぶ。",
      oneLineMemory: "interfaceのstaticは実装クラスに継承されない。",
    },
  },
  {
    id: 127,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "default method", "継承"],
    code: `interface I {
    default String hi() { return "hi"; }
}
class C implements I {}

public class Main {
    public static void main(String[] args) {
        System.out.println(new C().hi());
    }
}`,
    choices: [
      { label: "A", text: "hi" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "default メソッドは実装クラスに継承される。C は未オーバーライドでも I の hi() を使え、インスタンス経由で \"hi\"。",
      executionOrder: ["C は I の default hi() を継承", "new C().hi() → \"hi\""],
      whyOthersAreWrong: {
        B: "default は継承されインスタンスから呼べる。",
        C: "値を返す。",
        D: "例外なし。",
      },
      examPoint: "default メソッドは実装クラスに継承され、インスタンス経由で呼べる(static との違い)。",
      quickJudgePoint: "default はインスタンスで呼べる、static はインターフェース名で呼ぶ。",
      oneLineMemory: "defaultメソッドは継承されインスタンスで呼べる。",
    },
  },
  {
    id: 128,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "定数"],
    code: `interface I { int MAX = 100; }

public class Main {
    public static void main(String[] args) {
        System.out.println(I.MAX);
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
        "インターフェースのフィールドは暗黙 public static final。I.MAX で参照でき 100。",
      executionOrder: ["MAX は public static final 100", "I.MAX → 100"],
      whyOthersAreWrong: {
        B: "初期化値は100。",
        C: "インターフェース定数は合法。",
        D: "例外なし。",
      },
      examPoint: "インターフェースのフィールドは定数(public static final)。インターフェース名で参照。",
      quickJudgePoint: "interface のフィールドは定数。I.NAME で読む。",
      oneLineMemory: "interfaceのフィールドはpublic static final定数。",
    },
  },
  {
    id: 129,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "定数", "final", "コンパイルエラー"],
    code: `interface I { int MAX = 100; }

public class Main {
    public static void main(String[] args) {
        I.MAX = 200;
        System.out.println(I.MAX);
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
        "インターフェースのフィールドは暗黙 final。I.MAX への再代入はコンパイルエラー。",
      executionOrder: ["MAX は final", "I.MAX=200 で再代入 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "final なので変更不可。",
        C: "再代入文があるためビルド不可。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "インターフェース定数は final。書き換え不可。",
      quickJudgePoint: "interface フィールドへの代入はエラー(final)。",
      oneLineMemory: "interface定数はfinalで再代入不可。",
    },
  },
  {
    id: 130,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "多重実装", "default method"],
    code: `interface A { default String a() { return "a"; } }
interface B { default String b() { return "b"; } }
class C implements A, B {}

public class Main {
    public static void main(String[] args) {
        C c = new C();
        System.out.println(c.a() + c.b());
    }
}`,
    choices: [
      { label: "A", text: "ab" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "ba" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "A と B のメソッド名が異なり衝突しない。C は両方の default を継承し c.a()+c.b()=\"ab\"。",
      executionOrder: ["a() → \"a\"", "b() → \"b\"", "\"ab\""],
      whyOthersAreWrong: {
        B: "同名でないため衝突しない。",
        C: "順序は a() が先。",
        D: "例外なし。",
      },
      examPoint: "複数インターフェース実装で、メソッド名が異なれば衝突せず両方使える。",
      quickJudgePoint: "名前が違う default は衝突しない。同名なら override が必要。",
      oneLineMemory: "異名のdefaultは多重実装でも衝突しない。",
    },
  },
  {
    id: 131,
    targetTime: 120,
    difficulty: "normal",
    tags: ["interface", "abstract class"],
    prompt: "abstract クラスとインターフェースの違いとして正しいものを選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "abstract クラスはコンストラクタを持てる" },
      { label: "B", text: "インターフェースはインスタンスフィールド(状態)を持てる" },
      { label: "C", text: "クラスは複数のインターフェースを実装できる" },
      { label: "D", text: "abstract クラスは多重継承できる" },
    ],
    correctAnswers: ["A", "C"],
    explanation: {
      reason:
        "A: abstract クラスはコンストラクタを持てる(サブクラスから super() で呼ばれる)。C: クラスは複数インターフェースを implements できる。",
      executionOrder: [
        "abstract クラス: コンストラクタ・インスタンスフィールド可、単一継承",
        "インターフェース: 多重実装可、フィールドは定数のみ",
      ],
      whyOthersAreWrong: {
        B: "インターフェースのフィールドは定数(public static final)のみ。インスタンス状態は持てない。",
        D: "クラスは単一継承のみ(多重継承は不可)。",
      },
      examPoint: "abstractクラス=状態/コンストラクタ可・単一継承。interface=多重実装可・定数のみ。",
      quickJudgePoint: "状態やコンストラクタが要るなら abstract クラス。多重ならインターフェース。",
      oneLineMemory: "abstractクラスは状態/コンストラクタ可、interfaceは多重実装可。",
    },
  },
  {
    id: 132,
    targetTime: 120,
    difficulty: "normal",
    tags: ["interface", "private method", "default method"],
    code: `interface I {
    default int twice(int x) { return helper(x) * 2; }
    private int helper(int x) { return x + 1; }
}
class C implements I {}

public class Main {
    public static void main(String[] args) {
        System.out.println(new C().twice(3));
    }
}`,
    choices: [
      { label: "A", text: "8" },
      { label: "B", text: "6" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "7" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "private メソッド helper は default メソッドの補助に使える。helper(3)=4、twice=4*2=8。",
      executionOrder: ["twice(3) → helper(3)=3+1=4", "4*2=8"],
      whyOthersAreWrong: {
        B: "helper は +1 してから *2。",
        C: "インターフェースの private メソッドは合法(Java9+)。",
        D: "*2 が掛かる。",
      },
      examPoint: "インターフェースの private メソッドは default/static メソッドの共通処理に使える。",
      quickJudgePoint: "interface の private は内部ヘルパー。外部からは見えない。",
      oneLineMemory: "interfaceのprivateはdefault等の補助に使う。",
    },
  },
  {
    id: 133,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "フィールド", "コンパイルエラー"],
    code: `interface I {
    int x;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(I.x);
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
        "インターフェースのフィールドは暗黙 final。final は初期化必須なのに値が無いためコンパイルエラー。",
      executionOrder: ["int x は暗黙 final", "初期化子が無い", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "final 定数は既定値0にできない。",
        C: "無関係。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "インターフェースのフィールドは public static final。宣言時に必ず初期化が必要。",
      quickJudgePoint: "interface フィールドに初期値が無ければエラー。",
      oneLineMemory: "interfaceフィールドは初期化必須(final定数)。",
    },
  },
  {
    id: 134,
    targetTime: 120,
    difficulty: "long",
    tags: ["アクセス修飾子", "private", "継承", "コンパイルエラー"],
    code: `class A { private void m() {} }
class B extends A {
    void test() { m(); }
}

public class Main {
    public static void main(String[] args) {
        new B().test();
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
        "private メソッドはサブクラスに継承・公開されない。B から A の m() を呼ぶとコンパイルエラー(m() が見えない)。",
      executionOrder: ["A.m() は private", "B からは不可視", "test() 内の m() → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "private は子から呼べない。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "private メンバはサブクラスに継承されない(オーバーライド対象にもならない)。",
      quickJudgePoint: "子クラスから親の private を呼んでいたらエラー。",
      oneLineMemory: "privateはサブクラスに継承されない。",
    },
  },
  {
    id: 135,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "継承", "implements"],
    code: `class Base { String b() { return "base"; } }
interface I { default String i() { return "iface"; } }
class C extends Base implements I {}

public class Main {
    public static void main(String[] args) {
        C c = new C();
        System.out.println(c.b() + c.i());
    }
}`,
    choices: [
      { label: "A", text: "baseiface" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "ifacebase" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "クラスは単一の親クラスを extends しつつ複数インターフェースを implements できる。C は Base.b() と I.i() の両方を持ち \"baseiface\"。",
      executionOrder: ["extends Base → b()", "implements I → i()", "\"base\"+\"iface\""],
      whyOthersAreWrong: {
        B: "extends と implements の併用は合法。",
        C: "順序は b() が先。",
        D: "例外なし。",
      },
      examPoint: "extends は1つ、implements は複数。両方を同時に書ける(extends が先)。",
      quickJudgePoint: "1クラス継承＋複数インターフェース実装はOK。",
      oneLineMemory: "extendsは1つ、implementsは複数同時可。",
    },
  },
  {
    id: 136,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "default method", "オーバーライド"],
    code: `interface I {
    default String m() { return "default"; }
}
class C implements I {
    public String m() { return "override"; }
}

public class Main {
    public static void main(String[] args) {
        I x = new C();
        System.out.println(x.m());
    }
}`,
    choices: [
      { label: "A", text: "override" },
      { label: "B", text: "default" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "defaultoverride" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "C が default メソッド m() をオーバーライド。実体は C なので動的解決で \"override\"。",
      executionOrder: ["x の実体は C", "C.m() がオーバーライド版", "\"override\""],
      whyOthersAreWrong: {
        B: "オーバーライドされているので default 実装は呼ばれない。",
        C: "default のオーバーライドは合法。",
        D: "1つだけ呼ばれる。",
      },
      examPoint: "default メソッドは実装クラスでオーバーライド可能。実体型で動的解決される。",
      quickJudgePoint: "default を override したら実体側が呼ばれる。",
      oneLineMemory: "defaultメソッドはoverride可、実体型で解決。",
    },
  },
  {
    id: 137,
    targetTime: 120,
    difficulty: "normal",
    tags: ["static", "private", "コンストラクタ"],
    code: `class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() {}
    static Singleton get() { return INSTANCE; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Singleton.get() == Singleton.get());
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
        "INSTANCE は static final で1つだけ。get() は常に同じインスタンスを返すので == は true。",
      executionOrder: ["INSTANCE はクラスに1個", "get() は毎回同じ参照", "== → true"],
      whyOthersAreWrong: {
        B: "同一インスタンスなので true。",
        C: "private コンストラクタ＋static ファクトリは合法。",
        D: "例外なし。",
      },
      examPoint: "private コンストラクタ＋static フィールドで単一インスタンスを管理できる(シングルトン)。",
      quickJudgePoint: "static で保持した同一インスタンスは == true。",
      oneLineMemory: "staticで保持した単一インスタンスは==true。",
    },
  },
  {
    id: 138,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "継承", "default method"],
    code: `interface A { default String a() { return "A"; } }
interface B extends A { default String b() { return "B"; } }
class C implements B {}

public class Main {
    public static void main(String[] args) {
        C c = new C();
        System.out.println(c.a() + c.b());
    }
}`,
    choices: [
      { label: "A", text: "AB" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "B" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "インターフェースは extends で別インターフェースを継承できる。B extends A なので C は a() と b() の両方を持ち \"AB\"。",
      executionOrder: ["B extends A → C は a(),b() 両方を継承", "\"A\"+\"B\""],
      whyOthersAreWrong: {
        B: "インターフェースの extends は合法。",
        C: "a() も継承される。",
        D: "例外なし。",
      },
      examPoint: "インターフェースは他インターフェースを extends できる(多重も可)。実装クラスは全 default を継承。",
      quickJudgePoint: "interface extends interface で機能が合算される。",
      oneLineMemory: "interfaceはextendsで継承でき機能が合算。",
    },
  },
  {
    id: 139,
    targetTime: 120,
    difficulty: "long",
    tags: ["interface", "default method", "衝突", "super"],
    code: `interface A { default String m() { return "A"; } }
interface B { default String m() { return "B"; } }
class C implements A, B {
    public String m() { return A.super.m() + B.super.m(); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new C().m());
    }
}`,
    choices: [
      { label: "A", text: "AB" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "BA" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "default メソッド衝突は override で解決。InterfaceName.super.m() で各インターフェースの default を明示的に呼べる。A.super.m()+B.super.m()=\"AB\"。",
      executionOrder: ["m() を override(衝突解決)", "A.super.m()=\"A\"", "B.super.m()=\"B\"", "\"AB\""],
      whyOthersAreWrong: {
        B: "override しているので衝突は解決済み(合法)。",
        C: "呼ぶ順序は A.super が先。",
        D: "例外なし。",
      },
      examPoint: "衝突した default は InterfaceName.super.method() で個別に呼び出せる。",
      quickJudgePoint: "A.super.m() で特定インターフェースの default を呼べる。",
      oneLineMemory: "default衝突はInterface.super.m()で解決。",
    },
  },
  {
    id: 140,
    targetTime: 90,
    difficulty: "normal",
    tags: ["interface", "abstract", "コンパイルエラー"],
    code: `interface I { String m(); }
class C implements I {}

public class Main {
    public static void main(String[] args) {
        new C();
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
        "I の抽象メソッド m() を C が実装していない。具象クラスは全抽象メソッドを実装する必要がありコンパイルエラー。",
      executionOrder: ["I に abstract m()", "C が未実装かつ abstract でない", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "未実装の抽象メソッドが残る。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "インターフェースの抽象メソッドは具象実装クラスで必ず実装する。",
      quickJudgePoint: "implements したのに抽象メソッド未実装ならエラー。",
      oneLineMemory: "interfaceの抽象メソッドは実装必須。",
    },
  },
];
