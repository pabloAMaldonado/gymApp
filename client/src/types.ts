
export interface userCredentials {
    username: string,
    password: string
}

export interface newUser {
    username: string,
    password: string,
    name: string,
    email: string,
    dateBirth: string | null
}