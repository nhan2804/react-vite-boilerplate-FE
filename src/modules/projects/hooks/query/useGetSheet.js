import { fetchSheet } from "@modules/projects/services/sheets";
import { useQuery } from "react-query";

const useGetSheet = (projectId, tableId) => {
  return useQuery(
    ["table-sheet", tableId],
    async () => {
      const { data } = await fetchSheet(projectId, tableId);
      return data;
    },
    {
      enabled: !!projectId && !!tableId,
    }
  );
};

export default useGetSheet;
