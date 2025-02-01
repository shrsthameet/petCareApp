import React, { createContext, useContext, useState } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false,
  });

  const fadeAnim = new Animated.Value(0);

  const showToast = (message: string, type: ToastType = 'info', duration: number = 3000) => {
    setToast({
      message, type, visible: true 
    });
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToast((prev) => ({
        ...prev, visible: false 
      })));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{
      showToast 
    }}>
      {children}
      {toast.visible && (
        <Animated.View style={[styles.toastContainer, styles[toast.type], {
          opacity: fadeAnim 
        }]}> 
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
  info: {
    backgroundColor: '#2196F3',
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});