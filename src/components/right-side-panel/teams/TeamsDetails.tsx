import { clientIdsAtom } from "@/state/recoil/atoms/clientIdsAtom";
import { teamMembersByWorkingHoursSelectorFamily } from "@/state/recoil/selectors/teamMembersByWorkingHoursSelectorFamily";
import { WorkingHours } from "@/utils/team-members-utils";
import { useRecoilValue } from "recoil";
import { BenchDetails } from "./BenchSize";
import { ClientTeamsSummary } from "./ClientTeamsCount";

export const TeamsDetails = () => {
  const fullTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(WorkingHours.FULL_TIME)
  );
  const partTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(WorkingHours.PART_TIME)
  );
  const quartTimemembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(WorkingHours.QUART_TIME)
  );

  const numOfFullTimesFromPartials = Math.floor(
    (partTimeMembers.length * WorkingHours.PART_TIME +
      quartTimemembers.length * WorkingHours.QUART_TIME) /
      WorkingHours.FULL_TIME
  );

  const clientIds = useRecoilValue(clientIdsAtom);

  return (
    <div className="flex flex-col items-stretch h-full gap-8 divide-y divide-dam-gray-200">
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-bold text-center">Engineering team</h1>
        <div className="flex flex-col items-center gap-4">
          <p>{fullTimeMembers.length} Full-Time</p>
          <p>{partTimeMembers.length} Part-Time</p>
          <p>{quartTimemembers.length} Quart-Time</p>
          <p className="font-medium ">
            means {numOfFullTimesFromPartials} Full-Time
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pt-8">
        <BenchDetails />
        <div className="flex flex-col gap-2 text-center">
          <p className="font-medium">Clients:</p>
          <ul>
            {clientIds.map((clientId) => (
              <ClientTeamsSummary key={clientId} id={clientId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
