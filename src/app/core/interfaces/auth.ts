
export interface ILoginPayload {
    email: string,
    password: string
}

export interface IJWTPayload {
    refresh: string,
    access: string
}

export interface ISignupPayload {
    username: string,
    email: string,
    password: string
}

export interface ILoginStatus {
    isLoggedIn: boolean,
    accessToken: string
}