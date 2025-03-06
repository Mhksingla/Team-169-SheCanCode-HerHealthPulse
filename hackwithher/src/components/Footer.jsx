import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-100 py-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">

        <div>
          <h3 className="text-2xl font-bold text-pink-700">About Us</h3>
          <p className="mt-3 text-gray-600">
            We provide top-notch wellness tips, self-care routines, and expert guidance to help you maintain a balanced lifestyle.
          </p>
        </div>

        
        <div>
          <h3 className="text-2xl font-bold text-pink-700">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {["Home", "Wellness Tips", "Services", "Contact Us"].map((link, index) => (
              <li key={index}>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

     
        <div>
          <h3 className="text-2xl font-bold text-pink-700">Get in Touch</h3>
          <p className="mt-3 text-gray-600">Email: support@example.com</p>
          <p className="text-gray-600">Phone: +91 9876543210</p>
       
          <div className="flex space-x-4 mt-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <a key={index} href="#" className="text-pink-600 hover:text-pink-800 transition text-2xl">
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>

     
      <div className="mt-8 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Wellness Hub. All Rights Reserved.
      </div>
    </footer>
  );
}
