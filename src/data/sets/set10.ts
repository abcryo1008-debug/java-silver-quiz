import type { Question } from "../../types";

// 第10セット（id 181-200）: ラムダ式 / Stream / record / sealed / var
export const set10: Question[] = [
  {
    id: 181,
    targetTime: 90,
    difficulty: "normal",
    tags: ["ラムダ式", "Predicate"],
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> p = n -> n > 5;
        System.out.println(p.test(3) + " " + p.test(10));
    }
}`,
    choices: [
      { label: "A", text: "false true" },
      { label: "B", text: "true false" },
      { label: "C", text: "false false" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "Predicate<T> の test は boolean を返す。n>5 で、test(3)=false、test(10)=true。",
      executionOrder: ["p = (n -> n>5)", "test(3): 3>5 → false", "test(10): 10>5 → true"],
      whyOthersAreWrong: {
        B: "3>5 は false、10>5 は true。",
        C: "10>5 は true。",
        D: "Predicate のラムダは合法。",
      },
      examPoint: "Predicate<T> は test(T):boolean。条件判定の関数型インターフェース。",
      quickJudgePoint: "Predicate=boolean を返す test。",
      oneLineMemory: "Predicateはtest(T)でbooleanを返す。",
    },
  },
  {
    id: 182,
    targetTime: 90,
    difficulty: "normal",
    tags: ["ラムダ式", "Consumer"],
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Consumer<String> c = s -> System.out.println("got " + s);
        c.accept("hi");
    }
}`,
    choices: [
      { label: "A", text: "got hi" },
      { label: "B", text: "hi" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "Consumer<T> の accept(T) は値を受け取り戻り値を返さない。accept(\"hi\") で \"got hi\" を出力。",
      executionOrder: ["c = (s -> println(...))", "accept(\"hi\") → \"got hi\""],
      whyOthersAreWrong: {
        B: "ラムダは \"got \"+s を出力。",
        C: "Consumer のラムダは合法。",
        D: "accept で実行される。",
      },
      examPoint: "Consumer<T> は accept(T):void。値を消費し戻り値なし。",
      quickJudgePoint: "Consumer=accept で受け取り、返り値なし。",
      oneLineMemory: "Consumerはaccept(T)で消費(戻り値void)。",
    },
  },
  {
    id: 183,
    targetTime: 90,
    difficulty: "normal",
    tags: ["ラムダ式", "Function"],
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> f = x -> x * x;
        System.out.println(f.apply(4));
    }
}`,
    choices: [
      { label: "A", text: "16" },
      { label: "B", text: "8" },
      { label: "C", text: "4" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "Function<T,R> の apply(T):R。x*x で apply(4)=16。",
      executionOrder: ["f = (x -> x*x)", "apply(4) → 16"],
      whyOthersAreWrong: {
        B: "x*x であって x*2 ではない。",
        C: "二乗される。",
        D: "Function のラムダは合法。",
      },
      examPoint: "Function<T,R> は apply(T):R。入力を変換して返す。",
      quickJudgePoint: "Function=apply で変換して返す。",
      oneLineMemory: "Functionはapply(T)でRを返す。",
    },
  },
  {
    id: 184,
    targetTime: 90,
    difficulty: "normal",
    tags: ["Stream", "filter", "終端操作"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        long c = Stream.of(1, 2, 3, 4, 5)
                       .filter(n -> n % 2 == 0)
                       .count();
        System.out.println(c);
    }
}`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "5" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "filter で偶数(2,4)に絞り、count() で個数2。count は終端操作。",
      executionOrder: ["filter で 2,4 が残る", "count() → 2"],
      whyOthersAreWrong: {
        B: "奇数は除外される。",
        C: "全体ではなくフィルタ後。",
        D: "合法。",
      },
      examPoint: "filter は中間操作、count は終端操作。終端で初めて評価が走る。",
      quickJudgePoint: "filter→count で条件を満たす数を数える。",
      oneLineMemory: "filterで絞りcount()で数える。",
    },
  },
  {
    id: 185,
    targetTime: 90,
    difficulty: "normal",
    tags: ["Stream", "map", "メソッド参照"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Stream.of("a", "b")
              .map(String::toUpperCase)
              .forEach(System.out::print);
    }
}`,
    choices: [
      { label: "A", text: "AB" },
      { label: "B", text: "ab" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も出力されない" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "map(String::toUpperCase) で各要素を大文字化、forEach(System.out::print) で順に出力 → \"AB\"。",
      executionOrder: ["map で \"A\",\"B\"", "forEach で print → \"AB\""],
      whyOthersAreWrong: {
        B: "toUpperCase で大文字化される。",
        C: "メソッド参照は合法。",
        D: "forEach は終端操作で実行される。",
      },
      examPoint: "map は要素変換(中間)、forEach は終端。メソッド参照はラムダの簡潔表現。",
      quickJudgePoint: "map→forEach で変換して出力。",
      oneLineMemory: "mapで変換、forEachで出力(終端)。",
    },
  },
  {
    id: 186,
    targetTime: 120,
    difficulty: "long",
    tags: ["Stream", "遅延評価", "中間操作"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Stream.of(1, 2, 3).map(n -> {
            System.out.print("m" + n + " ");
            return n;
        });
        System.out.println("end");
    }
}`,
    choices: [
      { label: "A", text: "end" },
      { label: "B", text: "m1 m2 m3 end" },
      { label: "C", text: "m1 m2 m3 " },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "map は中間操作で遅延評価。終端操作が無いため map のラムダは一切実行されず、\"end\" だけ出力。",
      executionOrder: ["map はパイプライン構築のみ", "終端操作が無い → map 未実行", "\"end\" のみ"],
      whyOthersAreWrong: {
        B: "終端が無いので map は走らない。",
        C: "同上。",
        D: "合法。",
      },
      examPoint: "中間操作(map/filter/peek等)は終端操作が来るまで実行されない(遅延評価)。",
      quickJudgePoint: "終端操作が無ければ中間操作は動かない。",
      oneLineMemory: "終端操作が無いと中間操作は実行されない。",
    },
  },
  {
    id: 187,
    targetTime: 120,
    difficulty: "long",
    tags: ["Stream", "例外", "再利用"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Stream<Integer> s = Stream.of(1, 2, 3);
        s.forEach(x -> {});
        s.forEach(x -> {});
    }
}`,
    choices: [
      { label: "A", text: "正常に終了する" },
      { label: "B", text: "実行時に IllegalStateException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も起きない" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "Stream は一度終端操作を行うと『消費済み』になる。2回目の forEach で IllegalStateException(stream has already been operated upon or closed)。",
      executionOrder: ["1回目 forEach → stream 消費", "2回目 forEach → 既に操作済み", "IllegalStateException"],
      whyOthersAreWrong: {
        A: "再利用で例外。",
        C: "コンパイルは通る(実行時の問題)。",
        D: "例外が起きる。",
      },
      examPoint: "Stream は使い捨て。終端操作後の再利用は IllegalStateException。",
      quickJudgePoint: "同じ Stream に終端操作を2回したら例外。",
      oneLineMemory: "Stream再利用はIllegalStateException。",
    },
  },
  {
    id: 188,
    targetTime: 120,
    difficulty: "long",
    tags: ["ラムダ式", "実質的final", "コンパイルエラー"],
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        int x = 10;
        Supplier<Integer> s = () -> x;
        x = 20;
        System.out.println(s.get());
    }
}`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "20" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "ラムダが捕捉するローカル変数は『実質的 final(effectively final)』でなければならない。後で x=20 と再代入しているため x は実質的finalでなくコンパイルエラー。",
      executionOrder: ["ラムダが x を捕捉", "後で x=20 と再代入 → 実質的finalでない", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "再代入があるためビルド不可。",
        B: "同上。",
        D: "コンパイル時のエラー。",
      },
      examPoint: "ラムダ/匿名クラスが捕捉するローカル変数は final か実質的final が必須。",
      quickJudgePoint: "捕捉した変数を後で代入していたらコンパイルエラー。",
      oneLineMemory: "ラムダ捕捉変数は実質的final必須。",
    },
  },
  {
    id: 189,
    targetTime: 120,
    difficulty: "normal",
    tags: ["ラムダ式", "var", "型推論"],
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        BiFunction<Integer, Integer, Integer> f = (var a, var b) -> a + b;
        System.out.println(f.apply(2, 3));
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "23" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "ラムダ引数に var を使える(全引数を var にする必要あり)。a,b は Integer と推論され 2+3=5。",
      executionOrder: ["(var a, var b) は合法な書き方", "a,b は Integer", "2+3=5"],
      whyOthersAreWrong: {
        B: "Integer 同士の + は加算。",
        C: "全引数 var なら合法(混在は不可)。",
        D: "例外なし。",
      },
      examPoint: "ラムダ引数に var を使える(ただし全引数で揃える必要あり)。",
      quickJudgePoint: "ラムダの (var a, var b) は合法(全部var)。",
      oneLineMemory: "ラムダ引数のvarは全引数で揃えれば合法。",
    },
  },
  {
    id: 190,
    targetTime: 120,
    difficulty: "normal",
    tags: ["Stream", "reduce", "メソッド参照"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        int sum = Stream.of(1, 2, 3, 4).reduce(0, Integer::sum);
        System.out.println(sum);
    }
}`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "24" },
      { label: "C", text: "0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "reduce(0, Integer::sum) は初期値0から順に加算する終端操作。1+2+3+4=10。",
      executionOrder: ["初期値0", "0+1+2+3+4", "10"],
      whyOthersAreWrong: {
        B: "積ではなく和。",
        C: "要素が加算される。",
        D: "Integer::sum は (a,b)->a+b の合法なメソッド参照。",
      },
      examPoint: "reduce(identity, accumulator) は畳み込みの終端操作。合計などに使う。",
      quickJudgePoint: "reduce(0, Integer::sum) は合計。",
      oneLineMemory: "reduce(0,Integer::sum)は合計を計算。",
    },
  },
  {
    id: 191,
    targetTime: 90,
    difficulty: "normal",
    tags: ["record"],
    code: `public class Main {
    record Point(int x, int y) {}

    public static void main(String[] args) {
        Point p = new Point(3, 4);
        System.out.println(p.x() + p.y());
    }
}`,
    choices: [
      { label: "A", text: "7" },
      { label: "B", text: "34" },
      { label: "C", text: "12" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "record のアクセサは x()・y()。p.x()=3、p.y()=4 で int の加算 3+4=7。",
      executionOrder: ["p.x()=3", "p.y()=4", "3+4=7"],
      whyOthersAreWrong: {
        B: "int の + は加算(連結ではない)。",
        C: "積ではない。",
        D: "record は合法。",
      },
      examPoint: "record のアクセサは『成分名()』。getX() ではない。",
      quickJudgePoint: "record のアクセサは x()、y() など成分名。",
      oneLineMemory: "recordのアクセサは成分名()。",
    },
  },
  {
    id: 192,
    targetTime: 120,
    difficulty: "long",
    tags: ["record", "コンパクトコンストラクタ", "例外"],
    code: `public class Main {
    record Pos(int x) {
        Pos {
            if (x < 0) throw new IllegalArgumentException();
        }
    }

    public static void main(String[] args) {
        Pos p = new Pos(-1);
        System.out.println(p.x());
    }
}`,
    choices: [
      { label: "A", text: "-1" },
      { label: "B", text: "実行時に IllegalArgumentException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "0" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "record のコンパクトコンストラクタで検証できる。x=-1 で IllegalArgumentException がスローされる。",
      executionOrder: ["new Pos(-1)", "コンパクトコンストラクタで x<0 → throw", "IllegalArgumentException"],
      whyOthersAreWrong: {
        A: "検証で例外になり生成されない。",
        C: "コンパクトコンストラクタは合法な構文。",
        D: "例外がスローされる。",
      },
      examPoint: "record はコンパクトコンストラクタ(引数リストなし)で成分の検証・正規化ができる。",
      quickJudgePoint: "record の検証はコンパクトコンストラクタで行う。",
      oneLineMemory: "recordのコンパクトコンストラクタで検証可能。",
    },
  },
  {
    id: 193,
    targetTime: 120,
    difficulty: "normal",
    tags: ["record"],
    prompt: "record に関する説明として正しいものを選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "record は暗黙的に final で継承できない" },
      { label: "B", text: "record はインスタンスフィールドを後から自由に追加できる" },
      { label: "C", text: "record は他のクラスを extends できない" },
      { label: "D", text: "record はインターフェースを implements できない" },
    ],
    correctAnswers: ["A", "C"],
    explanation: {
      reason:
        "A: record は暗黙 final で継承不可。C: record は暗黙的に java.lang.Record を継承済みのため、他クラスを extends できない。",
      executionOrder: [
        "record は final(継承不可)",
        "record は Record を継承済み → extends 不可",
        "ただし interface の implements は可能",
      ],
      whyOthersAreWrong: {
        B: "record の状態は成分(final)のみ。追加のインスタンスフィールドは宣言できない。",
        D: "record はインターフェースを implements できる。",
      },
      examPoint: "record: final・extends不可・追加インスタンスフィールド不可・implements は可。",
      quickJudgePoint: "record は継承できない/されないが、interface は実装できる。",
      oneLineMemory: "recordはfinal・extends不可・implementsは可。",
    },
  },
  {
    id: 194,
    targetTime: 90,
    difficulty: "normal",
    tags: ["record", "フィールド", "コンパイルエラー"],
    code: `public class Main {
    record R(int x) {
        int y;
    }

    public static void main(String[] args) {
    }
}`,
    choices: [
      { label: "A", text: "正常にコンパイルできる" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "0 が出力される" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "record は追加の『インスタンス』フィールドを宣言できない(状態は成分のみ)。int y; はコンパイルエラー。static フィールドなら可。",
      executionOrder: ["record の状態は成分(x)のみ", "int y はインスタンスフィールド", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "インスタンスフィールド追加は不可。",
        C: "コンパイル時のエラー。",
        D: "ビルド失敗。",
      },
      examPoint: "record にインスタンスフィールドは追加不可(成分のみ)。static フィールドは追加可。",
      quickJudgePoint: "record 内の素のフィールド宣言はエラー(staticならOK)。",
      oneLineMemory: "recordは追加インスタンスフィールド不可。",
    },
  },
  {
    id: 195,
    targetTime: 120,
    difficulty: "long",
    tags: ["sealed class", "non-sealed", "継承"],
    code: `sealed interface Shape permits Circle {}
