import enviroment from './environments';

if(process.env.NODE_ENV !== 'production') {
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || 'games99';


export enum COLLECTIONS{

    USERS = 'users'
}

export enum MESSAGES {
    TOKEN_VERTICATION_FAILED = 'token no valido, inicia sesión de nuevo'
}

export enum EXPIRETIME{
    H1 = 60*60,
    H24 = 24*H1,
    M15= H1/4,
    M20 = H1/3,
    D3= H24 * 3

}
