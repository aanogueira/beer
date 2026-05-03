export type Lang = "pt" | "en";

export const LANGS: Lang[] = ["pt", "en"];

export type Messages = {
  appTitle: string;
  appDescription: string;
  total: string;
  selectTeam: string;
  addTeam: string;
  newTeam: string;
  teamNamePlaceholder: string;
  add: string;
  cancel: string;
  duplicateTeam: string;
  emptyTeamName: string;
  addDrinkFor: string;
  clickToAddOrRemove: string;
  noTeamsYet: string;
  pickATeamHeading: string;
  pickATeamBody: string;
  drinks: (n: number) => string;
  quantity: string;
  language: string;
};

export const messages: Record<Lang, Messages> = {
  pt: {
    appTitle: "Contador de Bebidas",
    appDescription: "App para contar bebidas entre equipas",
    total: "Total",
    selectTeam: "Selecione uma Equipa",
    addTeam: "Adicionar Equipa",
    newTeam: "Nova Equipa",
    teamNamePlaceholder: "Nome da equipa",
    add: "Adicionar",
    cancel: "Cancelar",
    duplicateTeam: "Já existe uma equipa com esse nome.",
    emptyTeamName: "O nome da equipa não pode estar vazio.",
    addDrinkFor: "Adicionar Bebida para",
    clickToAddOrRemove: "Clique num botão para adicionar ou remover bebidas",
    noTeamsYet: "Nenhuma equipa adicionada ainda.",
    pickATeamHeading: "Selecione uma Equipa",
    pickATeamBody:
      "Clique numa equipa à esquerda ou no gráfico acima para adicionar bebidas",
    drinks: (n: number) => (n === 1 ? "1 bebida" : `${n} bebidas`),
    quantity: "Quantidade",
    language: "Idioma",
  },
  en: {
    appTitle: "Drink Counter",
    appDescription: "App for counting drinks between teams",
    total: "Total",
    selectTeam: "Select a Team",
    addTeam: "Add Team",
    newTeam: "New Team",
    teamNamePlaceholder: "Team name",
    add: "Add",
    cancel: "Cancel",
    duplicateTeam: "A team with that name already exists.",
    emptyTeamName: "Team name can't be empty.",
    addDrinkFor: "Add Drink for",
    clickToAddOrRemove: "Click a button to add or remove drinks",
    noTeamsYet: "No teams added yet.",
    pickATeamHeading: "Select a Team",
    pickATeamBody:
      "Click a team on the left or on the chart above to add drinks",
    drinks: (n: number) => (n === 1 ? "1 drink" : `${n} drinks`),
    quantity: "Quantity",
    language: "Language",
  },
};

export type MessageKey = keyof Messages;
