import React, { useState } from "react";
import InputType from "./InputType.jsx";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService.jsx";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              email,
              password,
              role,
              organisationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
      >
        <h1 className="text-center title">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="Role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="Role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="Role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="Role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>
        {/* SWITCH STATMENT */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    className="input-field"
                    placeholder={"Enter Email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"password"}
                    inputType={"password"}
                    name={"password"}
                    className="input-field"
                    value={password}
                    placeholder={"Enter Password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      className="input-field"
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      placeholder={"Enter Name"}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      placeholder={"Enter Organisation Name"}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forhospitalName"}
                      className="input-field"
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      placeholder={"Enter Hospital Name"}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Email"}
                    labelFor={"email"}
                    className="input-field"
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    placeholder={"Enter Email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    placeholder={"Enter Password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputType
                    labelText={"Website URL"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    placeholder={"Enter Website"}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    className="input-field"
                    name={"address"}
                    value={address}
                    placeholder={"Enter Address"}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Contact no."}
                    labelFor={"forContact"}
                    inputType={"text"}
                    name={"phone"}
                    className="input-field"
                    value={phone}
                    placeholder={"Enter Enter Contact No."}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-column justify-content-between">
          <div className="login-link">
            {formType === "login" ? (
              <p>
                Not registered yet? Register
                <Link className="redirect" to="/register">
                  &nbsp;Here!
                </Link>
              </p>
            ) : (
              <p>
                Already registered?
                <Link className="redirect" to="/login">
                  &nbsp;Login!
                </Link>
              </p>
            )}
          </div>
          <div>
            <button className="btn btn-danger" type="submit">
              {submitBtn}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
