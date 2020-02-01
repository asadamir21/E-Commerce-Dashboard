const {Request} = require('tedious');

// module.exports = (query, db) => {
//     return new Promise((resolve, reject) => {
//         const result = {data: []};
//         let count = 0;
//         const request = new Request(query, (err) => {
//             if (err){
//                 reject(err)
//             }
//         });
//         request.on('row', (columns) => {
//             let newData = {}
//             columns.forEach((column) => {
//                 // if (typeof column.value != 'number') {
//                     newData = {...newData, [column.metadata.colName]: column.value}
//                 // } else if(typeof column.value != 'string'){
//                 //     //newData = {...newData, [column.metadata.colName]: column.value}
//                 // }
//                 // else{
//                 // }
//                 // if (typeof column.value === 'object'){
//                 //     console.log(Object.keys(column.value))
//                 // }
//             })
//             delete newData.num;
//             result.data.push(newData)
//             count++;
//         })
//         request.on('done', (rowCount, more) => { 
//             result.rowCount = rowCount;
//             resolve(result)
//         }); 
//         //request.on('requestCompleted', ) 
//         db.execSqlBatch(request);  
//     })
// }



module.exports = (query, db) => {
    return new Promise((resolve, reject) => {
        const result = {data: []};
        let count = 0;

        db.acquire((err, connection) => {
    
            const request = new Request(query, (err,rowCount) => {
                if (err){
                    reject(err)
                }
                connection.release()
            });
            
            request.on('row', (columns) => {
                let newData = {}
                columns.forEach((column) => {
                    // if (typeof column.value != 'number') {
                        newData = {...newData, [column.metadata.colName]: column.value}
                    // } else if(typeof column.value != 'string'){
                    //     //newData = {...newData, [column.metadata.colName]: column.value}
                    // }
                    // else{
                    // }
                    // if (typeof column.value === 'object'){
                    //     console.log(Object.keys(column.value))
                    // }
                })
                delete newData.num;
                result.data.push(newData)
                count++;
            })

            request.on('done', (rowCount, more) => { 
                result.rowCount = rowCount;
                resolve(result)
            }); 
            //request.on('requestCompleted', ) 
            connection.execSqlBatch(request);  


        })

    })
}
