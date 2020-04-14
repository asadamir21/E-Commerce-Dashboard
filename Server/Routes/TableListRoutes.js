const jwt_util = require('../utils/jwt-utils');

module.exports = (app, db) => {
    app.get('/TableList', function(req, res){
        const User = jwt_util.verify(req.cookies.sessionToken)
        res.send(User.LoginID.profile.Name)
        if (User.LoginID.profile.Name === "Engineering"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Tool Design"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Sales"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Marketing"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Purchasing"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Research and Development"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Production"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Production Control"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Human Resources"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Finance"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Information Services"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Document Control"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Quality Assurance"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Facilities and Maintenance"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Shipping and Receiving"){
            console.log("Hello")
        }
        else if(User.LoginID.profile.Name === "Executive"){
            console.log("Hello")
        }
        
        // const UserProfile = dbx(`select [HumanResources].[Employee].BusinessEntityID, LoginID, JobTitle, OrganizationLevel, MaritalStatus, BirthDate, HireDate, Gender, Name, SalariedFlag, VacationHours, SickLeaveHours, Image 
        //                     from 
        //                     [HumanResources].[Employee], [HumanResources].[EmployeeDepartmentHistory], [HumanResources].[Department] 
        //                     where 
        //                     [HumanResources].[Employee].[BusinessEntityID] = [HumanResources].[EmployeeDepartmentHistory].[BusinessEntityID]
        //                     and
        //                     [HumanResources].[EmployeeDepartmentHistory].[DepartmentID] =  [HumanResources].[Department].[DepartmentID]
        //                     and EndDate is NULL
        //                     and
        //                     LoginID = '${User.LoginID.profile.LoginID}'`
        //                     ,db)
        // .then((data) => {
        //     if (data.rowCount > 0){
        //         const {BusinessEntityID, LoginID, JobTitle, OrganizationLevel, MaritalStatus, BirthDate, HireDate, Gender, Name, SalariedFlag, VacationHours, SickLeaveHours, Image} = data.data[0];
        //         let sendingData = {
        //             UserProfile: {
        //                 BusinessEntityID, 
        //                 LoginID, 
        //                 JobTitle, 
        //                 OrganizationLevel, 
        //                 MaritalStatus, 
        //                 BirthDate, 
        //                 HireDate, 
        //                 Gender, 
        //                 Name, 
        //                 SalariedFlag, 
        //                 VacationHours, 
        //                 SickLeaveHours,
        //                 Image 
        //             },
        //         }
        //         res.send(sendingData)
        //     } 
        // })
    });
}