import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const Organisation = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);

  // find donar records
  const getHospitals = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
          console.log(data);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
        if (data?.success) {
          setData(data?.organisations);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, [user]);
  return (
    <Layout>
      {error && <span>alert(error)</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="donar-heading">Organisation Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.organisationName}</td>
                  <td>{record.email}</td>
                  <td>{record.address}</td>
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

export default Organisation;
