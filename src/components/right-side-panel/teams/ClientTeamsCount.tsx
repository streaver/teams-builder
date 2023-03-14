import { clientAtomFamily } from "@/state/recoil/atoms/clientAtomFamily";
import { clientTeamsSelectorFamily } from "@/state/recoil/selectors/clientTeamsSelectorFamily";
import { Client } from "@/types/Client";
import { useRecoilValue } from "recoil";

export const ClientTeamsSummary = ({ id }: { id: Client["id"] }) => {
  const client = useRecoilValue(clientAtomFamily(id));
  const clientTeams = useRecoilValue(clientTeamsSelectorFamily(id));

  return (
    <li>
      {client.name}: ({clientTeams.length} teams)
    </li>
  );
};
