"use client";

import { Beer } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import LangToggle from "./LangToggle";

export default function DrinkCounter({ totalDrinks }: { totalDrinks: number }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4">
      <div className="flex items-center space-x-3">
        <div
          className="rounded-full p-2 shadow-inner"
          style={{
            background: "linear-gradient(180deg, #fde68a 0%, #f59e0b 100%)",
          }}
        >
          <Beer size={28} className="text-amber-900" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-amber-900">
          {t.appTitle}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <LangToggle />
        <div
          className="px-4 py-2 rounded-lg border border-amber-200 shadow-sm"
          style={{
            background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)",
          }}
        >
          <span className="text-amber-900 font-medium">{t.total}: </span>
          <span className="text-amber-700 font-bold text-xl">{totalDrinks}</span>
        </div>
      </div>
    </div>
  );
}
