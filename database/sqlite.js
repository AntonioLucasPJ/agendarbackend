import sqlite3 from 'sqlite3'
const SQLite3 = sqlite3.verbose();


function query(command,params,method='all'){
    return new Promise(function(resolve,reject){
        db[method](command,params,function (error,result){
            if(error){
                reject(error)
            }else {
                resolve(result)
            }
        })
    })
}
const db = new SQLite3.Database("./database/banco.db",SQLite3.OPEN_READWRITE,(error)=>{
    if(error){
        return console.log('Erro ao conectar com o banco',error )
    }
})
export {db,query}