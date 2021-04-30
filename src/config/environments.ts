import dotenv from 'dotenv';

const enviroment = dotenv.config(
    {
         path: './src/.env'
    }
);

if(process.env.NODE_ENV !== 'production'){

    if(enviroment) {
        console.log(enviroment.error) 
    }
}

export default enviroment;

