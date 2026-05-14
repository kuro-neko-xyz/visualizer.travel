import { useState } from "react";
import { storage } from "@/app/_layout";

const useLocalStorage = (key: string, initialValue?: unknown) => {
  const [value, setValue] = useState(() => {
    try {
      const item = storage.getString(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setLocalStorage = (newValue: unknown) => {
    if (typeof newValue === "function") {
      setValue((prevValue: unknown) => {
        const updatedValue = newValue(prevValue);
        storage.set(key, JSON.stringify(updatedValue));
        return updatedValue;
      });
    } else {
      setValue(newValue);
      storage.set(key, JSON.stringify(newValue));
    }
  };

  return [value, setLocalStorage];
};

export default useLocalStorage;
