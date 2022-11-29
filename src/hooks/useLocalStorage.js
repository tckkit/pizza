import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    return initialValue;
  });

  const setToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    setToLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
