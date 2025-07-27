
const databaseType = {
    userType: 'admin',
    typeData: 'dataLocal'
}

async function connectToDatabase(dataName){
    //logica
    console.log(`Conectado ao banco ${dataName}`)
}

async function disconnectToDatabase(){
    console.log('desconectando do banco')
}

export{
 connectToDatabase,
 disconnectToDatabase,
 databaseType,
} 
    

