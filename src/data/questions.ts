import type { Question } from "../types";

// =============================================================
//  Java Silver SE17 演習問題データ
//  ・ここに Question を追加するだけで画面に反映されます。
//  ・新しい問題は id を重複させないこと。
//  ・難易度の目安: normal=90秒 / long=150秒 / complex=210〜240秒
//  ・追加方法は README.md の「問題を追加する方法」を参照。
// =============================================================

export const questions: Question[] = [
  // ------------------------------------------------------------------
  // Q1: ArrayList.remove(int) と remove(Object)
  // ------------------------------------------------------------------
  {
    id: 1,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "ArrayList", "オーバーロード", "Wrapper"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);

        list.remove(1);
        list.remove(Integer.valueOf(10));

        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[30]" },
      { label: "B", text: "[10, 30]" },
      { label: "C", text: "[20, 30]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswer: "A",
    explanation: {
      reason:
        "List には remove(int index) と remove(Object o) の2つのオーバーロードがある。remove(1) は int リテラルなので「インデックス1」の要素(=20)を削除。remove(Integer.valueOf(10)) は Integer オブジェクトなので「値が10の要素」を削除する。結果 [30] が残る。",
      executionOrder: [
        "list = [10, 20, 30]",
        "remove(1) → int 引数 → インデックス1 を削除 → [10, 30]",
        "remove(Integer.valueOf(10)) → Object 引数 → 値10 を削除 → [30]",
        "出力: [30]",
      ],
      whyOthersAreWrong: {
        B: "remove(1) をインデックスではなく『値1の削除』と誤解した場合。リスト内に1は無いので、その解釈でも[10,30]にはならない。",
        C: "remove(Integer.valueOf(10)) を無視した場合の途中状態。最後まで実行すれば10は消える。",
        D: "両方とも正しいオーバーロードが存在するためコンパイルは通る。",
      },
      examPoint:
        "remove に渡すのが int(プリミティブ) か Integer(オブジェクト) かで挙動が変わる。int → インデックス、Integer → 値。",
      quickJudgePoint:
        "remove の引数が『数字リテラルそのまま』ならインデックス削除を疑う。Integer.valueOf や (Integer) が付いたら値削除。",
      oneLineMemory: "remove(int)=添字, remove(Object)=値。Integer.valueOf(x)で値削除。",
      similarTrap:
        "list.remove((Integer) 1) のようにキャストすると値削除に変わる。autoboxing されず int のままだとインデックス削除。",
    },
  },

  // ------------------------------------------------------------------
  // Q2: List.of() は変更不可
  // ------------------------------------------------------------------
  {
    id: 2,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "List.of", "例外", "不変"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = List.of("a", "b", "c");
        list.add("d");
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[a, b, c, d]" },
      { label: "B", text: "[a, b, c]" },
      { label: "C", text: "実行時に UnsupportedOperationException がスローされる" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswer: "C",
    explanation: {
      reason:
        "List.of(...) が返すのは不変(immutable)リスト。add / remove / set など変更系メソッドを呼ぶと、コンパイルは通るが実行時に UnsupportedOperationException がスローされる。",
      executionOrder: [
        "List.of(\"a\",\"b\",\"c\") で不変リストを生成",
        "list.add(\"d\") を呼ぶ → 変更操作は禁止",
        "実行時に UnsupportedOperationException 発生 → println には到達しない",
      ],
      whyOthersAreWrong: {
        A: "不変リストには追加できないため [a,b,c,d] にはならない。",
        B: "add が例外を投げるので println 自体が実行されない。",
        D: "add(String) は List のメソッドとして存在するのでコンパイルは成功する。エラーは実行時。",
      },
      examPoint:
        "List.of / Set.of / Map.of は全て不変。変更メソッドは『コンパイルOK・実行時例外』というパターンが頻出。",
      quickJudgePoint:
        "List.of や Map.of に対して add/remove/set/put があったら、まず UnsupportedOperationException を疑う。",
      oneLineMemory: "List.of は不変。変更すると実行時 UnsupportedOperationException。",
      similarTrap:
        "Collections.unmodifiableList(...) や Arrays.asList(...).add(...) も同じ例外。ただし Arrays.asList は set だけは可能。",
    },
  },

  // ------------------------------------------------------------------
  // Q3: Arrays.asList() は固定サイズ
  // ------------------------------------------------------------------
  {
    id: 3,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "Arrays.asList", "例外", "配列"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("x", "y", "z");
        list.set(1, "Y");
        list.add("w");
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[x, Y, z, w]" },
      { label: "B", text: "[x, Y, z]" },
      { label: "C", text: "set の時点で例外がスローされる" },
      { label: "D", text: "実行時に add で UnsupportedOperationException がスローされる" },
    ],
    correctAnswer: "D",
    explanation: {
      reason:
        "Arrays.asList が返すのは『固定サイズ』リスト（元の配列のビュー）。要素の置換 set は可能だが、サイズを変える add / remove は UnsupportedOperationException になる。set(1,\"Y\") は成功し、add(\"w\") で例外。",
      executionOrder: [
        "Arrays.asList(\"x\",\"y\",\"z\") → 固定サイズリスト [x, y, z]",
        "set(1, \"Y\") → 置換は許可 → [x, Y, z]",
        "add(\"w\") → サイズ変更は禁止 → UnsupportedOperationException",
        "println には到達しない",
      ],
      whyOthersAreWrong: {
        A: "add は固定サイズリストでは不可。要素は増やせない。",
        B: "set は成功するが、その後の add で例外になるため、この値が出力されることはない。",
        C: "set（置換）はサイズを変えないので許可される。例外になるのは add の方。",
      },
      examPoint:
        "Arrays.asList は『固定サイズ・set可・add/remove不可』。List.of の『完全に不変・set も不可』との違いが頻出ポイント。",
      quickJudgePoint:
        "Arrays.asList を見たら『setはOK / サイズ変更はNG』。set と add のどちらが呼ばれているかを確認。",
      oneLineMemory: "Arrays.asList=固定サイズ(set可/add不可)。List.of=完全不変(set不可)。",
      similarTrap:
        "Arrays.asList の戻り値は java.util.ArrayList ではなく Arrays の内部クラス。new ArrayList<>(Arrays.asList(...)) で包めば add も可能になる。",
    },
  },

  // ------------------------------------------------------------------
  // Q4: instanceof パターンマッチング と &&
  // ------------------------------------------------------------------
  {
    id: 4,
    targetTime: 90,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "String", "分岐"],
    code: `public class Main {
    public static void main(String[] args) {
        Object obj = "Hello";

        if (obj instanceof String s && s.length() > 3) {
            System.out.println(s.toUpperCase());
        } else {
            System.out.println("no");
        }
    }
}`,
    choices: [
      { label: "A", text: "HELLO" },
      { label: "B", text: "Hello" },
      { label: "C", text: "no" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswer: "A",
    explanation: {
      reason:
        "instanceof パターンマッチングは、左がその型なら変数 s に束縛する。&& の右側は『左が true のときだけ』評価されるので、s は確実に代入済み（definitely assigned）。obj は String で length()=5 > 3 なので条件は true、s.toUpperCase() で HELLO。",
      executionOrder: [
        "obj = \"Hello\"",
        "obj instanceof String s → true、s に \"Hello\" を束縛",
        "&& の右 s.length() > 3 → 5 > 3 → true",
        "if ブロック実行 → s.toUpperCase() → HELLO",
      ],
      whyOthersAreWrong: {
        B: "toUpperCase() で大文字化されるため Hello のままにはならない。",
        C: "条件は true なので else には行かない。",
        D: "&& の右では s が確実に代入されているためコンパイルは通る（||との違いに注意）。",
      },
      examPoint:
        "パターン変数は『&& の右』『if の true 側』では使える。&& は短絡評価で左が true の時だけ右を見るため、変数の束縛が保証される。",
      quickJudgePoint:
        "instanceof + && はOKと覚える。問題は || や ! と組み合わさったとき（Q5参照）。",
      oneLineMemory: "instanceof 型 s && s.xxx は合法（短絡で必ず束縛済み）。",
      similarTrap:
        "if (!(obj instanceof String s)) { ... } else { s を使う } も合法。else 側では型が確定しているため。",
    },
  },

  // ------------------------------------------------------------------
  // Q5: instanceof パターンマッチング と || はコンパイルエラー
  // ------------------------------------------------------------------
  {
    id: 5,
    targetTime: 120,
    difficulty: "normal",
    tags: ["instanceof", "パターンマッチング", "コンパイルエラー", "分岐"],
    code: `public class Main {
    public static void main(String[] args) {
        Object obj = "Hi";

        if (obj instanceof String s || s.length() > 1) {
            System.out.println(s);
        }
    }
}`,
    choices: [
      { label: "A", text: "Hi" },
      { label: "B", text: "何も出力されない" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時に NullPointerException" },
    ],
    correctAnswer: "C",
    explanation: {
      reason:
        "|| の右側は『左が false のとき』に評価される。左 (obj instanceof String s) が false ということは s に束縛されていない＝未代入。よって右の s.length() は『未代入の変数を使用』となりコンパイルエラー。さらに if ブロック内の s も束縛が保証されないためエラー。",
      executionOrder: [
        "コンパイル時に変数 s の到達可能性(definite assignment)を検査",
        "|| の右で s が未代入の可能性 → コンパイルエラー",
        "実行には到達しない",
      ],
      whyOthersAreWrong: {
        A: "コンパイルが通らないので実行されず Hi は出ない。",
        B: "コンパイルエラーは『出力されない』とは区別する。プログラム自体がビルドできない。",
        D: "実行時例外ではなく、コンパイル時点で弾かれる。",
      },
      examPoint:
        "instanceof パターン変数は『&& とその先』では使えるが『|| の右』では使えない。短絡評価の方向が逆だから。&&=合法 / ||=エラー、を対比で覚える。",
      quickJudgePoint:
        "instanceof パターンの直後が || なら、まずコンパイルエラーを疑う。&& なら合法。",
      oneLineMemory: "instanceof 型 s || s.xxx はコンパイルエラー（||の右で未束縛）。",
      similarTrap:
        "Q4(&&)とセットで覚える。&&は左trueで右評価=束縛済み、||は左falseで右評価=未束縛。",
    },
  },

  // ------------------------------------------------------------------
  // Q6: static メソッド隠蔽 と フィールド非override
  // ------------------------------------------------------------------
  {
    id: 6,
    targetTime: 150,
    difficulty: "long",
    tags: ["継承", "static", "多態性", "フィールド", "オーバーライド"],
    code: `class Parent {
    String name = "Parent";
    static String who() { return "Parent.who"; }
    String hello() { return "Parent.hello"; }
}

class Child extends Parent {
    String name = "Child";
    static String who() { return "Child.who"; }
    String hello() { return "Child.hello"; }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.name);
        System.out.println(p.who());
        System.out.println(p.hello());
    }
}`,
    choices: [
      { label: "A", text: "Parent / Parent.who / Parent.hello" },
      { label: "B", text: "Child / Child.who / Child.hello" },
      { label: "C", text: "Parent / Parent.who / Child.hello" },
      { label: "D", text: "Child / Parent.who / Child.hello" },
    ],
    correctAnswer: "C",
    explanation: {
      reason:
        "(1) フィールドはオーバーライドされず『参照型』で解決 → p は Parent 型なので name は Parent。(2) static メソッドはオーバーライドではなく『隠蔽(hiding)』で、これも参照型で解決 → p.who() は Parent.who。(3) インスタンスメソッドだけが多態性で『実体型(Child)』で解決 → p.hello() は Child.hello。",
      executionOrder: [
        "p の参照型 = Parent、実体型 = Child",
        "p.name → フィールドは参照型で解決 → \"Parent\"",
        "p.who() → static は隠蔽・参照型で解決 → \"Parent.who\"",
        "p.hello() → インスタンスメソッドは実体型で解決 → \"Child.hello\"",
      ],
      whyOthersAreWrong: {
        A: "hello() はインスタンスメソッドなので多態性により Child.hello になる。",
        B: "name と who() は参照型(Parent)で解決されるため Child にはならない。",
        D: "name はフィールドなので参照型 Parent で解決され Parent。Child ではない。",
      },
      examPoint:
        "多態性(動的束縛)が効くのは『インスタンスメソッド』だけ。フィールドと static メソッドは参照型で静的に解決される。",
      quickJudgePoint:
        "p.xxx の xxx が『フィールド』か『staticメソッド』なら宣言型(左の型)を見る。『インスタンスメソッド』なら実体(new した型)を見る。",
      oneLineMemory: "field と static は宣言型で解決、instance method だけ実体型で解決。",
      similarTrap:
        "static メソッドはインスタンス経由 p.who() でも呼べてしまうが、実体は無視され参照型で決まる。warningは出るがコンパイルは通る。",
    },
  },

  // ------------------------------------------------------------------
  // Q7: 初期化順序
  // ------------------------------------------------------------------
  {
    id: 7,
    targetTime: 150,
    difficulty: "long",
    tags: ["初期化順序", "static", "コンストラクタ", "クラスのライフサイクル"],
    code: `class Sample {
    static { System.out.print("1"); }
    { System.out.print("2"); }
    Sample() { System.out.print("3"); }
    static { System.out.print("4"); }
    { System.out.print("5"); }
}

public class Main {
    public static void main(String[] args) {
        new Sample();
        new Sample();
    }
}`,
    choices: [
      { label: "A", text: "1425314253" },
      { label: "B", text: "14253253" },
      { label: "C", text: "1234545" },
      { label: "D", text: "14235235" },
    ],
    correctAnswer: "B",
    explanation: {
      reason:
        "static 初期化ブロックはクラスが最初にロードされる時に1度だけ、記述順で実行される → \"1\"→\"4\" = 14。インスタンス生成のたびに、インスタンス初期化ブロックが記述順で実行され、その後コンストラクタ本体が実行される → \"2\"→\"5\"→\"3\" = 253。new を2回呼ぶので 14 + 253 + 253 = 14253253。",
      executionOrder: [
        "Sample クラス初回ロード: static{} を記述順 → \"1\", \"4\"",
        "1回目 new: インスタンス初期化ブロック \"2\",\"5\" → コンストラクタ \"3\" → \"253\"",
        "2回目 new: static は再実行されない。インスタンス初期化 \"2\",\"5\" → コンストラクタ \"3\" → \"253\"",
        "連結: \"14\" + \"253\" + \"253\" = 14253253",
      ],
      whyOthersAreWrong: {
        A: "static ブロック(14)は2回実行されない。1度だけ。",
        C: "記述順を無視している。static→インスタンス初期化→コンストラクタの順序が正しい。",
        D: "インスタンス初期化ブロックの記述順が違う。2の次は5、その後コンストラクタ3。",
      },
      examPoint:
        "順序は『static初期化(クラスロード時1回)』→ 各インスタンスで『インスタンス初期化ブロック＆フィールド初期化(記述順)』→『コンストラクタ本体』。",
      quickJudgePoint:
        "static{} はプログラム中で1回きり。{} とコンストラクタは new のたび。同種ブロックは上から順。",
      oneLineMemory: "static初期化は1回、インスタンス初期化→コンストラクタは毎回・記述順。",
      similarTrap:
        "親クラスがある場合は『親static→子static→親インスタンス初期化→親コンストラクタ→子インスタンス初期化→子コンストラクタ』とさらに複雑になる。",
    },
  },

  // ------------------------------------------------------------------
  // Q8: switch式 と yield
  // ------------------------------------------------------------------
  {
    id: 8,
    targetTime: 120,
    difficulty: "normal",
    tags: ["switch式", "yield", "分岐", "var"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 3;

        var result = switch (n) {
            case 1, 2 -> "low";
            case 3, 4 -> {
                String s = "mid";
                yield s;
            }
            default -> "high";
        };

        System.out.println(result);
    }
}`,
    choices: [
      { label: "A", text: "low" },
      { label: "B", text: "mid" },
      { label: "C", text: "high" },
      { label: "D", text: "コンパイルエラー（yield が不要）" },
    ],
    correctAnswer: "B",
    explanation: {
      reason:
        "switch式のアロー(->)はフォールスルーしない。n=3 は case 3,4 にマッチ。ブロック{}本体では return ではなく yield で値を返す。yield s で \"mid\" が result に代入される。var は \"mid\"(String)から型推論される。",
      executionOrder: [
        "n = 3",
        "switch式が case 3,4 にマッチ",
        "ブロック内: s=\"mid\" → yield s で \"mid\" を返す",
        "result = \"mid\"（var は String と推論）→ 出力 mid",
      ],
      whyOthersAreWrong: {
        A: "case 1,2 は n=3 にマッチしない。",
        C: "default は他にマッチしなかった時のみ。case 3,4 にマッチするので default は実行されない。",
        D: "ブロック{}から値を返すには yield が必須。yield があるのは正しく、コンパイルは通る。",
      },
      examPoint:
        "switch式でブロック{}を使うと値を返すのに yield が必要。アロー式で単一の値なら『-> 値』でよい。アローはフォールスルーしない。",
      quickJudgePoint:
        "switch式のブロック{}内では return ではなく yield。case のカンマ区切り(1,2)は複数値マッチ。",
      oneLineMemory: "switch式: ->はフォールスルー無し, ブロックからの戻りはyield。",
      similarTrap:
        "従来の switch文(コロン:)で break を忘れるとフォールスルーする。switch式(->)はその心配が無いのが利点。",
    },
  },

  // ------------------------------------------------------------------
  // Q9: try-with-resources の close 順序
  // ------------------------------------------------------------------
  {
    id: 9,
    targetTime: 150,
    difficulty: "long",
    tags: ["try-with-resources", "AutoCloseable", "例外", "実行順序"],
    code: `class Res implements AutoCloseable {
    private final String name;
    Res(String name) {
        this.name = name;
        System.out.println("open " + name);
    }
    public void close() {
        System.out.println("close " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        try (Res a = new Res("A"); Res b = new Res("B")) {
            System.out.println("body");
        }
    }
}`,
    choices: [
      { label: "A", text: "open A / open B / body / close A / close B" },
      { label: "B", text: "open A / open B / body / close B / close A" },
      { label: "C", text: "open B / open A / body / close A / close B" },
      { label: "D", text: "open A / open B / close B / close A / body" },
    ],
    correctAnswer: "B",
    explanation: {
      reason:
        "try-with-resources はリソースを宣言順に open し、close は『宣言と逆順』に行う。A→B の順に open され、try ブロック本体(body)実行後、B→A の順に close される。",
      executionOrder: [
        "Res a = new Res(\"A\") → open A",
        "Res b = new Res(\"B\") → open B",
        "tryブロック本体 → body",
        "close は逆順: close B → close A",
      ],
      whyOthersAreWrong: {
        A: "close が宣言順になっている。実際は逆順(B→A)。",
        C: "open は宣言順(A→B)。逆順になるのは close だけ。",
        D: "body は close より前に実行される。close は try ブロックを抜けるとき。",
      },
      examPoint:
        "try-with-resources: open は宣言順、close は逆順。後から開いたものを先に閉じる（スタック構造）。close は例外が起きても必ず呼ばれる。",
      quickJudgePoint:
        "リソースが複数あるときは『閉じるのは逆順』。最後に書いたリソースが最初に閉じる。",
      oneLineMemory: "try-with-resources の close は宣言の逆順（後入れ先出し）。",
      similarTrap:
        "本体と close の両方で例外が出た場合、本体の例外が主、close の例外は suppressed（getSuppressed で取得）になる。",
    },
  },

  // ------------------------------------------------------------------
  // Q10: Stream の遅延評価
  // ------------------------------------------------------------------
  {
    id: 10,
    targetTime: 150,
    difficulty: "long",
    tags: ["Stream", "ラムダ式", "遅延評価", "中間操作"],
    code: `import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Stream.of("a", "b", "c")
              .peek(s -> System.out.print("peek:" + s + " "))
              .filter(s -> s.equals("b"));

        System.out.println("done");
    }
}`,
    choices: [
      { label: "A", text: "peek:a peek:b peek:c done" },
      { label: "B", text: "done" },
      { label: "C", text: "peek:a peek:b peek:c" },
      { label: "D", text: "peek:b done" },
    ],
    correctAnswer: "B",
    explanation: {
      reason:
        "peek と filter は『中間操作』で遅延評価される。中間操作は『終端操作(forEach/collect/count など)』が呼ばれて初めて実行される。このコードには終端操作が無いため、peek のラムダは一切実行されない。出力は \"done\" だけ。",
      executionOrder: [
        "Stream.of(...) でストリーム生成",
        "peek(...).filter(...) は中間操作 → パイプラインを組み立てるだけで実行されない",
        "終端操作が無い → peek のラムダは呼ばれない",
        "println(\"done\") のみ実行 → 出力 done",
      ],
      whyOthersAreWrong: {
        A: "終端操作が無いので peek は実行されない。",
        C: "同上。中間操作だけでは何も流れない。",
        D: "filter で b に絞られても、終端操作が無いので peek 自体が走らない。",
      },
      examPoint:
        "Stream の中間操作(filter/map/peek/sorted等)は遅延評価。終端操作(forEach/collect/count/reduce/findFirst等)を呼ぶまで実行されない。",
      quickJudgePoint:
        "Streamのチェーンに終端操作があるか確認。無ければ中間操作は一切動かない＝副作用も出ない。",
      oneLineMemory: "中間操作は遅延、終端操作が無いと何も実行されない。",
      similarTrap:
        "末尾に .count() や .forEach(...) を足すと一気に peek が実行される。findFirst など短絡終端操作だと途中で打ち切られることもある。",
    },
  },
];
