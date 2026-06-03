import type { Question } from "../types";
import { set01 } from "./sets/set01";
import { set02 } from "./sets/set02";
import { set03 } from "./sets/set03";
import { set04 } from "./sets/set04";
import { set05 } from "./sets/set05";
import { set06 } from "./sets/set06";
import { set07 } from "./sets/set07";
import { set08 } from "./sets/set08";
import { set09 } from "./sets/set09";
import { set10 } from "./sets/set10";

// 全セットを結合した問題バンク（全200問）。
// 新しいセットを作ったら import して下の配列に並べるだけ。
export const questions: Question[] = [
  ...set01,
  ...set02,
  ...set03,
  ...set04,
  ...set05,
  ...set06,
  ...set07,
  ...set08,
  ...set09,
  ...set10,
];
