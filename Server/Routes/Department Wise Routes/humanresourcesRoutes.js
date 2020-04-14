const dbx = require('../../db_utils/queryExecuter')

module.exports = (app, db) => {
    // Department Wise Employees 
    app.get('/Human_Resource/Employee_Depart_count', (req,res) => {
        dbx(`SELECT Name, count(*) as "No of Employees"
            FROM 
            [Dashboard].[HumanResources].[Department], [Dashboard].[HumanResources].[Employee], [Dashboard].[HumanResources].[EmployeeDepartmentHistory]
            where 
            [Dashboard].[HumanResources].[Department].DepartmentID = [Dashboard].[HumanResources].[EmployeeDepartmentHistory].DepartmentID
            and 
            [Dashboard].[HumanResources].[Employee].BusinessEntityID = [Dashboard].[HumanResources].[EmployeeDepartmentHistory].BusinessEntityID
            and
            EndDate is NULL
            group by Name order by count(*) desc`, db)
            .then(x => {
        x.headers = ["Department Name", "No. of Employee"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Shift Wise Employees 
    app.get('/Human_Resource/Employee_Shift_count', (req,res) => {
        dbx(`SELECT Name, count(*) as "No of Employees"
            FROM 
            [Dashboard].[HumanResources].[Shift], [Dashboard].[HumanResources].[EmployeeDepartmentHistory]
            where 
            [Dashboard].[HumanResources].[Shift].ShiftID = [Dashboard].[HumanResources].[EmployeeDepartmentHistory].ShiftID
            group by Name order by count(*) desc`, db)
            .then(x => {
        x.headers = ["Shift Name", "No. of Employee"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Job Candidate 
    app.get('/Human_Resource/Job_Canditate', (req,res) => {
        dbx(`SELECT JobCandidateID, Resume FROM [Dashboard].[HumanResources].[JobCandidate]
            where BusinessEntityID is NULL
            `, db)
            .then(x => {
        x.headers = ["Job Candidate ID", "Resume"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })
}