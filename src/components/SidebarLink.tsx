"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoChevronDown } from "react-icons/go";
import { Fixture, FixturesResponse } from "@/types/types";
import { getParsedDate, parseDate } from "@/utils/dateParser";

type LinkProps = {
  name: string;
  country: string;
  href: string;
  src: string;
  fixtures?: FixturesResponse[];
  children?: any
};

const SidebarLink = ({ name, country, href, src, fixtures, children}: LinkProps) => {
  const [linkClicked, setLinkClicked] = useState(false);

  const handleLinkClicked = () => {
    setLinkClicked(!linkClicked);
  };

  return (
    <>
      <Link
        href={''}
        className="flex flex-row justify-between items-center px-2 py-2 pt-2 hover:bg-accent" 
        onClick={handleLinkClicked}
        scroll={false}
      >
        <div className="flex flex-row items-center gap-4">
          <Image
            src={src}
            alt={name}
            width={40}
            height={10}
            style={{ width: "auto", height: "auto" }}
            className="max-w-12 max-h-12 rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <span className="text-sm text-left">{country}</span>
            <span className="text-sm md:text-base font-semibold text-left">{name}</span>
          </div>
        </div>

        <GoChevronDown
          className={`ml-2 transition-transform ${
            linkClicked ? "rotate-180" : ""
          } ease-in-out duration-300`}
        />
      </Link>

      {linkClicked ? (
        <ul className="flex flex-col p-2">
          {fixtures?.map((fixture, index) => (
            <Link key = {fixture.fixture?.id ? fixture.fixture?.id : index} href={`/fixture/${fixture.fixture?.id}`}>
            <li key = {fixture.fixture?.id ? fixture.fixture?.id : index} className="flex flex-row border-b-2 p-2 items-center gap-2 hover:bg-slate-200 hover:cursor-pointer">
              {fixture.fixture?.date && (
                <span className="max-w-20 text-sm">{getParsedDate(fixture.fixture.date)}</span>
              )}
              <div className="flex flex-col gap-1">
                {fixture.teams?.home?.logo && fixture.teams?.home?.name && (
                  <div className="flex flex-row gap-2">
                    <Image
                      src={fixture.teams?.home?.logo}
                      alt={fixture.teams?.home?.name}
                      width={24}
                      height={24}
                      style={{objectFit: "cover"}}
                      className="max-w-6 max-h-6"
                    />
                    <span>{fixture.teams?.home?.name} </span>
                  </div>
                )}
                {fixture.teams?.away?.logo && fixture.teams?.away?.name && (
                  <div className="flex flex-row gap-2">
                    <Image
                      src={fixture.teams?.away?.logo}
                      alt={fixture.teams?.away?.name}
                      width={24}
                      height={24}
                      style={{objectFit: "cover"}}
                      className="max-w-6 max-h-6"
                    />
                    <span>{fixture.teams?.away?.name} </span>
                  </div>
                )}
                {children}
              </div>
            </li>
            </Link>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default SidebarLink;
