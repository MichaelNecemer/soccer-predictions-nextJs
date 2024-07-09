import { checkStatus, getPlayerData } from "@/api";
import PitchWithFeatures from "@/components/pitch/PitchWithFeatures";
import TeamComponent from "@/components/TeamComponent";
import { PlayerParams, PlayerResponse } from "@/types/types";

export default async function Home() {
  const getPlayers = async () => {
    let playerParams: PlayerParams = {
      league: 39,
      season: 2023,
    };
    const playerData: PlayerResponse[] | null = await getPlayerData(
      playerParams, 
      10
    );
    return playerData ? playerData : [];
  };

  const players: PlayerResponse[] = await getPlayers();

  const status = await checkStatus()
  console.log(status);

  return (
    <section className="px-2 md:px-4 flex-grow">
      <div className="flex justify-between items-center max-w-80 mb-4 md:mb-2 gap-2">
        <h1 className="text-md md:text-xl font-bold">Lineup prediction</h1>
      </div>
      <div className="flex flex-row justify-evenly gap-3">
        {/* Pitch */}
        <PitchWithFeatures players={players} />

        {/*TeamComponent*/}
        <TeamComponent />
       

        {/*Comment section*/}
        <div className="bg-base-200 min-w-60 min-h-full text-center">Comment section</div>
      </div>
    </section>
  );
}
