import type { Question } from "../../types";

// 第9セット（id 161-180）: String / StringBuilder / 配列
export const set09: Question[] = [
  {
    id: 161,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "不変性"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        s.toUpperCase();
        System.out.println(s);
    }
}`,
    choices: [
      { label: "A", text: "HELLO" },
      { label: "B", text: "hello" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "String は不変。toUpperCase() は新しい文字列を返すだけで s 自身は変わらない。戻り値を捨てているので s は \"hello\" のまま。",
      executionOrder: ["toUpperCase() は新String \"HELLO\" を返す", "戻り値は未代入で破棄", "s は \"hello\""],
      whyOthersAreWrong: {
        A: "戻り値を s に代入していないため変化しない。",
        C: "合法。",
        D: "例外なし。",
      },
      examPoint: "String の変換系メソッドは新しい文字列を返す。元は不変。戻り値を受けないと無意味。",
      quickJudgePoint: "String のメソッド結果を代入していなければ元は不変。",
      oneLineMemory: "Stringは不変、メソッドは新Stringを返す。",
    },
  },
  {
    id: 162,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "不変性", "参照"],
    code: `public class Main {
    public static void main(String[] args) {
        String a = "x";
        String b = a;
        a += "y";
        System.out.println(a + " " + b);
    }
}`,
    choices: [
      { label: "A", text: "xy x" },
      { label: "B", text: "xy xy" },
      { label: "C", text: "x x" },
      { label: "D", text: "xy y" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "a += \"y\" は新しい文字列 \"xy\" を作って a に再代入するだけ。b は元の \"x\" を指したまま。",
      executionOrder: ["b=a → 両方 \"x\"", "a += \"y\" → a は新\"xy\"、b は \"x\" のまま"],
      whyOthersAreWrong: {
        B: "String は不変なので b は変わらない。",
        C: "a は \"xy\" になる。",
        D: "b は元の \"x\"。",
      },
      examPoint: "String の += は新オブジェクト生成＋再代入。他の参照は影響を受けない。",
      quickJudgePoint: "String の変更は元の参照に波及しない。",
      oneLineMemory: "String += は新規生成、別参照は不変。",
    },
  },
  {
    id: 163,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "substring"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "abcdef";
        System.out.println(s.substring(2, 4));
    }
}`,
    choices: [
      { label: "A", text: "cd" },
      { label: "B", text: "cde" },
      { label: "C", text: "bc" },
      { label: "D", text: "bcd" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "substring(2,4) は『インデックス2以上4未満』。index2='c'、index3='d' で \"cd\"。終端は含まない。",
      executionOrder: ["beginIndex=2(含む), endIndex=4(含まない)", "index2,3 → \"cd\""],
      whyOthersAreWrong: {
        B: "index4 は含まれない。",
        C: "開始は index2(c)。",
        D: "開始位置が違う。",
      },
      examPoint: "substring(begin, end) は begin以上end未満。長さは end-begin。",
      quickJudgePoint: "substring の end は『含まない』。",
      oneLineMemory: "substring(b,e)はb含みe含まず。",
    },
  },
  {
    id: 164,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "substring", "例外"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "abc";
        System.out.println(s.substring(5));
    }
}`,
    choices: [
      { label: "A", text: "空文字列" },
      { label: "B", text: "実行時に StringIndexOutOfBoundsException" },
      { label: "C", text: "abc" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "\"abc\" の長さは3。substring(5) は範囲外(0〜3が有効)なので実行時に StringIndexOutOfBoundsException。",
      executionOrder: ["length=3", "substring(5) は範囲外", "StringIndexOutOfBoundsException"],
      whyOthersAreWrong: {
        A: "範囲外は空文字でなく例外。substring(3) なら空文字。",
        C: "範囲外で例外。",
        D: "実行時に検出される。",
      },
      examPoint: "substring の開始位置が length を超えると例外。length ちょうどなら空文字。",
      quickJudgePoint: "substring の引数が length 超えなら例外。",
      oneLineMemory: "substringの範囲外はStringIndexOutOfBounds。",
    },
  },
  {
    id: 165,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "charAt"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "Java";
        System.out.println(s.charAt(1));
    }
}`,
    choices: [
      { label: "A", text: "a" },
      { label: "B", text: "J" },
      { label: "C", text: "v" },
      { label: "D", text: "97" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason: "charAt(1) は index1 の文字。\"Java\" の index1 は 'a'。",
      executionOrder: ["index0='J', index1='a'", "charAt(1) → 'a'"],
      whyOthersAreWrong: {
        B: "index0 が 'J'。",
        C: "index2 が 'v'。",
        D: "char として 'a' が出力され、数値ではない。",
      },
      examPoint: "charAt(i) は0始まりのindex位置の char を返す。",
      quickJudgePoint: "charAt は0始まり、char をそのまま表示。",
      oneLineMemory: "charAt(1)は2文字目のchar。",
    },
  },
  {
    id: 166,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "==", "equals"],
    code: `public class Main {
    public static void main(String[] args) {
        String a = new String("hi");
        String b = new String("hi");
        System.out.println((a == b) + " " + a.equals(b));
    }
}`,
    choices: [
      { label: "A", text: "false true" },
      { label: "B", text: "true true" },
      { label: "C", text: "false false" },
      { label: "D", text: "true false" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "new String はそれぞれ別オブジェクト → a==b は false。String の equals は内容比較 → a.equals(b) は true。",
      executionOrder: ["new String 2つ → 別参照", "a==b → false", "equals は内容 → true"],
      whyOthersAreWrong: {
        B: "new で生成すると == は false。",
        C: "equals は内容比較で true。",
        D: "equals は true。",
      },
      examPoint: "new String は必ず別オブジェクト(==false)。内容比較は equals。",
      quickJudgePoint: "new String なら == false、equals true。",
      oneLineMemory: "new Stringは==false、equalsは内容でtrue。",
    },
  },
  {
    id: 167,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "replace", "不変性"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "banana";
        String r = s.replace('a', 'o');
        System.out.println(s + " " + r);
    }
}`,
    choices: [
      { label: "A", text: "banana bonono" },
      { label: "B", text: "bonono bonono" },
      { label: "C", text: "banana banana" },
      { label: "D", text: "bonono banana" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "replace は新しい文字列を返し、元 s は不変。s=\"banana\"、r は a→o 置換で \"bonono\"。",
      executionOrder: ["s は不変 → \"banana\"", "replace の結果 r → \"bonono\""],
      whyOthersAreWrong: {
        B: "s は変わらない。",
        C: "r は置換後。",
        D: "s と r が逆。",
      },
      examPoint: "replace も新文字列を返す(元は不変)。全ての該当文字を置換。",
      quickJudgePoint: "replace の結果は戻り値に。元 String は不変。",
      oneLineMemory: "replaceは新String、元は不変。",
    },
  },
  {
    id: 168,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "length", "indexOf"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        System.out.println(s.length() + s.indexOf('l'));
    }
}`,
    choices: [
      { label: "A", text: "7" },
      { label: "B", text: "52" },
      { label: "C", text: "8" },
      { label: "D", text: "5l2" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "length()=5、indexOf('l')=2(最初のlのindex)。どちらも int なので加算され 7。",
      executionOrder: ["length()=5", "indexOf('l')=2", "5+2=7(数値加算)"],
      whyOthersAreWrong: {
        B: "両方 int の加算であって文字列連結ではない。",
        C: "indexOf は2(0始まり)。",
        D: "数値同士の + は加算。",
      },
      examPoint: "int + int は数値加算。文字列が絡まなければ連結にならない。",
      quickJudgePoint: "両辺が数値なら + は加算。",
      oneLineMemory: "int+intは加算(連結でない)。",
    },
  },
  {
    id: 169,
    targetTime: 120,
    difficulty: "long",
    tags: ["StringBuilder", "equals"],
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("x");
        StringBuilder b = new StringBuilder("x");
        System.out.println(a.equals(b));
    }
}`,
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "x" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "StringBuilder は equals をオーバーライドしていない。よって Object.equals(参照比較)が使われ、別オブジェクトなので false。",
      executionOrder: ["StringBuilder は equals 未オーバーライド", "参照比較 → 別物 → false"],
      whyOthersAreWrong: {
        A: "内容比較されない。",
        C: "合法。",
        D: "boolean が出力される。",
      },
      examPoint: "StringBuilder の equals は内容比較しない(参照比較)。内容比較は toString().equals() を使う。",
      quickJudgePoint: "StringBuilder の equals は中身を見ない(false になりがち)。",
      oneLineMemory: "StringBuilder.equalsは参照比較(中身を見ない)。",
    },
  },
  {
    id: 170,
    targetTime: 90,
    difficulty: "normal",
    tags: ["StringBuilder", "toString", "equals"],
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("x");
        StringBuilder b = new StringBuilder("x");
        System.out.println(a.toString().equals(b.toString()));
    }
}`,
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "x" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "toString() で String に変換し、String の equals(内容比較)で比較するため、同じ内容 \"x\" は true。",
      executionOrder: ["toString() → String \"x\"", "String.equals は内容比較 → true"],
      whyOthersAreWrong: {
        B: "String の equals は内容で true。",
        C: "合法。",
        D: "boolean が出力される。",
      },
      examPoint: "StringBuilder の内容比較は toString().equals() を使う。",
      quickJudgePoint: "中身を比べたいなら toString() してから equals。",
      oneLineMemory: "SBの内容比較はtoString().equals()。",
    },
  },
  {
    id: 171,
    targetTime: 120,
    difficulty: "normal",
    tags: ["StringBuilder", "delete", "insert"],
    code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("abcdef");
        sb.delete(1, 3);
        sb.insert(1, "XY");
        System.out.println(sb);
    }
}`,
    choices: [
      { label: "A", text: "aXYdef" },
      { label: "B", text: "aXYbcdef" },
      { label: "C", text: "XYadef" },
      { label: "D", text: "aXYcdef" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "delete(1,3) は index1〜2('b','c')を削除し \"adef\"。insert(1,\"XY\") で index1 に挿入 → \"aXYdef\"。",
      executionOrder: ["\"abcdef\"", "delete(1,3) → \"adef\"", "insert(1,\"XY\") → \"aXYdef\""],
      whyOthersAreWrong: {
        B: "delete で b,c が消えている。",
        C: "挿入位置は index1(a の後)。",
        D: "delete で c も消える(1,3 は index1,2)。",
      },
      examPoint: "delete(start,end) は start以上end未満を削除。insert(index, s) はその位置に挿入。",
      quickJudgePoint: "delete も end は含まない。insert は指定indexに割り込む。",
      oneLineMemory: "delete(s,e)はe含まず、insert(i,x)はi位置に挿入。",
    },
  },
  {
    id: 172,
    targetTime: 120,
    difficulty: "normal",
    tags: ["String", "演算子", "連結"],
    prompt: "次のコードの2行の出力として正しいものを選べ。",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Result: " + 1 + 2);
        System.out.println(1 + 2 + " Result");
    }
}`,
    choices: [
      { label: "A", text: "Result: 12 / 3 Result" },
      { label: "B", text: "Result: 3 / 3 Result" },
      { label: "C", text: "Result: 12 / 12 Result" },
      { label: "D", text: "Result: 3 / 12 Result" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "+ は左から評価。1行目は \"Result: \"+1=\"Result: 1\" さらに +2=\"Result: 12\"。2行目は 1+2=3(数値)さらに +\" Result\"=\"3 Result\"。",
      executionOrder: [
        "1行目: 文字列が先頭 → 以降すべて連結 → \"Result: 12\"",
        "2行目: 1+2 は数値加算=3 → \"3 Result\"",
      ],
      whyOthersAreWrong: {
        B: "1行目は文字列連結なので 12。",
        C: "2行目は先に 1+2=3。",
        D: "両方とも逆。",
      },
      examPoint: "+ は左結合。文字列が登場した時点以降はすべて連結になる。",
      quickJudgePoint: "左から評価。文字列が出るまでは数値加算、出たら連結。",
      oneLineMemory: "+は左から、文字列が出たら以降は連結。",
    },
  },
  {
    id: 173,
    targetTime: 90,
    difficulty: "normal",
    tags: ["char", "型変換", "演算子"],
    code: `public class Main {
    public static void main(String[] args) {
        char c = 'A';
        System.out.println(c + 1);
    }
}`,
    choices: [
      { label: "A", text: "66" },
      { label: "B", text: "B" },
      { label: "C", text: "A1" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "char と int の算術演算では char が int に昇格する。'A' は65なので 65+1=66(int)。char ではなく int として出力。",
      executionOrder: ["'A' → int 65", "65 + 1 = 66", "int として出力 → 66"],
      whyOthersAreWrong: {
        B: "(char)(c+1) とキャストすれば 'B' だが、ここでは int のまま。",
        C: "+ は数値演算(連結ではない)。",
        D: "char+int は合法。",
      },
      examPoint: "char は算術演算で int に昇格。結果は数値。文字に戻すには (char) キャストが必要。",
      quickJudgePoint: "char + int は int(数値)になる。",
      oneLineMemory: "char+intはint(数値)になる。",
    },
  },
  {
    id: 174,
    targetTime: 90,
    difficulty: "normal",
    tags: ["配列", "既定値"],
    code: `public class Main {
    public static void main(String[] args) {
        boolean[] b = new boolean[3];
        String[] s = new String[2];
        System.out.println(b[0] + " " + s[0]);
    }
}`,
    choices: [
      { label: "A", text: "false null" },
      { label: "B", text: "true null" },
      { label: "C", text: "false " },
      { label: "D", text: "0 null" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "配列要素は既定値で初期化される。boolean は false、参照型(String)は null。",
      executionOrder: ["boolean[] の要素 → false", "String[] の要素 → null"],
      whyOthersAreWrong: {
        B: "boolean の既定値は false。",
        C: "s[0] は null と出力される。",
        D: "boolean は 0 でなく false。",
      },
      examPoint: "配列は new した時点で全要素が既定値(数値0/boolean false/参照null)。",
      quickJudgePoint: "new した配列の要素は既定値で埋まる。",
      oneLineMemory: "配列要素の既定値: boolean false, 参照 null。",
    },
  },
  {
    id: 175,
    targetTime: 90,
    difficulty: "normal",
    tags: ["配列", "length"],
    code: `public class Main {
    public static void main(String[] args) {
        int[] a = {10, 20, 30};
        System.out.println(a[a.length - 1]);
    }
}`,
    choices: [
      { label: "A", text: "30" },
      { label: "B", text: "20" },
      { label: "C", text: "3" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "length は3。最後の要素のindexは length-1=2。a[2]=30。",
      executionOrder: ["a.length=3", "a[3-1]=a[2]", "30"],
      whyOthersAreWrong: {
        B: "a[1]=20。最後は a[2]。",
        C: "length は3だが、参照しているのは a[2]。",
        D: "index2 は範囲内。",
      },
      examPoint: "最後の要素は a[length-1]。length そのものは範囲外indexになる。",
      quickJudgePoint: "末尾は length-1。a[length] は例外。",
      oneLineMemory: "末尾要素はa[length-1]。",
    },
  },
  {
    id: 176,
    targetTime: 90,
    difficulty: "normal",
    tags: ["配列", "例外"],
    code: `public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        System.out.println(a[3]);
    }
}`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "実行時に ArrayIndexOutOfBoundsException" },
      { label: "C", text: "3" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "有効なindexは0〜2。a[3] は範囲外で実行時に ArrayIndexOutOfBoundsException。",
      executionOrder: ["length=3、有効index 0〜2", "a[3] は範囲外", "ArrayIndexOutOfBoundsException"],
      whyOthersAreWrong: {
        A: "範囲外は0でなく例外。",
        C: "index3 に要素は無い。",
        D: "実行時に検出される。",
      },
      examPoint: "配列の範囲外アクセスは ArrayIndexOutOfBoundsException(実行時)。",
      quickJudgePoint: "index が length 以上なら実行時例外。",
      oneLineMemory: "配列範囲外はArrayIndexOutOfBoundsException。",
    },
  },
  {
    id: 177,
    targetTime: 90,
    difficulty: "normal",
    tags: ["配列", "多次元配列", "拡張for"],
    code: `public class Main {
    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int sum = 0;
        for (int[] row : a)
            for (int v : row)
                sum += v;
        System.out.println(sum);
    }
}`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "7" },
      { label: "C", text: "4" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "二重拡張forで全要素を加算。1+2+3+4=10。外側は int[](行)、内側は int(要素)。",
      executionOrder: ["row={1,2}: 1+2", "row={3,4}: 3+4", "合計 10"],
      whyOthersAreWrong: {
        B: "全要素の和は10。",
        C: "要素数ではなく和。",
        D: "2次元の拡張forは合法。",
      },
      examPoint: "2次元配列の拡張forは『外側=配列(行)、内側=要素』の二重ループ。",
      quickJudgePoint: "2次元は for(int[] row: a) の中で for(int v: row)。",
      oneLineMemory: "2次元拡張forは行(int[])→要素(int)の二重。",
    },
  },
  {
    id: 178,
    targetTime: 150,
    difficulty: "long",
    tags: ["配列", "共変性", "例外"],
    code: `public class Main {
    public static void main(String[] args) {
        Object[] arr = new String[2];
        arr[0] = 42;
        System.out.println(arr[0]);
    }
}`,
    choices: [
      { label: "A", text: "42" },
      { label: "B", text: "実行時に ArrayStoreException" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "null" },
    ],
    correctAnswers: ["B"],
    explanation: {
      reason:
        "配列は共変(String[] を Object[] として扱える)。コンパイルは通るが、実体は String[] なので Integer(42)を格納しようとすると実行時に ArrayStoreException。",
      executionOrder: ["arr の実体は String[]", "arr[0]=42(Integer) を格納", "型不一致 → ArrayStoreException"],
      whyOthersAreWrong: {
        A: "格納時に例外で止まる。",
        C: "Object[] 参照への代入はコンパイル上は許される。",
        D: "格納に失敗して例外。",
      },
      examPoint: "配列は共変。互換でない要素を格納すると実行時に ArrayStoreException(ジェネリクスとの違い)。",
      quickJudgePoint: "Object[]=String[] に異種を入れると実行時 ArrayStoreException。",
      oneLineMemory: "配列共変＋異種格納はArrayStoreException。",
    },
  },
  {
    id: 179,
    targetTime: 90,
    difficulty: "normal",
    tags: ["String", "concat", "不変性"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "a";
        s.concat("b");
        System.out.println(s);
    }
}`,
    choices: [
      { label: "A", text: "a" },
      { label: "B", text: "ab" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "concat も新しい文字列を返すだけで s は不変。戻り値を受けていないので s は \"a\" のまま。",
      executionOrder: ["concat(\"b\") は新String \"ab\" を返す", "戻り値は破棄", "s は \"a\""],
      whyOthersAreWrong: {
        B: "戻り値を代入していないので連結結果は反映されない。",
        C: "合法。",
        D: "例外なし。",
      },
      examPoint: "concat も不変メソッド。s = s.concat(\"b\") としないと結果が残らない。",
      quickJudgePoint: "String メソッドは結果を代入しないと無意味。",
      oneLineMemory: "concatは新Stringを返す、元は不変。",
    },
  },
  {
    id: 180,
    targetTime: 90,
    difficulty: "normal",
    tags: ["配列", "多次元配列"],
    code: `public class Main {
    public static void main(String[] args) {
        int[][] a = new int[2][3];
        System.out.println(a.length + " " + a[0].length + " " + a[1][2]);
    }
}`,
    choices: [
      { label: "A", text: "2 3 0" },
      { label: "B", text: "3 2 0" },
      { label: "C", text: "2 3 null" },
      { label: "D", text: "実行時例外" },
    ],
    correctAnswers: ["A"],
    explanation: {
      reason:
        "new int[2][3] は完全に確保される。a.length=2(行)、a[0].length=3(列)、a[1][2] は既定値0。",
      executionOrder: ["外側2・内側3で完全確保", "a.length=2", "a[0].length=3", "a[1][2]=0(既定値)"],
      whyOthersAreWrong: {
        B: "a.length は行数2。",
        C: "int 要素の既定値は0(nullではない)。",
        D: "範囲内アクセス。",
      },
      examPoint: "new int[2][3] は両次元確保。int 要素は既定値0(ジャグ配列 new int[2][] とは違う)。",
      quickJudgePoint: "[2][3] は全要素0で確保、[2][] は内側null。",
      oneLineMemory: "new int[2][3]は全要素0で完全確保。",
    },
  },
];
