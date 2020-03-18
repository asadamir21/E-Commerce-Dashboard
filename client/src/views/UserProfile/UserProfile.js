import React, { Component, useState } from "react";
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

export default class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Profile: '',
    }
  }
  
  componentDidMount(){
    axios.post(`http://localhost:7500/UserProfile`)  
    .then(res => {
      this.setState({
        Profile: res.data.UserProfile 
      });
    })
  }
  
      //   var binary = '';
    //   var bytes = [].slice.call(new Uint8Array(this.state.Profile.Image.data));
    //   bytes.forEach((b) => binary += String.fromCharCode(b));
    //   this.state.Profile.Image = window.btoa(binary);  
  
  render(){
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                {/* <h4 className={classes.cardTitleWhite}>User Profile</h4>
                <p className={classes.cardCategoryWhite}>View your profile</p> */}
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
                      fieldvalue={this.state.Profile.LoginID}
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
                      fieldvalue={this.state.Profile.Name}
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
                      fieldvalue={this.state.Profile.JobTitle}
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
                      fieldvalue={(this.state.Profile.MaritalStatus === "S") ? "Single" : "Married" }
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
                      fieldvalue={moment.utc(this.state.Profile.HireDate).format('MM/DD/YYYY')}
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
                      fieldvalue={(this.state.Profile.Gender === "M") ? "Male" : "Female" }
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
                      fieldvalue={moment.utc(this.state.Profile.BirthDate).format('MM/DD/YYYY')}
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
                      fieldvalue={(this.state.Profile.OrganizationLevel)}
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
                      fieldvalue={(this.state.Profile.SalariedFlag) ? "Yes" : "No"}
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
                      fieldvalue={this.state.Profile.VacationHours}
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
                      fieldvalue={this.state.Profile.SickLeaveHours}
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
                  {/* <img src={'data:image/jpeg;base64,'+this.state.Profile.Image} alt="..." />
                 */}
                </a>
              </CardAvatar>
              <CardBody profile>
                {/* <h6 className={this.state.classes.cardCategory}>{this.state.Profile.JobTitle}</h6>
                <h4 className={this.state.classes.cardTitle}>{this.state.Profile.LoginID}</h4>
                <p className={this.state.classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves Kanye
                  I love Rick Owens’ bed design but the back is...
                </p> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );    
  }
}