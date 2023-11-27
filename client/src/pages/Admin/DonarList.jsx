import React, { useState, useEffect } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const DonarList = () => {
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);

  // find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure want to delete this Donar",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
                <th scope="col">Action</th>
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
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
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

export default DonarList;
