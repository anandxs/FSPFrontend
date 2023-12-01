import { apiSlice } from "../../app/api/apiSlice";

export const defaultRoleApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => `/api/superadmin/roles`,
			providesTags: ["defaultRoles"],
		}),
		createRole: builder.mutation({
			query: ({ name }) => ({
				url: `/api/superadmin/roles`,
				method: "POST",
				body: { name },
			}),
			invalidatesTags: ["defaultRoles"],
		}),
		updateRole: builder.mutation({
			query: ({ roleId, name }) => ({
				url: `/api/superadmin/roles/${roleId}`,
				method: "PUT",
				body: { name },
			}),
			invalidatesTags: ["defaultRoles"],
		}),
		deleteRole: builder.mutation({
			query: ({ roleId }) => ({
				url: `/api/superadmin/roles/${roleId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["defaultRoles"],
		}),
	}),
});

export const {
	useGetRolesQuery,
	useCreateRoleMutation,
	useDeleteRoleMutation,
	useUpdateRoleMutation,
} = defaultRoleApiSlice;
