import { httpClient } from "@/lib/request-handler";
import { useMutation } from "@tanstack/react-query";

interface RequestToken {
  username: string;
  password: string;
}

interface Response {
  access: string;
  refresh: string;
}

const requestToken = async ({
  username,
  password,
}: RequestToken): Promise<Response> => {
  const response = await httpClient.post<Response>("/api/token/", {
    username,
    password,
  });
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: requestToken,
    onSuccess: (data) => {
      console.log("Setting tokens");
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    },
  });
};
