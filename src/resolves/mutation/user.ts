import { findOneEelement } from './../../lib/db-operations';

import { COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { asignDocumentId } from '../../lib/db-operations';

const resolversUserMutation: IResolvers = {

        Mutation: {
          async  register(_, {user}, {db}){


                //comprueba si el usuario existe
                const userCheck = await findOneEelement(db,COLLECTIONS.USERS,{email: user.email})

                if(userCheck !==null){
                    return {
                        status:false,
                        message: `El email ${user.email} ya esta registrado`,
                        user:null
                    };
                }

                
                //comprueba el ultimo usuario para asignar ID

                user.id= await  asignDocumentId(db,COLLECTIONS.USERS,{registerDate: -1})

                //Asigna la fecha en formato ISO en propiedad registerDate
                user.registerDate = new Date().toISOString();

                //encripta el password
                user.password = bcrypt.hashSync(user.password,10);
                


                //Guarda el documento registro en la coleción

                return await db.collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () => {
                        return {
                            status:true,
                            message: `El usuario con el email ${user.email}  esta registrado correctamente`,
                            user
                        };
                       
                    }
                ).catch((err:Error)=>{
                    console.log(err.message);
                      return {
                        status:false,
                        message: `error inesperado, prueba de nuevo`,
                        user:null
                    };
                });

            }
        }

};

export default resolversUserMutation;