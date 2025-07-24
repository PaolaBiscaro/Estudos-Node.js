//Todas as funções de Produto

async function getFullName(codId, productName) {
    console.log(codId + ' - ' + productName)
}

async function getProductLabel(productName){
    console.log(`Product ${productName}`)
}

module.exports = {
    getFullName,
    getProductLabel,
}


