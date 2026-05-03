"use client";

import GraphDisplay from "@/components/GraphDisplay";
import { Team } from "@/lib/types";
import { readTeams, writeTeams } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import DrinkIncrement from "@/components/DrinkIncrement";
import DrinkCounter from "@/components/DrinksCounter";
import { useLang } from "@/lib/lang-context";
import { pickNextColor } from "@/lib/colors";
import { Pattern, pickNextPattern } from "@/lib/patterns";

export default function Home() {
  const { t } = useLang();
  const [hydrated, setHydrated] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamName, setSelectedTeamName] = useState<string | undefined>(undefined);
  const [newTeamName, setNewTeamName] = useState("");
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate from localStorage on the client; setState here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTeams(readTeams());
    setHydrated(true);
  }, []);

  const selectedTeam = useMemo(
    () => teams.find((tm) => tm.name === selectedTeamName),
    [teams, selectedTeamName],
  );

  const addDrinks = (teamName: string, amount: number) => {
    setTeams((prev) => {
      const updated = prev.map((tm) =>
        tm.name === teamName ? { ...tm, drinks: Math.max(0, tm.drinks + amount) } : tm,
      );
      writeTeams(updated);
      return updated;
    });
  };

  const submitNewTeam = () => {
    const trimmed = newTeamName.trim();
    if (!trimmed) {
      setAddError(t.emptyTeamName);
      return;
    }
    const lower = trimmed.toLowerCase();
    if (teams.some((tm) => tm.name.toLowerCase() === lower)) {
      setAddError(t.duplicateTeam);
      return;
    }
    const color = pickNextColor(teams.map((tm) => tm.color));
    const pattern: Pattern = pickNextPattern(
      teams.map((tm) => tm.pattern ?? "solid"),
    );
    const newTeam: Team = { name: trimmed, drinks: 0, color, pattern };
    const updated = [...teams, newTeam];
    setTeams(updated);
    writeTeams(updated);
    setSelectedTeamName(newTeam.name);
    setNewTeamName("");
    setShowAddTeam(false);
    setAddError(null);
  };

  const cancelAddTeam = () => {
    setShowAddTeam(false);
    setNewTeamName("");
    setAddError(null);
  };

  const totalDrinks = teams.reduce((sum, tm) => sum + tm.drinks, 0);

  return (
    <div
      className="flex flex-col min-h-screen p-6"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, #fff7e6 0%, transparent 60%), linear-gradient(180deg, #fffbeb 0%, #fde68a30 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className="rounded-2xl shadow-xl p-8 mb-8 border border-amber-100/80"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fffaf0 100%)",
          }}
        >
          <DrinkCounter totalDrinks={totalDrinks} />

          {hydrated ? (
            <GraphDisplay teams={teams} onSelect={setSelectedTeamName} />
          ) : (
            <div className="h-72 mb-8" aria-hidden="true" />
          )}

          <div className="flex flex-col md:flex-row mb-2 gap-6">
            <div className="md:w-1/3 md:pr-6 md:border-r border-amber-100">
              <h2 className="text-xl font-semibold mb-5 mt-2 text-amber-900">
                {t.selectTeam}
              </h2>
              <div className="bg-amber-50/60 rounded-xl overflow-hidden shadow-sm border border-amber-100">
                {hydrated &&
                  teams.map((team) => {
                    const active = selectedTeamName === team.name;
                    return (
                      <div
                        key={team.name}
                        onClick={() => setSelectedTeamName(team.name)}
                        className={
                          "flex justify-between items-center p-4 cursor-pointer transition-colors duration-200 border-l-4 border-b border-b-amber-100 " +
                          (active
                            ? "bg-amber-100/70 border-l-amber-600"
                            : "hover:bg-amber-100/40 border-l-transparent")
                        }
                        style={
                          active
                            ? { boxShadow: "inset 0 2px 0 0 #fef3c7" }
                            : undefined
                        }
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-3 ring-2 ring-white"
                            style={{ backgroundColor: team.color }}
                          />
                          <span className="font-medium text-amber-950">
                            {team.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2 text-amber-900">
                            {team.drinks}
                          </span>
                          <ChevronRight size={16} className="text-amber-700/60" />
                        </div>
                      </div>
                    );
                  })}

                {!showAddTeam && (
                  <div
                    onClick={() => setShowAddTeam(true)}
                    className="flex items-center justify-center p-4 hover:bg-amber-100/50 cursor-pointer transition-colors duration-200 text-amber-800"
                  >
                    <Plus size={18} className="mr-2" />
                    <span className="font-semibold">{t.addTeam}</span>
                  </div>
                )}
              </div>

              {showAddTeam && (
                <div className="mt-4 bg-amber-50/80 p-4 rounded-xl border border-amber-200">
                  <h3 className="font-medium mb-2 text-amber-900">{t.newTeam}</h3>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => {
                        setNewTeamName(e.target.value);
                        if (addError) setAddError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitNewTeam();
                        else if (e.key === "Escape") cancelAddTeam();
                      }}
                      placeholder={t.teamNamePlaceholder}
                      className="w-full py-2 px-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-amber-950 bg-white"
                      autoFocus
                    />
                    {addError && (
                      <p className="text-sm text-red-700" role="alert">
                        {addError}
                      </p>
                    )}
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={submitNewTeam}
                        className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex-1"
                      >
                        {t.add}
                      </button>
                      <button
                        type="button"
                        onClick={cancelAddTeam}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DrinkIncrement selectedTeam={selectedTeam} addDrinks={addDrinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
