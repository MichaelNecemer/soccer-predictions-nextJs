import React, { useState } from "react";
import AddPlayerButton from "@/components/player/AddPlayerButton";
import PlayerSelectModal from "@/components/PlayerSelectModal";
import { PlayerResponse } from "@/types/types";
import PlayerCard from "@/components/player/PlayerCard";
import ToggleSubButton from "../player/ToggleSubButton";
import AddSubstituteButton from "../player/AddSubstituteButton";

type PitchProps = {
  players: PlayerResponse[];
  formation: string;
};

const Pitch: React.FC<PitchProps> = ({ players, formation }) => {
  const numGrassStrips = 8;
  const heightGrassStrips = `h-${1 / numGrassStrips}`;

  const completeFormation = `1-${formation}`;
  const formationArray = completeFormation.split("-").map(Number);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<
    (PlayerResponse | null)[][]
  >(Array(formationArray.reduce((sum, num) => sum + Number(num), 0)).fill([]));
  const [shownPlayers, setShownPlayers] = useState<(PlayerResponse | null)[]>(
    Array(formationArray.reduce((sum, num) => sum + Number(num), 0)).fill(null)
  );
  const [draggedPlayerIndex, setDraggedPlayerIndex] = useState<number | null>(
    null
  );

  const [playerPercentages, setPlayerPercentages] = useState<number[][]>(
    Array(formationArray.reduce((sum, num) => sum + Number(num), 0))
      .fill([])
      .map(() => [])
  );

  const slices = formationArray.reduce(
    (acc, numPlayers) => {
      const start = acc.currentIndex;
      const end = start + numPlayers;
      acc.slices.push(selectedPlayers.slice(start, end));
      acc.currentIndex = end;
      return acc;
    },
    { slices: [] as (PlayerResponse | null)[][][], currentIndex: 0 }
  ).slices;

  const handleClick = (index: number) => {
    setOpenModal(true);
    setSelectedPosition(index);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedPosition(null);
  };

  const handlePlayerSelect = (player: PlayerResponse) => {
    if (selectedPosition !== null) {
      const newSelectedPlayers = [...selectedPlayers];
      const newPlayerPercentages = [...playerPercentages];

      if (!newSelectedPlayers[selectedPosition]) {
        newSelectedPlayers[selectedPosition] = [];
        newPlayerPercentages[selectedPosition] = [];
      }

      newSelectedPlayers[selectedPosition] = [
        ...newSelectedPlayers[selectedPosition],
        player,
      ];
      newPlayerPercentages[selectedPosition] = [
        ...newPlayerPercentages[selectedPosition],
        0,
      ];

      setSelectedPlayers(newSelectedPlayers);
      setPlayerPercentages(newPlayerPercentages);
      setShownPlayers((prevShownPlayers) => {
        const newShownPlayers = [...prevShownPlayers];
        newShownPlayers[selectedPosition] = player;
        return newShownPlayers;
      });

      handleClose();
    }
  };

  const handlePlayerRemove = (index: number) => {
    const newSelectedPlayers = [...selectedPlayers];
    const newPlayerPercentages = [...playerPercentages];

    const currentShownPlayer = shownPlayers[index];
    const playerIndex = newSelectedPlayers[index].indexOf(currentShownPlayer);

    if (playerIndex !== -1) {
      // Remove the currently displayed player
      newSelectedPlayers[index].splice(playerIndex, 1);
      newPlayerPercentages[index].splice(playerIndex, 1);

      // Update the state
      setSelectedPlayers(newSelectedPlayers);
      setPlayerPercentages(newPlayerPercentages);

      // Update the shown player
      if (newSelectedPlayers[index].length > 0) {
        setShownPlayers((prevShownPlayers) => {
          const newShownPlayers = [...prevShownPlayers];
          newShownPlayers[index] = newSelectedPlayers[index][0];
          return newShownPlayers;
        });
      } else {
        setShownPlayers((prevShownPlayers) => {
          const newShownPlayers = [...prevShownPlayers];
          newShownPlayers[index] = null;
          return newShownPlayers;
        });
      }
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedPlayerIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedPlayerIndex !== null && draggedPlayerIndex !== index) {
        const newSelectedPlayers = [...selectedPlayers];
        const newPlayerPercentages = [...playerPercentages];
        const newShownPlayers = [...shownPlayers];

        // Identify currently shown players
        const draggedShownPlayer = newShownPlayers[draggedPlayerIndex];
        const targetShownPlayer = newShownPlayers[index];

        // Swap the entire player lists
        [newSelectedPlayers[draggedPlayerIndex], newSelectedPlayers[index]] = [
            newSelectedPlayers[index],
            newSelectedPlayers[draggedPlayerIndex],
        ];

        // Swap percentages
        [newPlayerPercentages[draggedPlayerIndex], newPlayerPercentages[index]] = [
            newPlayerPercentages[index],
            newPlayerPercentages[draggedPlayerIndex],
        ];

        setSelectedPlayers(newSelectedPlayers);
        setPlayerPercentages(newPlayerPercentages);

        // Update shown players with previously shown players
        if (draggedShownPlayer && newSelectedPlayers[index].includes(draggedShownPlayer)) {
            newShownPlayers[index] = draggedShownPlayer;
        } else {
            newShownPlayers[index] = newSelectedPlayers[index][0] || null;
        }

        if (targetShownPlayer && newSelectedPlayers[draggedPlayerIndex].includes(targetShownPlayer)) {
            newShownPlayers[draggedPlayerIndex] = targetShownPlayer;
        } else {
            newShownPlayers[draggedPlayerIndex] = newSelectedPlayers[draggedPlayerIndex][0] || null;
        }

        setShownPlayers(newShownPlayers);
        setDraggedPlayerIndex(null);
    }
};


  const handleToggleSubstitute = (index: number) => {
    const currentPlayerList = selectedPlayers[index];
    if (currentPlayerList.length > 1) {
      setShownPlayers((prevShownPlayers) => {
        const newShownPlayers = [...prevShownPlayers];
        const currentShownPlayer = prevShownPlayers[index];
        const nextPlayerIndex =
          (currentPlayerList.findIndex(
            (player) => player?.player?.id === currentShownPlayer?.player?.id
          ) +
            1) %
          currentPlayerList.length;
        newShownPlayers[index] = currentPlayerList[nextPlayerIndex];
        return newShownPlayers;
      });
    }
  };

  const handlePercentageChange = (
    index: number,
    subIndex: number,
    percentage: number
  ) => {
    const newPlayerPercentages = [...playerPercentages];
    newPlayerPercentages[index][subIndex] = percentage;
    setPlayerPercentages(newPlayerPercentages);
  };

  const rowPositions = slices.map((_, index) => ({
    bottom: `${index * (100 / slices.length) - 4}%`,
  }));

  return (
    <div className="flex justify-center items-center max-h-full border-black rounded-xl border-[3px] p-[6px]">
      <div className="relative w-80 h-96 lg:w-[35rem] lg:h-[40rem] xl:w-[40rem] xl:h-[45rem]">
        {[...Array(numGrassStrips)].map((_, index) => (
          <div
            key={index}
            style={{
              top: `${(index * 100) / numGrassStrips}%`,
              height: `${100 / numGrassStrips}%`,
            }}
            className={`absolute left-0 w-full
              ${index % 2 === 0 ? "bg-green-500" : "bg-green-400"}
              ${index === 0 ? "rounded-t-lg" : ""}
              ${index === numGrassStrips - 1 ? "rounded-b-lg" : ""}
            `}
          ></div>
        ))}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[3px] border-white rounded-full h-24 w-24 lg:h-[9rem] lg:w-[9rem]"></div>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-16 lg:w-[13rem] lg:h-[6.5rem] border-white border-l-[3px] border-r-[3px] border-b-[3px] rounded-b-lg lg:rounded-b-xl"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 lg:w-[6rem] lg:h-[2.5rem] border-white border-l-2 border-r-2 border-b-2 rounded-b-lg lg:rounded-b-xl"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 lg:w-[13rem] lg:h-[6.5rem] border-white border-l-[3px] border-r-[3px] border-t-[3px] rounded-t-lg lg:rounded-t-xl"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 lg:w-[6rem] lg:h-[2.5rem] border-white border-l-2 border-r-2 border-t-2 rounded-t-lg lg:rounded-t-xl"></div>

        {slices.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="absolute left-0 w-full"
            style={rowPositions[lineIndex]}
          >
            <div className="flex flex-row justify-evenly items-center">
              {line.map((playerList, index) => {
                const currentIndex =
                  slices
                    .slice(0, lineIndex)
                    .reduce((acc, cur) => acc + cur.length, 0) + index;
                const shownPlayer = shownPlayers[currentIndex];
                return (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(currentIndex)}
                  >
                    {shownPlayer ? (
                      <div className="relative">
                        <PlayerCard
                          id={shownPlayer.player?.id}
                          name={shownPlayer.player?.name}
                          firstname={shownPlayer.player?.firstname}
                          lastname={shownPlayer.player?.lastname}
                          photo={shownPlayer.player?.photo}
                          percentage={
                            playerPercentages[currentIndex][
                              selectedPlayers[currentIndex].indexOf(shownPlayer)
                            ]
                          }
                          onPercentageChange={(percentage: number) =>
                            handlePercentageChange(
                              currentIndex,
                              selectedPlayers[currentIndex].indexOf(
                                shownPlayer
                              ),
                              percentage
                            )
                          }
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "text/plain",
                              currentIndex.toString()
                            );
                            handleDragStart(currentIndex);
                          }}
                          handlePlayerRemove={() =>
                            handlePlayerRemove(currentIndex)
                          }
                        />
                        {selectedPlayers[currentIndex].length >= 1 && (
                          <AddSubstituteButton
                            onClick={() => handleClick(currentIndex)}
                          />
                        )}
                        {selectedPlayers[currentIndex].length > 1 && (
                          <ToggleSubButton
                            onClick={() => handleToggleSubstitute(currentIndex)}
                          />
                        )}
                      </div>
                    ) : (
                      <AddPlayerButton
                        onClick={() => handleClick(currentIndex)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {openModal && (
          <PlayerSelectModal
            openModal={openModal}
            onClose={handleClose}
            players={players}
            onSelect={handlePlayerSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Pitch;
