import { BedDouble, Building, ChevronRight, Users, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";


function FindSection(){
    return <>
    <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Find by Property Type</h2>
              <p className="text-gray-600">Browse accommodations by category to find your perfect match</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/apartment">
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Building className="h-8 w-8 text-roomnest-primary text-blue-400"  />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Apartments</h3>
                  <p className="text-gray-600 text-sm mb-4">Find self-contained units with complete amenities</p>
                  <span className="text-roomnest-primary text-sm font-medium flex items-center justify-center text-blue-400">
                    Browse Apartments <ChevronRight className="h-4 w-4 ml-1 mt-1 text-blue-400" />
                  </span>
                </div>
              </Link>
              
              <Link to="/pg">
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-roomnest-primary text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">PG Accommodations</h3>
                  <p className="text-gray-600 text-sm mb-4">Discover paying guest options and facilities </p>
                  <span className="text-roomnest-primary text-sm font-medium flex items-center justify-center text-blue-400">
                    Browse PGs <ChevronRight className="h-4 w-4 ml-1 mt-1 text-blue-400" />
                  </span>
                </div>
              </Link>
              
              <Link to="/hostel">
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <BedDouble className="h-8 w-8 text-roomnest-primary text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Hostels</h3>
                  <p className="text-gray-600 text-sm mb-4">Browse affordable shared accommodations </p>
                  <span className="text-roomnest-primary text-sm font-medium flex items-center justify-center text-blue-400">
                    Browse Hostels <ChevronRight className="h-4 w-4 ml-1 mt-1 text-blue-400" />
                  </span>
                </div>
              </Link>
              
              <Link to="/mess">
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ">
                    <UtensilsCrossed className="h-8 w-8 text-roomnest-primary text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Mess Facilities</h3>
                  <p className="text-gray-600 text-sm mb-4">Find accommodations with quality food services</p>
                  <span className="text-roomnest-primary text-sm font-medium flex items-center justify-center text-blue-400">
                    Browse Mess <ChevronRight className="h-4 w-4 ml-1 mt-1 text-blue-400" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
    </>
}


export default FindSection;