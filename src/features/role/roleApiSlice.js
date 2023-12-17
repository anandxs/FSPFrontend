import { apiSlice } from "../../app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectRoles: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/roles`,
		}),
		createRole: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/roles`,
				method: "POST",
				body,
			}),
		}),
		updateRole: builder.mutation({
			query: ({ projectId, roleId, body }) => ({
				url: `/api/projects/${projectId}/roles/${roleId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteRole: builder.mutation({
			query: ({ projectId, roleId }) => ({
				url: `/api/projects/${projectId}/roles/${roleId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetProjectRolesQuery,
	useCreateRoleMutation,
	useUpdateRoleMutation,
	useDeleteRoleMutation,
} = roleApiSlice;
