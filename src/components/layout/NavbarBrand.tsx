
import { Link } from "react-router-dom";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";

const NavbarBrand = () => {
  const { impact } = useHaptics();
  
  const handleBrandClick = () => {
    impact(HapticImpact.LIGHT);
  };

  return (
    <Link to="/" className="flex items-center space-x-2" onClick={handleBrandClick}>
      <div className="h-8 w-8 rounded-md bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center text-white font-bold text-lg transition-transform hover:scale-105">
        MF
      </div>
      <span className="font-bold text-xl text-gray-900">Mission Fresh</span>
    </Link>
  );
};

export default NavbarBrand;
