import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import MainLayout from "./MainLayout";
import {
  Table,
  Col,
  Container,
  Row,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

function AllDriverSal() {
  const [driverSals, setDriverSal] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef(null);

  // Get all Driver's Salaries
  async function getDriverSal() {
    try {
      const response = await axios.get(
        "http://localhost:8090/finance/getDriverSal/"
      );
      setDriverSal(response.data);
    } catch (error) {
      console.error("Error with GET request:", error);
    }
  }

  useEffect(() => {
    getDriverSal();
  }, []);

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8} style={{ marginBottom: "20px" }}>
            <h1>Driver Salary Details</h1>
          </Col>
          <Col xs={12} md={4} className="mt-md-0 mt-3">
            <Form>
              <InputGroup>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name"
                  value={search}
                  style={{
                    padding: "15px",
                    fontSize: "18px",
                    border: "2px solid black",
                  }}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button variant="warning" className="btn-lg">
                    Generate Report
                  </Button>
                );
              }}
              content={() => componentRef.current}
              documentTitle="Driver Salary Details"
              pageStyle={"print"}
            />

            <div ref={componentRef}>
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
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Mileage</th>
                    <th>Bonus</th>
                    <th>Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {driverSals
                    .filter((driver) => {
                      return (
                        search.toLowerCase() === "" ||
                        driver.driver_id?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((driver, index) => {
                      const { driver_id, bonus } = driver;
                      if (driver_id) {
                        // Calculate netSalary
                        const salaryPerKM = 250;
                        const netSalary =
                          (salaryPerKM * driver_id.mileage * bonus) / 100 +
                          salaryPerKM * driver_id.mileage;

                        return (
                          <tr
                            key={driver._id}
                            style={{ backgroundColor: "#6553cfa3" }}
                          >
                            <td>{index + 1}</td>
                            <td>
                              {driver_id.firstName} {driver_id.lastName}
                            </td>
                            <td>{driver_id.ContactNumber}</td>
                            <td>{driver_id.email}</td>
                            <td>{driver_id.mileage} Km</td>
                            <td>{bonus}%</td>
                            <td>Rs.{netSalary}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllDriverSal;
