import React from 'react';
import useEscape from '../../hooks/useEscape';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [type, setType] = React.useState('notice');
  const [message, setMessage] = React.useState('');
  const [toastStack, setToastStack] = React.useState([]);

  const ToastContextValue = {
    type,
    setType,
    message,
    setMessage,
    toastStack,
    setToastStack,
    addToast,
    dismissToast,
  };

  function addToast() {
    setToastStack([
      ...toastStack,
      {
        id: crypto.randomUUID(),
        message,
        type,
      },
    ]);
  }
  function dismissToast(id) {
    setToastStack(toastStack.filter((toast) => toast.id !== id));
  }
  const handleEscape = React.useCallback(() => {
    setToastStack([]);
  }, []);
  useEscape(handleEscape);
  return (
    <ToastContext.Provider value={ToastContextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
