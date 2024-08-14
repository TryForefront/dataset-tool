import { useEffect, useCallback } from "react";

const useHotkey = (key: string, callback: Function, deps = []) => {
  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === key) {
        callback(event);
      }
    },
    [key, callback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, ...deps]);
};

export default useHotkey;
