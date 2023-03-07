import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import { Team } from "@/types/Team";
import { PropsWithChildren } from "react";

type Props = {
  id: Team["id"] | null;
};

export const TeamBoxWrapper = ({ id, children }: PropsWithChildren<Props>) => {
  const [_, dropRef] = useTeamMemberDrop(id);

  return <div ref={dropRef}>{children}</div>;
};
