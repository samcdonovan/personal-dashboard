
declare module '*.css'; // allows for importing of CSS modules

type ClothingItem = {
    clothe: string,
    sum?: number
}

type Weather = {
    status: number,
    type: string,
    temp: number,
    location: string
}

type LoginData = {
    status: number,
    userId?: number,
    username?: string,
    profilePicture?: any,
    gallery?: Array<string>,
    tasks?: Array<string>
}