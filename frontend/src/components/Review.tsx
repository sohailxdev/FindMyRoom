
import { FaStar } from "react-icons/fa";

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
interface data{
    review: review
}



function Review ({review}: data){
    return <>
    <div className="h-auto text-black rounded-md  border-2 border-gray-200   bg-[#E5E7EB] px-6 py-5 ">
        <div className="flex items-center gap-4 justify-start">
            <div className="bg-green-500 rounded-full overflow-hidden h-12 w-12 relative flex items-center justify-center">
                <div style={{backgroundImage: `url(${review.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
                </div>
            </div>
            <div className="">
                <p className="text-xl font-bold text-black"> {review.name} </p>
                <p className="text-gray-600"> {review.userDetails.country} </p>
            </div>
        </div>

        <div className="my-4 mx-1 text-sm flex items-center gap-1  ">
            <FaStar size={'15px'} /> {review.ratings}
        </div>

        <div className="text-black text-[17px]">
            {review.content}
        </div>
    </div>
    </>
}


export default Review; 