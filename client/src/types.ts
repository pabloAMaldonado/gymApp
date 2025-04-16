
export interface userCredentials {
    username: string,
    password: string
}

export interface userCredentialsRegistration {
    username: string,
    password: string,
    email: string,
}

interface Comment {
    type: string;
    createdAt: Date; 
    commentBy: string;
}
  
export interface Exercise {
    _id?: string;
    name: string;
    type: string;
    muscle: string;
    example: string;
    description?: string;
    comments?: Comment[];
    approvedBy?: string;
}

interface RoutineExercise {
  exercise: string;
  sets?: number;
  reps?: number;
}

interface RoutineDay {
  exercises: RoutineExercise[];
}

export interface Routine {
  _id?: string;
  distribution: string;
  description?: string;
  privacy: string;
  createdBy?: string;
  days: {
    monday?: RoutineDay;
    tuesday?: RoutineDay;
    wednesday?: RoutineDay;
    thursday?: RoutineDay;
    friday?: RoutineDay;
    saturday?: RoutineDay;
    sunday?: RoutineDay;
  };
}