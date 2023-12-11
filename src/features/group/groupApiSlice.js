import { apiSlice } from "../../app/api/apiSlice";

export const groupApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectGroups: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/groups`,
			providesTags: ["Groups"],
		}),
		createGroup: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/groups`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Groups"],
		}),
		updateProjectGroup: builder.mutation({
			query: ({ groupId, body }) => ({
				url: `/api/groups/${groupId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Groups", "Cards"],
		}),
		deleteProjectGroup: builder.mutation({
			query: ({ groupId }) => ({
				url: `/api/groups/${groupId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Groups", "Cards"],
		}),
		toggleGroupArchiveStatus: builder.mutation({
			query: ({ groupId }) => ({
				url: `api/groups/${groupId}/archive`,
				method: "PUT",
			}),
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useGetProjectGroupsQuery,
	useDeleteProjectGroupMutation,
	useUpdateProjectGroupMutation,
	useToggleGroupArchiveStatusMutation,
} = groupApiSlice;
