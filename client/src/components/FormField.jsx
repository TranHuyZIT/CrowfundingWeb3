import { Field } from "formik";
import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  handleChange,
  errors,
  touched,
  setFieldTouched,
  field,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
        {labelName}
      </span>
      {isTextArea ? (
        <>
          <textarea
            name={field}
            onChange={(e) => {
              setFieldTouched(field);
              handleChange(e);
            }}
            onBlur={() => setFieldTouched(field)}
            rows={10}
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${
              errors[field] && touched[field] && "border-red-500"
            }`}
          />
          {errors[field] && touched[field] && (
            <div className="text-red-500 font-semibold">{errors[field]}</div>
          )}
        </>
      ) : (
        <>
          <Field
            id={field}
            name={field}
            onChange={handleChange}
            type={inputType}
            step="0.1"
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${
              errors[field] && touched[field] && "border-red-500"
            }`}
          />
          {errors[field] && touched[field] && (
            <div className="text-red-500 font-semibold">{errors[field]}</div>
          )}
        </>
      )}
    </label>
  );
};

export default FormField;
