export interface UserTypes {
    user: {
        id: string,
        username: string,
        email: string
    },
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}