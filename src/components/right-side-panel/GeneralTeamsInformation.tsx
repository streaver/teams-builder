import { teamMembersByWorkingHoursSelectorFamily } from "@/state/recoil/selectors/teamMembersByWorkingHoursSelectorFamily";
import { useRecoilValue } from "recoil";

export const GeneralTeamsInformation = () => {
  const fullTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(8)
  );
  const partTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(6)
  );
  const quartTimemembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(4)
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-4 text-sm font-bold">Engineering team</h1>
      <p>{fullTimeMembers.length} Full-Time</p>
      <p>{partTimeMembers.length} Part-Time</p>
      <p>{quartTimemembers.length} Quart-Time</p>
    </div>
  );
};
