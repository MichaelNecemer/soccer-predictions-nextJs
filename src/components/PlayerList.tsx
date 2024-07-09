import { getCountryData, getSquadData } from "@/api";
import {
  CountryParams,
  CountryResponse,
  SquadParams,
  SquadResponse,
} from "@/types/types";
import PlayerCard from "./player/PlayerCard";
import Image from "next/image";

const positions = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

const PlayerList = async () => {
  const getCountry = async (
    code?: string,
    name?: string
  ): Promise<CountryResponse | null> => {
    const countryParams: CountryParams = {
      code: code,
      name: name,
    };
    const countryData = await getCountryData(countryParams);
    return countryData;
  };

  const getSquadResponse = async (): Promise<SquadResponse[]> => {
    const squadParams: SquadParams = {
      team: 34,
    };

    const squadData = await getSquadData(squadParams);
    return squadData ? squadData : [];
  };

  const squadData: SquadResponse[] = await getSquadResponse();
  const firstEntry = squadData.at(0)?.team;

  return (
    <div className=" overflow-y-scroll max-h-[800px]">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-lg font-bold mb-2">
          Players for {firstEntry?.name}
        </h1>
        {firstEntry && firstEntry.logo && (
          <Image
            src={firstEntry?.logo}
            alt={firstEntry.name ? firstEntry.name : ""}
            width={40}
            height={40}
            className="pb-2"
          ></Image>
        )}
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Number</th>
            <th className="py-2 px-4 border-b">Photo</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Nationality</th>
          </tr>
        </thead>
        <tbody>
          {squadData.flatMap((entry, index) =>
            entry.players?.map((player) => (
              <tr key={player.id}>
                <td className="py-2 px-4 border-b text-center">
                  {player.number}
                </td>
                <td className="py-2 px-4 border-b">
                  {player.photo && (
                    <Image
                      src={player.photo}
                      alt={player.name ? player.name : ""}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {player.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {player.position}
                </td>
                <td className="py-2 px-4 border-b text-center">{player.age}</td>
                <td className="py-2 px-4 border-b text-center">
                  {player.nationality}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default PlayerList;
