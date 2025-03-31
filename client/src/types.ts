
export interface userCredentials {
    username: string,
    password: string
}

export interface userCredentialsRegistration {
    username: string,
    password: string,
    name: string,
    email: string,
    dateBirth?: string
}

interface Comment {
    type: string;
    createdAt: Date; 
    commentBy: string;
}
  
export interface Exercise {
    name: string;
    type: string;
    muscle: string;
    example: string;
    description?: string;
    comments?: Comment[];
    approvedBy?: string;
}