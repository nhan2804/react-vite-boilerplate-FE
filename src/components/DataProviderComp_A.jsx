import { DataProviderComp } from "./base/DataProviderComp";

const DataProviderCompA = ({ provider, children, ...rest }) => {
  if (
    provider.data?.result == false &&
    provider.data?.messages != "#NO_DATA_MATCH"
  )
    return (
      <>
        {provider.data?.messages}
        <br />
        Reload page
      </>
    );
  return (
    <DataProviderComp provider={provider} {...rest}>
      {children}
    </DataProviderComp>
  );
};

export { DataProviderCompA };
