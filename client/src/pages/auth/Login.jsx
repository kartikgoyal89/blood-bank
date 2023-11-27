import React from "react";
import logo1 from "./../../assets/logo4.jpg";
import InputType from "../../components/shared/Form/InputType.jsx";
import Form from "../../components/shared/Form/Form.jsx";
import Spinner from "./../../components/shared/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src={logo1} alt="" />
          </div>
          <div className="col-md-4 form-container">
            <div className="inner-container">
              <Form
                formTitle={"Login Page"}
                submitBtn={"Login"}
                formType={"login"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

// 2:44:59
