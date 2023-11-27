import React, { useState } from "react";
import InputType from "./../Form/InputType";
import { toast } from "react-toastify";
import API from "./../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handlemodalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast.error("Please provide all fields!");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data.success) {
        alert("New Record added!");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex">
                Blood Type: &nbsp;
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input mt-1"
                    name="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input mt-1"
                    name="inRadio"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={"Please Select Blood Group"}>
                  Please Select Blood Group
                </option>
                <option value={"O-"}>O-</option>
                <option value={"O+"}>O+</option>
                <option value={"A-"}>A-</option>
                <option value={"A+"}>A+</option>
                <option value={"B-"}>B-</option>
                <option value={"B+"}>B+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"AB+"}>AB+</option>
              </select>
              <InputType
                labelText={"Donar Email"}
                labelFor={"donarEmail"}
                InputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                labelText={"Quantity (mL)"}
                labelFor={"quantity"}
                InputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlemodalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
