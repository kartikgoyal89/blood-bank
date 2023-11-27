import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const Donar = () => {
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);

  // find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);
  return (
    <Layout>
      {error && <span>alert(error)</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="donar-heading">Donar Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">&nbsp;&nbsp;Contact No.</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.name || record.organisationName + " (ORG)"}</td>
                  <td>{record.email}</td>
                  <td>
                    <span style={{ fontWeight: "500" }}>+91</span>{" "}
                    {record.phone}
                  </td>
                  <td>
                    {moment(record.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
};

export default Donar;
