// ToastContext.tsx
import React, {
  createContext, useState, useContext, ReactNode 
} from 'react';
import { Toast } from '@/components/CoreUI/Toast';
import { ColorVariantType, PositionType } from '@/utils/types';

interface ToastContextType {
  showToast: (message: string, type?: ColorVariantType, duration?: number, position?: PositionType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ColorVariantType | undefined;
    duration: number | undefined;
    position: PositionType | undefined;
    isVisible: boolean;
  } | null>(null);

  const showToast = (
    message: string,
    type?: ColorVariantType,
    duration = 3000,
    position?: PositionType
  ) => {
    setToast({
      message,
      type,
      duration,
      position,
      isVisible: true, // Show toast immediately
    });

    setTimeout(() => {
      setToast((prevToast) => {
        if (prevToast) {
          return {
            ...prevToast, isVisible: false 
          }; // Start hiding animation
        }
        return prevToast;
      });
    }, duration - 300); // Start hide animation 300ms before toast disappears

    // Set toast to null after the animation completes (300ms fade out duration)
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{
      showToast
    }}>
      {children}
      {toast && toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
        />
      )}
    </ToastContext.Provider>
  );
};
