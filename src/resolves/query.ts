
import { COLLECTIONS, EXPIRETIME, MESSAGES } from './../config/constants';

import { IResolvers } from 'graphql-tools';
import JWT from '../lib/jwt';
import bcrypt from 'bcrypt';

const resolversQuery: IResolvers = {

        Query: {
           async users(_, __, {db}){
                try{
                    return {
                        status: true,
                        message: 'Lista de usuarios cargada',
                        users: await db.collection(COLLECTIONS.USERS).
                        find().toArray()
                    };
                }catch(error){
                    console.log(error);
                    return {
                        status: false,
                        message: 'Lista de usuarios no cargargada',
                        users: []
                    };
                }
               
            },

            async login(_,{email, password},{db}) {
                try{
                    const user =  await db.collection(COLLECTIONS.USERS).
                    findOne({email})


                    if(user===null){
                        return {
                            status:false,
                            message: 'Usario no existe',
                            token: null
                        }
                    }

                    const passwordCheck = bcrypt.compareSync(password,user.password);




                    //PARA ELIMAR DATOS DEL DEL JWT
                    if(passwordCheck !== null){
                        delete user.password;
                        delete user.birthday;
                        delete user.registerDate;
                    }


                    return {
                        status: true,
                        message: !passwordCheck ?'Password o usuario no correctos' : 'Usuario Logeado correctamente ',
                        token:
                        !passwordCheck ?null : new JWT().sign({user},EXPIRETIME.D3)
                    };
                }catch(error){
                    console.log(error);
                    return {
                        status: false,
                        message: 'ERROR CARGAR LOGIIN',
                        token: null
                    };
                }
            },
            me(_,__,{token}){
                console.log(token);
                let info = new JWT().verify(token);
                if(info === MESSAGES.TOKEN_VERTICATION_FAILED){
                  return {
                      status:false,
                      message: info,
                      user:null
                  } ; 
                }
               return{
                   status:true,
                   message: "USUARIO AUTENTIFICADO",
                   user: Object.values(info)[0]
               }
            }
        }

};

export default resolversQuery;