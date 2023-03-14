import { Client } from "@/types/Client";
import { WorkingHours } from "@/utils/team-members-utils";

export type Team = {
  id: number;
  name: string;
  clientId: Client["id"] | null;
};

export type TeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
  teamId: Team["id"] | null; // null means benched
  hours: WorkingHours;
};
