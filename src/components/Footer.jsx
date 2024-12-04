function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 max-h-[100px]">
      <div className="flex flex-col">
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
        <p className="text-[12px]">&copy; {new Date().getFullYear()} My Online Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;