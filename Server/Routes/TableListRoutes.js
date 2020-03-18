const {loginSchema} = require('./JoiSchema/entrySchema');
const jwt_util = require('../utils/jwt-utils');
const dbx = require('../db_utils/queryExecuter')

module.exports = (app, db) => {
    app.post('/UserProfile', function(req, res){
        const User = jwt_util.verify(req.cookies.sessionToken)
        
        const UserProfile = dbx(`select [HumanResources].[Employee].BusinessEntityID, LoginID, JobTitle, OrganizationLevel, MaritalStatus, BirthDate, HireDate, Gender, Name, SalariedFlag, VacationHours, SickLeaveHours, Image 
                            from 
                            [HumanResources].[Employee], [HumanResources].[EmployeeDepartmentHistory], [HumanResources].[Department] 
                            where 
                            [HumanResources].[Employee].[BusinessEntityID] = [HumanResources].[EmployeeDepartmentHistory].[BusinessEntityID]
                            and
                            [HumanResources].[EmployeeDepartmentHistory].[DepartmentID] =  [HumanResources].[Department].[DepartmentID]
                            and EndDate is NULL
                            and
                            LoginID = '${User.LoginID.profile.LoginID}'`
                            ,db)
        .then((data) => {
            if (data.rowCount > 0){
                const {BusinessEntityID, LoginID, JobTitle, OrganizationLevel, MaritalStatus, BirthDate, HireDate, Gender, Name, SalariedFlag, VacationHours, SickLeaveHours, Image} = data.data[0];
                let sendingData = {
                    UserProfile: {
                        BusinessEntityID, 
                        LoginID, 
                        JobTitle, 
                        OrganizationLevel, 
                        MaritalStatus, 
                        BirthDate, 
                        HireDate, 
                        Gender, 
                        Name, 
                        SalariedFlag, 
                        VacationHours, 
                        SickLeaveHours,
                        Image 
                    },
                }
                res.send(sendingData)
            } 
        })
    });
}