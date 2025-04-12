
import { Link } from "react-router-dom";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";

const NavbarBrand = () => {
  const { impact } = useHaptics();
  
  const handleBrandClick = () => {
    impact(HapticImpact.LIGHT);
  };

  return (
    <Link to="/" className="flex items-center space-x-2" onClick={handleBrandClick}>
      <img src="/logo.svg" alt="Mission Fresh Logo" className="h-8 w-8 transition-transform hover:scale-105" /> 
      <span className="font-bold text-xl text-gray-900">Mission Fresh</span>
    </Link>
  );
};

export default NavbarBrand;
