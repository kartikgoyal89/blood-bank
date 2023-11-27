import React from "react";

const InputType = ({
  labelFor,
  labelText,
  inputType,
  value,
  onChange,
  name,
  placeholder,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputType;
