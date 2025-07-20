const readline = require('readline')

//Atribuindo atributos conforme o personagem.
function assignAttributes(character, player) {
    switch (true) {
        case character === 1:
            player.NOME = "Mario"
            player.VELOCIDADE = 4
            player.MANOBRABILIDADE = 3
            player.PODER = 3
            break;

        case character === 2:
            player.NOME = "Luigi"
            player.VELOCIDADE = 3
            player.MANOBRABILIDADE = 4
            player.PODER = 4
            break;

        case character === 3:
            player.NOME = "Peach"
            player.VELOCIDADE = 3
            player.MANOBRABILIDADE = 4
            player.PODER = 2
            break;

        case character === 4:
            player.NOME = "Toad"
            player.VELOCIDADE = 1
            player.MANOBRABILIDADE = 1
            player.PODER = 1
            break;

        case character === 5:
            player.NOME = "Yoshi"
            player.VELOCIDADE = 2
            player.MANOBRABILIDADE = 4
            player.PODER = 3
            break;

        case character === 6:
            player.NOME = "Bowser"
            player.VELOCIDADE = 5
            player.MANOBRABILIDADE = 2
            player.PODER = 5
            break;

        case character === 7:
            player.NOME = "Donkey Kong"
            player.VELOCIDADE = 2
            player.MANOBRABILIDADE = 2
            player.PODER = 5
            break;

        default:
            console.log('Personagem Inválido!')


    }

}

//Rolando dados
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}


async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;

        case random < 0.66:
            result = 'CURVA'
            break;

        default:
            result = 'CONFRONTO'
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}


async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round}\n`)

        //Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(
                character1.NOME,
                'velocidade',
                diceResult1,
                character1.VELOCIDADE
            )

            await logRollResult(
                character2.NOME,
                'velocidade',
                diceResult2,
                character2.VELOCIDADE
            )


        } if (block === 'CURVA') {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(
                character1.NOME,
                'manobrabilidade',
                diceResult1,
                character1.MANOBRABILIDADE
            )

            await logRollResult(
                character2.NOME,
                'manobrabilidade',
                diceResult2,
                character2.MANOBRABILIDADE
            )

        } if (block === 'CONFRONTO') {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`);

            await logRollResult(
                character1.NOME,
                'poder',
                diceResult1,
                character1.PODER
            )

            await logRollResult(
                character2.NOME,
                'poder',
                diceResult2,
                character2.PODER
            )

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto 🐢 `)
                character2.PONTOS--
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto 🐢 `)
                character1.PONTOS--
            }
            console.log(powerResult2 === powerResult1
                ? 'Confronto empatado! Nenhum ponto foi perdido'
                : '')
        }
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++

        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++
        }

        console.log('\n--------------------------------------')

    }

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`)

    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`)

    } else {
        console.log('A corrida terminou em empate!')
    }
}

async function askQuestion(query) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans)
    }))

}

//Função autoinvocavel
(async function main() {
    const player1 = {
        NOME: "",
        VELOCIDADE: 0,
        MANOBRABILIDADE: 0,
        PODER: 0,
        PONTOS: 0
    }

    const player2 = {
        NOME: "",
        VELOCIDADE: 0,
        MANOBRABILIDADE: 0,
        PODER: 0,
        PONTOS: 0
    }

    console.log('Personagens: \n (1) Mario \n (2) Luigi\n (3) Peach\n (4) Toad\n (5) Yoshi\n (6) Bowser\n (7) Donkey Kong\n')

    let character1 = parseInt(await askQuestion('Player 1 escolha seu personagem: '))
    assignAttributes(character1, player1)
    let character2 = parseInt(await askQuestion('Player 1 escolha seu personagem: '))
    assignAttributes(character2, player2)


    if (!Number.isNaN(character1) && !Number.isNaN(character2)) {
        console.log(`🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando.....\n`)

        //await espera você executar antes de fazer outra coisa
        await playRaceEngine(player1, player2)
        await declareWinner(player1, player2)

    } else {
        console.log('\nNão foi possivel iniciar uma partida!\n')   
    }

})()
