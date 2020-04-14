const dbx = require('../../db_utils/queryExecuter')

module.exports = (app, db) => {
    // Monthly Sales 
    app.get('/Marketing/Monthly_Sales', (req,res) => {
        dbx(`SELECT DATENAME(month, OrderDate) as "Month", count(*) as "No. of Orders", sum(TotalDue) as "Total Amount"  
             FROM [Dashboard].[Sales].[SalesOrderHeader]
             group by DATENAME(month, OrderDate)
             order by sum(TotalDue) desc`, db)
            .then(x => {
        x.headers = ["Month", "No. of Orders", "Total Amount"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Yearly Revenue
    app.get('/Marketing/Yearly_Revenue', (req,res) => {
        dbx(`Select DATENAME(year, OrderDate) as "Year", sum(TotalDue)  as "Total Revenue"
            FROM [Dashboard].[Sales].[SalesOrderHeader] 
            group by DATENAME(year, OrderDate)
            `, db)
            .then(x => {
        x.headers = ["Year", "Total Revenue"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    //Total Online and Offline Orders
    app.get('/Marketing/Online_Orders', (req,res) => {
        dbx(`Select
            (Select count(*) FROM [Dashboard].[Sales].[SalesOrderHeader] where OnlineOrderFlag = 1)  as "Online Orders",
            (Select count(*)FROM [Dashboard].[Sales].[SalesOrderHeader] where not OnlineOrderFlag = 1)  as "Offline Orders" ,
            count(*) as "Total Orders"
            FROM [Dashboard].[Sales].[SalesOrderHeader]
            `, db)
            .then(x => {
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Product Wise Sales
    app.get('/Marketing/Product_Sales', (req,res) => {
        dbx(`Select Name, sum(OrderQty) as "Order Quantity" , sum(LineTotal) as "Order Value"
            FROM 
            [Dashboard].[Sales].[SalesOrderDetail], [Dashboard].[Production].[Product] 
            where 
            [Dashboard].[Sales].[SalesOrderDetail].ProductID = [Dashboard].[Production].[Product].ProductID
            group by Name, UnitPrice
            order by sum(LineTotal) desc
            `, db)
            .then(x => {
        x.headers = ["Product Name", "Total Quantity Ordered", "Order Value"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })
    
    //Product Wise Sales and Discount
    app.get('/Marketing/Product_Sales_Discount', (req,res) => {
        dbx(`Select Name, count(*) as "No. of Orders", UnitPrice as "Unit Price", sum(LineTotal) as "Order Value", Description as "Discount Type"
            FROM 
            [Dashboard].[Sales].[SalesOrderDetail], [Dashboard].[Production].[Product], [Dashboard].[Sales].[SpecialOffer], [Dashboard].[Sales].[SpecialOfferProduct] 
            where 
            [Dashboard].[Sales].[SalesOrderDetail].ProductID = [Dashboard].[Production].[Product].ProductID 
            and
            [Dashboard].[Sales].[SpecialOfferProduct].ProductID = [Dashboard].[Production].[Product].ProductID 
            and 
            [Dashboard].[Sales].[SpecialOffer].SpecialOfferID = [Dashboard].[Sales].[SpecialOfferProduct].SpecialOfferID 
            group by Name, Description, UnitPrice 
            order by Name
            `, db)
            .then(x => {
            x.headers = ["Product Name", "Total Orders", "Unit Price", "Order Value", "Discount Type"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Discount and Without Discount Orders
    app.get('/Marketing/Discount_Orders', (req,res) => {
        dbx(`Select
            (Select count(*) FROM [Dashboard].[Sales].[SalesOrderDetail] where SpecialOfferID = 1)  as "Without Discount Orders",
            (Select count(*)FROM [Dashboard].[Sales].[SalesOrderDetail] where not SpecialOfferID = 1)  as "Discount Orders" ,
            count(*) as "Total Orders"
            FROM [Dashboard].[Sales].[SalesOrderDetail]
            `, db)
            .then(x => {
            x.headers = ["Without Discount Orders", "With Discount Orders", "Total Orders"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })    
}