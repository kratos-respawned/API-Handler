import axios from "./axios.js";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container, Ratio, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button.js";
import Form from "react-bootstrap/Form";
const DataTable = () => {
  let [data, setData] = useState([]);
  let [name, setName] = useState("");
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let response = await axios.get("/list");
    setData(response.data);
  };
  let removeMember = async (id) => {
    let response = await axios.delete(`/delete/${id}`);
    getData();
    console.log(response);
  };
  let createMember = async () => {
    let response = await axios.post(`/create`, () => {});
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUID">
                <Form.Control type="text" placeholder="UID" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUID">
                <Form.Control type="text" placeholder="UID" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUID">
                <Form.Control type="text" placeholder="UID" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <Table
        style={{ width: "50vw", margin: "auto" }}
        striped
        //   bordered
        hover
        variant="dark"
      >
        <thead>
          <tr style={{ color: "#d40000", textAlign: "center" }}>
            {["Name", "Brand", "Price", "Delete", "Update"].map((name) => {
              return <th>{name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                <th>{row.name}</th>
                <th>{row.brand}</th>
                <th>{row.brand}</th>
                <th style={{ textAlign: "center" }}>
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeMember(row._id);
                    }}
                  >
                    Delete
                  </Button>
                </th>
                <th style={{ textAlign: "center" }}>
                  <Button variant="danger">Update</Button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default DataTable;
