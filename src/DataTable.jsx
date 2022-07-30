import axios from "./axios.js";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const DataTable = () => {
  let [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let response = await axios.get("/list");
    setData(response.data);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                <th>{row.name}</th>
                <th>{row.brand}</th>
                <th>{row.brand}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default DataTable;
