"use client";

import { Team } from "@/lib/types";
import { Beer, MinusCircle, PlusCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type DrinkFormProps = {
  selectedTeam: Team | undefined;
  addDrinks: (teamName: string, amount: number) => void;
};

const POSITIVE = [1, 2, 5, 11] as const;
const NEGATIVE = [-1, -2, -5, -11] as const;

export default function DrinkIncrement({ selectedTeam, addDrinks }: DrinkFormProps) {
  const { t } = useLang();

  return (
    <div className="md:w-2/3 md:pl-6">
      {selectedTeam ? (
        <div className="h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-amber-900">
              {t.addDrinkFor}{" "}
              <span style={{ color: selectedTeam.color }}>{selectedTeam.name}</span>
            </h2>
            <div className="flex items-center bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
              <Beer size={20} className="text-amber-600 mr-2" />
              <span
                className="font-bold text-2xl"
                style={{ color: selectedTeam.color }}
              >
                {selectedTeam.drinks}
              </span>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-sm border border-amber-100"
            style={{
              background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)",
            }}
          >
            <div className="text-center mb-6">
              <p className="text-amber-900/80">{t.clickToAddOrRemove}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {POSITIVE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => addDrinks(selectedTeam.name, n)}
                  className="group flex flex-col items-center justify-center py-5 px-4 rounded-xl text-white font-bold shadow-md transition-transform duration-100 active:scale-95 hover:brightness-105"
                  style={{
                    background:
                      "linear-gradient(180deg, #fbbf24 0%, #b45309 100%)",
                  }}
                >
                  <PlusCircle size={26} className="mb-1 drop-shadow" />
                  <span className="text-2xl">+{n}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {NEGATIVE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => addDrinks(selectedTeam.name, n)}
                  className="group flex flex-col items-center justify-center py-5 px-4 rounded-xl text-amber-100 font-bold shadow-md transition-transform duration-100 active:scale-95 hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(180deg, #78350f 0%, #1c1410 100%)",
                  }}
                >
                  <MinusCircle size={26} className="mb-1 drop-shadow" />
                  <span className="text-2xl">{n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center bg-amber-50/50 border border-amber-100 rounded-xl p-10">
          <div className="text-center">
            <Beer size={64} className="text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-amber-900 mb-2">
              {t.pickATeamHeading}
            </h3>
            <p className="text-amber-800/70">{t.pickATeamBody}</p>
          </div>
        </div>
      )}
    </div>
  );
}
