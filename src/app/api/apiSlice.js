import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 401) {
		const state = api.getState();

		if (state.auth.accessToken !== null) {
			const refreshResult = await baseQuery(
				{
					url: "/api/token/refresh",
					method: "GET",
				},
				api,
				extraOptions
			);

			if (refreshResult?.data) {
				api.dispatch(
					setCredentials({
						...state.auth,
						accessToken: refreshResult.data.accessToken,
						refreshToken: refreshResult.data.refreshToken,
					})
				);

				result = await baseQuery(args, api, extraOptions);
			} else {
				api.dispatch(logOut());
				console.log("refresh token expired");
			}
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
