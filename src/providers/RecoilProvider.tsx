import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "@/state/recoil/atoms/teamMemberIdsAtom";
import { clientIdsAtom } from "@/state/recoil/atoms/clientIdsAtom";
import { clientAtomFamily } from "@/state/recoil/atoms/clientAtomFamily";
import { Team, TeamMember } from "@/types/Team";
import { TeamBoxSettings } from "@/types/TeamBoxSettings";
import { Client } from "@/types/Client";

import {
  GRID_COLS,
  GRID_GAP,
  MEMBER_BORDER,
  MEMBER_WIDTH,
  TEAM_GAP,
  TEAM_PADDING,
} from "@/utils/constants";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";

export const RecoilProvider = ({ children }: PropsWithChildren) => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  const [clients, setClients] = useState<Client[] | null>(null);

  useEffect(() => {
    const teamJson = localStorage.getItem("teams");
    const teamMembersJson = localStorage.getItem("team-members");
    const clientJson = localStorage.getItem("clients");

    setTeams(teamJson ? JSON.parse(teamJson) : []);
    setTeamMembers(teamMembersJson ? JSON.parse(teamMembersJson) : []);
    setClients(clientJson ? JSON.parse(clientJson) : []);
  }, []);

  const setInitialState = ({ set }: MutableSnapshot) => {
    if (!teams || !teamMembers || !clients) return;

    const teamIds = teams.map((team) => team.id);
    const teamMemberIds = teamMembers.map((teamMember) => teamMember.id);
    const clientIds = clients.map((client) => client.id);

    // Initialize the teamIds atom
    set(teamIdsAtom, teamIds);

    // Initialize the memberIds atom
    set(teamMemberIdsAtom, teamMemberIds);

    // Initialize the clientIds atom
    set(clientIdsAtom, clientIds);

    // Initilize the teamMembers atoms
    teamMembers.forEach((teamMember) => {
      set(teamMemberAtomFamily(teamMember.id), teamMember);
    });

    // Initilize the team atoms
    teams.forEach((team) => {
      set(teamAtomFamily(team.id), team);
    });

    // Initilize the clients atoms
    clients.forEach((client) => {
      set(clientAtomFamily(client.id), client);
    });

    const boxesSettings: Record<Team["id"], TeamBoxSettings> = {};

    // For each team, set its original position in the canvas
    // Initially they'll be displayed in a n*3 grid (n rows, 3 colums).
    teamIds.forEach((id, index) => {
      // The number of members in the team
      const members = teamMembers.filter((member) => member.teamId === id);

      // Each box fits two members horizontally (including borders, padding and gap)
      const width =
        2 * MEMBER_WIDTH + 2 * TEAM_PADDING + 2 * MEMBER_BORDER + TEAM_GAP;

      const height = calculateTeamBoxHeight(members);

      // The x position of the box equals their left adjacent box (x + width) or zero if the top adjacent box doesn't exist.
      let x: number;

      const col = index % GRID_COLS;
      const leftBoxIdx = col > 0 ? col - 1 : null;
      if (leftBoxIdx == null) {
        x = 0;
      } else {
        const leftBoxSettings = boxesSettings[teamIds[leftBoxIdx]];
        x = leftBoxSettings.x + leftBoxSettings.width + GRID_GAP;
      }

      // The y position of the box equals their top adjacent box (y + height) or zero if the top adjacent box doesn't exist.
      let y: number;

      const aboveBoxIdx = index >= GRID_COLS ? index - GRID_COLS : null;
      if (aboveBoxIdx == null) {
        y = 0;
      } else {
        const aboveBoxSettings = boxesSettings[teamIds[aboveBoxIdx]];
        y = aboveBoxSettings.y + aboveBoxSettings.height + GRID_GAP;
      }

      // Each box data is stored on a hashmap since boxes depend on each other.
      boxesSettings[id] = {
        x,
        y,
        width,
        height,
      };

      // Initialize the teamBox atoms
      set(teamBoxAtomFamily(id), (currentData) => ({
        ...currentData,
        width,
        height,
        x,
        y,
      }));
    });
  };

  return teams !== null && teamMembers !== null && clients !== null ? (
    <RecoilRoot initializeState={setInitialState}>{children}</RecoilRoot>
  ) : null;
};
