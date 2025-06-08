import axios from "axios";
import { X } from "lucide-react";
import {  useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


function NewReview(){
    const api = import.meta.env.VITE_API_URL;

    const {id} = useParams();

    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const ratingRef = useRef<HTMLInputElement>(null);
    const reviewRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading , setIsLoading] = useState(false);



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
        }else if(ratingRef.current?.value === undefined || ratingRef.current.value === ""){
            ratingRef.current?.focus();
        }else if(parseFloat(ratingRef.current?.value) > 5.00 ){
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: 'Rating must be in between 1 to 5',
                confirmButtonText: 'OK'
            });
            ratingRef.current?.focus();
        }else if(reviewRef.current?.value === undefined || reviewRef.current.value === ""){
            reviewRef.current?.focus();
        }else {
            setIsLoading(true);
            const name = nameRef.current.value;
            const ratings = ratingRef.current.value;
            const review = reviewRef.current.value;

            try{
                await axios.post(`${api}/api/v1/review/newreview/${id}`, {
                    name,
                    ratings,
                    review
                },{
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });

                setIsLoading(false);
                Swal.fire({
                    title: "Sucess",
                    icon: "success",
                    text: "Review created sucessfully...",
                    confirmButtonText: "OK"
                });
                redirect();

                
            }catch(error){
                setIsLoading(false);
                if (axios.isAxiosError(error) && error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
                            text: 'Something went wrong...',
                            confirmButtonText: 'OK',
                            timer: 3000
                        })
                    }
                }
            }
        }
    }

    return <>
    <div className="h-auto min-h-screen w-full text-black font-semibold text-lg flex items-center justify-center bg-[#F9FAFB] py-15 ">
        <div className="relative bg-white shadow-lg shadow-gray-300  w-[310px] sm:w-[360px] md:w-[400px] lg:w-[600px] flex px-6 py-4 md:py-6 lg:py-8 rounded-xl  flex-col">
            <X size={"20px"} onClick={redirect} className="absolute cursor-pointer right-3 top-2 hover:border-2 hover:border-black text-black rounded-md"/>
            <h2 className="text-[#0EA5E9] text-center text-xl md:text-2xl lg:text-3xl font-bold ">Add Review</h2>
            <div>
                <div className="mt-[12vh] ">
                    <div className="relative">
                        <p className="text-sm md:text-lg my-2 font-semibold text-black">Your Name : <span className="text-red-500 ml-1">*</span></p>
                        <input type="text" ref={nameRef}  placeholder="Enter your name" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full  h-[40px] px-4`} />
                    </div>
                    <p className="text-sm md:text-lg my-2 font-semibold text-black">Enter your ratings : <span className="text-red-500 ml-1">*</span></p>
                    <input type="text" ref={ratingRef}  placeholder="Enter your ratings (0 to 5)" className={`rounded-xl border-2 border-gray-300 text-black  focus:outline-[#0EA5E9] w-full  h-[40px] px-4`} />
                    <p className="text-sm md:text-lg my-2 font-semibold text-black">Review : <span className="text-red-500 ml-1">*</span></p>
                    <textarea name="Rveview" ref={reviewRef} placeholder="Enter your review here..." className={`rounded-xl border-2 border-gray-300 text-black focus:outline-[#0EA5E9]  bg-white w-full  px-4 pt-1.5`}></textarea>
                </div>
            </div>
            <button onClick={submitForm} className="bg-[#0EA5E9] mx-4 text-sm md:text-lg text-white rounded-2xl font-bold  px-8 py-1 mt-[6vh] cursor-pointer hover:bg-[#0C4A6E] ">
                {
                    isLoading ?
                    "submitting...."
                    :
                    "submit"
                }
            </button>
        </div>
    </div>
    </>
}


export default NewReview;