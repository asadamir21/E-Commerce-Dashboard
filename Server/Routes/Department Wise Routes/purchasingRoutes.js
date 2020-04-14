const dbx = require('../../db_utils/queryExecuter')

module.exports = (app, db) => {
    // Top Vendors
    app.get('/Purchasing/Top_Vendor', (req,res) => {
        dbx(`SELECT  TOP(10) Name, COUNT(*) as "No. of Orders" FROM 
            [Dashboard].[Purchasing].[Vendor], [Dashboard].[Purchasing].[PurchaseOrderHeader] 
            WHERE
            [Dashboard].[Purchasing].[Vendor].BusinessEntityID = [Dashboard].[Purchasing].[PurchaseOrderHeader].VendorID
            AND ActiveFlag = 1
            GROUP BY Name order by count(*) desc, Name
            `, db)
            .then(x => {
        x.headers = ["Vendor Name", "No. of Orders"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Yearly Product Purchase
    app.get('/Purchasing/Yearly_Product_Purchase', (req,res) => {
        dbx(`SELECT DATENAME(year, OrderDate) as "Year", Name as "Product Name", sum(OrderQty) as "Purschased Quantity", sum(LineTotal) as "Order Value"  
             FROM 
             [Dashboard].[Purchasing].[PurchaseOrderHeader],[Dashboard].[Purchasing].[PurchaseOrderDetail], [Dashboard].[Production].[Product] 
             where
             [Dashboard].[Purchasing].[PurchaseOrderHeader].[PurchaseOrderID] = [Dashboard].[Purchasing].[PurchaseOrderDetail].PurchaseOrderID
             and
             [Dashboard].[Production].[Product].[ProductID] = [Dashboard].[Purchasing].[PurchaseOrderDetail].ProductID
            
             group by DATENAME(year, OrderDate), Name
             order by DATENAME(year, OrderDate) desc, Name
             `, db)
            .then(x => {
        x.headers = ["Year", "Product Name", "Purchased Qunatity", "Order Value"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Total Product Purchase
    app.get('/Purchasing/Top_Product_Purchase', (req,res) => {
        dbx(`SELECT TOP(10) Name as "Product Name", sum(OrderQty) as "Purschased Quantity", sum(LineTotal) as "Order Value"  
            FROM 
            [Dashboard].[Purchasing].[PurchaseOrderHeader],[Dashboard].[Purchasing].[PurchaseOrderDetail], [Dashboard].[Production].[Product] 
            where
            [Dashboard].[Purchasing].[PurchaseOrderHeader].[PurchaseOrderID] = [Dashboard].[Purchasing].[PurchaseOrderDetail].PurchaseOrderID
            and
            [Dashboard].[Production].[Product].[ProductID] = [Dashboard].[Purchasing].[PurchaseOrderDetail].ProductID
            group by Name
            order by sum(OrderQty) desc
            `, db)
            .then(x => {
        x.headers = ["Product Name", "Purchased Qunatity", "Order Value"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    // Best Vendor Product Wise
    app.get('/Purchasing/Best_Vendor', (req,res) => {
        dbx(`select [Dashboard].[Production].[Product].Name as "Product Name", max([Dashboard].[Purchasing].[Vendor].Name) as "Best Vendor", count(*) as "No. of Purchase Order"
            from 
            [Dashboard].[Purchasing].[PurchaseOrderHeader], [Dashboard].[Purchasing].[PurchaseOrderDetail], [Dashboard].[Production].[Product], [Dashboard].[Purchasing].[Vendor]
            where 
            [Dashboard].[Purchasing].[PurchaseOrderHeader].PurchaseOrderID = [Dashboard].[Purchasing].[PurchaseOrderDetail].PurchaseOrderID
            and 
            [Dashboard].[Production].[Product].ProductID = [Dashboard].[Purchasing].[PurchaseOrderDetail].ProductID
            and 
            [Dashboard].[Purchasing].[Vendor].BusinessEntityID = [Dashboard].[Purchasing].[PurchaseOrderHeader].VendorID
            group by [Dashboard].[Production].[Product].Name
            order by [Dashboard].[Production].[Product].Name
            `, db)
            .then(x => {
        x.headers = ["Product Name", "Best Vendor", "No. of Orders"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })
}