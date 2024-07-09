import { TeamParams, TeamResponse } from "@/types/types";
import PlayerList from "./PlayerList";
import TeamSearchField from "./TeamSearchField";
import { getTeamData } from "@/api";


async function getTeam(): Promise<TeamResponse | null> {

  const teamParams: TeamParams = {
    id: 33
  }
  const teamData = await getTeamData(teamParams);
  return teamData
}

const TeamComponent = async () => {
  return (
    <div>
      <TeamSearchField />
      <PlayerList />
    </div>
  );
};

export default TeamComponent;
