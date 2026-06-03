import { useCallback, useEffect, useState } from "react";

// localStorage と同期する汎用フック。
// 値は JSON で保存される。第2戻り値で更新できる。
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next =
          typeof value === "function"
            ? (value as (p: T) => T)(prev)
            : value;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // 保存失敗(プライベートモード等)は無視
    }
  }, [key, stored]);

  return [stored, setValue];
}
