import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import routineService from '../service/routineService';
import { Routine } from '../types';

interface RoutineContextType {
  routines: Routine[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const RoutineContext = createContext<RoutineContextType | null>(null);

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: routines, isLoading, error } = useQuery({
    queryKey: ['routines'],
    queryFn: routineService.getRoutine,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <RoutineContext.Provider value={{ routines, isLoading, error }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutines must be used within an RoutineProvider");
  }
  return context;
};