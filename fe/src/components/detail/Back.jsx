import { useNavigate } from "react-router-dom";
import BackImg from '../../assets/back.svg';

export default function Back() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="px-[22px] py-6 bg-white-1">
      <img src={BackImg} onClick={navigateHome} />
    </div>
  );
}
