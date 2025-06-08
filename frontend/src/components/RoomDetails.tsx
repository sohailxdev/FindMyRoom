/* eslint-disable @typescript-eslint/no-unused-vars */
import {  ArrowLeftIcon,  Bath, BedDouble, CheckCircle2,  Heart, Home, Mail, MapPin, ThumbsDown, ThumbsUp } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Review from "./Review";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Loader from "./Loader";


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
  selected: boolean,
  _id: string
}

interface roomData{
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
  reviews: review[]
}

interface review{
  _id: string,
  userDetails: user,
  roomId : roomData,
  content: string,
  ratings: string,
  name: string
}


function RoomDetails(){

    const api = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const {id} = useParams();
    const [isLiked , setIsLiked] = useState(false);
    const [isDisliked , setIsDisliked] = useState(false);
    const [isSaved , setIsSaved] = useState(false);

    const [data, setData] = useState<roomData | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [isError , setIsError] = useState(false);


    async function likeRoom(){
      setIsLiked(true);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/like` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        cancelDislikeRoom();

      }catch(error){
        setIsLiked(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }

    }

    async function dislikeRoom(){
      setIsDisliked(true);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/dislike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        cancelLikeRoom();

      }catch(error){
        setIsDisliked(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }

    }

    async function cancelDislikeRoom(){
      setIsDisliked(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/undislike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsDisliked(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function cancelLikeRoom(){
      setIsLiked(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/unlike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsLiked(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function saveRoom(){
      setIsSaved(true);
      // backend request to update the data
      try{
        
        await axios.put(`${api}/api/v1/room/${id}/save` , 
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsSaved(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function cancelSaveRoom(){
      setIsSaved(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/unsave` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsSaved(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
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

  useEffect(() => {
    console.log(id);
    if (! localStorage.getItem('token') || localStorage.getItem('token') === undefined || localStorage.getItem('token') === null ){
      Swal.fire({
        icon: 'warning',
        title: 'Sorry !',
        text: 'Please Sign in to access room details...',
        confirmButtonText: 'Ok'
      });
      redirect();
      return;
    }
    const fetchData = async () => {
        setIsLoading(true);
        try{
          let res;
          let isSaved , isLiked , isDisliked;
          try{
              res = await axios.get(`${api}/api/v1/room/roomdetails/${id}`,
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              );
              
              if (res.data.data.user.likes.length === 0){
                isLiked = false;
              } else {
                if (res.data.data.user.likes.includes(id)){
                  isLiked = true;
                } else {
                  isLiked = false ;
                } 
              }

              if (res.data.data.user.dislikes.length === 0){
                isDisliked = false;
              } else {
                if (res.data.data.user.dislikes.includes(id)){
                  isDisliked = true;
                } else {
                  isDisliked = false ;
                } 
              }

              if (res.data.data.user.saved.length === 0){
                isSaved = false;
              } else {
                if (res.data.data.user.saved.includes(id)){
                  isSaved = true;
                } else {
                  isSaved = false ;
                } 
              }

          }catch(error){
              setIsError(true);
              setIsLoading(false);
              if(axios.isAxiosError(error) && error.response){
                  const status = error.response.status;
                  if(status === 404){
                      console.log("room not found...");
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Room details not found...',
                        confirmButtonText: 'OK'
                      });
                      
                  }else if(status === 401){
                    
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Please Sign in first...',
                        confirmButtonText: 'OK'
                      });
                  }else{
                    
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops !',
                      text: 'Error while getting room details...',
                      confirmButtonText: 'OK'
                    })
                  }
              }else{
                  
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops !',
                    text: 'Internal Error',
                    confirmButtonText: 'OK'
                  });
              }
              setIsLoading(false);
              return;
        }
          setIsError(false);
          const newData = res?.data.data.roomDetails;
          console.log(newData);
          setData(newData);
          
          setIsLoading(false);
          setIsLiked(isLiked);
          setIsDisliked(isDisliked);
          setIsSaved(isSaved);
        }catch(error){
          setIsError(true);
            
            setIsLoading(false);
        }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked , isSaved , isDisliked]);

    return <>
    <div className="text-white  left-0 right-0   top-0 z-50 h-auto w-full relative bg-white ">
        
        {
          isError ? 
          <div className="w-full h-screen flex flex-col items-center justify-center text-black text-xl font-bold">
            <div className="text-black text-8xl">Sorry !</div>
            <p className="text-2xl mt-4">Error while getting Room details ...</p>
          </div>
          : 
          <>
          {
            isLoading ? 
            <Loader />
            :
            <>
              <div className="container mx-auto px-4">
                <button onClick={redirect} className="cursor-pointer bg-gray-200 rounded-md px-3 py-1 flex items-center justify-start gap-2 text-black"><ArrowLeftIcon size={'20px'}/> Back</button>
              </div>
              {/**  mobile view  */}
              <div className="bg-[#F3F4F6] ">
              <div className="h-auto py-8 my-8  container mx-auto px-4">
              <Swiper
              slidesPerView={1} // Default for small screens
              rewind={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
                >
              {
                  data?.roomsImageUrls.map((data , i) => {
                  return <SwiperSlide key={i} >
                      <div className="bg-gray-300 relative rounded-xl h-[300px] ">
                        <div style={{backgroundImage: `url(${data})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute rounded-xl z-0 inset-0'>
                          
                        </div>
                      </div>
                  </SwiperSlide>
                  })
              }
              </Swiper>
          
              </div>
              </div>

              {/***   property details   */}

              <div className="py-6 container mx-auto px-4">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 border-r-2 border-gray-200 pr-2" >
                      <div className="flex justify-between items-start">
                        <div className="">
                          <span className="mb-2 px-2 py-1 rounded-xl bg-[#39C0F1]">{data?.type}</span>
                          <h1 className="text-2xl md:text-3xl font-bold mb-2 mt-4 text-black">{data?.title}</h1>
                          <div className="flex items-center text-gray-600 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>
                              {data?.address}, {data?.city}, {data?.state}. {' '}{data?.pincode}, {data?.country}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 md:space-x-6 ">
                          <button className=" flex items-center justify-center gap-2 text-black" >
                            {
                              isSaved ?
                              <>
                              <FaHeart onClick={cancelSaveRoom} className="text-black/80 cursor-pointer" size={'22px'} />{data?.saved.length}
                              </>
                              :
                              <>
                              <Heart onClick={saveRoom} className="w-5 h-5 cursor-pointer" color="black" />{data?.saved.length}
                              </>
                            }
                          </button>
                          <button className=" flex items-center justify-center gap-2 text-black" >
                            {
                              isLiked ?
                              <>
                              <FaThumbsUp onClick={cancelLikeRoom} className="text-black/80 cursor-pointer" size={'22px'} /> {data?.likes.length}
                              </>
                              :
                              <>
                              <ThumbsUp onClick={likeRoom} color="black" className="w-5 h-5 cursor-pointer" /> {data?.likes.length}
                              </>
                            }
                          </button>
                          <button className=" flex items-center justify-center gap-2 text-black" >
                            {
                              isDisliked ?
                              <>
                              <FaThumbsDown onClick={cancelDislikeRoom}  size={'22px'} className="text-black/80 cursor-pointer" /> {data?.dislikes.length}
                              </>
                              :
                              <>
                              <ThumbsDown onClick={dislikeRoom} color="black" className="w-5 h-5 cursor-pointer" />{data?.dislikes.length}
                              </>
                            }
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center">
                            <Home className="w-5 h-5 text-[#0EA5E9] mr-1" />
                            <span className="font-medium text-black">{data?.type}</span>
                          </div>
                          <span className="text-sm text-gray-600">Type</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center">
                            <BedDouble className="w-5 h-5 text-[#0EA5E9] mr-1" />
                            <span className="font-medium text-black">{data?.beds}</span>
                          </div>
                          <span className="text-sm text-gray-600">Beds</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center">
                            <Bath className="w-5 h-5 text-[#0EA5E9] mr-1" />
                            <span className="font-medium text-black">{data?.baths}</span>
                          </div>
                          <span className="text-sm text-gray-600">Baths</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-black">Description</h2>
                        <p className="text-gray-700 leading-relaxed">
                          {data?.description}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-black">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {data?.amenities.map(amenity => (
                            amenity.selected && 
                            <div key={amenity.id} className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-[#0EA5E9] mr-2" />
                              <span className="text-[#1B202E]">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* Right Column - Price and Contact */}
                    <div >
                      <div className="sticky top-20">
                        <div className="p-6">
                          <div className="text-center mb-4">
                            <div className="text-2xl font-bold text-[#0EA5E9]">
                              ₹{data?.price}
                              <span className="text-lg text-gray-500 font-normal">
                                /{data?.priceUnit}
                              </span>
                            </div>
                            <div className="mt-1 text-black">
                              {data?.isAvailable ? 'Available Now' : 'Already Booked'}
                            </div>
                          </div>
                          
                          <div className="border-t border-b py-4 my-4">
                            <div className="flex items-center mb-3">
                              <img 
                                src={data?.owner.userDetails.imageUrl} 
                                alt={data?.owner.name}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <h3 className="font-medium text-lg text-black">{data?.owner.name}</h3>
                                <p className="text-sm text-gray-600">Property Owner</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <button className="w-full bg-[#0EA5E9] hover:bg-[#0C4A6E] flex items-center justify-center py-2 rounded-md cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" />
                              {data?.sellerEmail}
                            </button>
                            <button className="w-full bg-[#0EA5E9] hover:bg-[#0C4A6E] text-center py-2 rounded-md cursor-pointer">
                              Book Now
                            </button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/**   review section    */}
 
              <div className="h-auto py-12 container mx-auto px-4 ">
              {
                data?.reviews.length === 0 ?
                <div className="w-full h-auto flex items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-black text-black font-bold transition-all">Add new Review</Link>
                </div>
                :
                <>
                <Swiper
                slidesPerView={1} // Default for small screens
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2, // For small screens (sm)
                  },
                  768: {
                    slidesPerView: 3, // For medium screens (md)
                  },
                  1024: {
                    slidesPerView: 4, // For large screens (lg)
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
                  >
                {
                    data?.reviews.map((review , i) => {
                    return <SwiperSlide key={i} ><Review review={review}/></SwiperSlide>
                    })
                }
                </Swiper>
                <div className="w-full h-auto flex mt-4 items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-black text-black font-bold transition-all">Add new Review</Link>
                </div>
                </>
              }
              
          
              </div>
            </>
          }
            
          </>
        }
    </div>
    </>
}


export default RoomDetails;