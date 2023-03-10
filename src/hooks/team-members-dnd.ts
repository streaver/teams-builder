import CanvasStore from "@/state/CanvasStore";
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { Team, TeamMember } from "@/types/Team";
import { DraggableItemType, getPositionAfterDrop } from "@/utils/dnd";
import { randomTeamId } from "@/utils/team-utils";
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
        set(teamBoxPositionAtomFamily(newTeamId), (teamBox) => ({
          ...teamBox,
          ...position,
        }));
      },
    []
  );

  const moveTeamMemberIntoTeam = useRecoilCallback(
    ({ set }) =>
      async (teamMemberId: TeamMember["id"], teamId: Team["id"] | null) => {
        set(teamMemberAtomFamily(teamMemberId), (member) => ({
          ...member,
          teamId,
        }));
      },
    []
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

        let initialPosition = monitor.getInitialSourceClientOffset();
        let delta = monitor.getDifferenceFromInitialOffset();
        if (!delta || !initialPosition) {
          return;
        }

        const teamMemberId = item.id;
        const shouldCreateATeam = teamId === "NEW_TEAM";
        const targetTeamId = shouldCreateATeam ? randomTeamId() : teamId;

        if (shouldCreateATeam) {
          const newTeamPosition = getPositionAfterDrop({
            initialPosition,
            delta,
            scale: CanvasStore.scale,
            screen: CanvasStore.screen,
          });

          createNewTeam(targetTeamId!, newTeamPosition);
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
