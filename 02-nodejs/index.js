/* 
Obter o número do usuário
Preciso obter o número do usuário a partir do seu ID
Obter o endereço do usuário pelo seu ID.
*/

//importamos um módulo interno do node.js 

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando sucesso -> RESOLV 
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('Deu ruim de verdade!'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000); //vai esperar 1000ms para retornar o valor
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise (resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    
        setTimeout(() => {
            return callback(null, {
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000); 
}

//1 Add a palavra async -> automaticamente ela retornará uma promise
main()
async function main() {
    try {
        console.time('medida-promse')
        const usuario = await obterUsuario()
      //  const telefone = await obterTelefone(usuario.id)
      //  const endereco = await obterEnderecoAsync(usuario.id)
      const resultado = await Promise.all([
        obterTelefone(usuario.id),
        obterEnderecoAsync(usuario.id)
      ])

      const endereco = resultado [1]
      const telefone = resultado [0]

        console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone},
        Endereco: ${endereco.rua}, ${endereco.numero}
        
        `)
        console.timeEnd('medida-promse') //para capturar o tempo de execução
    }
    catch (error) {
        console.error('Deu ruim', error)
    }
}

/*
const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a função .then
//para manipular erros, usamos o .catch

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                }, 
                
                telefone: result
            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })

    .then(function(resultado){
        console.log(`
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function(error) {
        console.error('Deu ruim', error)
    })
*/
 /*
obterUsuario(function resolverUsuario(error, usuario) {

    // tudo que for null || "" || 0 === false

    if(error) {
        console.error('Deu ruim em usuário', error)
        return;
    }

    obterTelefone( usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em telefone', error)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('Deu ruim em endereço', error)
                return;
            } 
            console.log(`
            Nome: ${usuario.nome},
            Endereco; ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
});
*/
//const telefone = obterTelefone(usuario.id);

//console.log('telefone', telefone)