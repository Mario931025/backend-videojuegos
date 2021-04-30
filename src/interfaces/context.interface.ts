export interface IContext{
    req: IRequest;
    connection: Iconnection;
}

interface IRequest {
    headers:{
        authorization:string;
    }
}

interface Iconnection {
    authorization: string;
}