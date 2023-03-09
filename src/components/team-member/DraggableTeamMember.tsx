import { useTeamMemberDrag } from "@/hooks/team-members-dnd";
import { TeamMember } from "@/types/Team";
import classNames from "classnames";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TeamMemberAvatar } from "./avatar/TeamMemberAvatar";
import { TeamMemberBox } from "./TeamMemberBox";

type Props = {
  id: TeamMember["id"];
  withSurrondingBox?: boolean;
};

export const DraggableTeamMember = ({
  id,
  withSurrondingBox = false,
}: Props) => {
  const [{ isDragging }, dragRef, dragPreview] = useTeamMemberDrag(id);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <div
      ref={dragRef}
      className={classNames({
        "opacity-0": isDragging,
        "opacity-100": !isDragging,
      })}
    >
      {withSurrondingBox ? (
        <TeamMemberBox id={id} />
      ) : (
        <TeamMemberAvatar id={id} />
      )}
    </div>
  );
};
