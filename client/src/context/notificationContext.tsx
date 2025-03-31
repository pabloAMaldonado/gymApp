import { useReducer, createContext, useContext, ReactNode, Dispatch } from 'react';

type NotificationAction =
  | { type: 'SET_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATION' };

const notiReducer = (state: string, action: NotificationAction): string => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

interface NotiContextType {
  noti: string;
  notiDispatch: Dispatch<NotificationAction>;
}

const NotiContext = createContext<NotiContextType | null>(null);

export const NotiContextProvider = ({ children }: { children: ReactNode }) => {
  const [noti, notiDispatch] = useReducer(notiReducer, '');

  return (
    <NotiContext.Provider value={{ noti, notiDispatch }}>
      {children}
    </NotiContext.Provider>
  );
};

export const setNotificationWithTimeout = (
  dispatch: Dispatch<NotificationAction>,
  message: string,
  time: number
) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message });

  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  }, time * 1000);
};

export const useNotiValue = () => {
  const context = useContext(NotiContext);
  if (!context) throw new Error('useNotiValue must be used within a NotiContextProvider');
  return context.noti;
};

export const useNotiDispatch = () => {
  const context = useContext(NotiContext);
  if (!context) throw new Error('useNotiDispatch must be used within a NotiContextProvider');
  return context.notiDispatch;
};

export default NotiContext;