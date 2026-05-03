"use client";

import { Team } from "@/lib/types";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useId } from "react";
import { useLang } from "@/lib/lang-context";
import { Pattern } from "@/lib/patterns";

type PatternDefProps = {
  id: string;
  pattern: Pattern;
  color: string;
};

function PatternDef({ id, pattern, color }: PatternDefProps) {
  // Subtle white overlay to keep the team color readable while still
  // adding a distinct texture.
  const stroke = "rgba(255, 255, 255, 0.45)";
  const dot = "rgba(255, 255, 255, 0.55)";

  switch (pattern) {
    case "solid":
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill={color} />
        </pattern>
      );
    case "diag":
      return (
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill={color} />
          <rect x="0" y="0" width="3" height="8" fill={stroke} />
        </pattern>
      );
    case "diag-rev":
      return (
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(-45)"
        >
          <rect width="8" height="8" fill={color} />
          <rect x="0" y="0" width="3" height="8" fill={stroke} />
        </pattern>
      );
    case "horizontal":
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill={color} />
          <rect x="0" y="0" width="8" height="3" fill={stroke} />
        </pattern>
      );
    case "vertical":
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill={color} />
          <rect x="0" y="0" width="3" height="8" fill={stroke} />
        </pattern>
      );
    case "dots":
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill={color} />
          <circle cx="2.5" cy="2.5" r="1.6" fill={dot} />
          <circle cx="7.5" cy="7.5" r="1.6" fill={dot} />
        </pattern>
      );
    case "crosshatch":
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill={color} />
          <path
            d="M0 0 L10 10 M10 0 L0 10"
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
          />
        </pattern>
      );
  }
}

type BeerBarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: Team;
  patternIdFor: (teamName: string) => string;
  onSelect?: (teamName: string) => void;
};

function BeerBarShape(props: BeerBarShapeProps) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    payload,
    patternIdFor,
    onSelect,
  } = props;
  if (!payload || width <= 0 || height <= 0) return null;

  const patternId = patternIdFor(payload.name);
  const radius = 6;
  const foamHeight = Math.min(10, Math.max(0, height - 4));
  const showFoam = height > 14;
  const handleClick = onSelect ? () => onSelect(payload.name) : undefined;

  // Body: full bar with rounded top, filled with the team's pattern.
  // Foam: slightly wider rounded cream cap drawn just above the bar top
  //       to suggest beer foam overflowing the glass.
  return (
    <g
      onClick={handleClick}
      style={onSelect ? { cursor: "pointer" } : undefined}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={`url(#${patternId})`}
      />
      {showFoam && (
        <>
          <rect
            x={x - 2}
            y={y - foamHeight / 2}
            width={width + 4}
            height={foamHeight}
            rx={foamHeight / 2}
            ry={foamHeight / 2}
            fill="#fffaf0"
            stroke="#fde68a"
            strokeWidth="1"
            opacity="0.95"
          />
          <ellipse
            cx={x + width * 0.35}
            cy={y - foamHeight / 2}
            rx={Math.max(2, width * 0.08)}
            ry={Math.max(1.5, foamHeight * 0.35)}
            fill="#ffffff"
            opacity="0.9"
          />
          <ellipse
            cx={x + width * 0.7}
            cy={y - foamHeight / 2 + 1}
            rx={Math.max(1.5, width * 0.05)}
            ry={Math.max(1.2, foamHeight * 0.28)}
            fill="#ffffff"
            opacity="0.7"
          />
        </>
      )}
    </g>
  );
}

type GraphDisplayProps = {
  teams: Team[];
  onSelect?: (teamName: string) => void;
};

export default function GraphDisplay({ teams, onSelect }: GraphDisplayProps) {
  const { t } = useLang();
  const idPrefix = useId().replace(/[:]/g, "_");
  const patternIdFor = (name: string) =>
    `pat-${idPrefix}-${name.replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  if (teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 mb-8">
        <p className="text-amber-800/70">{t.noTeamsYet}</p>
      </div>
    );
  }

  return (
    <div className="h-72 mb-8 w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart
          data={teams}
          margin={{ top: 18, right: 30, left: 10, bottom: 10 }}
        >
          <defs>
            {teams.map((team) => (
              <PatternDef
                key={team.name}
                id={patternIdFor(team.name)}
                pattern={team.pattern ?? "solid"}
                color={team.color}
              />
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fde68a" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#78350f" }}
            axisLine={{ stroke: "#d97706" }}
          />
          <YAxis
            tick={{ fill: "#78350f" }}
            axisLine={{ stroke: "#d97706" }}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value) => [t.drinks(Number(value)), t.quantity]}
            contentStyle={{
              backgroundColor: "rgba(255, 251, 235, 0.97)",
              borderRadius: "8px",
              border: "1px solid #fde68a",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ fill: "rgba(254, 243, 199, 0.4)" }}
          />
          <Bar
            dataKey="drinks"
            barSize={60}
            animationDuration={800}
            animationEasing="ease-out"
            shape={(props: object) => (
              <BeerBarShape
                {...(props as BeerBarShapeProps)}
                patternIdFor={patternIdFor}
                onSelect={onSelect}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
