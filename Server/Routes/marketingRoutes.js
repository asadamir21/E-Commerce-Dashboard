const dbx = require('../db_utils/queryExecuter')

module.exports = (app, db) => {
    app.get('/MKT_BalancetoShip', (req,res) => {
        let condition = ''

        console.log(req.query)
        if (req.query.type === 'bedding'){
            condition = "and Series = '70'"
        }
        else if(req.query.type === 'towel'){
            condition = "and Series = '71'"
        }

        dbx(`select DocNum, CardCode, CardName, sum(Quantity) as 'Order Quantity', 
            sum(LineTotal) as 'Order Value', DocDueDate as 'Shippment Date',
            CAST(sum(DelivrdQty)/sum(Quantity)*100 as DECIMAL(16,2)) as 'Percentage Shipped',
            DATEDIFF(DAY, GetDate(), DocDueDate) as 'Remaining Days'  
                
            from ORDR, RDR1 
            where 
            RDR1.DocEntry = ORDR.DocEntry and CANCELED = 'N'
            and DocStatus = 'O' and DocDueDate > GetDate() 
            ${condition}
            group by DocNum, CardCode, CardName, DocDueDate
            having (sum(Quantity) - sum(DelivrdQty)) > 0    `, db)
            .then(x => {
        x.headers = ["DocNum", "CardCode", "CardName", "Ordered Quantity", "Order Value", "Shipment Date", "Percentage Shipped", "Remaining Days"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    app.get('/MKT_BalancetoShip_Delay', (req,res) => {
        let condition = ''

        console.log(req.query)
        if (req.query.type === 'bedding'){
            condition = "and Series = '70'"
        }
        else if(req.query.type === 'towel'){
            condition = "and Series = '71'"
        }

        dbx(`select DocNum, CardCode, CardName, sum(Quantity) as 'Order Quantity', 
            sum(LineTotal) as 'Order Value', DocDueDate as 'Shippment Date',
            CAST(sum(DelivrdQty)/sum(Quantity)*100 as DECIMAL(16,2)) as 'Percentage Shipped',
            DATEDIFF(DAY, DocDueDate, GetDate()) as 'Days Delayed'  
    
            from ORDR, RDR1 
            where 
            RDR1.DocEntry = ORDR.DocEntry and CANCELED = 'N'
            and DocStatus = 'O' and DocDueDate < GetDate()
            ${condition}
            group by DocNum, CardCode, CardName, DocDueDate
            having (sum(Quantity) - sum(DelivrdQty)) > 0`, db)
            .then(x => {
        x.headers = ["DocNum", "CardCode", "CardName", "Ordered Quantity", "Order Value", "Shipment Date", "Percentage Shipped", "Remaining Days"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })

    app.get('/MKT_MonthlySales', (req,res) => {
        let condition = ''

        if (req.query.type === 'bedding'){
            condition = "and Series = '70'"
        }
        else if(req.query.type === 'towel'){
            condition = "and Series = '71'"
        }
        dbx(`select "Month","Year",round(sum(A."BQuantity"),0) as "Bedding Qty",round(sum(A."BAmount"),0) as "Bedding Amt",round(sum(A."TQuantity"),0) as "Towel Qty",round(sum(A."TAmount"),0) as "Towel Amt",round(sum(A."TotalAmt"),0) as "Total Amt",round(sum(A."USDAmount"),0) as "USD Amt",round(sum(A."EURAmount"),0) as "EUR Amt" from 
        (
        
        select MONTH(a.DocDate) as "Month", YEAR(a.DocDate) as "Year", sum(b.Quantity) as "BQuantity", sum(b.lineTotal) as "BAmount", 0 as "TQuantity", 0 as "TAmount", sum(b.lineTotal) as "TotalAmt",0 as "USDAmount",0 as "EURAmount" from OINV a, INV1 b  where a.DocEntry = b.DocEntry and a.Series = '77' and 
        a.CANCELED = 'N' and a.CardCode like 'CF-%' and a.DocDate >= '2019-01-01' and a.DocTotal > 10 and b.ItemCode like 'FG%' group by YEAR(a."DocDate"), MONTH(a."DocDate")  
        
        union all 
        
        select MONTH(a.DocDate) as "Month", YEAR(a.DocDate) as "Year", 0 as "BQuantity", 0 as "BAmount"
        , sum(b.Quantity) as "TQuantity", sum(b.lineTotal) as "TAmount", sum(b.lineTotal) as "TotalAmt",0 as "USDAmount",0 as "EURAmount"  from OINV a, INV1 b  where  a.Series = '76' and 
        a.CANCELED = 'N' and a.CardCode like 'CF-%' and a.DocDate >= '2019-01-01' and a.DocEntry = b.DocEntry  and a.DocTotal > 10 and b.ItemCode like 'FG%' group by YEAR(a.DocDate), MONTH(a.DocDate) 
        
        union all  
        select MONTH(a.DocDate) as "Month", YEAR(a.DocDate) as "Year", 0 as "BQuantity", 0 as "BAmount"
        , 0 as "TQuantity", 0 as "TAmount", 0 as "TotalAmt",sum(b.TotalFrgn) as "USDAmount",0 as "EURAmount"  from OINV a, INV1 b  where
        a.CANCELED = 'N' and a.CardCode like 'CF-%' and b.Currency = 'USD' and a.DocDate >= '2019-01-01' and a.DocEntry = b.DocEntry  and a.DocTotal > 10 and b.ItemCode like 'FG%' group by YEAR(a.DocDate), MONTH(a.DocDate)
        
        union all 
        
        
        select MONTH(a.DocDate) as "Month", YEAR(a.DocDate) as "Year", 0 as "BQuantity", 0 as "BAmount" 
        , 0 as "TQuantity", 0 as "TAmount", 0 as "TotalAmt",0 as "USDAmount",sum(b.TotalFrgn) as "EURAmount"  from OINV a, INV1 b  where a.CANCELED = 'N' and a.CardCode like 'CF-%' and b.Currency = 'EUR' and a.DocDate >= '2019-01-01' and a.DocEntry = b.DocEntry  and a.DocTotal > 10 and b.ItemCode like 'FG%' group by YEAR(a.DocDate), MONTH(a.DocDate)
        
        
        )A group by A."Year",A."Month" order by A."Year",A."Month"`, db)
        .then(x => {
            x.headers = ["Month", "Year", "Bedding Qty", "Bedding Amt", "Towel Qty", "Towel Amt", "Total Amt", "USD Amt", "EUR Amt"]
            res.send(JSON.stringify(x))
        })
        .catch(x => console.log(x))
    })
}