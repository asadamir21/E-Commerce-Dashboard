import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList(){
  const classes = useStyles();
  
  const [myTableList, setMyTableList] = useState({});

  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:7500/TableList`)  
    .then(res => {
      // Marketing
      if (res.data === "Marketing"){
        axios.get(`http://localhost:7500/Marketing/Monthly_Sales`)  
        .then(res => {
          var table1 = {
            data: res.data.data,  
            headers: res.data.headers,
            title: res.data.tabletitle,
            subtitle: res.data.subTitle,
          }
          axios.get(`http://localhost:7500/Marketing/Yearly_Revenue`)  
          .then(res => {
            var table2 = {
              data: res.data.data,  
              headers: res.data.headers,
              title: res.data.tabletitle,
              subtitle: res.data.subTitle,
            }
            axios.get(`http://localhost:7500/Marketing/Product_Sales`)  
            .then(res => {
              var table3 = {
                data: res.data.data,  
                headers: res.data.headers,
                title: res.data.tabletitle,
                subtitle: res.data.subTitle,
              }

              axios.get(`http://localhost:7500/Marketing/Product_Sales_Discount`)  
              .then(res => {
                var table4 = {
                  data: res.data.data,  
                  headers: res.data.headers,
                  title: res.data.tabletitle,
                  subtitle: res.data.subTitle,
                }                
                setMyTableList({table1, table2, table3, table4});  
              })
            })
          })
        })  
      }
      // Human Resources
      else if (res.data === "Human Resources"){
        axios.get(`http://localhost:7500/Human_Resource/Employee_Depart_count`)  
        .then(res => {
          var table1 = {
            data: res.data.data,  
            headers: res.data.headers,
            title: res.data.tabletitle,
            subtitle: res.data.subTitle,
          }
          axios.get(`http://localhost:7500/Human_Resource/Employee_Shift_count`)  
          .then(res => {
            var table2 = {
              data: res.data.data,  
              headers: res.data.headers,
              title: res.data.tabletitle,
              subtitle: res.data.subTitle,
            }
            setMyTableList({table1, table2});                            
          })
        })
      }
      // Purchasing
      else if (res.data === "Purchasing"){
        axios.get(`http://localhost:7500/Purchasing/Top_Vendor`)  
        .then(res => {
          var table1 = {
            data: res.data.data,  
            headers: res.data.headers,
            title: res.data.tabletitle,
            subtitle: res.data.subTitle,
          }
          axios.get(`http://localhost:7500/Purchasing/Top_Product_Purchase`)  
          .then(res => {
            var table2 = {
              data: res.data.data,  
              headers: res.data.headers,
              title: res.data.tabletitle,
              subtitle: res.data.subTitle,
            }
            axios.get(`http://localhost:7500/Purchasing/Best_Vendor`)  
            .then(res => {
              var table3 = {
                data: res.data.data,  
                headers: res.data.headers,
                title: res.data.tabletitle,
                subtitle: res.data.subTitle,
              }
              axios.get(`http://localhost:7500/Purchasing/Yearly_Product_Purchase`)  
              .then(res => {
                var table4 = {
                  data: res.data.data,  
                  headers: res.data.headers,
                  title: res.data.tabletitle,
                  subtitle: res.data.subTitle,
                }
                setMyTableList({table1, table2, table3, table4});  
                console.log("Hello4")
              })
            })
          })
        })          
      }
      //
      else if (res.data === "Purchasing"){
      }
    });
    setHasRendered(true)
  }, [hasRendered])


  let tableNames = Object.keys(myTableList);
  
  return (
    <GridContainer>
      {
        tableNames.map((x, index) => 
          <GridItem key={'mytable'+index} xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{myTableList[x]['title']}</h4>
              <p className={classes.cardCategoryWhite}>
              { myTableList[x]['subtitle']}
              </p>
            </CardHeader>
            <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={myTableList[x]['headers']}
              tableData={myTableList[x]['data'].map(x => Object.values(x))}
            />
          </CardBody>
            </Card>
          </GridItem>  
        )
      }
    </GridContainer>
  );
}




