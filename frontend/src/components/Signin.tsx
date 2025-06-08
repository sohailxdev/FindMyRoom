/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";








interface User{
    _id: string,
    userName: string,
    email: string,
    password: string,
    country: string,
    state: string | undefined,
    area: string | undefined,
    city: string,
    pincode: string | undefined,
    saved: string[] | null ,
    likes: string[] | null ,
    dislikes: string[] | null ,
    bookedRooms: string[] | null,
    imageUrl: string
}

interface signin {
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

function Signin({setUser , setIsLoggedIn} : signin){

    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_URL;


    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    
    const [isEmailDoesnotExist , setIsEmailDoesnotExist] = useState(false);
    const [isLoading , setIsLoading] = useState(false);



    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }



    async function submitSigninForm(){
        if(emailRef.current?.value === undefined || emailRef.current.value === ""){
            emailRef.current?.focus();
            
        }else if (passwordRef.current?.value === undefined || passwordRef.current.value === ""){
            passwordRef.current?.focus();
            
        }else {
            
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            try{
                setIsLoading(s => !s);
                let res;
                try {
                    res = await axios.post(`${api}/api/v1/user/signin`, {
                        email,
                        password,
                    });
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 404) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Invalid input. Please check your details.....",
                                confirmButtonText: "Ok"
                            });
                            
                            emailRef.current.focus();
                            setIsEmailDoesnotExist(true);
                        } else if (statusCode === 403) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "User does not exist. Please signup....",
                                confirmButtonText: "Ok"
                            });
                            
                            emailRef.current.focus();
                            setIsEmailDoesnotExist(s => !s);
                        }else if (statusCode === 402) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Invalid credentials. Please check....",
                                confirmButtonText: "Ok"
                            });
                            
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Failed to sign in. Please try again later....",
                                confirmButtonText: "Ok"
                            });
                            
                        }
                        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Something went wrong. Please try again later....",
                            confirmButtonText: "Ok"
                        });
                        
                    }
                    return; // Exit the function if an error occurs
                }
                
                localStorage.setItem('token' , res.data.data.token);
                localStorage.setItem('userImgUrl' , res.data.data.userData.imageUrl);
                localStorage.setItem('sellerToken' , res.data.data.sellerToken);
                setUser(res.data.data.userData);
                
                setIsEmailDoesnotExist(s => !s);
                setIsLoading(s => !s);
                setIsLoggedIn(true);
                Swal.fire({
                    title: "sucess",
                    text : "Sign in Sucessfully...",
                    icon: "success",
                    timer: 3000,
                    confirmButtonText: "OK"
                });
                redirect();
            }catch(e){
                Swal.fire({
                    icon: 'error',
                    title: "Oops...",
                    text: "Something went wrong. Try after sometimes....",
                    confirmButtonText: "Ok"
                });
                setIsLoading(s => !s);
                
            }

        }
    }



    return <div className="h-auto min-h-screen w-full text-black font-semibold text-lg flex items-center justify-center bg-[#F9FAFB] py-15 ">
    <div className="relative bg-white shadow-lg shadow-gray-300  w-[310px] sm:w-[360px] md:w-[400px] lg:w-[600px] flex px-6 py-4 md:py-6 lg:py-8 rounded-xl  flex-col">
        
        <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-black rounded-md text-black "/> 
        
        <h2 className="text-3xl text-[#0EA5E9] font-semibold mt-[4vh] text-center ">sign in</h2>

        <div className="mt-[8vh] ">
            <div className="relative text-sm md:text-lg my-2">
                <p>Email : * </p>
                <input type="email" ref={emailRef} placeholder="Enter your Email" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  ${isEmailDoesnotExist ? "focus:outline-red-600" : "" } `} />
                {
                    isEmailDoesnotExist && <div className="absolute text-red-500 right-1 -bottom-1">* Email already exist</div>
                }
            </div>
            <div className="relative text-sm md:text-lg my-2">
                <p>Pasword : * </p>
                <input type="password" ref={passwordRef} placeholder="Enter your password" className="rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full mb-3 mt-1 h-[40px] px-4  " />
            </div>
        </div>

        <Link to={"/forgetPassword"} className="text-right text-[#0EA5E9] cursor-pointer text-sm md:text-lg ">Forget Password ?</Link>
        <span className="text-right text-sm md:text-lg cursor-pointer text-black">Don't have an account ? <Link to={"/signup"} className="text-[#0EA5E9] text-sm md:text-lg"> sign up</Link> </span>




        <button className="bg-[#0EA5E9] mx-4 text-sm md:text-lg text-white rounded-2xl font-bold  px-8 py-1 mt-[6vh] cursor-pointer hover:bg-[#0C4A6E] "
        onClick={submitSigninForm}>
            {
                isLoading ? "Submitting..." : "Submit"
            }
        </button>
    </div>
    </div>
}

export default Signin;