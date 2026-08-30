import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast--${toast.type}`}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: toast.type === 'error' ? '#ef4444' : toast.type === 'success' ? '#22c55e' : toast.type === 'warning' ? '#f97316' : '#00f2fe',
              color: '#030712',
              fontWeight: 600,
              fontSize: '13px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: '220px'
            }}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#030712', marginLeft: 12, cursor: 'pointer', fontWeight: 800 }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: () => {}, removeToast: () => {} };
  }
  return context;
}
