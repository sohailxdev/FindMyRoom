import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense, useState } from "react"
import 'swiper/swiper-bundle.css';
import '../node_modules/swiper/modules/pagination-element.min.css';
import '../node_modules/swiper/modules/zoom.css';
import '../node_modules/swiper/modules/navigation.css';




import Navbar from "./components/Nav";
const Hostel = lazy(() => import("./components/Hostel"));
const Mess = lazy(() => import("./components/Mess"));
const PG = lazy(() => import("./components/Pg"));
const Apartment = lazy(() => import("./components/Apartment"));
const Home = lazy(() => import("./components/Home"));
const Signup = lazy(() => import("./components/Signup"));
const Signin = lazy(() => import("./components/Signin"));
const ForgetPassword = lazy(() => import("./components/ForgetPassword"));
const RoomDetails = lazy(() => import("./components/RoomDetails"));
const HostForm = lazy(() => import("./components/HostForm"));
const CreateNewRoom = lazy(() => import("./components/CreateNewRoom"));
const NewReview = lazy(() => import("./components/NewReview"));
const NotFound = lazy (() => import("./components/NotFound"));


import Loader from "./components/Loader"
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import AddProperty from "./components/AddProperty";
import SmoothScroll from "./components/SmoothScroll";





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



function App() {


  const [isLoggedIn , setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token? true : false;
  });
  const [user , setUser] = useState<User | null>(null);

  return (

    <div className="">
      <SmoothScroll />
      <BrowserRouter>
        <Suspense fallback={<Loader />} >
        <Routes>
          
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/pg" element={<PG/>}></Route>
            <Route path="/hostel" element={<Hostel/>}></Route>
            <Route path="/mess" element={<Mess/>}></Route>
            <Route path="/apartment" element={<Apartment/>}></Route>
            
            
          </Route>
          <Route path="/" element={<Layout1  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} >
          <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin  setIsLoggedIn={setIsLoggedIn}  setUser={setUser}/>}></Route>
            <Route path="/roomdetails/:id" element={<RoomDetails/>}></Route>
            <Route path="/newhost" element={<HostForm/>}></Route>
            <Route path="/newroom" element={<CreateNewRoom/>}></Route>
            <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
            <Route path="/createnewroom" element={<CreateNewRoom/>}></Route>
            <Route path="/newreview/:id" element={<NewReview/>}></Route>
          </Route>
          
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}



interface Layout{
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function Layout({isLoggedIn , setIsLoggedIn , user , setUser}: Layout){

  return <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
    
    <ErrorBoundary>
      <Outlet/>
    </ErrorBoundary>
    <AddProperty />
    <Footer />
  </>
}



function Layout1({isLoggedIn , setIsLoggedIn , user , setUser}: Layout){
  return <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
    
    <ErrorBoundary>
      <Outlet/>
    </ErrorBoundary>
    <Footer />
  </>
}




export default App
