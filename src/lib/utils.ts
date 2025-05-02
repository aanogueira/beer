import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Team } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function readTeams() {
  if (typeof window !== "undefined" && window.localStorage) {
    const teams = localStorage.getItem("teams");
    return teams ? (JSON.parse(teams) as Team[]) : [];
  }
  return [];
}

export function writeTeams(teams: Team[]) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("teams", JSON.stringify(teams));
  }
}
