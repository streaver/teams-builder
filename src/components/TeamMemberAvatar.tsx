type Props = {
  id: number;
};

export const TEAM_MEMBER_AVATAR = "team_member_avatar";

export const TeamMemberAvatar = ({ id }: Props) => {
  return (
    <div className="relative w-16 rounded-full bg-dam-red-100 aspect-square"></div>
  );
};
