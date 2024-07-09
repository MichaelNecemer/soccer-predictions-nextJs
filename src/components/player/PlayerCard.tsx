"use client";
import { Player } from "@/types/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CiBookmarkRemove } from "react-icons/ci";

type PlayerCardProps = Player & {
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  handlePlayerRemove?: () => void;
  percentage: number; // Add percentage prop
  onPercentageChange: (percentage: number) => void; // Add handler prop
};

const PlayerCard = ({
  id,
  firstname,
  lastname,
  name,
  photo,
  percentage = 0,
  onPercentageChange,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  handlePlayerRemove,
}: PlayerCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // Use the percentage prop to initialize the internal state
  const [internalPercentage, setInternalPercentage] = useState(percentage);

  // Update the internal state when the percentage prop changes
  useEffect(() => {
    setInternalPercentage(percentage);
  }, [percentage]);

  const handleDoubleClickPercentageBadge = () => {
    setIsEditing(true);
  };

  const handleChangePercentageBadge = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let inputValue = parseInt(event.target.value, 10);
    const min = parseInt(event.target.min, 10);
    const max = parseInt(event.target.max, 10);

    if (inputValue < min) {
      inputValue = min;
    } else if (inputValue > max) {
      inputValue = max;
    }
    if(!isNaN(inputValue)){
    setInternalPercentage(inputValue);
    onPercentageChange(inputValue); 
    } else {
      setInternalPercentage(0);
    }
  };

  const handleBlurPercentageBadge = () => {
    setIsEditing(false);
  };

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="flex flex-col shadow-xl shadow-primary relative transition-transform duration-200 p-4 rounded-full border-[3px] border-primary justify-center items-center min-h-16 min-w-16 lg:min-w-24 lg:min-h-24"
    >
      {/*Remove badge*/}
      <CiBookmarkRemove
        size={50}
        className="z-10 absolute top-0 left-0 transform -translate-x-7 -translate-y-7 m-2 text-secondary cursor-pointer hover:scale-105 transition-transform duration-100"
        onClick={handlePlayerRemove}
      />

      {/*Percentage badge*/}
      <div
        className="z-10 flex items-center absolute top-0 right-0 transform translate-x-7 -translate-y-6 m-2 cursor-pointer hover:scale-105 transition-transform duration-100" 
        onDoubleClick={handleDoubleClickPercentageBadge}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-md border-2 p-[7px] border-primary font-bold bg-secondary text-primary">
          {internalPercentage}
        </div>
        {isEditing && (
          <input
            type="number"
            min="0"
            max="100"
            value={internalPercentage}
            onChange={handleChangePercentageBadge}
            onBlur={handleBlurPercentageBadge}
            className="absolute top-0 left-full ml-2 w-16 p-1 border-2 border-primary rounded-md"
            autoFocus
          />
        )}
      </div>

      {name && photo && (
        <Image
          src={photo}
          alt={name}
          priority={true}
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      )}

      {/* Bottom badge */}
      <div className="absolute shadow-md shadow-primary p-[2px] flex flex-col justify-center items-center top-[95%] rounded-md border-2 border-primary h-8 w-32 bg-base-200">
        <span className="font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
