import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

type ButtonProps = {
  onClick?: () => void;
};

export default function ToggleSubButton({ onClick }: ButtonProps) {
  return (
    <button
      className="absolute top-1/2 right-0 btn-primary"
      onClick={onClick}
    >
      <FaArrowCircleRight className="text-secondary hover:text-primary" size={25} />
    </button>
  );
}
