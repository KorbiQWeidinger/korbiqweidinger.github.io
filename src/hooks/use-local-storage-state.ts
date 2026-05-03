import { useEffect, useState } from 'react';

type StoredValueGuard<T> = (value: unknown) => value is T;

export function useLocalStorageState<T>(
  storageKey: string,
  defaultValue: T,
  isStoredValue?: StoredValueGuard<T>
) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null) {
      return defaultValue;
    }

    try {
      const parsedValue = JSON.parse(storedValue) as unknown;

      if (isStoredValue && !isStoredValue(parsedValue)) {
        return defaultValue;
      }

      return parsedValue as T;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue] as const;
}
