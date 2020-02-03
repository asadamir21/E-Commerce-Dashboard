const dbx = require('../db_utils/queryExecuter')

module.exports = (app, db) => {
    app.post('/SignIn', (req, res) => {
        console.log('Post')
        console.log(req.body)
        console.log(req.query.UserID)
        console.log(req.query.Password)

        dbx(`select LoginID, Password, JobTitle, MaritalStatus, HireDate, Gender, Name  from 
            [HumanResources].[Employee], [HumanResources].[EmployeeDepartmentHistory], [HumanResources].[Department] 
            where 
            [HumanResources].[Employee].[BusinessEntityID] = [HumanResources].[EmployeeDepartmentHistory].[BusinessEntityID]
            and
            [HumanResources].[EmployeeDepartmentHistory].[DepartmentID] =  [HumanResources].[Department].[DepartmentID]
            and EndDate is NULL
            and 
            LoginID = 'david0' and  Password = '$2y$12$4J4i.UQf5UwAdKlHA0VLSO3bmcbGbj9sVJ3H96BqojFniTramF5RC'   
            `
            ,db)
        .then(x => {
            x.headers = ["LoginID", "Password", "JobTitle", "MaritalStatus", "HireData", "Gender", "DepartmentName"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
        
    })
}