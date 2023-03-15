import React from "react";
import useLoginSSO from "@modules/auth/hooks/useLoginSSO";
const Login = () => {
  const { openLogin, isLoading } = useLoginSSO();
  return (
    <div className="flex items-center justify-center h-full">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <button
            disabled={isLoading}
            onClick={openLogin}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue with SSO
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
