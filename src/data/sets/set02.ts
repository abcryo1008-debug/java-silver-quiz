import type { Question } from "../../types";

// 第2セット（id 21-40）: ArrayList / List / ジェネリクス / 反復処理
export const set02: Question[] = [
  {
    id: 21,
    targetTime: 120,
    difficulty: "normal",
    tags: ["List", "ArrayList"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("a");
        list.add(0, "b");
        list.set(1, "c");
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[c, a]" },
      { label: "B", text: "[b, c]" },
      { label: "C", text: "[b, a, c]" },
      { label: "D", text: "[a, c]" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "add(\"a\")→[a]、add(0,\"b\")は先頭挿入→[b,a]、set(1,\"c\")はインデックス1を置換→[b,c]。",
      executionOrder: ["[a]", "add(0,\"b\") → [b, a]", "set(1,\"c\") → [b, c]"],
      whyOthersAreWrong: {
        A: "set は要素数を変えない。サイズ2のまま。",
        C: "set は追加ではなく置換。",
        D: "add(0,…) は先頭に挿入する。",
      },
      examPoint: "add(index,e)=挿入, set(index,e)=置換(サイズ不変)。",
      quickJudgePoint: "set はサイズを変えない、add(index,e) は増やす。",
      oneLineMemory: "add(i,e)は挿入, set(i,e)は置換。",
    },
  },
  {
    id: 22,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "Arrays.asList"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3);
        list.set(0, 9);
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "実行時に UnsupportedOperationException" },
      { label: "B", text: "[1, 2, 3]" },
      { label: "C", text: "[9, 2, 3]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "Arrays.asList は固定サイズだが set(置換)は可能。[9,2,3] になる（add/remove なら例外）。",
      executionOrder: ["固定サイズリスト [1,2,3]", "set(0,9) は置換OK → [9,2,3]"],
      whyOthersAreWrong: {
        A: "例外になるのは add/remove。set は許可。",
        B: "set は反映される。",
        D: "set は List のメソッドでコンパイル可。",
      },
      examPoint: "Arrays.asList は『固定サイズ・set可・add/remove不可』。List.of は『完全不変・set不可』。",
      quickJudgePoint: "Arrays.asList+set はOK、+add は例外。",
      oneLineMemory: "Arrays.asListはset可・add/remove不可。",
    },
  },
  {
    id: 23,
    targetTime: 150,
    difficulty: "long",
    tags: ["List", "反復処理", "例外"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4));
        for (Integer n : list) {
            if (n == 2) list.remove(n);
        }
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[1, 3, 4]" },
      { label: "B", text: "[1, 2, 3, 4]" },
      { label: "C", text: "実行時に ConcurrentModificationException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "拡張for(内部はIterator)で走査中にコレクションを直接 remove すると、次の next() で構造的変更を検知し ConcurrentModificationException。",
      executionOrder: [
        "Iterator で走査",
        "list.remove(n) でコレクションを直接変更(modCount変化)",
        "次の next() で検知 → 例外",
      ],
      whyOthersAreWrong: {
        A: "正しく削除できず例外になる。",
        B: "remove は試みられるが走査が壊れる。",
        D: "構文は正しい。問題は実行時。",
      },
      examPoint: "拡張for中の直接removeはCME。削除は Iterator.remove() を使う。",
      quickJudgePoint: "for-each 内で list を add/remove していたらCMEを疑う。",
      oneLineMemory: "for-each中の直接removeはConcurrentModificationException。",
    },
  },
  {
    id: 24,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "ジェネリクス", "コンパイルエラー"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add(2);
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[1, 2]" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "[1]" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "List<String> に int(2) を add しようとすると型不一致でコンパイルエラー（String が要求される）。",
      executionOrder: ["List<String> は String 専用", "add(2) は型不一致 → コンパイルエラー"],
      whyOthersAreWrong: {
        A: "2 は String ではないため追加できない。",
        C: "コンパイル自体が失敗する。",
        D: "コンパイル時に検出される。",
      },
      examPoint: "ジェネリクスはコンパイル時の型チェック。要素型に合わない add はエラー。",
      quickJudgePoint: "List<String> に数値を add していたらコンパイルエラー。",
      oneLineMemory: "List<String>にintはadd不可(コンパイルエラー)。",
    },
  },
  {
    id: 25,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "List.of", "null", "例外"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = List.of("a", null, "c");
        System.out.println(list.size());
    }
}`,
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "2" },
      { label: "C", text: "実行時に NullPointerException" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "List.of は null 要素を許容しない。null を渡すと生成時に NullPointerException。",
      executionOrder: ["List.of に null が含まれる", "生成時に NPE"],
      whyOthersAreWrong: {
        A: "null があると生成段階で失敗。",
        B: "null は無視されず例外になる。",
        D: "コンパイルは通る（実行時例外）。",
      },
      examPoint: "List.of/Map.of/Set.of は null 不可（即NPE）。ArrayList は null 可。",
      quickJudgePoint: "List.of に null が混ざっていたら実行時NPE。",
      oneLineMemory: "List.ofはnull禁止(実行時NPE)。",
    },
  },
  {
    id: 26,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "indexOf", "contains"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("x", "y", "z"));
        System.out.println(list.indexOf("y") + " " + list.contains("w"));
    }
}`,
    choices: [
      { label: "A", text: "1 false" },
      { label: "B", text: "2 false" },
      { label: "C", text: "1 true" },
      { label: "D", text: "-1 false" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "indexOf(\"y\") は0始まりで1。contains(\"w\") は存在しないため false。",
      executionOrder: ["indexOf(\"y\") → 1", "contains(\"w\") → false"],
      whyOthersAreWrong: {
        B: "インデックスは0始まり。y は1。",
        C: "w は含まれない。",
        D: "y は存在するので indexOf は -1 ではない。",
      },
      examPoint: "indexOf は0始まり・無ければ-1。contains は存在判定(equals基準)。",
      quickJudgePoint: "indexOf は0始まり。無い要素は -1。",
      oneLineMemory: "indexOfは0始まり、無ければ-1。",
    },
  },
  {
    id: 27,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "remove", "戻り値"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("p", "q", "r"));
        String removed = list.remove(1);
        System.out.println(removed + " " + list);
    }
}`,
    choices: [
      { label: "A", text: "r [p, q]" },
      { label: "B", text: "q [p, r]" },
      { label: "C", text: "true [p, r]" },
      { label: "D", text: "p [q, r]" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "remove(int) は削除した要素を返す。index1(=\"q\")を削除し、残りは [p, r]。",
      executionOrder: ["remove(1) は index1 の \"q\" を削除して返す", "list → [p, r]"],
      whyOthersAreWrong: {
        A: "削除されるのは index1 の q。",
        C: "boolean を返すのは remove(Object) の方。remove(int) は要素を返す。",
        D: "index1 は q。",
      },
      examPoint: "remove(int) は要素を返す、remove(Object) は boolean を返す。",
      quickJudgePoint: "remove(int) の戻り値は削除要素、remove(Object) は成功可否。",
      oneLineMemory: "remove(int)は要素を返す, remove(Object)はbooleanを返す。",
    },
  },
  {
    id: 28,
    targetTime: 120,
    difficulty: "long",
    tags: ["List", "Iterator", "反復処理"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4));
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();
        }
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[2, 4]" },
      { label: "B", text: "[1, 3]" },
      { label: "C", text: "実行時に ConcurrentModificationException" },
      { label: "D", text: "[1, 2, 3, 4]" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "Iterator.remove() は走査中の安全な削除。偶数(2,4)を削除し [1,3] が残る。CMEは起きない。",
      executionOrder: [
        "it.next()で各要素を読む",
        "偶数なら it.remove() で安全に削除",
        "[1, 3]",
      ],
      whyOthersAreWrong: {
        A: "削除されるのは偶数。残るのは奇数。",
        C: "Iterator.remove() を使えばCMEにならない。",
        D: "削除は反映される。",
      },
      examPoint: "走査中の削除は Iterator.remove() を使えば安全(list.remove はCME)。",
      quickJudgePoint: "it.remove() ならOK、list.remove() はCME。",
      oneLineMemory: "走査中削除はIterator.remove()で安全。",
    },
  },
  {
    id: 29,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "addAll"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> a = new ArrayList<>(List.of("1", "2"));
        List<String> b = List.of("3", "4", "5");
        a.addAll(b);
        System.out.println(a.size());
    }
}`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "5" },
      { label: "D", text: "実行時に UnsupportedOperationException" },
    ],
    correctAnswers: ["C"],
    explanation: {
      reason:
        "a は可変リスト。addAll(b) で b の3要素を追加し size は 2+3=5。b が不変でも『読み出し元』なので問題ない。",
      executionOrder: ["a=[1,2]", "addAll(b) で 3,4,5 を追加", "size = 5"],
      whyOthersAreWrong: {
        A: "addAll で増える。",
        B: "b の要素数だけではなく合計。",
        D: "変更されるのは可変な a。b は読むだけなので例外は出ない。",
      },
      examPoint: "addAll は引数コレクションを全追加。不変リストでも『追加元』なら使える。",
      quickJudgePoint: "addAll の例外は『追加先』が不変のときだけ。",
      oneLineMemory: "addAllの可否は追加先(this)が可変かで決まる。",
    },
  },
  {
    id: 30,
    targetTime: 120,
    difficulty: "long",
    tags: ["var", "ジェネリクス", "型推論"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        var list = new ArrayList<>();
        list.add("a");
        list.add(1);
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "コンパイルエラー" },
      { label: "B", text: "[a, 1]" },
      { label: "C", text: "[a]" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "new ArrayList<>() のダイヤモンドは型引数が無いと Object と推論され、var list は ArrayList<Object>。String も int(boxing) も追加でき [a, 1]。",
      executionOrder: [
        "var list = new ArrayList<>() → ArrayList<Object>",
        "add(\"a\"), add(1) どちらもObjectとして可",
        "[a, 1]",
      ],
      whyOthersAreWrong: {
        A: "Object 型なので両方追加できコンパイルは通る。",
        C: "1 も追加される。",
        D: "例外は起きない。",
      },
      examPoint: "var + new ArrayList<>() は ArrayList<Object> になる（左辺の型情報が無いため）。",
      quickJudgePoint: "var x = new ArrayList<>() は Object 要素扱い。",
      oneLineMemory: "var + diamond は ArrayList<Object> 推論。",
    },
  },
  {
    id: 31,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "equals"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> a = List.of(1, 2, 3);
        List<Integer> b = Arrays.asList(1, 2, 3);
        System.out.println(a.equals(b));
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
        "List の equals は実装クラスに関係なく『同じ順序で同じ要素』なら true。中身が同じなので true。",
      executionOrder: ["List.equals は順序＋要素で比較", "実装(of と asList)が違っても中身一致 → true"],
      whyOthersAreWrong: {
        B: "実装クラスの違いは equals に影響しない。",
        C: "型は同じ List<Integer>。",
        D: "例外なし。",
      },
      examPoint: "List#equals は List 同士で順序と要素が一致すれば true（実装非依存）。",
      quickJudgePoint: "List の equals は中身比較。実装の違いは無関係。",
      oneLineMemory: "List.equalsは順序＋要素で判定(実装無関係)。",
    },
  },
  {
    id: 32,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "Wrapper", "オートボクシング"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(100, 200, 300));
        int x = list.get(1);
        System.out.println(x);
    }
}`,
    choices: [
      { label: "A", text: "100" },
      { label: "B", text: "200" },
      { label: "C", text: "300" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason: "get(1) は index1 の Integer(200)。int への代入で自動アンボクシングされ 200。",
      executionOrder: ["get(1) → Integer 200", "int x へ自動アンボクシング → 200"],
      whyOthersAreWrong: {
        A: "index0 は 100。get(1) は index1。",
        C: "index2 は 300。",
        D: "Integer→int は自動変換でき、エラーにならない。",
      },
      examPoint: "List<Integer>.get は Integer、int 代入で自動アンボクシング。null なら NPE に注意。",
      quickJudgePoint: "Integer を int に受けると自動アンボクシング。",
      oneLineMemory: "Integer→intは自動アンボクシング(nullはNPE)。",
    },
  },
  {
    id: 33,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "clear", "isEmpty"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("a", "b"));
        list.clear();
        System.out.println(list.isEmpty() + " " + list.size());
    }
}`,
    choices: [
      { label: "A", text: "false 2" },
      { label: "B", text: "true 0" },
      { label: "C", text: "true 2" },
      { label: "D", text: "[]" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason: "clear() で全要素削除。isEmpty()=true、size()=0。",
      executionOrder: ["clear() で空に", "isEmpty()=true, size()=0"],
      whyOthersAreWrong: {
        A: "clear 後は空。",
        C: "size は0になる。",
        D: "出力は \"true 0\" という文字列連結。",
      },
      examPoint: "clear は全削除。size=0 / isEmpty=true。",
      quickJudgePoint: "clear 後は size 0・isEmpty true。",
      oneLineMemory: "clear()でsize0・isEmpty true。",
    },
  },
  {
    id: 34,
    targetTime: 120,
    difficulty: "normal",
    tags: ["List", "List.of", "不変"],
    prompt:
      "List<String> l = List.of(\"a\", \"b\"); のとき、実行時に例外をスローする操作を選べ。",
    code: undefined,
    choices: [
      { label: "A", text: "l.get(0)" },
      { label: "B", text: "l.add(\"c\")" },
      { label: "C", text: "l.size()" },
      { label: "D", text: "l.set(0, \"z\")" },
    ],
    correctAnswers: ["B", "D"],
    explanation: {
      reason:
        "List.of は不変。変更系の add と set は UnsupportedOperationException。get と size は参照系で安全。",
      executionOrder: [
        "get/size は読み取り → 安全",
        "add/set は変更 → UnsupportedOperationException",
      ],
      whyOthersAreWrong: {
        A: "get は読み取りで例外なし。",
        C: "size は読み取りで例外なし。",
      },
      examPoint: "不変リストで例外になるのは変更系(add/remove/set/clear)。読み取り系は安全。",
      quickJudgePoint: "List.of に対し『中身を変える』操作だけが例外。",
      oneLineMemory: "List.ofはadd/set/removeで例外、get/sizeはOK。",
    },
  },
  {
    id: 35,
    targetTime: 150,
    difficulty: "long",
    tags: ["List", "Arrays.asList", "配列"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[] arr = {"a", "b", "c"};
        List<String> list = Arrays.asList(arr);
        list.set(0, "Z");
        System.out.println(arr[0]);
    }
}`,
    choices: [
      { label: "A", text: "a" },
      { label: "B", text: "Z" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時に UnsupportedOperationException" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "Arrays.asList は元の配列の『ビュー』。list.set は配列要素を書き換えるため arr[0] も \"Z\" になる。",
      executionOrder: ["asList(arr) は arr のビュー", "list.set(0,\"Z\") → arr[0] も変わる", "arr[0] → Z"],
      whyOthersAreWrong: {
        A: "set はビュー経由で配列に反映される。",
        C: "型は正しい。",
        D: "set は固定サイズリストでも可能(例外は add)。",
      },
      examPoint: "Arrays.asList は配列と連動。一方の set 変更が他方に反映される。",
      quickJudgePoint: "asList と元配列は連動。set の影響が双方向。",
      oneLineMemory: "Arrays.asListは配列のビュー(setが配列に反映)。",
    },
  },
  {
    id: 36,
    targetTime: 120,
    difficulty: "normal",
    tags: ["ArrayList", "コンストラクタ"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(5);
        System.out.println(list.size());
    }
}`,
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "0" },
      { label: "C", text: "[0, 0, 0, 0, 0]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "new ArrayList<>(5) の 5 は『初期容量(capacity)』であって要素数ではない。要素は0個なので size は 0。",
      executionOrder: ["引数5は内部配列の初期容量", "要素は未追加 → size 0"],
      whyOthersAreWrong: {
        A: "5 は容量。サイズではない。",
        C: "要素は自動で作られない。",
        D: "int 引数コンストラクタは存在する。",
      },
      examPoint: "ArrayList(int) は容量指定。size と capacity は別物。",
      quickJudgePoint: "new ArrayList<>(n) の n は容量。size は0。",
      oneLineMemory: "ArrayList(n)のnは容量、sizeは0。",
    },
  },
  {
    id: 37,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "remove", "オーバーロード"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(10, 20, 30));
        list.remove(1);
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[20, 30]" },
      { label: "B", text: "[10, 30]" },
      { label: "C", text: "[10, 20]" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason: "remove(1) は int 引数なので index1(=20)を削除 → [10, 30]。",
      executionOrder: ["remove(1) → index1(20)削除", "[10, 30]"],
      whyOthersAreWrong: {
        A: "削除されるのは index1 の 20。",
        C: "index1 は20。30は残る。",
        D: "index は範囲内。例外なし。",
      },
      examPoint: "List<Integer>.remove(int) はインデックス削除（値削除は Integer 引数）。",
      quickJudgePoint: "remove に裸の int → インデックス削除。",
      oneLineMemory: "remove(1)は添字1削除。",
    },
  },
  {
    id: 38,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "sort"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(3, 1, 2));
        list.sort(null);
        System.out.println(list);
    }
}`,
    choices: [
      { label: "A", text: "[1, 2, 3]" },
      { label: "B", text: "[3, 2, 1]" },
      { label: "C", text: "[3, 1, 2]" },
      { label: "D", text: "実行時に NullPointerException" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "List.sort(null) は『自然順序(natural ordering)』でソートする指定。Integer は Comparable なので昇順 [1,2,3]。",
      executionOrder: ["sort(null) → 自然順序", "Integer 昇順 → [1, 2, 3]"],
      whyOthersAreWrong: {
        B: "降順にするには Comparator が必要。",
        C: "ソートされる。",
        D: "null は『自然順序』を意味し、NPE にはならない。",
      },
      examPoint: "sort(null) は自然順序でソート。要素が Comparable でないと実行時例外。",
      quickJudgePoint: "sort(null) は昇順(自然順序)。NPEではない。",
      oneLineMemory: "sort(null)は自然順序ソート。",
    },
  },
  {
    id: 39,
    targetTime: 120,
    difficulty: "normal",
    tags: ["拡張for", "配列", "値渡し"],
    code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        int sum = 0;
        for (int n : nums) {
            n = n * 2;
            sum += n;
        }
        System.out.println(sum + " " + nums[0]);
    }
}`,
    choices: [
      { label: "A", text: "20 1" },
      { label: "B", text: "10 1" },
      { label: "C", text: "20 2" },
      { label: "D", text: "10 2" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "拡張for の変数 n は各要素のコピー。n=n*2 は配列を変えない。sum は 2+4+6+8=20、nums[0] は 1 のまま。",
      executionOrder: [
        "n は要素のコピー",
        "sum += n*2 → 2+4+6+8 = 20",
        "配列は不変 → nums[0]=1",
      ],
      whyOthersAreWrong: {
        B: "sum は doubled の合計で20。",
        C: "配列要素は変わらない。",
        D: "両方誤り。",
      },
      examPoint: "拡張for変数はコピー。代入しても元の配列/コレクションは変わらない。",
      quickJudgePoint: "for-each の変数を書き換えても元データは不変。",
      oneLineMemory: "拡張for変数はコピー、元配列は変わらない。",
    },
  },
  {
    id: 40,
    targetTime: 90,
    difficulty: "normal",
    tags: ["List", "List.of"],
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = List.of();
        System.out.println(list.size() + " " + list.isEmpty());
    }
}`,
    choices: [
      { label: "A", text: "0 true" },
      { label: "B", text: "0 false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "List.of() は空の不変リスト。size=0、isEmpty=true。",
      executionOrder: ["空リスト生成", "size 0, isEmpty true"],
      whyOthersAreWrong: {
        B: "空なので isEmpty は true。",
        C: "List.of() は引数なしでも有効。",
        D: "例外なし。",
      },
      examPoint: "List.of() は空の不変リストを返す（要素0でも有効）。",
      quickJudgePoint: "List.of() は空リスト。size0/isEmpty true。",
      oneLineMemory: "List.of()は空の不変リスト。",
    },
  },
];
