import { fetchTable } from "@modules/projects/services/tables";
import { useQuery } from "react-query";

const useGetTable = (projectId) => {
  return useQuery(
    ["tables", projectId],
    async () => {
      const { data } = await fetchTable(projectId);
      return data;
    },
    {
      enabled: !!projectId,
    }
  );
};

export default useGetTable;
