import React, { useState, useEffect } from "react";
import { Col, Container, Form, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "./MainLayout";

function VehicleOwnerSalForm() {
  const [inputState, setInputState] = useState({
    owner_id: "",
    bonus: "",
  });

  const [error, setError] = useState();

  // get link parameter details
  const { id } = useParams();
  const navigate = useNavigate();

  const addVehicleOwnerSal = async () => {
    console.log(inputState);
    try {
      const response = await axios.post(
        `http://localhost:8090/finance/addVehicleOwnerSal`,
        inputState
      );
      console.log(response.data);
      setError(null);

      navigate("/AllVehicleOwnerSal");
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    setInputState({ ...inputState, owner_id: id });
  }, []);

  const { bonus } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicleOwnerSal();
  };

  return (
    <>
      <MainLayout></MainLayout>
      <Container className="mt-3">
        <h1 style={{ marginBottom: "20px", marginTop: "40px" }}>
          Add Bonus for Vehicle Owners
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          <Col xs={4} style={{ marginTop: "47px" }}>
            <Form onSubmit={handleSubmit}>
              {error && <p className="error">{error}</p>}
              <Card style={{ width: "30rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "30px" }}>
                    Add Bonus Amount
                  </Card.Title>
                  <br />

                  <Form.Control
                    size="lg"
                    type="number"
                    placeholder="Bonus"
                    value={bonus}
                    onChange={handleInput("bonus")}
                    style={{ height: "58px", fontSize: "20px" }}
                  />
                  <br />

                  <Button variant="success" className="btn-lg" type="submit">
                    Calculate
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </div>
      </Container>
    </>
  );
}

export default VehicleOwnerSalForm;
