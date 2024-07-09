import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import avatar from "@/images/player-avatar.png";
import Image from "next/image";

type ButtonProps = {
  onClick?: () => void;
};

const AddPlayerButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col relative hover:scale-110 transition-transform duration-200 hover:cursor-pointer p-3 rounded-full border-[3px] border-dashed border-primary justify-center items-center min-h-16 min-w-16 lg:min-w-24 lg:min-h-24"
      onClick={onClick}
    >
      <Image
        src={avatar}
        alt={"soccer-avatar"}
        fill = {true}
        style={{objectFit: "cover"}}
        className="overflow-hidden rounded-full"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary"><FaPlusCircle size={25}/></div>
      
    </div>
  );
};

export default AddPlayerButton;
