import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link} from "react-router-dom";
/**
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
 */
function Footer(){


    
    return <>

        

    <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-bold mb-4">FindMyRooom</h3>
            <p className="text-gray-600 mb-4">
              Finding your perfect accommodation made simple. We connect renters with quality hostels, PGs, apartments, and mess facilities across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#0EB8F0]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#0EB8F0]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#0EB8F0]">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Home</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Properties</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">About Us</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Blog</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Help & Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/apartment" className="text-gray-600 hover:text-[#0EB8F0]">Apartments</Link>
              </li>
              <li>
                <Link to="/pg" className="text-gray-600 hover:text-[#0EB8F0]">PG Accommodation</Link>
              </li>
              <li>
                <Link to="/hostel" className="text-gray-600 hover:text-[#0EB8F0]">Hostels</Link>
              </li>
              <li>
                <Link to="/mess" className="text-gray-600 hover:text-[#0EB8F0]">Mess Facilities</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-[#0EB8F0]" />
                <span className="text-gray-600">
                  123 Main Street, Tech Park, Bangalore, 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-[#0EB8F0]" />
                <span className="text-gray-600">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#0EB8F0]" />
                <span className="text-gray-600">contact@FindMyRooom.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FindMyRooom. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Privacy Policy</Link>
              <Link to="/" className="text-gray-600 hover:text-[#0EB8F0]">Terms of Service</Link>
              <Link to="/" className="text-gray-600 hover:text-[#0EB8F0] ">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    </>
}


export default Footer;