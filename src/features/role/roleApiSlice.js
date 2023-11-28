import { apiSlice } from "../../app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectRoles: builder.query({
			query: ({ ownerId, projectId }) =>
				`/api/users/${ownerId}/projects/${projectId}/roles`,
		}),
	}),
});

export const { useGetProjectRolesQuery } = roleApiSlice;
