import { API_BASE_URL } from "~/constants";
import { getAccessToken, RequestInfo, useFetch } from "@raycast/utils";

export const useApi = <T>(url: RequestInfo, options?: RequestInit) => {
    const { token } = getAccessToken();

    return useFetch<T>(`${API_BASE_URL}/${url}`, {
        keepPreviousData: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },

        ...options,
    });
};
