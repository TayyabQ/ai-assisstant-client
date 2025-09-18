"use client";

import { FC } from "react";
import { Toast as ToastType } from "../hooks/useToast";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const Toast: FC<ToastProps> = ({ toast, onRemove }) => {
  const getToastStyles = (type: ToastType["type"]) => {
    const baseStyles =
      "mb-4 p-4 rounded-lg shadow-lg flex items-center justify-between transition-all duration-300 ease-in-out";

    switch (type) {
      case "success":
        return `${baseStyles} bg-green-100 border border-green-400 text-green-700`;
      case "error":
        return `${baseStyles} bg-red-100 border border-red-400 text-red-700`;
      case "warning":
        return `${baseStyles} bg-yellow-100 border border-yellow-400 text-yellow-700`;
      case "info":
        return `${baseStyles} bg-blue-100 border border-blue-400 text-blue-700`;
      default:
        return `${baseStyles} bg-gray-100 border border-gray-400 text-gray-700`;
    }
  };

  const getIcon = (type: ToastType["type"]) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "";
    }
  };

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{getIcon(toast.type)}</span>
        <span className="font-medium">{toast.message}</span>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 text-lg font-bold hover:opacity-70 transition-opacity"
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export const ToastContainer: FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Toast;
