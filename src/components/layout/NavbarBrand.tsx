
import { Link } from "react-router-dom";

const NavbarBrand = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo.svg" alt="Mission Fresh Logo" className="h-8 w-8" /> 
      <span className="font-bold text-xl text-gray-900">Mission Fresh</span>
    </Link>
  );
};

export default NavbarBrand;
