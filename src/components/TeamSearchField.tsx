"use client";
import { TeamResponse } from "@/types/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type TeamSearchFieldProps = {
  teams?: TeamResponse[];
  onSelect?: (team: TeamResponse) => void;
};

const TeamSearchField = ({ teams, onSelect }: TeamSearchFieldProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TeamResponse[]>([]);

  useEffect(() => {
    if (query.length >= 4) {
      const filteredTeams = teams?.filter((teamsEntry) =>
        teamsEntry.team?.name?.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredTeams) {
        setResults(filteredTeams);
      }
    } else {
      setResults([]);
    }
  }, [query, teams]);

  return (
    <div>
      <label className="mt-6 max-w-60 input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search for a team/club ..."
          value={query}
          onChange={handleInputChange}
        />
      </label>
      <ul className="gap-2 mt-6">
        {results.map((teamResp) => (
          <li key={teamResp.team?.id}>
            <div className="flex flex-row justify-between items-center bg-base-200 rounded-lg p-3 mb-2 hover:cursor-pointer hover:bg-accent">
              {teamResp.team?.logo && (
                <Image
                  src={teamResp.team?.logo}
                  alt={teamResp.team?.name ? teamResp.team?.name : ""}
                  style={{ objectFit: "cover" }}
                  width={50}
                  height={50}
                />
              )}
              <span>{teamResp.team?.name}</span>
              <span>{teamResp.team?.country}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamSearchField;
