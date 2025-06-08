/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function ForgetPassword(){

    const api = import.meta.env.VITE_API_URL;

    const [isLoading , setIsLoading] = useState(false);
    const [notPasswordMatch , setNotPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    async function submitForgetPasswordForm(){
        if (emailRef.current?.value === undefined || emailRef.current.value === "" ){
            emailRef.current?.focus();
        }else if(newPasswordRef.current?.value === undefined || newPasswordRef.current.value === "" ){
            newPasswordRef.current?.focus();
        }else if (confirmPasswordRef.current?.value === undefined || confirmPasswordRef.current.value === "" ){
            confirmPasswordRef.current?.focus();
        }else if (confirmPasswordRef.current.value !== newPasswordRef.current.value ){
            setNotPasswordMatch(s => !s);
        } else{
            const newPass = newPasswordRef.current.value;
            const email = emailRef.current.value;
            
            try{
                setIsLoading(s => !s);
                
                try {
                    await axios.put(`${api}/api/v1/user/forgetPassword`, {
                        newPass,
                        email
                    });
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 404) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops',
                                text: "Can't find your details. Please try after sometime....",
                                confirmButtonText: 'OK',
                                timer: 3000
                            })
                            
                        }else if (statusCode === 500){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops',
                                text: "Internal error. Please try after sometime....",
                                confirmButtonText: 'OK',
                                timer: 3000
                            })
                            
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops',
                                text: "Failed to change your password. Please try again later.....",
                                confirmButtonText: 'OK',
                                timer: 3000
                            })
                            
                        }
                        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
                            text: "Something went wrong ....",
                            confirmButtonText: 'OK',
                            timer: 3000
                        })
                        
                    }
                    return; // Exit the function if an error occurs
                }
                
                setNotPasswordMatch(false);
                setIsLoading(s => !s);
                Swal.fire({
                    title: "sucess",
                    text : "Password changed Sucessfully...",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }catch(e){
                setIsLoading(s => !s);
                
            }
        }
    }


    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }


    return <div className="h-auto min-h-screen w-full text-black font-semibold text-lg flex items-center justify-center bg-[#F9FAFB] py-15 ">
    <div className="relative bg-white shadow-lg shadow-gray-300  w-[310px] sm:w-[360px] md:w-[400px] lg:w-[600px] flex px-6 py-4 md:py-6 lg:py-8 rounded-xl  flex-col">
        
        <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-black rounded-md text-black "/> 
        
        <h2 className="text-xl md:text-3xl text-[#0EA5E9] font-semibold mt-[4vh] text-center ">Forget Password</h2>

        <div className="mt-[4vh] ">
            <div className="relative text-sm md:text-lg my-2">
                <p>Email : * </p>
                <input type="email" ref={emailRef} placeholder="Enter your email" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4 ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
            </div>
            <div className="relative text-sm md:text-lg my-2">
                <p>New password : * </p>
                <input type="password" ref={newPasswordRef} placeholder="Enter your new password" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4 ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
            </div>
            <div className="relative text-sm md:text-lg my-2">
                <p>Confirm pasword : * </p>
                <input type="password" ref={confirmPasswordRef} placeholder="Enter your new password" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
                {
                    notPasswordMatch && <div className="absolute text-red-500 text-[18px]  right-1 -bottom-2">* Password doesn't matched</div>
                }
            </div>
        </div>

        <Link to={"/signin"} className="text-right text-sm md:text-lg text-[#0EA5E9] cursor-pointer block mt-2" >sign in ?</Link>



        <button className="bg-[#0EA5E9] mx-4 text-sm md:text-lg text-white rounded-2xl font-bold  px-8 py-1 mt-[6vh] cursor-pointer hover:bg-[#0C4A6E] "
        onClick={submitForgetPasswordForm}>
            {
                isLoading ? "Changing..." : "Change"
            }
        </button>
    </div>
    </div>
}


export default ForgetPassword;