import axios from "./axios.js";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container, Ratio, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button.js";
import Form from "react-bootstrap/Form";
const DataTable = () => {
  let [data, setData] = useState([]);
  let [name, setName] = useState("");
  let [brand, setBrand] = useState("");
  let [price, setPrice] = useState();
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let response = await axios.get("/list");
    setData(response.data);
  };
  let removeMember = async (id) => {
    await axios.delete(`/delete/${id}`);
    getData();
  };
  let createMember = async (e) => {
    e.preventDefault();
    await axios.post(`/create`, {
      name: name,
      brand: brand,
      price: price,
    });
    getData();
  };
  return (
    <>
      <Container md="1rem">
        <Row className="center">
          <Col xs={6} className="border">
            <Form>
              <Row className="center">
                <Col xl>
                  <Form.Group className="mb-2" controlId="formBasicModel">
                    <Form.Control
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      placeholder="Model"
                    />
                  </Form.Group>
                </Col>
                <Col xl>
                  <Form.Group className="mb-2" controlId="formBasicBrand">
                    <Form.Control
                      value={brand}
                      onChange={(e) => {
                        setBrand(e.target.value);
                      }}
                      type="text"
                      placeholder="Brand"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="center">
                <Col xl>
                  <Form.Group className="mb-2" controlId="formBasicPrice">
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      placeholder="Price"
                    />
                  </Form.Group>
                </Col>
                <Col xl style={{ textAlign: "center" }}>
                  <Button
                    onClick={(e) => {
                      createMember(e);
                    }}
                    variant="danger"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <Table
        className="border"
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
              <tr style={{ textAlign: "center" }}>
                <th>{row.name}</th>
                <th>{row.brand}</th>
                <th>{row.price}</th>
                <th>
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeMember(row._id);
                    }}
                  >
                    Delete
                  </Button>
                </th>
                <th>
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
