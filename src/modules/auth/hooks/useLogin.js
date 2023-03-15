import { useAppDispatch } from "@hooks/reduxHook";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { login as loginAction } from "../slices";
import { login } from "../services/auth";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation(
    async (requestData) => {
      const { data } = await login(requestData);
      return data;
    },
    {
      onSuccess: (data) => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        dispatch(loginAction(data));
        if (params.get("sso")) {
          navigate(`/sso${window.location.search}`, { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      },
    }
  );
};

export default useLogin;
