import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold text-white">ResumeCraft</h2>
          <p className="mt-3 text-sm">
            Build professional resumes easily with modern templates.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="mt-3 text-sm">Email: support@resumecraft.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-sm">
        © 2026 ResumeCraft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
