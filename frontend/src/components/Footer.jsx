import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="text-lg font-bold mb-2">RunIt</h2>
          <p className="text-sm">© 2023 RunIt. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ul>
            <p className="text-base font-semibold mb-2">Product</p>
            <li><a href="#" className="text-sm hover:text-gray-400">Overview</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Features</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Solutions</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Tutorials</a></li>
          </ul>
          <ul>
            <p className="text-base font-semibold mb-2">Company</p>
            <li><a href="#" className="text-sm hover:text-gray-400">About us</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Careers</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Press</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">News</a></li>
          </ul>
          <ul>
            <p className="text-base font-semibold mb-2">Resource</p>
            <li><a href="#" className="text-sm hover:text-gray-400">Blog</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Newsletter</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Events</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Help center</a></li>
          </ul>
        </div>
        <div className="flex space-x-6 justify-center md:justify-end">
          <a href="#" className="hover:text-gray-400"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-gray-400"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-gray-400"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
