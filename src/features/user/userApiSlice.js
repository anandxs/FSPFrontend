import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserInfo: builder.query({
			query: ({ accessToken }) => ({
				url: "/api/profile",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}),
			providesTags: ["User"],
		}),
		updateUserInfo: builder.mutation({
			query: (body) => ({
				url: "/api/profile",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		updatePassword: builder.mutation({
			query: (body) => ({
				url: "/api/profile/password",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useLazyGetUserInfoQuery,
	useUpdateUserInfoMutation,
	useUpdatePasswordMutation,
} = userApiSlice;
