import { useDrag } from "react-dnd";

type Props = {
  id: number;
};

export const TEAM_MEMBER_AVATAR = "team_member_avatar";

export const TeamMemberAvatar = ({ id }: Props) => {
  const [_, dragRef] = useDrag(() => ({
    type: TEAM_MEMBER_AVATAR,
    item: {
      id,
    },
  }));

  return (
    <div ref={dragRef} className="w-16 bg-red-300 rounded-full aspect-square" />
  );
};
