export type Team = {
  id: number;
  name: string;
};

export type TeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
  teamId: Team["id"] | null; // null means benched
  hours: number;
};