non-sealed class Circle implements Shape {}
class BigCircle extends Circle {}

public class Main {
    public static void main(String[] args) {
        Shape s = new BigCircle();
        System.out.println(s instanceof Circle);
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
        "Circle は non-sealed なので、その先(BigCircle)は自由に継承できる。BigCircle は Circle のサブタイプなので s instanceof Circle は true。",
      executionOrder: [
        "Circle は non-sealed → 制限解除",
        "BigCircle は Circle を自由に継承可",
        "s の実体は BigCircle、Circle でもある → true",
      ],
      whyOthersAreWrong: {
        B: "BigCircle は Circle のサブタイプ。",
        C: "non-sealed により BigCircle の継承は合法。",
        D: "例外なし。",
      },
      examPoint: "non-sealed は sealed の制限を解除し、以降の自由な継承を許す。",
      quickJudgePoint: "non-sealed クラスはその先を自由に継承できる。",
      oneLineMemory: "non-sealedは継承制限を解除する。",
    },
  },
  {
    id: 196,
    targetTime: 120,
    difficulty: "long",
    tags: ["sealed class", "permits", "コンパイルエラー"],
    code: `sealed class A permits B {}
final class B extends A {}
final class C extends A {}

public class Main {
    public static void main(String[] args) {
    }
}`,
    choices: [
      { label: "A", text: "正常にコンパイルできる" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "警告のみ出る" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "A は permits B のみを許可。C は許可リストに無いのに A を extends しているためコンパイルエラー。",
      executionOrder: ["A permits B のみ", "C は permits に含まれない", "C extends A → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "C が許可されていない。",
        C: "コンパイル時のエラー。",
        D: "警告ではなくエラー。",
      },
      examPoint: "sealed クラスを継承できるのは permits に列挙された型のみ。",
      quickJudgePoint: "permits に無いクラスが extends していたらエラー。",
      oneLineMemory: "sealedはpermitsに無い型の継承を許さない。",
    },
  },
  {
    id: 197,
    targetTime: 90,
    difficulty: "normal",
    tags: ["var", "拡張for"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        var list = List.of(1, 2, 3);
        int sum = 0;
        for (var n : list) sum += n;
        System.out.println(sum);
    }
}`,
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "123" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "0" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "var はローカル変数・拡張forの変数に使える。list は List<Integer>、n は Integer と推論され合計 1+2+3=6。",
      executionOrder: ["list は List<Integer>", "for(var n: list) で n は Integer", "1+2+3=6"],
      whyOthersAreWrong: {
        B: "Integer 同士の加算で6。",
        C: "拡張forの変数に var は使える。",
        D: "加算される。",
      },
      examPoint: "var はローカル変数・for/拡張forの変数で使える。フィールドや引数では不可。",
      quickJudgePoint: "for-each の変数に var はOK。",
      oneLineMemory: "varは拡張forの変数にも使える。",
    },
  },
  {
    id: 198,
    targetTime: 90,
    difficulty: "normal",
    tags: ["var", "コンパイルエラー"],
    code: `public class Main {
    static void m(var x) {
    }

    public static void main(String[] args) {
    }
}`,
    choices: [
      { label: "A", text: "正常にコンパイルできる" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "実行時例外" },
      { label: "D", text: "警告のみ出る" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "var はメソッドのパラメータ型には使えない。m(var x) はコンパイルエラー。",
      executionOrder: ["var はローカル変数限定", "メソッド引数は不可", "コンパイルエラー"],
      whyOthersAreWrong: {
        A: "引数に var は使えない。",
        C: "コンパイル時のエラー。",
        D: "エラーであって警告ではない。",
      },
      examPoint: "var が使えるのはローカル変数のみ。メソッド引数・戻り値・フィールドは不可(ラムダ引数は可)。",
      quickJudgePoint: "メソッド引数に var があればエラー。",
      oneLineMemory: "varはメソッド引数に使えない。",
    },
  },
  {
    id: 199,
    targetTime: 120,
    difficulty: "normal",
    tags: ["Stream", "sorted", "findFirst", "Optional"],
    code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Optional<Integer> first = Stream.of(3, 1, 2).sorted().findFirst();
        System.out.println(first.get());
    }
}`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "3" },
      { label: "C", text: "2" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "sorted() で昇順(1,2,3)に並べ、findFirst() で先頭の Optional を取得。get() で 1。",
      executionOrder: ["sorted() → 1,2,3", "findFirst() → Optional[1]", "get() → 1"],
      whyOthersAreWrong: {
        B: "ソート後の先頭は1。",
        C: "先頭ではない。",
        D: "合法。",
      },
      examPoint: "sorted は中間操作、findFirst は終端で Optional を返す。get で中身を取り出す。",
      quickJudgePoint: "sorted().findFirst() は最小要素(自然順序)。",
      oneLineMemory: "sorted().findFirst()は最小要素のOptional。",
    },
  },
  {
    id: 200,
    targetTime: 120,
    difficulty: "normal",
    tags: ["ラムダ式", "List", "sort", "Comparator"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("banana", "apple", "cherry"));
        list.sort((a, b) -> a.compareTo(b));
        System.out.println(list.get(0));
    }
}`,
    choices: [
      { label: "A", text: "apple" },
      { label: "B", text: "banana" },
      { label: "C", text: "cherry" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "sort にラムダ Comparator (a,b)->a.compareTo(b) を渡し辞書順に昇順ソート。先頭は \"apple\"。",
      executionOrder: ["compareTo で辞書順ソート", "apple, banana, cherry", "get(0) → \"apple\""],
      whyOthersAreWrong: {
        B: "辞書順では apple が先。",
        C: "cherry は最後。",
        D: "Comparator のラムダは合法。",
      },
      examPoint: "List.sort(Comparator) にラムダを渡せる。compareTo は自然順序(辞書順)。",
      quickJudgePoint: "(a,b)->a.compareTo(b) は昇順ソート。",
      oneLineMemory: "sort((a,b)->a.compareTo(b))は昇順ソート。",
    },
  },
];
