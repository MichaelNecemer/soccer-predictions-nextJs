import {
  FixtureParams,
  FixturesResponse,
  League,
  LeagueParams,
  LeagueResponse,
  apiOptions,
  CoveredLeague,
  PlayerParams,
  PlayerResponse,
  SquadParams,
  SquadResponse,
  CountryParams,
  CountryResponse,
  TeamParams,
  TeamResponse,
} from "@/types/types";

const API_KEY: string = process.env.API_KEY as string;
const BASE_URL: string = process.env.BASE_URL as string;

const options: apiOptions = {
  method: "GET",
  next: { revalidate: 60 * 60 * 24 },
  headers: {
    "x-apisports-key": process.env.API_KEY,
  },
};

function prepareUrlWithParams(url: string, queryParams: any) {
  if (!queryParams) {
    return url;
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${url}?${queryString}`;
  return urlWithParams;
}

export async function checkStatus() {
  const url = `${BASE_URL}/status`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getLeagueData(
  params?: LeagueParams
): Promise<LeagueResponse | null> {
  const url = `${BASE_URL}/leagues`;
  const urlWithParams = prepareUrlWithParams(url, params);

  try {
    const response = await fetch(urlWithParams, options);
    if (!response.ok) {
      // Handle HTTP errors
      console.error(`Error fetching data: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    const leagueResponse: LeagueResponse = data.response[0];
    return leagueResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getFixturesData(
  params?: FixtureParams
): Promise<FixturesResponse[] | null> {
  const url = `${BASE_URL}/fixtures`;
  const urlWithParams = prepareUrlWithParams(url, params);
  console.log(urlWithParams);
  try {
    const response = await fetch(urlWithParams, options);
    const data = await response.json();
    const fixturesResponse: FixturesResponse[] = data.response;
   
    // Return the response directly if it's an array, or return null if it's not an array
    return Array.isArray(fixturesResponse) ? fixturesResponse : null;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
}

export async function getSquadData(
  params?: SquadParams
): Promise<SquadResponse[] | null> {
  const url = `${BASE_URL}/players/squads`;
  const urlWithParams = prepareUrlWithParams(url, params);

  try {
    let allSquadResponse: SquadResponse[] = [];
    let currentPage = 1;
    let totalPages = Infinity; // Assume infinite pages until we get the real value

    do {
      // Fetch data for the current page
      const response = await fetch(urlWithParams, options);
      const data = await response.json();
      const squadResponse: SquadResponse[] = data.response;

      // Update the total number of pages if it's not set yet
      if (totalPages === Infinity) {
        totalPages = data.paging.total;
      }

      // Add the fetched data to the array
      allSquadResponse = [...allSquadResponse, ...squadResponse];

      // Move to the next page
      currentPage++;
    } while (currentPage <= totalPages); // Continue fetching until we reach the last page

    // Return the response
    return allSquadResponse;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getPlayerData(
  params?: PlayerParams, maxPages = 5
): Promise<PlayerResponse[] | null> {
  const url = `${BASE_URL}/players`;
  const urlWithParams = prepareUrlWithParams(url, params);

  try {
    let currentPage = 1;
    let totalPages = Infinity;
    let allPlayersResponse: PlayerResponse[] = [];

    do {
      let urlWithPage = `${urlWithParams}&page=${currentPage}`;
      const response = await fetch(urlWithPage, options);

      if (!response.ok) {
        // Handle HTTP errors
        console.error(`Error fetching data: ${response.statusText}`);
        return null;
      }
      const data = await response.json();

      // Update the total number of pages if it's not set yet
      if (totalPages === Infinity) {
        totalPages = data.paging.total;
      } else {
        totalPages = maxPages
      }

      const playerResponse: PlayerResponse[] = data.response;

      // Add the fetched data to the array
      allPlayersResponse = [...allPlayersResponse, ...playerResponse];

      // Move to the next page
      currentPage++;
    } while (currentPage <= totalPages);
    return allPlayersResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getCountryData(
  params?: CountryParams
): Promise<CountryResponse | null> {
  const url = `${BASE_URL}/countries`;
  const urlWithParams = prepareUrlWithParams(url, params);

  try {
    const response = await fetch(urlWithParams, options);

    if (!response.ok) {
      // Handle HTTP errors
      console.error(`Error fetching data: ${response.statusText}`);
      return null;
    }
    const data = await response.json();

    const countryResponse: CountryResponse = data.response;

    return countryResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getTeamData(
  params?: TeamParams
): Promise<TeamResponse | null> {
  const url = `${BASE_URL}/teams`;
  const urlWithParams = prepareUrlWithParams(url, params);

  try {
    const response = await fetch(urlWithParams, options);

    if (!response.ok) {
      // Handle HTTP errors
      console.error(`Error fetching data: ${response.statusText}`);
      return null;
    }
    const data = await response.json();

    const teamResponse: TeamResponse = data.response;

    return teamResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}