import { clientAtomFamily } from "@/state/recoil/atoms/clientAtomFamily";
import { clientIdsAtom } from "@/state/recoil/atoms/clientIdsAtom";
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "@/state/recoil/atoms/teamMemberIdsAtom";
import { Client } from "@/types/Client";
import { Team, TeamMember } from "@/types/Team";

import {
  DEFAULT_GAP_BETWEEN_TEAM_BOXES,
  DEFAULT_TEAM_BOX_HEIGHT,
  DEFAULT_TEAM_BOX_WIDTH,
} from "@/utils/constants";
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

    // Init teamids, memberIds and clientIds.
    set(teamIdsAtom, teamIds);
    set(teamMemberIdsAtom, teamMemberIds);
    set(clientIdsAtom, clientIds);

    // Init team-members, teams and clients.
    teamMembers.forEach((teamMember) => {
      set(teamMemberAtomFamily(teamMember.id), teamMember);
    });
    teams.forEach((team) => {
      set(teamAtomFamily(team.id), team);
    });
    clients.forEach((client) => {
      set(clientAtomFamily(client.id), client);
    });

    // Init the position of each team in the canvas.
    teamIds.forEach((id, index) => {
      set(teamBoxPositionAtomFamily(id), {
        x:
          (index % 3) *
          (DEFAULT_TEAM_BOX_WIDTH + DEFAULT_GAP_BETWEEN_TEAM_BOXES),
        y:
          Math.floor(index / 3) *
          (DEFAULT_TEAM_BOX_HEIGHT + DEFAULT_GAP_BETWEEN_TEAM_BOXES),
      });
    });
  };

  return teams !== null && teamMembers !== null && clients !== null ? (
    <RecoilRoot initializeState={setInitialState}>{children}</RecoilRoot>
  ) : null;
};
