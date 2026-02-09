import { useEffect } from "react";

const useEscToClose = (isOpen, onClose) => {
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen, onClose]);
};

export default useEscToClose;
