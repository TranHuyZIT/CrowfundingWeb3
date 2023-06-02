import { Formik } from "formik";
import { money } from "../assets";
import { useStateContext } from "../context";
import * as Yup from "yup";
import { useState } from "react";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { checkImageExist } from "../utils";
import { ethers } from "ethers";
import Loader from "../components/Loader";
export default function CreateCampaign() {
  const { createCampaign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      console.log(createCampaign);
      setIsLoading(true);
      console.log({
        ...values,
        target: ethers.utils.parseUnits(values.target + "", 18),
      });
      await createCampaign({
        ...values,
        target: ethers.utils.parseUnits(values.target + "", 18),
      });
      setIsLoading(false);
      alert("Created successfully!");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string("Your name must be a string.")
      .max(50, "Maximum character is 50.")
      .required("Your name cannot be empty."),
    title: Yup.string("Your title must be a string.")
      .max(100, "Maximum character is 100.")
      .required("Your title cannot be empty."),
    description: Yup.string("Your description must be a string.")
      .max(500, "Maximum character is 500.")
      .required("Your description cannot be empty."),
    target: Yup.number("Your target must be a number.")
      .moreThan(0, "Target must be greater than 0.")
      .required("Your target cannot be empty."),
    deadline: Yup.string("Your deadline must be a string.").required(
      "Your deadline cannot be empty."
    ),
    image: Yup.string()
      .url("Image must be a url")
      .test("imageCheck", "Invalid Image", checkImageExist),
  });

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          title: "",
          target: "",
          deadline: "",
          image: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldTouched,
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[65px] flex flex-col gap-[30px]"
            >
              <div className="flex flex-wrap gap-[40px]">
                <FormField
                  errors={errors}
                  touched={touched}
                  labelName="Your Name *"
                  placeholder="John Doe"
                  inputType="text"
                  handleChange={handleChange}
                  field="name"
                />
                <FormField
                  errors={errors}
                  touched={touched}
                  labelName="Campaign Title *"
                  placeholder="Write a title"
                  inputType="text"
                  handleChange={handleChange}
                  field="title"
                />
              </div>

              <FormField
                errors={errors}
                touched={touched}
                labelName="Description *"
                placeholder="Write your description"
                isTextArea
                handleChange={handleChange}
                field="description"
                setFieldTouched={setFieldTouched}
              />

              <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                <img
                  src={money}
                  alt="money"
                  className="w-[40px] h-[40px] object-contain"
                />
                <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                  You will get 100% of the raised amount
                </h4>
              </div>

              <div className="flex flex-wrap gap-[40px]">
                <FormField
                  errors={errors}
                  touched={touched}
                  labelName="Goal *"
                  placeholder="ETH 0.50"
                  inputType="number"
                  handleChange={handleChange}
                  field="target"
                />
                <FormField
                  errors={errors}
                  touched={touched}
                  labelName="End Date *"
                  placeholder="End Date"
                  inputType="date"
                  field="deadline"
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-center">
                <FormField
                  errors={errors}
                  touched={touched}
                  labelName="Campaign image *"
                  placeholder="Place image URL of your campaign"
                  inputType="text"
                  handleChange={handleChange}
                  field="image"
                />
                {!errors.image && (
                  <img
                    className="w-[200px] object-center mt-2
                "
                    src={values.image}
                  />
                )}
              </div>

              <div className="flex justify-center items-center mt-[40px]">
                <CustomButton
                  btnType="submit"
                  title="Submit new campaign"
                  styles="bg-[#1dc071]"
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
