import { useEffect, useCallback } from "react";

const useHotkey = (key, callback, deps = []) => {
  const handleKeyPress = useCallback(
    (event) => {
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
