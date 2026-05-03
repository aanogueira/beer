"use client";

import { useLang } from "@/lib/lang-context";
import { LANGS } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.language}
      className="inline-flex rounded-full border border-amber-200 bg-amber-50/80 p-0.5 shadow-sm"
    >
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={
              "px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full transition-colors duration-150 " +
              (active
                ? "bg-amber-600 text-white shadow"
                : "text-amber-800 hover:bg-amber-100")
            }
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
