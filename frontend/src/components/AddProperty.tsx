import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function AddProperty(){


    
    const navigate = useNavigate();


    function changePage(){
        if(localStorage.getItem('token')){
            navigate('/newhost');
        }else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops !',
                text: 'Please Sign in to Become a Host...',
                confirmButtonText: 'OK',
                timer: 3000
            });
        }
    }

    return <>
        <section className="py-12 bg-[#0EA5E9] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to List Your Property?</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Join thousands of property owners who are successfully renting their spaces through FindMyRooom
            </p>
            <div className="flex justify-center">
              

                <div className=" w-full h-auto  ">
                    {
                        localStorage.getItem('sellerToken') === null || localStorage.getItem('sellerToken') === "undefined" ?
                        <button onClick={changePage} className="   text-md font-normal px-8 py-2   bg-white hover:bg-[#0C4A6E] text-[#0EA5EA] rounded-2xl transition-colors cursor-pointer   hover:scale-105">Become a Host</button>
                        :
                        <Link to={'/createnewroom'} className=" bg-white  rounded-2xl  hover:bg-[#0C4A6E] text-[#0EA5EA] hover:text-white text-md font-normal px-8 py-2 cursor-pointer hover:scale-105  transition-colors  ">List Your Property</Link>
                    }
                </div>
            </div>
          </div>
        </section>
    </>
}


export default AddProperty;