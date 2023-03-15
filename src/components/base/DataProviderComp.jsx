import { Spin } from "antd";

/* Create spin loading when hook is loading/fetching */
const DataProviderComp = ({ provider, children, ...rest }) => {
  if (provider.isError)
    return (
      <>
        {provider.error.message}
        <br />
        Reload page
      </>
    );
  if (provider.isFetching) return <Spin />;
  return <>{children}</>;
};

export { DataProviderComp };
