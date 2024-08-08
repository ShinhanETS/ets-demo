import { useNavigate } from "react-router-dom";
import BackImg from '../../assets/back.svg';

export default function Back() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full px-[22px] py-6 bg-white-1 fixed top-0 left-0 z-10">
      <img src={BackImg} onClick={navigateHome} />
    </div>
  );
}
