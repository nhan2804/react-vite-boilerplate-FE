import { fetchProject } from "@modules/projects/services";
import { fetchRecord } from "@modules/projects/services/records";
import { useQuery } from "react-query";

const useGetRecord = (projectId, tableId) => {
  return useQuery(
    ["record-table", tableId],
    async () => {
      const { data } = await fetchRecord(projectId, tableId);
      return data;
    },
    {
      enabled: !!projectId && !!tableId,
    }
  );
};

export default useGetRecord;
