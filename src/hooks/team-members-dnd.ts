import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { DraggableItemType } from "@/utils/dnd";
import { applyReverseScale } from "@/utils/math-utils";
import { randomTeamId } from "@/utils/team-utils";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useRecoilCallback } from "recoil";

export type TeamMemberDndItem = {
  id: TeamMember["id"];
};

type TeamMemberDragCollectedProps = {
  isDragging: boolean;
};

type TeamMemberDropCollectedProps = {
  isOverCurrent: boolean;
};

export const useTeamMemberDrag = (id: TeamMember["id"]) => {
  return useDrag<TeamMemberDndItem, unknown, TeamMemberDragCollectedProps>(
    () => ({
      type: DraggableItemType.TEAM_MEMBER_AVATAR,
      item: {
        id,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );
};

export const useTeamMemberDrop = (teamId: Team["id"] | null | "NEW_TEAM") => {
  const createNewTeam = useRecoilCallback(
    ({ set }) =>
      (newTeamId: Team["id"], position: XYCoord) => {
        set(teamIdsAtom, (teamIds) => [...teamIds, newTeamId] as number[]);
        set(teamBoxAtomFamily(newTeamId), (teamBox) => ({
          ...teamBox,
          ...position,
        }));
      },
    []
  );

  const updatePrevAndNewTeamHeights = useRecoilCallback(
    ({ set, snapshot }) =>
      async (newTeamId: Team["id"] | null, teamMember: TeamMember) => {
        // If the new team is not the bench we need to update its height
        if (newTeamId !== null) {
          const teamMembers = await snapshot.getPromise(
            teamMembersSelectorFamily(newTeamId)
          );

          const targetTeamMembers = [...teamMembers, teamMember];
          const targetTeamBoxHeight = calculateTeamBoxHeight(targetTeamMembers);

          set(teamBoxAtomFamily(newTeamId), (currentData) => ({
            ...currentData,
            height: targetTeamBoxHeight,
          }));
        }

        // If the previous team wasn't the bench, we need to update its height as well.
        if (teamMember.teamId !== null) {
          const teamMembers = await snapshot.getPromise(
            teamMembersSelectorFamily(teamMember.teamId)
          );

          const sourceTeamMembers = teamMembers.filter(
            (m) => m.id !== teamMember.id
          );
          const sourceTeamBoxHeight = calculateTeamBoxHeight(sourceTeamMembers);

          set(teamBoxAtomFamily(teamMember.teamId), (currentData) => ({
            ...currentData,
            height: sourceTeamBoxHeight,
          }));
        }
      },
    []
  );

  const moveTeamMemberIntoTeam = useRecoilCallback(
    ({ set, snapshot }) =>
      async (teamMemberId: TeamMember["id"], teamId: Team["id"] | null) => {
        const teamMember = await snapshot.getPromise(
          teamMemberAtomFamily(teamMemberId)
        );

        if (teamMember.teamId !== teamId) {
          updatePrevAndNewTeamHeights(teamId, teamMember);
        }

        set(teamMemberAtomFamily(teamMemberId), (member) => ({
          ...member,
          teamId,
        }));
      },
    [updatePrevAndNewTeamHeights]
  );

  return useDrop<TeamMemberDndItem, unknown, TeamMemberDropCollectedProps>(
    () => ({
      accept: DraggableItemType.TEAM_MEMBER_AVATAR,
      drop: (item, monitor) => {
        // The team member is ignored if it was already accepted by another drop target.
        // This is useful since we have multiple containers that accept team-members (a team, the canvas).
        // If a team accepts the team-member being dragged, we want the canvas to ignore it.
        if (monitor.didDrop()) {
          return;
        }

        let initialPos = monitor.getInitialSourceClientOffset();
        let delta = monitor.getDifferenceFromInitialOffset();
        if (!delta || !initialPos) {
          return;
        }

        const teamMemberId = item.id;
        const shouldCreateATeam = teamId === "NEW_TEAM";
        const targetTeamId = shouldCreateATeam ? randomTeamId() : teamId;

        if (shouldCreateATeam) {
          const screen = CanvasStore.screen;
          const canvasScale = CanvasStore.scale;

          const position = applyReverseScale(
            {
              x: initialPos.x + delta.x,
              y: initialPos.y + delta.y,
            },
            canvasScale
          );
          position.x += screen.x;
          position.y += screen.y;

          createNewTeam(targetTeamId!, position);
        }

        moveTeamMemberIntoTeam(teamMemberId, targetTeamId);
      },
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [teamId, moveTeamMemberIntoTeam, createNewTeam]
  );
};
