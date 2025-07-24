
const products = require('./services/products')
const config = require('./services/config')
const { connectToDatabase } = require('./services/database')

async function main(){
    products.getFullName('256', 'Mousepad')
    products.getProductLabel('Teclado')

    console.log(config.production)

    connectToDatabase('Teste')
    
}

main()


