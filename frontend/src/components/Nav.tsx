import { Building2, Hotel, House, Menu, School, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion.ts";

interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  country: string;
  state: string | undefined;
  area: string | undefined;
  city: string;
  pincode: string | undefined;
  saved: string[] | null;
  likes: string[] | null;
  dislikes: string[] | null;
  bookedRooms: string[] | null;
  imageUrl: string;
}

interface nav {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const menue: { to: string; value: string }[] = [
  { to: "/hostel", value: "Hostel" },
  { to: "/apartment", value: "Apartment" },
  { to: "/mess", value: "Mess" },
  { to: "/pg", value: "PG" },
];

function Navbar({ user, setUser, isLoggedIn, setIsLoggedIn }: nav) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => {
    const savedLink = localStorage.getItem("activeLink");
    return savedLink ? savedLink : "/";
  });

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  function signout() {
    setDropDownOpen(false);
    Swal.fire({
      title: "Are you Sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, Sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userImgUrl");
        localStorage.removeItem("sellerToken");
        setIsLoggedIn(false);
        setUser(null);
        Swal.fire({
          title: "sucess",
          text: "Sign out Sucessfully...",
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
        });
      }
    });
  }

  return (
    <>
      <div className="container mx-auto px-4 flex items-center justify-between bg-[#FFFFFF] w-full   py-3">
        {/**  left part   */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="text-[#0EA5E9] font-semibold text-3xl  outline-none "
        >
          <Link to={"/"} onClick={() => handleSetActiveLink("/")}>
            FindMyRooom
          </Link>
        </motion.div>

        {/**  middle part   */}
        <div className="hidden md:block">
          <div className="text-lg gap-9 flex items-center justify-between">
            {menue.map((data, index) => {
              return (
                <motion.div
                  variants={fadeIn("down", 0.4 * (index + 1))}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }}
                >
                  <Link
                    to={data.to}
                    key={index}
                    onClick={() => handleSetActiveLink(data.value)}
                    className={`relative font-normal after:bottom-0 after:absolute after:left-0 after:h-0.5  after:w-0 hover:after:w-full after:bg-[#59C1F0] after:transition-all ${
                      activeLink === data.value
                        ? "text-[#59C1F0] after:w-full"
                        : "text-gray-600 hover:after:bg-[#59C1F0] hover:text-[#59C1F0] "
                    } flex items-center justify-center gap-1 `}
                  >
                    {data.value === "Hostel" && <Hotel size={"20px"} />}
                    {data.value === "Mess" && <School size={"20px"} />}
                    {data.value === "PG" && <House size={"20px"} />}
                    {data.value === "Apartment" && <Building2 size={"20px"} />}
                    {data.value}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/**   right part   */}

        {/**   large screen   */}
        <div className="hidden lg:block">
          {isLoggedIn ? (
            <div className="flex items-center justify-between gap-5 text-lg">
              <div className="rounded-full border-2 border-[#F97F51] overflow-hidden  h-10 w-10 relative cursor-pointer">
                <div
                  style={{
                    backgroundImage: `url(${localStorage.getItem(
                      "userImgUrl"
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute z-0 inset-0"
                ></div>
              </div>
              <motion.div
                variants={fadeIn("left", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
              >
                <button
                  className="bg-white text-black rounded-md border-[1px] border-gray-300  cursor-pointer hover:bg-[#59C1F0] hover:text-white hover:border-white hover:scale-105 px-3 py-1"
                  onClick={signout}
                >
                  Sign out
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 text-lg">
              <motion.div
                variants={fadeIn("right", 1.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
              >
                <Link
                  to={"/signup"}
                  className="bg-white text-black rounded-md border-[1px] border-gray-300   cursor-pointer hover:bg-[#59C1F0] hover:text-white hover:border-white hover:scale-105 px-3 py-1"
                >
                  Sign up
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn("left", 2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
              >
                <Link
                  to={"/signin"}
                  className="bg-[#59C1F0] hover:bg-[#0C4A6E] flex items-center justify-center text-white rounded-lg    cursor-pointer transition-all hover:scale-105 px-3 py-1"
                >
                  Sign in
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/**   mobile or medium  device   */}
        <div className="text-white block lg:hidden ">
          <div className="flex items-center justify-between gap-3">
            {isLoggedIn && (
              <div className="rounded-full border-2 border-[#F97F51]  overflow-hidden  h-8  w-8 relative cursor-pointer">
                <div
                  style={{
                    backgroundImage: `url(${user?.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute z-0 inset-0"
                ></div>
              </div>
            )}
            {dropDownOpen ? (
              <X
                onClick={() => setDropDownOpen((s) => !s)}
                className=" hover:border-2 rounded-md text-black  hover:border-black cursor-pointer transition-all"
              />
            ) : (
              <Menu
                className="cursor-pointer hover:border-2 size-8 hover:border-black text-black rounded-md transition-all"
                onClick={() => setDropDownOpen((s) => !s)}
              />
            )}
          </div>
        </div>
      </div>

      {dropDownOpen && (
        <div className="">
          {/** mobile device  */}
          <div className="block md:hidden transition-all">
            <div className="relative w-full flex flex-col items-center justify-between  bg-white  text-md font-medium gap-4">
              <div className="w-full flex flex-col py-2 px-4">
                {menue.map((data, i) => (
                  <Link
                    key={i}
                    to={data.to}
                    onClick={() => setDropDownOpen((s) => !s)}
                    className=" bg-white text-gray-600 hover:bg-gray-50/50   hover:text-[#59C1F0]  py-1 px-2   cursor-pointer transition-all "
                  >
                    <motion.div
                      variants={fadeIn("up", 0.4 * (i + 1))}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true }}
                    >
                      <button className="flex items-center justify-start gap-1">
                        {data.value === "Hostel" && <Hotel />}
                        {data.value === "Mess" && <School />}
                        {data.value === "PG" && <House />}
                        {data.value === "Apartment" && <Building2 />}
                        {data.value}
                      </button>
                    </motion.div>
                  </Link>
                ))}

                {isLoggedIn ? (
                  <div>
                    <div className="w-full h-[1px] my-3 bg-slate-300 "></div>
                    <div
                      onClick={signout}
                      className=" bg-white text-[#59C1F0]    hover:text-white  hover:bg-[#59C1F0]  py-1 px-2   cursor-pointer transition-all"
                    >
                      <motion.div
                        variants={fadeIn("up", 1.6)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign out</button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-[1px] my-3 bg-slate-300 "></div>
                    <Link to={"/signup"}>
                      <motion.div
                        className=" bg-white border-[1px] border-gray-200 rounded-lg  flex items-center justify-center text-gray-700    hover:bg-[#59C1F0] hover:text-white py-1 px-2   cursor-pointer transition-all"
                        variants={fadeIn("up", 1.6)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign up</button>
                      </motion.div>
                    </Link>
                    <Link to={"/signin"}>
                      <motion.div
                        className=" bg-[#59C1F0] hover:bg-[#0C4A6E] flex items-center justify-center text-white rounded-lg  py-1 px-2   cursor-pointer transition-all"
                        variants={fadeIn("up", 2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign in</button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/**  medium device   */}
          <div className="hidden md:block lg:hidden transition-all  ">
            <div className="relative w-full flex flex-col items-center justify-between  bg-white  gap-4 text-lg font-medium">
              <div className="w-full flex flex-col py-2 px-4">
                {isLoggedIn ? (
                  <div>
                    <div
                      onClick={signout}
                      className=" bg-white border-[1px] border-slate-300 rounded-lg  flex items-center justify-center text-gray-700    hover:bg-[#59C1F0] hover:text-white  py-1 px-2   cursor-pointer transition-all"
                    >
                      <motion.div
                        variants={fadeIn("right", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign out</button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    <Link
                      to={"/signup"}
                      className=" bg-white border-[1px] border-slate-300 rounded-lg  flex items-center justify-center text-gray-700    hover:bg-[#59C1F0] hover:text-white  py-1 px-2   cursor-pointer transition-all"
                    >
                      <motion.div
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign up</button>
                      </motion.div>
                    </Link>
                    <Link
                      to={"/signin"}
                      className=" bg-[#59C1F0] hover:bg-[#0C4A6E] flex items-center justify-center text-white rounded-lg  py-1 px-2   cursor-pointer transition-all"
                    >
                      <motion.div
                        variants={fadeIn("right", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <button>Sign in</button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
