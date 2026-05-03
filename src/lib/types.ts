import type { Pattern } from "./patterns";

export type Team = {
  name: string;
  color: string;
  drinks: number;
  pattern?: Pattern;
};
