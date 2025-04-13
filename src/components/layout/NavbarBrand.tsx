
import { Link } from "react-router-dom";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";

const NavbarBrand = () => {
  const { impact } = useHaptics();
  
  const handleBrandClick = () => {
    impact(HapticImpact.LIGHT);
  };

  return (
    <Link to="/" className="flex items-center space-x-2" onClick={handleBrandClick}>
      <div className="h-10 w-10 rounded-md bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform hover:scale-105 border border-white/20">
        <span className="relative">MF</span>
      </div>
      <div className="font-bold text-xl text-gray-900 flex flex-col leading-none">
        <span>Mission</span>
        <span className="text-primary">Fresh</span>
      </div>
    </Link>
  );
};

export default NavbarBrand;
