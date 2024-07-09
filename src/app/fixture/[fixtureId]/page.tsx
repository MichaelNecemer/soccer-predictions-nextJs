import { checkStatus, getFixturesData } from "@/api";
import { FixtureParams, FixturesResponse } from "@/types/types";
import React from "react";
import Image from "next/image";
import { getParsedDate } from "@/utils/dateParser";

export default async function PredictionPage({
  params,
}: {
  params: { fixtureId: string };
}) {
  const fixtureParams: FixtureParams = {
    id: params.fixtureId,
  };

  const fixtureData: FixturesResponse[] | null = await getFixturesData(
    fixtureParams
  );

  let fixture = null;
  if (fixtureData != null) {
    fixture = fixtureData[0];
  }

  let parsedDate = fixture?.fixture?.date ? getParsedDate(fixture?.fixture?.date) : ''

  return (
    <div className="min-w-[600px] max-h-[600px] flex flex-col gap-3 border-2 items-center pt-4 rounded-badge">
      {fixture ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-row justify-between rounded-badge bg-base-200 gap-4 p-3">
            <div className="flex flex-col justify-center items-center m-1">
              {fixture.teams?.home?.logo && (
                <Image
                  src={fixture.teams?.home?.logo}
                  alt={"Logo"}
                  width={40}
                  height={40}
                ></Image>
              )}
              <div>{fixture.teams?.home?.name}</div>
            </div>
            <div className="m-auto">{parsedDate}</div>
            <div className="flex flex-col justify-center items-center m-1">
              {fixture.teams?.away?.logo && (
                <Image
                  src={fixture.teams?.away?.logo}
                  alt={"Logo"}
                  width={40}
                  height={40}
                ></Image>
              )}
              <div> {fixture?.teams?.away?.name}</div>
            </div>
          </div>
          <div>
            <div className="join grid grid-cols-2">
              <button className="join-item btn btn-outline hover:bg-accent w-32">
                {fixture?.teams?.home?.name}
              </button>
              <button className="join-item btn btn-outline hover:bg-accent w-32">
                {fixture?.teams?.away?.name}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No fixture found!</div>
      )}
    </div>
  );
}
