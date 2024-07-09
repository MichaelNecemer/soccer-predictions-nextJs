"use client";
import { ThemeContext } from "@/theme/ThemeContext";
import { NavLink } from "@/types/types";
import Link from "next/link";
import { useContext } from "react";

const navLinks: NavLink[] = [
  {
    key: 1,
    text: "Latest predictions",
    href: "/lineups",
  },
  {
    key: 2,
    text: "Make a prediction",
    href: "/predict",
  },
  /*  {
    key: 3,
    text: "Pricing",
  }*/
];

const Navbar = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center bg-base-200 pl-5 pr-5 text-xl">
      <Link href={"/"}>
        <h1>Soccer Lineups</h1>
      </Link>

      <div>
        {/*Add the navlinks as buttons to the navbar*/}
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="btn btn-ghost hover:bg-accent"
          >
            {link.text}
          </Link>
        ))}
        {/*Add the dropdown menu for theme switching to the navbar*/}
        <div className="dropdown mr-1">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1 group">
            Theme
            <svg
              width="12px"
              height="12px"
              className="h-2 w-2 fill-current opacity-60 inline-block transition-transform group-focus:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-32"
          >
            {["light", "dark", "retro", "cyberpunk"].map((item) => (
              <li key={item}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={item.charAt(0).toUpperCase() + item.slice(1)}
                  value={item}
                  checked={theme === item}
                  onChange={() => changeTheme(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
