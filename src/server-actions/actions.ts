"use server"
import { CoveredLeague, FixturesResponse, FixtureParams, League, LeagueResponse, LeagueParams } from "@/types/types";
import { getFixturesData, getLeagueData } from "@/api";

export async function getFixtures(
    coveredLeagues: CoveredLeague[], fromDate: string, toDate?: string
  ): Promise<FixturesResponse[]> {
    // Create an array of promises
    const fixturePromises = coveredLeagues.map(async (coveredLeague) => {
      const fixtureParams: FixtureParams = {
        league: coveredLeague.id,
        season: 2024,
        from: fromDate,
        to: toDate
      };
      return await getFixturesData(fixtureParams);
    });
  
    // Resolve all promises concurrently and filter out null values
    const fixturesDataArray = await Promise.all(fixturePromises);
    const fixturesData = fixturesDataArray.flatMap((data) => data ?? []);
  
    return fixturesData;
  }


  export async function getLeagues(
    coveredLeagues: CoveredLeague[], yearOfSeason: number
  ): Promise<LeagueResponse[]> {
    // Create an array of promises
    const leaguePromises = coveredLeagues.map(async (coveredLeague) => {
      const leagueParams: LeagueParams = {
        id: coveredLeague.id,
        season: yearOfSeason
      };
  
      return await getLeagueData(leagueParams);
    });
  
    // Resolve all promises concurrently and filter out null values
    const leaguesData = await Promise.all(leaguePromises);
    return leaguesData.filter(
      (leagueResp): leagueResp is LeagueResponse => leagueResp !== null
    );
  }
  