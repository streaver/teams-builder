type Props = {
  id: number;
};

export const TEAM_MEMBER_AVATAR = "team_member_avatar";

export const TeamMemberAvatar = ({ id }: Props) => {
  return <div className="w-16 bg-red-300 rounded-full aspect-square" />;
};
