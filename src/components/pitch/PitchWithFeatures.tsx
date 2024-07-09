"use client";

import React, { useState } from "react";
import Pitch from "@/components/pitch/Pitch";
import { GoChevronDown } from "react-icons/go";
import { PlayerResponse } from "@/types/types";
import { formations } from "@/utils/formations";

type PitchWithFeaturesProps = {
    players: PlayerResponse[]
}
const PitchWithFeatures = ({players}:PitchWithFeaturesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState("4-4-2");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelection = (formation: string) => {
    setCurrentFormation(formation);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="mt-1">Formation</h2>  
      <div className="relative inline-block text-left w-32 mb-2">
        <div className="relative">
          <input
            type="text"
            readOnly
            value={currentFormation}
            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
            onClick={toggleDropdown}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <GoChevronDown
              className={`ml-2 transition-transform n ${
                isOpen ? "rotate-180" : ""
              } ease-in-out duration-300`}
            />
          </span>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <ul
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {formations.map((formation) => (
                <li key={formation}>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={() => handleSelection(formation)}
                  >
                    {formation}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Pitch players={players} formation={currentFormation}/>
    </div>
  );
};

export default PitchWithFeatures;
