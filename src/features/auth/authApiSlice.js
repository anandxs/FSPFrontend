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
			providesTags: ["User"],
		}),
		updateUserInfo: builder.mutation({
			query: (body) => ({
				url: `api/profile`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogOutMutation,
	useGetUserInfoQuery,
	useUpdateUserInfoMutation,
} = authApiSlice;
