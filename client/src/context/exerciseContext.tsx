import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import exerciseService from '../service/exerciseService';
import { Exercise } from '../types';

interface ExerciseContextType {
  exercises: Exercise[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: exercises, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: exerciseService.getExercises,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <ExerciseContext.Provider value={{ exercises, isLoading, error }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercises must be used within an ExerciseProvider");
  }
  return context;
};