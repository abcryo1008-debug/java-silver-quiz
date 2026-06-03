import type { Question } from "../../types";

// 第8セット（id 141-160）: 例外 / try-catch-finally / try-with-resources
export const set08: Question[] = [
  {
    id: 141,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "checked", "unchecked"],
    prompt: "次のうち『チェック例外(checked exception)』を選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "IOException" },
      { label: "B", text: "NullPointerException" },
      { label: "C", text: "ArrayIndexOutOfBoundsException" },
      { label: "D", text: "ClassNotFoundException" },
    ],
    correctAnswers: ["A", "D"],
    explanation: {
      reason:
        "チェック例外は Exception のサブクラス(RuntimeException 系を除く)。IOException と ClassNotFoundException が該当。NPE・AIOOBE は RuntimeException 系の非チェック例外。",
      executionOrder: [
        "Exception(非Runtime) = チェック例外 → IOException, ClassNotFoundException",
        "RuntimeException 系 = 非チェック → NPE, AIOOBE",
      ],
      whyOthersAreWrong: {
        B: "NullPointerException は RuntimeException 系(非チェック)。",
        C: "ArrayIndexOutOfBoundsException も RuntimeException 系(非チェック)。",
      },
      examPoint: "チェック例外=処理/宣言が必須。RuntimeException とそのサブクラスは非チェック。",
      quickJudgePoint: "RuntimeException 系なら非チェック、それ以外の Exception はチェック。",
      oneLineMemory: "RuntimeException系=非チェック、他のExceptionはチェック。",
    },
  },
  {
    id: 142,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "checked", "throws", "コンパイルエラー"],
    code: `import java.io.*;

public class Main {
    static void m() {
        throw new IOException();
    }

    public static void main(String[] args) {
    }
}`,
    choices: [
      { label: "A", text: "正常にコンパイルできる" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時に IOException" },
      { label: "D", text: "何も起きない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "IOException はチェック例外。m() で投げるなら throws 宣言か try-catch が必須。どちらも無いためコンパイルエラー。",
      executionOrder: ["IOException はチェック例外", "throws も catch も無い", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "チェック例外の未処理は許されない。",
        C: "コンパイルできないため実行に至らない。",
        D: "ビルド失敗。",
      },
      examPoint: "チェック例外は『throws で宣言』または『try-catch で処理』が必須。",
      quickJudgePoint: "checked 例外を投げて throws も catch も無ければエラー。",
      oneLineMemory: "checked例外はthrowsかcatchが必須。",
    },
  },
  {
    id: 143,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "unchecked"],
    code: `public class Main {
    static void m() { throw new RuntimeException("x"); }

    public static void main(String[] args) {
        try {
            m();
        } catch (RuntimeException e) {
            System.out.println("caught");
        }
    }
}`,
    choices: [
      { label: "A", text: "caught" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "x" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "RuntimeException は非チェック例外なので throws 宣言なしで投げられる。catch で捕捉され \"caught\"。",
      executionOrder: ["m() が RuntimeException を投げる", "catch(RuntimeException) で捕捉", "\"caught\""],
      whyOthersAreWrong: {
        B: "非チェック例外は throws 不要でコンパイル可。",
        C: "出力は \"caught\"。getMessage は出していない。",
        D: "catch されて出力される。",
      },
      examPoint: "非チェック例外(RuntimeException系)は throws 宣言なしで投げられる。",
      quickJudgePoint: "RuntimeException は throws 不要。",
      oneLineMemory: "RuntimeExceptionはthrows不要で投げられる。",
    },
  },
  {
    id: 144,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "try-catch-finally"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.print("try ");
            throw new RuntimeException();
        } catch (Exception e) {
            System.out.print("catch ");
        } finally {
            System.out.print("finally ");
        }
    }
}`,
    choices: [
      { label: "A", text: "try catch finally " },
      { label: "B", text: "try finally " },
      { label: "C", text: "try catch " },
      { label: "D", text: "try " },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "try で例外発生 → catch で捕捉 → finally は必ず実行。順に \"try catch finally \"。",
      executionOrder: ["try → \"try \"", "例外 → catch → \"catch \"", "finally → \"finally \""],
      whyOthersAreWrong: {
        B: "catch も実行される。",
        C: "finally は必ず実行。",
        D: "catch/finally も走る。",
      },
      examPoint: "finally は例外の有無に関わらず必ず実行される。",
      quickJudgePoint: "finally は常に実行(returnや例外でも)。",
      oneLineMemory: "finallyは常に実行される。",
    },
  },
  {
    id: 145,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "multi-catch"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            if (args.length == 0) throw new java.io.IOException();
        } catch (java.io.IOException | RuntimeException e) {
            System.out.println("caught " + e.getClass().getSimpleName());
        }
    }
}`,
    choices: [
      { label: "A", text: "caught IOException" },
      { label: "B", text: "caught RuntimeException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "引数なし実行で args.length==0 → IOException を投げる。multi-catch が捕捉し、クラス名 \"IOException\"。",
      executionOrder: ["args 空 → IOException", "multi-catch で捕捉", "getSimpleName() → \"IOException\""],
      whyOthersAreWrong: {
        B: "投げたのは IOException。",
        C: "互いに無関係な型の multi-catch は合法。",
        D: "捕捉して出力される。",
      },
      examPoint: "multi-catch は | で複数の無関係な例外型をまとめて捕捉できる。",
      quickJudgePoint: "catch(A | B) は無関係な例外の同時捕捉。",
      oneLineMemory: "multi-catchは無関係な例外を|で同時捕捉。",
    },
  },
  {
    id: 146,
    targetTime: 120,
    difficulty: "long",
    tags: ["例外", "multi-catch", "コンパイルエラー"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            throw new RuntimeException();
        } catch (RuntimeException | Exception e) {
            System.out.println("x");
        }
    }
}`,
    choices: [
      { label: "A", text: "x" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "multi-catch の型は互いに継承関係があってはならない。RuntimeException は Exception のサブクラスなので冗長でコンパイルエラー。",
      executionOrder: ["RuntimeException ⊂ Exception", "multi-catch で親子は不可", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "ビルド不可。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "multi-catch の例外型は互いにサブクラス関係であってはならない(disjoint 必須)。",
      quickJudgePoint: "catch(子 | 親) はコンパイルエラー。",
      oneLineMemory: "multi-catchは親子関係の型を並べられない。",
    },
  },
  {
    id: 147,
    targetTime: 150,
    difficulty: "long",
    tags: ["try-with-resources", "例外", "suppressed"],
    code: `public class Main {
    static class R implements AutoCloseable {
        public void close() { throw new RuntimeException("close"); }
    }

    public static void main(String[] args) {
        try (R r = new R()) {
            throw new RuntimeException("body");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    choices: [
      { label: "A", text: "body" },
      { label: "B", text: "close" },
      { label: "C", text: "bodyclose" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "try 本体の例外が『主』、close() の例外は『抑制(suppressed)』される。catch が受け取るのは主例外 \"body\"。",
      executionOrder: [
        "本体で RuntimeException(\"body\")",
        "close() で RuntimeException(\"close\") → suppressed",
        "catch は主例外 → \"body\"",
      ],
      whyOthersAreWrong: {
        B: "close の例外は抑制され、getSuppressed() で取得する。",
        C: "メッセージは連結されない。",
        D: "正しいコード。",
      },
      examPoint: "本体と close の両方が例外を出すと、本体が主・close が suppressed。",
      quickJudgePoint: "本体例外が優先、close例外は抑制される。",
      oneLineMemory: "本体例外が主、close例外はsuppressed。",
    },
  },
  {
    id: 148,
    targetTime: 90,
    difficulty: "normal",
    tags: ["try-with-resources", "AutoCloseable", "コンパイルエラー"],
    code: `public class Main {
    static class R {}

    public static void main(String[] args) {
        try (R r = new R()) {
        }
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
        "try-with-resources で扱える型は AutoCloseable(または Closeable)を実装したものだけ。R は未実装なのでコンパイルエラー。",
      executionOrder: ["R は AutoCloseable 未実装", "try-with-resources に置けない", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "AutoCloseable でないと使えない。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "try-with-resources のリソースは AutoCloseable 実装が必須。",
      quickJudgePoint: "try(...) に置く型が AutoCloseable でなければエラー。",
      oneLineMemory: "try-with-resourcesはAutoCloseableのみ。",
    },
  },
  {
    id: 149,
    targetTime: 120,
    difficulty: "long",
    tags: ["例外", "finally", "return"],
    code: `public class Main {
    static int m() {
        try {
            throw new RuntimeException();
        } finally {
            return 5;
        }
    }

    public static void main(String[] args) {
        System.out.println(m());
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "実行時に RuntimeException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "0" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "finally 内の return は、try で発生した例外を握りつぶす。例外は伝播せず 5 が返る。",
      executionOrder: ["try で例外発生", "finally の return 5 が例外を上書き", "5 を返す"],
      whyOthersAreWrong: {
        B: "finally の return が例外を握りつぶす。",
        C: "構文は合法(非推奨だが)。",
        D: "return 値は5。",
      },
      examPoint: "finally の return は try の例外/return を破棄する(危険なパターン)。",
      quickJudgePoint: "finally に return があると例外も消える。",
      oneLineMemory: "finallyのreturnは例外を握りつぶす。",
    },
  },
  {
    id: 150,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "throw", "null"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            throw null;
        } catch (NullPointerException e) {
            System.out.println("npe");
        }
    }
}`,
    choices: [
      { label: "A", text: "npe" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "何も出力されない" },
      { label: "D", text: "実行時に別の例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "throw null は実行時に NullPointerException を投げる(null をスローしようとするため)。catch(NPE) で捕捉され \"npe\"。",
      executionOrder: ["throw null → NullPointerException", "catch(NPE) → \"npe\""],
      whyOthersAreWrong: {
        B: "throw null はコンパイル可(型は Throwable)。",
        C: "NPE が捕捉され出力される。",
        D: "投げられるのは NPE。",
      },
      examPoint: "throw null は NullPointerException になる。",
      quickJudgePoint: "throw null は NPE。",
      oneLineMemory: "throw nullはNullPointerException。",
    },
  },
  {
    id: 151,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "catch順序", "継承"],
    code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            throw new FileNotFoundException();
        } catch (FileNotFoundException e) {
            System.out.println("fnf");
        } catch (IOException e) {
            System.out.println("io");
        }
    }
}`,
    choices: [
      { label: "A", text: "fnf" },
      { label: "B", text: "io" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "fnfio" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "FileNotFoundException は IOException のサブクラス。狭い型を先に catch しているので \"fnf\" が捕捉される(1つだけ実行)。",
      executionOrder: ["FNF を投げる", "最初の catch(FNF) で捕捉 → \"fnf\""],
      whyOthersAreWrong: {
        B: "より具体的な FNF が先に捕捉する。",
        C: "狭い→広いの順は正しくコンパイル可。",
        D: "catch は1つだけ実行される。",
      },
      examPoint: "複数 catch は最初に一致した1つだけ実行。狭い型を先に書く。",
      quickJudgePoint: "サブクラス例外を先に catch すればそれが選ばれる。",
      oneLineMemory: "catchは最初に一致した1つだけ実行。",
    },
  },
  {
    id: 152,
    targetTime: 120,
    difficulty: "long",
    tags: ["例外", "catch順序", "コンパイルエラー"],
    code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            throw new FileNotFoundException();
        } catch (IOException e) {
            System.out.println("io");
        } catch (FileNotFoundException e) {
            System.out.println("fnf");
        }
    }
}`,
    choices: [
      { label: "A", text: "io" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "fnf" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "広い IOException を先に catch すると、後の FileNotFoundException(サブクラス)は到達不能でコンパイルエラー。",
      executionOrder: ["IOException が FNF も捕捉", "後続の catch(FNF) は到達不能", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "到達不能 catch があるためビルド不可。",
        C: "同上。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "catch は広い例外を後に。親を先に書くと子の catch が到達不能でエラー。",
      quickJudgePoint: "親例外 catch の後に子例外 catch があったらエラー。",
      oneLineMemory: "親catchの後の子catchは到達不能エラー。",
    },
  },
  {
    id: 153,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "try-finally"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.print("a");
        } finally {
            System.out.print("b");
        }
    }
}`,
    choices: [
      { label: "A", text: "ab" },
      { label: "B", text: "a" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "b" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "try は catch 無しでも finally と組める。\"a\" の後 finally で \"b\" → \"ab\"。",
      executionOrder: ["try → \"a\"", "finally → \"b\"", "\"ab\""],
      whyOthersAreWrong: {
        B: "finally も実行される。",
        C: "try-finally(catch なし)は合法。",
        D: "try 本体も実行される。",
      },
      examPoint: "try は『catch のみ』『finally のみ』『両方』のいずれも可(どちらか必須)。",
      quickJudgePoint: "try-finally だけの形も合法。",
      oneLineMemory: "try-finally(catchなし)は合法。",
    },
  },
  {
    id: 154,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "checked", "カスタム例外"],
    code: `class MyEx extends Exception {}

public class Main {
    static void m() throws MyEx { throw new MyEx(); }

    public static void main(String[] args) {
        try {
            m();
        } catch (MyEx e) {
            System.out.println("caught");
        }
    }
}`,
    choices: [
      { label: "A", text: "caught" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "何も出力されない" },
      { label: "D", text: "実行時例外（未捕捉）" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "Exception を継承した MyEx はチェック例外。m() は throws MyEx を宣言、呼び出し側は try-catch で捕捉 → \"caught\"。",
      executionOrder: ["MyEx はチェック例外", "m() は throws 宣言済み", "catch(MyEx) で捕捉 → \"caught\""],
      whyOthersAreWrong: {
        B: "throws 宣言と catch があるので合法。",
        C: "捕捉して出力される。",
        D: "catch されるため未捕捉にならない。",
      },
      examPoint: "Exception 継承=チェック例外。RuntimeException 継承なら非チェック。",
      quickJudgePoint: "extends Exception はチェック、extends RuntimeException は非チェック。",
      oneLineMemory: "extends Exceptionはチェック例外。",
    },
  },
  {
    id: 155,
    targetTime: 120,
    difficulty: "normal",
    tags: ["例外", "再スロー", "ネスト"],
    code: `public class Main {
    public static void main(String[] args) {
        try {
            try {
                throw new RuntimeException("1");
            } catch (RuntimeException e) {
                throw new RuntimeException("2");
            }
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "1" },
      { label: "C", text: "12" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "内側で \"1\" を投げ catch、その catch 内で新たに \"2\" を投げる。外側がそれを捕捉し \"2\"。",
      executionOrder: ["内側 throw \"1\" → 内側 catch", "内側 catch が throw \"2\"", "外側 catch → \"2\""],
      whyOthersAreWrong: {
        B: "\"1\" は内側で捕捉済み。外に出るのは \"2\"。",
        C: "メッセージは連結されない。",
        D: "正しいコード。",
      },
      examPoint: "catch 内で新たに throw すると、その例外が外側へ伝播する。",
      quickJudgePoint: "catch 内の throw は外側 catch に渡る。",
      oneLineMemory: "catch内のthrowは外側へ伝播する。",
    },
  },
  {
    id: 156,
    targetTime: 150,
    difficulty: "complex",
    tags: ["例外", "finally", "return", "値渡し"],
    code: `public class Main {
    static int m() {
        int x = 1;
        try {
            return x;
        } finally {
            x = 99;
        }
    }

    public static void main(String[] args) {
        System.out.println(m());
    }
}`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "99" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "return x の時点で戻り値(=1)が確定して退避される。finally で x=99 にしても、退避済みの戻り値は変わらず 1。(finally が return すれば話は別)",
      executionOrder: [
        "return x → 戻り値1を退避",
        "finally で x=99(ローカル変数を変えるだけ)",
        "退避した1を返す",
      ],
      whyOthersAreWrong: {
        B: "finally での代入は退避済みの戻り値に影響しない(finallyがreturnしない限り)。",
        C: "合法。",
        D: "例外なし。",
      },
      examPoint: "return の値は評価時点で確定。finally で変数を変えても戻り値は不変(finally の return は別)。",
      quickJudgePoint: "finally で変数変更しても、すでに評価された戻り値は変わらない。",
      oneLineMemory: "return評価後のfinally変数変更は戻り値に効かない。",
    },
  },
  {
    id: 157,
    targetTime: 120,
    difficulty: "long",
    tags: ["try-with-resources", "AutoCloseable", "checked", "コンパイルエラー"],
    code: `class R implements AutoCloseable {
    public void close() throws Exception {}
}

public class Main {
    public static void main(String[] args) {
        try (R r = new R()) {
        }
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
        "close() が throws Exception(チェック例外)を宣言しているため、try-with-resources は close 由来の Exception を投げ得る。catch も throws も無いためコンパイルエラー。",
      executionOrder: [
        "close() は checked Exception を宣言",
        "try に catch 無し・main に throws 無し",
        "コンパイルエラー",
      ],
      whyOthersAreWrong: {
        A: "close のチェック例外が未処理。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "close() が checked 例外を投げるなら、try-with-resources 側で処理/宣言が必要。",
      quickJudgePoint: "close が throws する checked 例外も処理が必要。",
      oneLineMemory: "closeのchecked例外も処理/宣言が必要。",
    },
  },
  {
    id: 158,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "ArithmeticException"],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println(5 / 0);
    }
}`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "Infinity" },
      { label: "C", text: "実行時に ArithmeticException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "整数の 0 除算は実行時に ArithmeticException(\"/ by zero\")。コンパイルは通る。",
      executionOrder: ["5/0 は整数除算", "0 除算 → 実行時 ArithmeticException"],
      whyOthersAreWrong: {
        A: "例外で出力に至らない。",
        B: "Infinity は浮動小数点の話(整数では例外)。",
        D: "0 がリテラルでもコンパイルは通ることが多く、実行時に例外。",
      },
      examPoint: "整数の0除算は ArithmeticException。浮動小数点は Infinity/NaN(例外なし)。",
      quickJudgePoint: "int の /0 は ArithmeticException。",
      oneLineMemory: "整数の0除算はArithmeticException。",
    },
  },
  {
    id: 159,
    targetTime: 90,
    difficulty: "normal",
    tags: ["例外", "浮動小数点"],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println(5.0 / 0);
    }
}`,
    choices: [
      { label: "A", text: "Infinity" },
      { label: "B", text: "実行時に ArithmeticException" },
      { label: "C", text: "0.0" },
      { label: "D", text: "NaN" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "浮動小数点の 0 除算は例外を投げず、Infinity を返す(正の数/0 は +Infinity)。",
      executionOrder: ["5.0/0 は浮動小数点演算", "正/0 → Infinity"],
      whyOthersAreWrong: {
        B: "例外になるのは整数の0除算。",
        C: "0.0 ではなく Infinity。",
        D: "0.0/0.0 なら NaN。5.0/0 は Infinity。",
      },
      examPoint: "double/float の0除算は Infinity/-Infinity/NaN(例外なし)。整数とは挙動が違う。",
      quickJudgePoint: "浮動小数点の/0は例外でなくInfinity。",
      oneLineMemory: "double 5.0/0 はInfinity(例外なし)。",
    },
  },
  {
    id: 160,
    targetTime: 120,
    difficulty: "long",
    tags: ["例外", "finally", "伝播"],
    prompt: "次のコードを実行した結果として正しいものを選べ。",
    code: `public class Main {
    public static void main(String[] args) {
        try {
            throw new RuntimeException("boom");
        } finally {
            System.out.println("cleanup");
        }
    }
}`,
    choices: [
      { label: "A", text: "cleanup を出力した後、未捕捉の RuntimeException で異常終了する" },
      { label: "B", text: "何も出力されず異常終了する" },
      { label: "C", text: "cleanup だけ出力して正常終了する" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "catch が無くても finally は実行される。\"cleanup\" を出力した後、例外は捕捉されないまま伝播し、未捕捉例外で異常終了する。",
      executionOrder: [
        "try で例外発生",
        "finally 実行 → \"cleanup\"",
        "catch が無いので例外が伝播 → 異常終了",
      ],
      whyOthersAreWrong: {
        B: "finally が先に \"cleanup\" を出力する。",
        C: "例外は消えず、正常終了しない。",
        D: "try-finally は合法。",
      },
      examPoint: "finally は例外伝播の前に必ず実行される。catch が無ければ例外はそのまま上に伝わる。",
      quickJudgePoint: "catch 無しでも finally は走り、その後例外が伝播。",
      oneLineMemory: "catch無しでもfinally実行後に例外が伝播。",
    },
  },
];
