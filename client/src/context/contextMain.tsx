
import { NotiContextProvider } from "./notificationContext";
import { ExerciseProvider } from "./exerciseContext";
import { RoutineProvider } from "./routineContext";

const ContextMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotiContextProvider>
      <ExerciseProvider>
        <RoutineProvider>{children}</RoutineProvider>
      </ExerciseProvider>
    </NotiContextProvider>
  );
}

export default ContextMain;
