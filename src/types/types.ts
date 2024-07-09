export type apiOptions = {
  method: string;
  next: any;
  headers: {
    "x-apisports-key": string | any;
  };
};

export type CoveredLeague = {
  id: number;
  competition?: string;
};

export type NavLink = {
  key: number;
  text: string;
  href: string
};

export type Country = {
  name?: string;
  code?: string;
  flag?: string;
};

export type CountryParams = {
  name?: string;
  code?: string;
  flag?: string
}

export type CountryResponse = {
  country?: Country
}

export type League = {
  id: number;
  name?: string;
  code?: string;
  season?: number;
  team?: number;
  type?: string;
  current?: boolean;
  search?: string;
  last?: string;
  logo?: string;
};

export type LeagueResponse = {
  league?: League;
  country?: Country;
};

export type LeagueParams = {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  team?: number;
  type?: string;
  current?: string;
  search?: string;
  last?: string;
};

export type Team = {
  id?: number;
  name?: string;
  code?: string;
  country?: string;
  founded?: number;
  national?: boolean;
  logo?: string;
  winner?: boolean;
};

export type Venue = {
  id: number;
  name?: string;
  address?: string;
  city?: string;
  capacity?: number;
  surface?: string;
  image?: string;
};

export type Player = {
  id?: number;
  name?: string;
  number?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  birth?: {
    date?: string;
    place?: string;
    country?: string;
  };
  nationality?: string;
  height?: string;
  weight?: string;
  injured?: boolean;
  photo?: string;
  position?: string;
};

export type PlayerParams = {
  id?: number;
  team?: number;
  league?: number;
  season?: number;
  search?: string;
  page?: number;
};


export type PlayerResponse = {
  player?: Player;
  statistics?: [{
    team: Team;
    league: League
  }]
};

export type PlayerStatistics = {
  team: Team;
  league: League;
};

export type TeamParams = {
  id?: number;
  name?: string;
  league?: number;
  season?: number;
  country?: string;
  code?: string;
  venue?: number;
  search?: string;
};

export type TeamResponse = {
  team?: Team,
  venue?: Venue
}

export type FixtureParams = {
  id?: string;
  ids?: string;
  live?: string;
  date?: string;
  league?: number;
  season?: number;
  team?: number;
  last?: number;
  next?: number;
  from?: string;
  to?: string;
  round?: string;
  status?: string;
  venue?: number;
  timezone?: string;
};

export type Fixture = {
  id?: number;
  referee?: string;
  timezone?: string;
  date?: string;
  timestamp?: number;
};

export type FixturesResponse = {
  fixture?: Fixture;
  league?: League;
  teams?: {
    home?: Team;
    away?: Team;
  };
};

export type SquadParams = {
  team?: number,
  player?: number
}

export type SquadResponse = {
  team?: Team,
  players?: Player[]
}