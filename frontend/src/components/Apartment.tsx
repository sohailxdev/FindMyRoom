
import { useRef, useState } from "react";
import RoomCardsSection from "./RoomCardsSection";
import axios from "axios";
import Roomcard from "./Roomcard";
import Swal from "sweetalert2";
import { MapPin, Search } from "lucide-react";

import './Home.css';





interface user{
    _id: string,
    userName: string,
    email: string,
    imageUrl : string,
    password: string,
    city:string,
    country: string,
    saved: {_id:string}[],
    likes: {_id:string}[],
    dislikes: {_id: string}[],
    bookedRooms: {_id:string}[],
    pincode: string,
    state: string
}


interface owner{
    _id : string,
    name: string,
    userDetails: user,
    experience: string,
    rooms: {_id:string}[]
}

interface amenities{
    id: string,
    name: string,
    selected: boolean
}

interface data{
    _id: string,
    title: string,
    owner: owner,
    description: string,
    roomsImageUrls: string[],
    address: string,
    price: number,
    country: string,
    type: string,
    city : string,
    likes: {_id: string}[],
    dislikes: {_id: string}[],
    saved: {_id: string}[],
    state: string,
    area: string,
    pincode: string,
    sellerEmail: string,
    beds: string,
    baths: string,
    priceUnit: string,
    amenities: amenities[],
    isAvailable: boolean,
    reviews: {_id:string}[]
}






function Apartment(){
    const api = import.meta.env.VITE_API_URL;


    const [roomDetails , setRoomDetails] = useState<data[] | null>(null);
    const timer = useRef(0);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isLoading , setIsLoading] = useState(false);

    async function mainFun(val: string){
        
        try{
            const res = await axios.get(`${api}/api/v1/room/searchFromApartment?query=${val}`);
            
            setRoomDetails(res.data.data);
            setIsLoading(false);
            
        }catch(error){
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status;
                if(status === 404){
                    Swal.fire({
                        icon: 'error',
                        title: "Oops...",
                        text: "Something went wrong. Please try again later.....",
                        confirmButtonText: "Ok"
                    });
                }
            }
            
        }
    }

    async function search(){
        setIsLoading(true);
        const val = searchRef.current?.value;
        try{
            const res = await axios.get(`${api}/api/v1/room/searchFromApartment?query=${val}`);
            
            setRoomDetails(res.data.data);
            setIsLoading(false);
        }catch(error){
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status;
                if(status === 404){
                    Swal.fire({
                        icon: 'error',
                        title: "Oops...",
                        text: "Something went wrong. Please try again later.....",
                        confirmButtonText: "Ok"
                    });
                }
            }
            
        }
    }
    
    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            
            const val = e.target.value;
            if (val === ""){
                setRoomDetails(null);
                return;
            }
            setIsLoading(true);
            mainFun(val);
        }, 1000);
    }


    return <>
        <div className="w-full h-auto min-h-screen relative">
        <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
                    }}>
                    <div className="absolute inset-0 hero-gradient opacity-90"></div>
                </div>
                <div className="absolute inset-0 z-30 flex items-center  justify-center pt-25  md:gap-2 gap-4 flex-col  " >
                    <div className="max-w-3xl mx-auto text-center text-white mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Find Your Perfect Stay
                        </h1>
                        <p className="text-lg md:text-xl opacity-90">
                            Discover the best hostels, PGs, apartments, and mess facilities at your preferred location
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 flex-col md:flex-row bg-white px-10 py-8  lg:py-10 rounded-md ">
                        <div className="relative">
                            <input type="text" ref={searchRef} onChange={onChangeInput} placeholder=" City , Area , country or Address"  className="bg-white border-2 border-gray-300 hover:border-2 hover:border-[#0EA5E9]  w-[70vw] md:w-[60vw] lg:w-[55vw] rounded-2xl text-md outline-none focus:border-2 focus:border-[#0EA5E9] text-black py-3 pr-4 pl-8"/>
                            <MapPin className="absolute top-4 left-2 text-gray-400" size={'20px'} />
                        </div>
                        <button onClick={search} className="text-white bg-[#0EA5E9] text-md   px-4 py-3 rounded-2xl cursor-pointer hover:bg-[#0C4A6E] w-full md:w-auto hover:text-white font-semibold transition-colors flex items-center justify-center gap-2"> <Search size={'20px'}/>Search</button>
                    </div>
                    <div className="flex items-center justify-center gap-4 flex-wrap text-white mt-8  ">
                        <div className="flex items-center justify-between gap-2 "> <div className="rounded-full  bg-white/20 h-11 w-11 flex items-center justify-center font-bold text-lg ">10k+</div>Listed Properties</div>
                        <div className="flex items-center justify-between gap-2 "> <div className="rounded-full  bg-white/20 h-11 w-11 flex items-center justify-center font-bold text-lg ">50+</div>Cities Covered</div>
                        <div className="flex items-center justify-between gap-2 "> <div className="rounded-full  bg-white/20 h-11 w-11 flex items-center justify-center font-bold text-lg ">8k+</div>Happy Customers</div>
                    </div>
                    
                </div>
            </div>

            <div className=" w-full h-auto text-black py-4 mt-20  ">
                {
                    isLoading ? 
                    <div className="text-black text-xl font-semibold text-center">Loading Rooms data...</div>
                    :
                    <div>
                        {
                            ( roomDetails === null)?
                            <RoomCardsSection path={'/apartment'}  />
                            :
                            <div className=" flex md:flex-row flex-col flex-wrap  items-center justify-evenly gap-6">
                                {
                                    roomDetails.length === 0 ?
                                    <div className="text-black text-xl font-semibold">No such Rooms available</div>
                                    :
                                    roomDetails.map((room ) => {
                                        return <Roomcard key={room._id} data={room}/>
                                    })
                                }
                            </div>
                            
                        }
                        
                    </div>
                }
            </div>
        </div>
    </>
}


export default Apartment;