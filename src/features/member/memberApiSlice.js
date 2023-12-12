import { apiSlice } from "../../app/api/apiSlice";

export const memberApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectMembers: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/members`,
			providesTags: ["Members"],
		}),
		addMember: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/members`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Members"],
		}),
		updateMember: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/members`,
				method: "PUT",
				body,
			}),
		}),
		exitProject: builder.mutation({
			query: ({ projectId }) => ({
				url: `/api/projects/${projectId}/members`,
				method: "DELETE",
			}),
			invalidatesTags: ["Members"],
		}),
		removeMember: builder.mutation({
			query: ({ projectId, memberId }) => ({
				url: `/api/projects/${projectId}/members/${memberId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Members"],
		}),
	}),
});

export const {
	useGetProjectMembersQuery,
	useAddMemberMutation,
	useUpdateMemberMutation,
	useExitProjectMutation,
	useRemoveMemberMutation,
} = memberApiSlice;
