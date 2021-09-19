import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { Card } from '@material-ui/core';
import ISPIRITHALEI from "../../../assets/2.png";
import { Link } from "react-router-dom";
import "./doctor.css"
import PrescriptionDataService from "../../../services/doctorPrescriptionService";
import { date } from "yup";

function DoctorPrintPrescription() {
    const { id } = useParams();
    //console.log(id);

    const [prescription, setPrescription] = useState([]);

    //get employee details by id
    const getPrescription = (id) => {
        PrescriptionDataService
            .getOnePrescription(id)
            .then((response) => {
                setPrescription(response.data);
                //console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        //console.log("name print", employee.firstName);
    };

    useEffect(() => {
        getPrescription(id);
    }, [id]);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return (
        <div style={{ marginBottom: 10}}>
            <Card style={{ width: "70%"}}>
                <CardContent>
                    <Card>
                        <CardContent>
                            <div style={{ textAlign: "center" }}>
                                <img src={ISPIRITHALEI} />
                                <p style={{ fontSize: 15 }} >647, Utuwakanda,Mawanella<br />TEL : +9411 2696 696 / +9411 269 696 <br />FAX : +9411 2696 969<br />EMAIL : reception@ispirithalei.lk</p>
                            </div>
                            <br />

                            <p style={{float:"right", fontSize: 15}}>Issued Doctor ID : {prescription.dId}</p>
                            <p style={{ fontSize: 15 }}>Date of issue : {today}</p>

                            <hr/>
                            <br />

                            <p style={{ textAlign: "center" }}><strong>Patient Name : </strong>{prescription.dPName}
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <strong>Diagnosis : </strong>{prescription.dPDignosis}</p>
                            <br /><br />

                            <p style={{ textAlign: "center" }}><strong>Medicine 1 : </strong>{prescription.dMed1} 
                            &emsp;&emsp;&emsp;
                            <strong>Dose : </strong>{prescription.dDose1}</p>
                            <br />

                            <p style={{ textAlign: "center" }}><strong>Medicine 2 : </strong>{prescription.dMed2}
                            &emsp;&emsp;&emsp; 
                            <strong>Dose : </strong>{prescription.dDose2}</p>
                            <br />
                        </CardContent>
                    </Card>
                    <div className="buttonAlignRight" style={{ marginTop: 10 }}>
                        <Link to={"/staff/doctor/viewprescription/" + prescription.dId}>
                            <Button size="large" variant="contained" style={{ marginRight: 8 }}>Cancel</Button>
                        </Link>
                        <Button size="large" variant="contained" color="primary" type="submit">Generate PDF</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default DoctorPrintPrescription;