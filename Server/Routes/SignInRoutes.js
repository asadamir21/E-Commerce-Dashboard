
const {loginSchema} = require('./JoiSchema/entrySchema');
const jwt_util = require('../utils/jwt-utils');
const dbx = require('../db_utils/queryExecuter')

authEntryHelper = (LoginID, db, login=true, body=null) => {
    return new Promise ((resolve, reject) => {
        const user = dbx(`select LoginID, Password, JobTitle, MaritalStatus, HireDate, Gender, Name  from 
                        [HumanResources].[Employee], [HumanResources].[EmployeeDepartmentHistory], [HumanResources].[Department] 
                        where 
                        [HumanResources].[Employee].[BusinessEntityID] = [HumanResources].[EmployeeDepartmentHistory].[BusinessEntityID]
                        and
                        [HumanResources].[EmployeeDepartmentHistory].[DepartmentID] =  [HumanResources].[Department].[DepartmentID]
                        and EndDate is NULL
                        and
                        LoginID = '${body.User.UserID}' and Password = '${body.User.UserHashedPassword}'   
                        `
                        ,db)
        .then((data) => {
            if (data.rowCount > 0){
                const {LoginID, Password, JobTitle, MaritalStatus, HireDate, Gender, Name} = data.data[0];
                
                let sendingData = {
                    profile: {
                        LoginID, 
                        Password, 
                        JobTitle, 
                        MaritalStatus, 
                        HireDate, 
                        Gender, 
                        Name
                    },
                }
                resolve(sendingData)
            } 
            else {
                reject('The UserID and Password do not match');
            }
        })
        .catch(x => reject(`No account registered with the LoginID ${LoginID}`))
    })
}


module.exports = (app, db) => {

   
 

    app.post('/SignIn', (req, res) => {
        const validation = loginSchema.validate(req.body.User);
        if (validation.error !== null){
            res.status(400).send(validation.error.details[0].message);
        } 
        else {
            authEntryHelper(req.body.User.UserID, db, true, req.body)
            .then(x => {
                res.cookie('sessionToken', jwt_util.sign(x));
                res.send(null)
            })
            .catch(x => 
                res.status(400).send(x)
            )
        }        
    })

    app.get('/getMe', (req,res) => {
        // console.log(req.cookies.)
        const data = jwt_util.verify(req.cookies.sessionToken)
        console.log(data)
        res.send()
    })
}