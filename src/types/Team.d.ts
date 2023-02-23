export type Team = {
  id: number;
  name: string;
};

export type TeamMember = {
  id: number;
  teamId: Team["id"] | null; // null means benched
};
