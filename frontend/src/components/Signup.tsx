/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudUrl = import.meta.env.VITE_CLOUD_URL;
  const api = import.meta.env.VITE_API_URL;

  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function redirect() {
    const tab = localStorage.getItem("activeLink");
    if (!tab || tab === "/") {
      navigate("/");
    } else {
      navigate(`/${tab}`);
    }
  }

  async function submitSignupForm() {
    if (
      userNameRef.current?.value === undefined ||
      userNameRef.current.value === ""
    ) {
      userNameRef.current?.focus();
    } else if (
      emailRef.current?.value === undefined ||
      emailRef.current.value === ""
    ) {
      emailRef.current?.focus();
    } else if (
      passwordRef.current?.value === undefined ||
      passwordRef.current.value === ""
    ) {
      passwordRef.current?.focus();
    } else if (
      countryRef.current?.value === undefined ||
      countryRef.current.value === ""
    ) {
      countryRef.current?.focus();
    } else if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image...",
        confirmButtonText: "Ok",
      });
    } else {
      const userName = userNameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const country = countryRef.current.value;

      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", `${uploadPreset}`);
      formData.append("cloud_name", `${cloudName}`);

      setIsLoading((s) => !s);
      let imageUrl: string;
      try {
        const resp = await axios.post(`${cloudUrl}`, formData);
        imageUrl = resp.data.secure_url;
      } catch (error) {
        setIsLoading((s) => !s);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error while uploading image, Please try after sometime...",
          confirmButtonText: "Ok",
        });
        return;
      }

      try {
        try {
          await axios.post(`${api}/api/v1/user/signup`, {
            userName,
            email,
            password,
            country,
            imageUrl,
          });
        } catch (error) {
          setIsLoading((s) => !s);
          if (axios.isAxiosError(error) && error.response) {
            const statusCode = error.response.status;
            if (statusCode === 400) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid input. Please check your details....",
                confirmButtonText: "Ok",
              });
            } else if (statusCode === 409) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "email already exists. Try logging in.....",
                confirmButtonText: "Ok",
              });

              emailRef.current.focus();
              setIsEmailExist((s) => !s);
            } else if (statusCode === 410) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "eusername already exists. Try logging in.....",
                confirmButtonText: "Ok",
              });

              userNameRef.current.focus();
              setIsUserNameExist((s) => !s);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to create an account. Please try again later.....",
                confirmButtonText: "Ok",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong. Please try again later.....",
              confirmButtonText: "Ok",
            });
          }
          return; // Exit the function if an error occurs
        }

        setIsEmailExist((s) => !s);
        setIsUserNameExist((s) => !s);
        setIsLoading((s) => !s);
        Swal.fire({
          title: "sucess",
          text: "Sign up Sucessfully...",
          icon: "success",
          timer: 3000,
          confirmButtonText: "OK",
        });
        redirect();
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.....",
          confirmButtonText: "Ok",
        });
        setIsLoading((s) => !s);
      }
    }
  }

  function changeImage(e: React.ChangeEvent<HTMLInputElement>): void {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      console.log(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    setImage(null);
    setPreview("");
  }

  return (
    <div className="h-auto min-h-screen w-full bg-[#F9FAFB]  text-black font-semibold text-lg flex items-center justify-center py-15">
      <div
        className={`relative  bg-white shadow-lg shadow-gray-300  w-[310px] sm:w-[360px] md:w-[400px] lg:w-[600px] flex px-6 py-4 md:py-6 lg:py-8 rounded-xl  flex-col `}
      >
        <X
          onClick={redirect}
          className=" cursor-pointer absolute right-5 hover:border-2 hover:border-black rounded-md text-black"
        />

        <h2 className="text-3xl text-[#0EA5E9] font-semibold mt-[4vh] text-center ">
          sign up
        </h2>

        <div className="mt-[8vh] ">
          <div className="relative text-sm md:text-lg my-2">
            <p>UserName : * </p>
            <input
              type="text"
              ref={userNameRef}
              placeholder="Enter your UserName"
              className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  ${
                isUserNameExist ? "focus:outline-red-600" : ""
              } `}
            />
            {isUserNameExist && (
              <div className="absolute text-red-500 right-1 -bottom-1">
                * UserName already exist
              </div>
            )}
          </div>
          <div className="relative text-sm md:text-lg my-2">
            <p>Email : * </p>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your Email"
              className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  ${
                isEmailExist ? "focus:outline-red-600" : ""
              } `}
            />
            {isEmailExist && (
              <div className="absolute text-red-500 right-1 -bottom-1">
                * Email already exist
              </div>
            )}
          </div>
          <div className="mt-2 text-sm md:text-lg">
            <p>Pasword : * </p>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  "
            />
          </div>
          <div className="mt-2 text-sm md:text-lg">
            <p>Country : * </p>
            <input
              type="text"
              ref={countryRef}
              placeholder="Enter your country"
              className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  "
            />
          </div>
          <p className="my-2 text-sm md:text-lg">UserImage : * </p>

          <div className="mt-2 ">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Image previews */}
              {preview !== "" && (
                <div className="relative">
                  <img
                    src={preview}
                    alt={`Image preview `}
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 className="h-4 w-4 cursor-pointer" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 text-sm md:text-lg">
              {/* Upload button */}
              {image === null && (
                <label className="h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-sm md:text-lg text-gray-500">
                    Add Photo
                  </span>
                  <input
                    type="file"
                    id="photos"
                    accept="image/*"
                    className="hidden"
                    onChange={changeImage}
                    multiple
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <span className="mt-4 text-right font-medium text-sm md:text-[18px] cursor-pointer text-black">
          Already have an account ?{" "}
          <Link to={"/signin"} className="text-[#0EA5E9]">
            {" "}
            sign in
          </Link>{" "}
        </span>

        <button
          className="bg-[#0EA5E9] mx-4 text-white rounded-2xl font-bold text-sm md:text-lg px-8 py-1 mt-[6vh] cursor-pointer hover:bg-[#0C4A6E] "
          onClick={submitSignupForm}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
