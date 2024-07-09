"use client";
import { getFixtures, getLeagues } from "@/server-actions/actions";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Datepicker from "./Datepicker";
import SidebarLink from "./SidebarLink";
import { coveredLeagues } from "@/utils/coveredLeagues";
import { CoveredLeague, FixturesResponse, LeagueResponse } from "@/types/types";
import { format, addDays } from "date-fns";

const Sidebar = () => {
  const today = new Date();

  const initialRange: DateRange = {
    from: today,
    to: /* addDays(today, 0) */ today,
  };

  let yearOfSeason = 2023;

  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [leaguesData, setLeaguesData] = useState<LeagueResponse[] | null>();
  const [fixturesData, setFixturesData] = useState<FixturesResponse[] | null>();

  const formatDateForAPI = (date: Date) => format(date, "yyyy-MM-dd");

  const useServerActions = async (
    coveredLeagues: CoveredLeague[],
    yearOfSeason: number,
    range?: DateRange
  ) => {
    const leaguesData = await getLeagues(coveredLeagues, yearOfSeason);
    setLeaguesData(leaguesData);

    if (range?.from) {
      const formattedFromDate = formatDateForAPI(range.from);
      // use as default
      let formattedToDate = formatDateForAPI(range.from);

      if (range?.to) {
        formattedToDate = formatDateForAPI(range.to);
      }

      const fixturesData = await getFixtures(
        coveredLeagues,
        formattedFromDate,
        formattedToDate
      );
      setFixturesData(fixturesData);
      console.log(fixturesData);
    }
  };

  const updateRange = (newRange: DateRange | undefined) => {
    setRange(newRange);
  };

  useEffect(() => {
    if (range?.from && range?.to) {
      const runServerActions = async () => {
        await useServerActions(coveredLeagues, yearOfSeason, range);
      };
      runServerActions();
    }
  }, [range]);

  return (
    <section className="px-2 md:px-4 py-2 rounded-md bg-base-200 lg:min-w-80 lg:max-w-80 sm:min-w-10 sm:max-w-10 h-full">
      <div>
        <div className="flex flex-row justify-center items-center mb-3 mt-2">
          <Datepicker range={range} setRange={updateRange} />
        </div>
        <h1 className="font-bold text-xl mb-3 text-primary">Leagues</h1>
        {leaguesData && leaguesData.length > 0 ? (
          <ul className="divide-y-2">
            {leaguesData.map((leagueData, index) => {
              if (
                leagueData &&
                leagueData.league?.name &&
                leagueData.country?.name &&
                leagueData.country?.flag
              ) {
                return (
                  <li key={leagueData.league.id}>
                    <SidebarLink
                      name={leagueData.league.name}
                      href={""}
                      country={leagueData.country.name}
                      src={leagueData.country.flag}
                      fixtures={fixturesData?.filter((fixture) => {
                        return fixture.league?.id === leagueData.league?.id;
                      })}
                    />
                  </li>
                );
              } else {
                return null; // Skip rendering if data is incomplete or undefined
              }
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No leagues available.</p>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
