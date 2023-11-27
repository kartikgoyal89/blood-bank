import React from "react";
import logo2 from "./../../assets/logo3.jpg";
import Form from "../../components/shared/Form/Form";
import Spinner from "./../../components/shared/Spinner";
import { useSelector } from "react-redux";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src={logo2} alt="" />
          </div>
          <div className="col-md-4 form-container">
            <div className="inner-container">
              <Form
                formTitle={"Register Page"}
                submitBtn={"Register"}
                formType={"register"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
