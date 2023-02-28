import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "@/state/recoil/atoms/teamMemberIdsAtom";
import { Team, TeamMember } from "@/types/Team";
import { PropsWithChildren } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";

type Props = {
  teams: Team[];
  teamMembers: TeamMember[];
};

export const RecoilProvider = ({
  teams,
  teamMembers,
  children,
}: PropsWithChildren<Props>) => {
  const setInitialState = ({ set }: MutableSnapshot) => {
    if (!teams || !teamMembers) return;

    const teamIds = teams.map((team) => team.id);
    const teamMemberIds = teamMembers.map((teamMember) => teamMember.id);

    // Initialize the team ids
    set(teamIdsAtom, teamIds);

    // Initialize the team member ids
    set(teamMemberIdsAtom, teamMemberIds);

    // For each team member, initialize its data.
    teamMembers.forEach(({ id, teamId }) => {
      set(teamMemberAtomFamily(id), { id, teamId });
    });

    // For each team, set its original position in the canvas
    teamIds.forEach((id, index) => {
      set(teamBoxAtomFamily(id), (currentData) => ({
        ...currentData,
        x: (index % 3) * currentData.width,
        y: Math.floor(index / 3) * currentData.height,
      }));
    });
  };

  return <RecoilRoot initializeState={setInitialState}>{children}</RecoilRoot>;
};
