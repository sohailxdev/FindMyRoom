
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { Bath, Bed, Home, IndianRupee, MapPin, ThumbsUp } from 'lucide-react';

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



interface roomData{
    data : data,
}



function Roomcard({data}: roomData){
    const navigate = useNavigate();
    
    return <>
    <Link to={`/roomdetails/${data._id}`}  className="h-[440px]  hover:scale-105  mt-5 rounded-xl  relative p-[2px]  ">
                <div className=" absolute inset-0 rounded-xl  bg-white shadow-lg flex flex-col items-center justify-center ">

                    
                    


                    <Swiper
                        slidesPerView={1} // Default for small screens
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper relative h-[70%] w-full rounded-xl"
                        >
                            {
                                data.roomsImageUrls.map((url, i) => {
                                    return <SwiperSlide key={i} className="absolute inset-0">
                                        <div>
                                            <div className="absolute inset-0 z-0 rounded-xl" style={{backgroundImage: `url(${url})`, backgroundSize: 'cover' , backgroundPosition: 'center'}}></div>
                                            <div className="absolute z-30 right-6 top-4 bg-[#E46F24] px-2 py-1 rounded-xl  text-black font-semibold ">{data.type}</div>
                                            
                                            <div className="absolute z-30 bottom-4 left-3 bg-gray-100 hover:scale-105 rounded-md  h-[70px] w-[80px] flex items-center justify-center  ">
                                                <div onClick={() => navigate(`/userdetails/${data?.owner._id}`)} className="rounded-[50%] border-2 border-black h-13 w-13 relative overflow-hidden cursor-pointer">
                                                    <div style={{backgroundImage: `url(${data.owner.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'></div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                    </Swiper>


                    <div className="h-30% rounded-xl w-full relative px-3 py-1 ">
                        <div className='text-black flex items-center justify-start font-semibold text-lg'>
                            {data.description.slice(0,28)}....
                        </div>
                        <div className='text-gray-500 flex items-center justify-between gap-1 mt-1 text-[15px] '>
                            <div className='flex items-center justify-between gap-1'><MapPin size={'16px'} /> <p>{data.address} , {data.state}</p></div>
                            <div className='flex items-center justify-end gap-1 text-[16px] text-black '><ThumbsUp size={'16px'} className='text-black' /> {data.likes.length}</div>
                        </div>

                        <div className='flex items-center justify-between w-full mt-1'>
                            <div className='flex items-center justify-center gap-2'> 
                                <Home size={'18px'} className='text-[#0EA5E9]' /> <p>{data.type}</p> 
                            </div>
                            <div className='flex items-center justify-center gap-2'> 
                                <Bed size={'18px'} className='text-[#0EA5E9]'/> {data.beds} {parseInt(data.beds) > 1 ? 'Beds' : 'Bed'} 
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <Bath size={'18px'} className='text-[#0EA5E9]' /> {data?.baths} Bath
                            </div>
                            
                        </div>

                        <div className='border-t-2 border-gray-300 flex items-center justify-between pt-1 mt-2'>
                            <div className='flex items-center text-[#6B7290]'> <IndianRupee size={'16px'} className='mt-1 font-bold text-[#0EA5E9]' /> <span className='text-[#0EA5E9] font-bold '>{data.price}</span>/month</div>
                            <div className='text-sm rounded-xl bg-[#F0F9FF] text-[#4EBDEF] px-2 py-1 '>{data.isAvailable ? "Available Now" : "Already Booked"}</div>
                        </div>



                    </div>
                </div>
                
            </Link >
    </>
}


export default Roomcard;