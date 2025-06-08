

function HowItWorks(){

    return <>
    <div>
    <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">How FindMyRooom Works</h2>
              <p className="text-gray-600">Simple steps to find your perfect accommodation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative">
                  <span className="text-roomnest-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Search</h3>
                <p className="text-gray-600">
                  Enter your preferred location, property type, and budget to find suitable options
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative">
                  <span className="text-roomnest-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Connect</h3>
                <p className="text-gray-600">
                  Contact property owners directly to schedule visits or ask questions
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-roomnest-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative">
                  <span className="text-roomnest-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Move In</h3>
                <p className="text-gray-600">
                  Finalize the deal with the owner and enjoy your new accommodation
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
    </>
}

export default HowItWorks;