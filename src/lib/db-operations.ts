import {Db} from 'mongodb';

/**
 * 
 * @param database //BD
 * @param collection //Collñecion donde queremos buscar ultimo elemento
 * @param sort //como ordenamos
 * @returns 
 */

export const asignDocumentId= async(
    database: Db,
    collection: string,
    sort: object = { registerDate: -1}
) =>{
    const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();

if(lastElement.length===0){
    return 1;
} return lastElement[0].id +1;
}

////////////////////// encuentra un elemento
export const findOneEelement = async(
    database: Db,
    collection: string,
    filter: object
)=>{
    return database
    .collection(collection)
    .findOne(filter)
}


export const insertOneElement = async(
    database: Db,
    collection: string,
    document: object
)=>{
    return await database.collection(collection).insertOne(document);
}


export const insertManyElement = async(
    database: Db,
    collection: string,
    documents: Array<object>
)=>{
    return await database.collection(collection).insertOne(documents);
}



export const findEelements = async (
    database: Db,
    collection: string,
    filter: object = {}  //si no llega nada, es opcional
) => {
    return await database.collection(collection).find(filter).toArray();
}

