import { FaPlusCircle } from "react-icons/fa";

type ButtonProps = {
  onClick?: () => void;
};

export default function AddSubstituteButton({ onClick }: ButtonProps) {
  return (
    <button className="btn-primary absolute top-[130%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary cursor-pointer hover:scale-105 transition-transform duration-100"> 
      <FaPlusCircle className="text-secondary" size={30} onClick={onClick} />
    </button>
  );
}
