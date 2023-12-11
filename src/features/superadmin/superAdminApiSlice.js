import { apiSlice } from "../../app/api/apiSlice";

export const superAdminApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => `/api/superadmin/users`,
			providesTags: ["Users"],
		}),
		toggleUserAccountStatus: builder.mutation({
			query: ({ userId }) => ({
				url: `/api/superadmin/users/${userId}`,
				method: "PUT",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const { useGetUsersQuery, useToggleUserAccountStatusMutation } =
	superAdminApiSlice;
