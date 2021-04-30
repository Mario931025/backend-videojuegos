import { SECRET_KEY, MESSAGES, EXPIRETIME } from './../config/constants';
import jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwt.interface';

class JWT {

    private secretKey = SECRET_KEY as string;

    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24){
        return jwt.sign(
            {user:data.user},
            this.secretKey,
            {
                expiresIn
            } //expira en 24 horas
        );
    }

    verify(token:string){
        try{
            return jwt.verify(token,this.secretKey);
        }catch(e){
            return MESSAGES.TOKEN_VERTICATION_FAILED;
        }
    }

    
}

export default JWT;