import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button.js";
import Form from "react-bootstrap/Form";
import Instance from "./Axios";
const DataTable = () => {
  let [data, setData] = useState([]);
  let [name, setName] = useState();
  let [brand, setBrand] = useState();
  let [price, setPrice] = useState();
  let [id, setID] = useState();
  let updater = useRef(0);
  let submit = useRef(0);

  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    submit.current.style.display = "block";
    updater.current.style.display = "none";
    let response = await Instance.get("/list");
    setData(response.data);
  };
  let removeMember = async (id) => {
    await Instance.delete(`/delete/${id}`);
    getData();
  };
  let createMember = async (e) => {
    e.preventDefault();
    await Instance.post(`/create`, {
      name: name,
      brand: brand,
      price: price,
    });
    getData();
  };
  let changeInput = (id, name, brand, price) => {
    setID(id);
    setName(name);
    setBrand(brand);
    setPrice(price);
    updater.current.style.display = "block";
    submit.current.style.display = "none";
  };
  let updateMember = async (e) => {
    e.preventDefault();
    let resp = await Instance.put(`/update/${id}`, {
      name: name,
      brand: brand,
      price: price,
    });
    setID("");
    setName("");
    setBrand("");
    setPrice("");
    getData();
  };
  return (
    <>
      <Container md="1rem">
        <Row className="center">
          <Col xs={6} className="border">
            <Form>
              <center>
                <div className="mb-3">Add/Update Data</div>
              </center>
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
                <Col xl ref={submit} style={{ textAlign: "center" }}>
                  <Button
                    onClick={(e) => {
                      createMember(e);
                    }}
                    variant="danger"
                    type="submit"
                  >
                    Create
                  </Button>
                </Col>
                <Col ref={updater} xl style={{ textAlign: "center" }}>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={(e) => {
                      updateMember(e);
                    }}
                  >
                    Update
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
            {["Name", "Brand", "Price", "Delete", "Update"].map((name, key) => {
              return <th key={key}>{name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row._id} style={{ textAlign: "center" }}>
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
                  <Button
                    onClick={() => {
                      changeInput(row._id, row.name, row.brand, row.price);
                    }}
                    variant="danger"
                  >
                    Update
                  </Button>
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
