/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { ArrowLeft, Check, ChevronsRight,  Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function CreateNewRoom(){

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloudUrl = import.meta.env.VITE_CLOUD_URL;
    const api = import.meta.env.VITE_API_URL;

    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading , setIsLoading] = useState(false);

    const [isConfirm , setIsConfirm] = useState(false);
    
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const navigate = useNavigate();
    

    function toggleConfirmation(){
        setIsConfirm(s => !s);
    }

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        email: "",
        type: "apartment" ,
        price: "",
        priceUnit: "month",
        beds: "",
        baths: "",
        area: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        isAvailable: true,
        amenities: [
          { id: "a1", name: "WiFi", selected: false },
          { id: "a2", name: "Air Conditioning", selected: false },
          { id: "a3", name: "Laundry", selected: false },
          { id: "a4", name: "Kitchen", selected: false },
          { id: "a5", name: "TV", selected: false },
          { id: "a6", name: "Parking", selected: false },
          { id: "a7", name: "Security", selected: false },
          { id: "a8", name: "Meals", selected: false },
          { id: "a9", name: "Study Table", selected: false },
          { id: "a10", name: "Housekeeping", selected: false },
        ]
      });


      // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
  
  // Toggle amenity selection
  const toggleAmenity = (id: string) => {
    setFormData(prev => {
      const updatedAmenities = prev.amenities.map(amenity => 
        amenity.id === id ? { ...amenity, selected: !amenity.selected } : amenity
      );
      return { ...prev, amenities: updatedAmenities };
    });
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      Swal.fire({
        icon: 'error',
        title: "Too many images",
        text: 'You can upload at max 5 images',
        confirmButtonText: 'OK',
        timer: 3000
        
      });
      return;
    }
    
    setImages(prevImages => [...prevImages, ...files]);
    
    // Generate preview URLs for the images
    const newImagePreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(prevUrls => [...prevUrls, ...newImagePreviewUrls]);
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    
    // Also remove the preview URL and revoke the object URL to free memory
    const urlToRemove = previews[index];
    setPreviews(prevUrls => prevUrls.filter((_, i) => i !== index));
    URL.revokeObjectURL(urlToRemove);
  };


  // Navigate to next step
  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.title || !formData.description || !formData.type || !formData.price || !formData.email) {
        Swal.fire({
            icon: 'error',
            title: "Missing information",
            text: 'Please fill all the fields',
            confirmButtonText: 'OK',
            timer: 3000
        });
        return;
      }
    } else if (currentStep === 2) {
      // Validate second step
      if (!formData.beds || !formData.baths || formData.amenities.filter(a => a.selected).length === 0) {
        Swal.fire({
            icon: 'error',
            title: "Missing information",
            text: "Please provide the number of beds, baths, and select at least one amenity.",
            confirmButtonText: 'OK',
            timer: 3000
        });
        return;
      }
    } else if (currentStep === 3) {
      // Validate third step
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        Swal.fire({
            icon: 'error',
            title: "Missing information",
            text: "Please provide the complete address of your property.",
            confirmButtonText: 'OK',
            timer: 3000
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };


  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the entire form
    if (images.length === 0) {
      Swal.fire({
        icon: 'error',
        title: "No images uploaded",
        text: "Please upload at least one image of your property.",
        confirmButtonText: 'OK',
        timer: 3000
      });
      return;
    }

    if(!isConfirm){
        Swal.fire({
            icon: 'error',
            title: "Oops !",
            text: "Please Confirm about your details.",
            confirmButtonText: 'OK',
            timer: 3000
        });
        return;
    }
    
    // Submit the form data
    setIsLoading(true);
        const imageUrls: string[] = [];

        const formDataArray = images.map((image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", `${uploadPreset}`);
            formData.append("cloud_name", `${cloudName}`);
            return formData;
        });
        
        try {
            // Upload all images sequentially (or use Promise.all for parallel uploads)
            for (const formData of formDataArray) {
                const resp = await axios.post(`${cloudUrl}`, formData);
                
                imageUrls.push(resp.data.secure_url);
            }
    
            
        } catch (error) {
            setIsLoading(false);
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error while uploading images, Please try again later...",
                confirmButtonText: "Ok",
                timer: 3000
            });
            return;
        }

        console.log('image urls : ' , imageUrls);
        const data = {
            formData ,
            imageUrls
        }
        

        try{
            try {
                
                await axios.post(`${api}/api/v1/room/newroom`, data ,
                {
                    headers: {
                        'sellerToken' : localStorage.getItem('sellerToken')
                    }
                });
                
            
            } catch (error) {
                setIsLoading(s => !s);
                if (axios.isAxiosError(error) && error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Become a seller to add rooms....",
                            confirmButtonText: "Ok"
                        });
                        
                    }else if (statusCode === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Seller not found....",
                            confirmButtonText: "Ok"
                        });
                        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Failed to create room. Please try again later.....",
                            confirmButtonText: "Ok"
                        });
                        
                    }
                    
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Oops...",
                        text: "Something went wrong. Please try again later.....",
                        confirmButtonText: "Ok"
                    });
                    
                }
                return; // Exit the function if an error occurs
            }
            
            setIsLoading(s => !s);
            Swal.fire({
                title: "sucess",
                text : "Room created Sucessfully...",
                icon: "success",
                timer: 3000,
                confirmButtonText: "OK"
            });
            redirect();
        }catch(e){
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: "Something went wrong. Please try again later.....",
                confirmButtonText: "Ok"
            });
            setIsLoading(s => !s);
            
        }
  };


    


    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }




    const renderProgressSteps = () => {
        const steps = [
          { number: 1, title: "Basic Info" },
          { number: 2, title: "Features" },
          { number: 3, title: "Location" },
          { number: 4, title: "Photos" },
        ];
        
        return (
          <div className="flex justify-between mb-8 container mx-auto px-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    currentStep === step.number
                      ? "bg-[#0EA5E9] text-white"
                      : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.number ? "✓" : step.number}
                </div>
                <span className={`text-sm ${currentStep === step.number ? "text-[#0EA5E9] font-medium" : "text-gray-500"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        );
      };
    
    

    return <>
    <div className="bg-[#F9FAFB] relative min-h-screen flex flex-col pb-10 ">


        <button onClick={redirect} className="absolute top-2 left-4 border-b-2 bg-white hover:bg-gray-100 rounded-md cursor-pointer font-medium text-sm border-gray-300 px-2 flex items-center py-1"><ArrowLeft className="w-4 h-4 mr-1" />Back</button>   

            <main className="flex-grow py-8  ">
                <div className="container mx-auto px-4 ">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold mb-2">List Your Property</h1>
                        <p className="text-gray-600">
                            Complete the form below to add your property to our marketplace
                        </p>
                    </div>
                    
                    <div className="bg-white px-4 md:px-6 lg:px-8 py-6  shadow-lg shadow-gray-300">
                    <div className="pt-6">
                        {renderProgressSteps()}
                        
                        <form onSubmit={handleSubmit}>
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4 container mx-auto px-4">
                            <div className="space-y-2 flex flex-col ">
                                <label htmlFor="title">Property Title*</label>
                                <input
                                id="title"
                                name="title"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Cozy Studio Apartment Near University"
                                required
                                />
                            </div>

                            <div className="space-y-2 flex flex-col ">
                                <label htmlFor="title">Seller Email *</label>
                                <input
                                id="email"
                                name="email"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="e.g., abc@gmail.com"
                                required
                                />
                            </div>
                            
                            <div className="space-y-2 flex flex-col ">
                                <label htmlFor="description">Description*</label>
                                <textarea
                                id="description"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your property, including its features, surroundings, and rules"
                                rows={4}
                                required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label htmlFor="type">Property Type*</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    required
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="pg">PG</option>
                                    <option value="hostel">Hostel</option>
                                    <option value="mess">Mess</option>
                                </select>
                                </div>
                                
                                <div>
                                <label htmlFor="priceUnit">Price Unit*</label>
                                <select
                                    id="priceUnit"
                                    name="priceUnit"
                                    value={formData.priceUnit}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    required
                                >
                                    <option value="month">Per Month</option>
                                    <option value="day">Per Day</option>
                                    <option value="week">Per Week</option>
                                </select>
                                </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="price">Price (₹)*</label>
                                <input
                                id="price"
                                name="price"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="e.g., 15000"
                                required
                                />
                            </div>
                            </div>
                        )}
                        
                        {/* Step 2: Features and Amenities */}
                        {currentStep === 2 && (
                            <div className="space-y-4 container mx-auto px-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="beds">Number of Beds*</label>
                                <input
                                    id="beds"
                                    name="beds"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    type="number"
                                    value={formData.beds}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2"
                                    required
                                />
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="baths">Number of Baths*</label>
                                <input
                                    id="baths"
                                    name="baths"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    type="number"
                                    value={formData.baths}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 1"
                                    required
                                    step="0.5"
                                />
                                </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="area">Area (sq. ft.)</label>
                                <input
                                id="area"
                                name="area"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                type="number"
                                value={formData.area}
                                onChange={handleInputChange}
                                placeholder="e.g., 800"
                                />
                            </div>
                            
                            <div>
                                <label>Amenities*</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {formData.amenities.map((amenity) => (
                                    <div 
                                    key={amenity.id} 
                                    className={`
                                        border rounded-md p-2 flex items-center cursor-pointer transition-colors
                                        ${amenity.selected ? 'border-[#0EA5E9] bg-[#F0F9FF]' : 'border-gray-200'}
                                    `}
                                    onClick={() => toggleAmenity(amenity.id)}
                                    >
                                    <div className={`
                                        w-4 h-4 mr-2 border rounded 
                                        ${amenity.selected ? 'bg-[#0EA5E9] border-[#0EA5E9]' : 'border-gray-300'}
                                        flex items-center justify-center
                                    `}>
                                        {amenity.selected && (
                                        <Check color="white" />
                                        )}
                                    </div>
                                    <span className="text-sm">{amenity.name}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                            </div>
                        )}
                        
                        {/* Step 3: Location */}
                        {currentStep === 3 && (
                            <div className="space-y-4 container mx-auto px-4">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="address">Street Address*</label>
                                <input
                                id="address"
                                name="address"
                                className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="e.g., 123 Main Street, Apartment 4B"
                                required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="city">City*</label>
                                <input
                                    id="city"
                                    name="city"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mumbai"
                                    required
                                />
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="state">State*</label>
                                <input
                                    id="state"
                                    name="state"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Maharashtra"
                                    required
                                />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="pincode">Postal Code*</label>
                                <input
                                    id="pincode"
                                    name="pincode"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 400001"
                                    required
                                />
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                <label htmlFor="country">Country*</label>
                                <input
                                    id="country"
                                    name="country"
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#07B0ED] focus:border-transparent"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    readOnly
                                />
                                </div>
                            </div>
                            
                            
                            </div>
                        )}
                        
                        {/* Step 4: Photos */}
                        {currentStep === 4 && (
                            <div className="space-y-4 container mx-auto px-4">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="photos">Property Photos*</label>
                                <div className="mt-2">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {/* Image previews */}
                                    {previews.map((url, index) => (
                                    <div key={index} className="relative">
                                        <img
                                        src={url}
                                        alt={`Property preview ${index + 1}`}
                                        className="h-24 w-full object-cover rounded-md"
                                        />
                                        <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                        <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    {/* Upload button */}
                                    {images.length < 5 && (
                                    <label className="h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                                        <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                        <span className="text-sm text-gray-500">Add Photo</span>
                                        <input
                                        type="file"
                                        id="photos"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        multiple
                                        />
                                    </label>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    You can upload up to 5 images. First image will be the main property image.
                                </p>
                                </div>
                            </div>
                            
                            <div className="bg-amber-50 rounded-lg p-4">
                                <h3 className="font-medium mb-2 text-amber-800">Final Review</h3>
                                <p className="text-sm text-amber-700 mb-2">
                                Please verify all the information before submitting. Once submitted, your property will be reviewed by our team before being listed on the platform.
                                </p>
                                <div className="flex items-center">
                                <div onClick={toggleConfirmation} className="cursor-pointer flex h-4 w-4 items-center justify-center rounded-sm border border-amber-700 mr-2">
                                    {
                                        isConfirm && <Check/>
                                    }
                                </div>
                                <span className="text-xs text-amber-700">I confirm that all the information provided is accurate and complete.</span>
                                </div>
                            </div>
                            </div>
                        )}
                        
                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-8 container mx-auto px-4 ">
                            {currentStep > 1 && (
                            <button type="button" className="border-2 border-gray-300 px-3 rounded-md font-semibold hover:bg-[#F1F5F9] cursor-pointer"  onClick={prevStep}>
                                Back
                            </button>
                            )}
                            {currentStep < 4 ? (
                            <button 
                                type="button" 
                                className="ml-auto  text-white cursor-pointer  px-4 py-2 rounded-md hover:bg-[#0C4A6E]  hover:border-none bg-[#0EA5E9] font-semibold flex items-center justify-center" 
                                onClick={nextStep}
                            >
                                Next <ChevronsRight className="ml-1 h-4 w-4 mt-1" />
                            </button>
                            ) : (
                            <button 
                                type="submit" 
                                className="ml-auto border-2 text-white cursor-pointer border-gray-300 px-4 py-2 rounded-md hover:bg-[#0C4A6E]  hover:border-none bg-[#0EA5E9] font-semibold"
                            >
                                {
                                    isLoading ? "Submitting...." : "Submit Listing"
                                }
                            </button>
                            )}
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </main>
        
        
        {/** 
        <div className="text-black relative  w-full flex flex-col items-center justify-center">
            


            
            
            <div className="flex flex-col items-start w-full   text-black text-lg font-medium gap-6">
                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-20 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>Email Id : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={emailRef} placeholder="Enter your Email Id" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>House name : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={housenameRef} placeholder="Enter house name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Price: <span className="text-red-400 ml-2 text-xl">*</span> <span className="text-sm absolute left-1 bottom-2 text-white"><IndianRupee /></span></p>
                        <input type="text" ref={priceRef} placeholder="Enter house price in INR" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>
                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>Address : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={addressRef} placeholder="Enter house address" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Area : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={areaRef} placeholder="Enter area" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Pincode : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={pincodeRef} placeholder="Enter pincode" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>

                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>City : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={cityRef} placeholder="Enter city name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>State : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={stateRef} placeholder="Enter state name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Country : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={countryRef} placeholder="Enter Country name" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>

                <div className="flex items-start justify-between   w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isSingleBed ? "text-black" : "line-through text-slate-800"} `}><input type="checkbox" onChange={changeBed}  id="1" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Single Bed</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isWifi ? "text-black" : "line-through text-slate-800"} `}><input type="checkbox" onChange={changeWifi}  id="2" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Wi-Fi available</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isAc ? "text-black" : "line-through text-slate-800"} `}><input type="checkbox" onChange={changeAc}   id="3" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />AC available</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isKitchen ? "text-black" : "line-through text-slate-800"} `}><input type="checkbox" onChange={changeKit}  id="4" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Kitchen available</label>
                    </div>
                </div>

                <div className="w-full mt-6 flex flex-col items-start gap-4">
                    <p>Description :<span className="text-red-400 ml-2 text-xl">*</span></p>
                    <textarea ref={descriptionRef} placeholder="Description" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full  shadow-md shadow-gray-400"/>
                </div>
                <div className="w-full mt-6 flex flex-col items-start gap-4">
                    <p>Type :<span className="text-red-400 ml-2 text-xl">*</span></p>
                    <input type="text" ref={typeRef} placeholder="Mess or Hostel or PG or Apartment" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-1/2 lg:w-1/3 shadow-md shadow-gray-400"/>
                    
                </div>

                <div className="w-full">
                    <p>Upload some Images : <span className="text-red-400 ml-2 text-xl">*</span></p>
                    {
                        previews && 
                        <div className="flex items-start flex-wrap gap-1  w-auto">
                            {previews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`}  className="max-w-[100px]  my-[5px] rounded-xl " />
                            ))}
                        </div>
                    }
                    <input type="file" multiple accept="images/*"  onChange={changeImage}  className="rounded-xl  shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  cursor-pointer"  />
                    
                </div>

                <div className="w-full flex items-center justify-center">
                    <button onClick={submitForm} className="bg-black hover:bg-slate-900 text-white px-10 md:px-20 lg:px-30 py-1 text-xl font-semibold transition-all hover:scale-105 cursor-pointer rounded-xl shad">
                        {isLoading ? "Submiting..." : "Submit"}
                    </button>
                </div>

            </div>
        
        </div>

        */}
    </div>
    </>
}


export default CreateNewRoom;