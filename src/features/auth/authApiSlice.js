import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/api/authentication/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "api/authentication",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		logOut: builder.mutation({
			query: () => ({
				url: "api/authentication",
				method: "DELETE",
			}),
		}),
		getUserInfo: builder.query({
			query: () => "api/profile",
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogOutMutation,
	useGetUserInfoQuery,
} = authApiSlice;
