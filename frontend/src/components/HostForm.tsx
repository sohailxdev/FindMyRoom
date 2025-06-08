/* eslint-disable @typescript-eslint/no-unused-vars */
// import { X } from "lucide-react";

import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function HostForm(){
    const navigate =  useNavigate();
    const api = import.meta.env.VITE_API_URL;

    const nameRef = useRef<HTMLInputElement>(null);
    const YOERef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const pincodeRef = useRef<HTMLInputElement>(null);


    
    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
    }


    async function submitForm(){
        if(nameRef.current?.value === undefined || nameRef.current.value === ""){
            nameRef.current?.focus();
            
        }else if (YOERef.current?.value === undefined || YOERef.current.value === ""){
            YOERef.current?.focus();
            
        }else if (stateRef.current?.value === undefined || stateRef.current.value === ""){
            stateRef.current?.focus();
            
        }else if (cityRef.current?.value === undefined || cityRef.current.value === ""){
            cityRef.current?.focus();
            
        }else if (pincodeRef.current?.value === undefined || pincodeRef.current.value === ""){
            pincodeRef.current?.focus();
            
        }else{
            const name = nameRef.current.value;
            const YOE = YOERef.current.value;
            const city = cityRef.current.value;
            const state = stateRef.current.value;
            const pincode = pincodeRef.current.value;
            
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (token){
                try{
                    let res;
                    try{
                        res = await axios.post(`${api}/api/v1/seller/newseller` , {
                            name,
                            YOE,
                            city, 
                            state,
                            pincode
                        },
                        {
                            headers : {
                                'token' : localStorage.getItem('token')
                            }
                        }
                    );
    
                    
                    }catch(error){
                        setIsLoading(s => !s);
                        if (axios.isAxiosError(error) && error.response) {
                            const statusCode = error.response.status;
                            if (statusCode === 401) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Unauthorized access. Please Sign in.....",
                                    confirmButtonText: "Ok"
                                });
                            } else if (statusCode === 420) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Seller already exist.....",
                                    confirmButtonText: "Ok"
                                });
                            } else if (statusCode === 403) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "User not found.....",
                                    confirmButtonText: "Ok"
                                });
                            }else if (statusCode === 501) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Sellers model is not initialized.....",
                                    confirmButtonText: "Ok"
                                });
                            } else{
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Failed to process your data. Please try again later....",
                                    confirmButtonText: "Ok"
                                });
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Internal error. Please try again later....",
                                confirmButtonText: "Ok"
                            });
                            
                        }
                        return; // Exit the function if an error occurs
                    }
                    
                    localStorage.setItem('sellerToken' , res.data.data);
                    setIsLoading(false);
                    Swal.fire({
                        text : "Sign in Sucessfully...",
                        icon: "success",
                        timer: 3000,
                        title: "sucess",
                        confirmButtonText: "OK"
                    });
                    redirect();
                }catch(error){
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "Something went wrong , try after sometime...",
                        confirmButtonText: "OK"
                    })
                }
            }else {
                Swal.fire({
                    icon: 'warning',
                    text: 'Please sign in first....',
                    title: 'Oops',
                    confirmButtonText: 'Ok'
                });
                setIsLoading(false);
            }
            
        }
    }



    const [isLoading , setIsLoading] = useState(false);
   return <>
   <div className="min-h-screen h-auto py-15 bg-[#F9FAFB] w-full flex items-center justify-center text-black">

        <div className=" relative bg-white shadow-lg shadow-gray-300  w-[310px] sm:w-[360px] md:w-[400px] lg:w-[600px] flex px-6 py-4 md:py-6 lg:py-8 rounded-xl  flex-col ">
            <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-black rounded-md text-balck "/> 
        
            <h2 className="text-3xl text-[#0EA5E9] font-semibold mt-[4vh] text-center ">Become a Host</h2>
            <div className="mt-[8vh]">
            <p className="text-sm md:text-lg mt-3">Name : </p>
            <input type="text" ref={nameRef}  placeholder="Enter your full name" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  " />
            </div>
            <div className="">
            <p className="text-sm md:text-lg mt-3">Years of Experience : </p>
            <input type="text" ref={YOERef}  placeholder="Enter your years of experience" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4 " />
            </div>

            <div>
                <p className="text-sm md:text-lg mt-3">state :</p>
                <input type="text" ref={stateRef} placeholder="Enter your state" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  " />
            </div>

            <div>
                <p className="text-sm md:text-lg mt-3">city :</p>
                <input type="text" ref={cityRef}  placeholder="Enter your city" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  " />
            </div>

            <div>
                <p className="text-sm md:text-lg  mt-3">pincode :</p>
                <input type="text" ref={pincodeRef}  placeholder="Enter your pincode" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  " />
            </div>


            <button onClick={submitForm} className="bg-[#0EA5E9] mx-4 text-sm md:text-lg text-white rounded-2xl font-bold  px-8 py-1 mt-[6vh] cursor-pointer hover:bg-[#0C4A6E]">
                {
                    isLoading ? "Submitting..." : "Submit"
                }
            </button>
            
        </div>
   </div>
   </>
}


export default HostForm;