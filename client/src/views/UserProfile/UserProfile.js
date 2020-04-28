import React, {useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";

import axios from 'axios';
import moment from 'moment';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile () {
  const classes = useStyles();

  
  const [profile, setProfile] = useState(null)
  const [image, setImage] = useState([])
  const [quote, setQuote] = useState([])

  useEffect(() => {
    axios.post(`http://localhost:7500/UserProfile`)  
    .then(res => {
      setProfile(res.data.UserProfile)
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(res.data.UserProfile.Image.data));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      setImage(window.btoa(binary));  

      axios.get(`https://type.fit/api/quotes`)  
      .then(res => {
        setQuote(res.data);              
      })
    })
  }, [])

  var randomquote;

  try{
    randomquote = quote[Math.floor(Math.random() * quote.length)]['text']
  } 
  catch(err){

  }


  if (profile == null){
    return null;
  } else {
    return (<div>
         <GridContainer>
           <GridItem xs={12} sm={12} md={8}>
             <Card>
               <CardHeader color="primary">
                 <h4 className={classes.cardTitleWhite}>User Profile</h4>
                 <p className={classes.cardCategoryWhite}>View your profile</p>
               </CardHeader>
               <CardBody>
                 <GridContainer>
                   <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                      labelText="Login ID"
                      id="loginid-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={profile.LoginID}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Department"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      fieldvalue={profile.Name}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>  
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Job Title"
                      id="jobtitle"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={profile.JobTitle}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Maritial Status"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={(profile.MaritalStatus === "S") ? "Single" : "Married" }
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Hire Date"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={moment.utc(profile.HireDate).format('MM/DD/YYYY')}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Gender"
                      id="gender"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={(profile.Gender === "M") ? "Male" : "Female" }
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Birth Date"
                      id="birthdate"
                      formControlProps={{
                        fullWidth: true
                      }}
                      fieldvalue={moment.utc(profile.BirthDate).format('MM/DD/YYYY')}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Organization Level"
                      id="organization-level"
                      fieldvalue={(profile.OrganizationLevel)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Salaried Flag"
                      id="Salaried-Flag"
                      fieldvalue={(profile.SalariedFlag) ? "Yes" : "No"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Vacation Hours"
                      id="Vacation-Hours"
                      fieldvalue={profile.VacationHours}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Sick Leave Hours"
                      id="Sick-Leave-Hours"
                      fieldvalue={profile.SickLeaveHours}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        style: {
                          fontSize: 16,
                          fontWeight: 900 
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={'data:image/jpeg;base64,'+image} alt="..." />
                
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{profile.JobTitle}</h6>
                <h4 className={classes.cardTitle}>{profile.LoginID}</h4>
                <p className={classes.description}>
                  {randomquote}      
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>)
    }
}

