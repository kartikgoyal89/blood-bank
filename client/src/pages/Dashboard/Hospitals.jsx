import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const Hospitals = () => {
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);

  // find organisation records
  const getOrganisations = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganisations();
  }, []);
  return (
    <Layout>
      {error && <span>alert(error)</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="donar-heading">Hospital Details</h1>
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

export default Hospitals;
