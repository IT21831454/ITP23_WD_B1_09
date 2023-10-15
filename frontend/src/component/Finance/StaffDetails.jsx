import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "./MainLayout";

function AllStaffDetails() {
  const [userdata, setUserData] = useState([]);
  const [inputState, setInputState] = useState({
    bonus: "",
  });

  // Get link parameter details
  const { Id } = useParams();
  const navigate = useNavigate();

  // Function to get all staff details
  async function getStaffDetails() {
    try {
      const response = await axios.get("http://localhost:8090/user/details/");
      // if (Array.isArray(response.data)) {
      //   setUserData(response.data);
      // } else {
      //   console.error("Data received is not an array:", response.data);
      // }
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  // Function to add staff salary
  async function addStaffSal() {
    try {
      const response = await axios.post("http://localhost:8090/finance/addStaffSal/");
      // Handle the response as needed
    } catch (error) {
      console.error("Error with POST request:", error);
    }
  }

  useEffect(() => {
    getStaffDetails();
  }, []);

  useEffect(() => {
    setInputState({ ...inputState, element_id: Id });
  }, [Id]);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaffSal();
  };

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="mb-0">
            <h1>Staff Details</h1>
          </Col>
          <Col xs={12}>
            <Row className="d-flex justify-content-end">
              <Col xs={4} md={4} className="text-right">
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    placeholder="Enter Bonus amount"
                    value={bonus}
                    onChange={handleInput("bonus")}
                    style={{
                      padding: "10px",
                      fontSize: "18px",
                      border: "2px solid black",
                    }}
                  />
                </Form>
              </Col>
              <Col xs={12} md={2} className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="btn-lg"
                  onClick={handleSubmit}
                >
                  Calculate
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-2">
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{
                marginTop: "30px",
                padding: "20px",
                fontSize: "20px",
                width: "100%",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>NIC</th>
                  <th>Email</th>
                  <th>Job Role</th>
                </tr>
              </thead>
              <tbody>
                {userdata.map((element, index) => {
                  const { fname, lname, email, nic, role } = element;
                  return (
                    <tr key={element._id}>
                      <td>{index + 1}</td>
                      <td>
                        {fname} {lname}
                      </td>
                      <td>{nic}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllStaffDetails;
