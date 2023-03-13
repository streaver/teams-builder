import { clientIdsAtom } from "@/state/recoil/atoms/clientIdsAtom";
import { teamMembersByWorkingHoursSelectorFamily } from "@/state/recoil/selectors/teamMembersByWorkingHoursSelectorFamily";
import { useRecoilValue } from "recoil";
import { BenchInfo } from "./BenchInfo";
import { ClientTeamsInfo } from "./ClientTeamsInfo";

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

  const numOfFullTimesFromPartials = Math.floor(
    (partTimeMembers.length * 6 + quartTimemembers.length * 4) / 8
  );

  const clientIds = useRecoilValue(clientIdsAtom);

  return (
    <div className="flex flex-col items-stretch gap-4 p-4 text-sm divide-y">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold">Engineering team</h1>
        <p>{fullTimeMembers.length} Full-Time</p>
        <p>{partTimeMembers.length} Part-Time</p>
        <p>{quartTimemembers.length} Quart-Time</p>
        <p className="font-medium ">
          means {numOfFullTimesFromPartials} Full-Time
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 pt-4">
        <BenchInfo />
        <div className="flex flex-col gap-2 text-center">
          <p className="font-medium">Clients:</p>
          {clientIds.map((clientId) => (
            <ClientTeamsInfo key={clientId} id={clientId} />
          ))}
        </div>
      </div>
    </div>
  );
};
