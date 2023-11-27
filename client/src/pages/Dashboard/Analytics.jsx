import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#219C90",
    "#E9B824",
    "#EE9322",
    "#D83F31",
    "#FF6969",
    "#ECEE81",
    "#8DDFCB",
    "#B4B4B3",
  ];
  // GET BLOOD GROUP DATA
  const getBloodGroup = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroup();
  }, []);

  // GET FUNCTION
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data.success) {
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap analytics">
        {data?.map((record, i) => (
          <>
            <div
              className="card m-2 p-1"
              key={i}
              style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  <b>Total In: </b>
                  {record.totalIn} mL
                </p>
                <p className="card-text">
                  <b>Total Out: </b>
                  {record.totalOut} mL
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                <b>Total Available:</b> {record.availableBlood} mL
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="container">
        <h1 className="text-center mt-5">Recent Blood Transactions</h1>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record, i) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} mL</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
