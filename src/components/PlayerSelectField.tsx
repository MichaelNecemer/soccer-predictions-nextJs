import { getCountryData } from "@/api";
import { CountryParams, CountryResponse, PlayerResponse } from "@/types/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type PlayerSelectFieldProps = {
  players: PlayerResponse[];
  onSelect: (player: PlayerResponse) => void;
};

export const PlayerSelectField = ({
  players,
  onSelect,
}: PlayerSelectFieldProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayerResponse[]>([]);
  const [countries, setCountries] = useState<CountryResponse[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getCountry = async (code?: string, name?: string): Promise<CountryResponse | null> => {
    const countryParams: CountryParams = {
      code: code,
      name: name
    };
    const countryData = await getCountryData(countryParams);
    return countryData;
  };



  useEffect(() => {
    if (query.length >= 4) {
      const filteredPlayers = players?.filter((playerEntry) =>
        playerEntry.player?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredPlayers);
      } else {
      setResults([]);
    }
  }, [query, players]);

  return (
    <div>
      <label className="mt-6 input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search for a player..."
          value={query}
          onChange={handleInputChange}
        />
      </label>
      <ul className="gap-2 mt-6">
        {results.map((playerResp) => (
          <li key={playerResp.player?.id} onClick={() => onSelect(playerResp)}>
            <div className="flex flex-row justify-between items-center bg-base-200 rounded-lg p-3 mb-2 hover:cursor-pointer hover:bg-accent">
              <div className="flex flex-row items-center gap-3">
                <span className="w-full h-full">
                  {playerResp.player?.photo && (
                    <Image
                      src={playerResp.player?.photo}
                      alt={
                        playerResp.player?.name ? playerResp.player?.name : ""
                      }
                      style={{ objectFit: "cover" }}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                </span>
                <span className="w-full">{playerResp.player?.name}</span>
              </div>
              <div className="flex flex-row items-center gap-3">
                <span className="flex flex-col items-center justify-center gap-2">
                  
                  <Image
                    src={`https://media.api-sports.io/flags/gb.svg`}
                    alt={""}
                    style={{ objectFit: "cover" }}
                    width={50}
                    height={50}
                  />
                   <span className="">{playerResp.player?.nationality}</span>

                </span>

                {playerResp.statistics?.map((statistic) => (
                  <span className="flex flex-col items-center justify-center">
                    {statistic.league?.logo && (
                      <Image
                        src={statistic.league.logo}
                        alt={statistic.league.name ? statistic.league.name : ""}
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                      />
                    )}
                    <span className="">
                      {statistic.league.name}
                    </span>
                  </span>
                ))}
                {playerResp.statistics?.map((statistic) => (
                  <span className="flex flex-col items-center justify-center">
                    {statistic.team?.logo && (
                      <Image
                        src={statistic.team.logo}
                        alt={statistic.team.name ? statistic.team.name : ""}
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                      />
                    )}
                    <span className="">
                      {statistic.team?.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
