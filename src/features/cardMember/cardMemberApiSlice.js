import { apiSlice } from "../../app/api/apiSlice";

export const cardMemberApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAssigneesForCard: builder.query({
			query: ({ projectId, cardId }) =>
				`/api/projects/${projectId}/cards/${cardId}/assignees`,
			providesTags: ["Assignees"],
		}),
		getCardsForMember: builder.query({
			query: ({ projectId, memberId }) =>
				`/api/projects/${projectId}/assignee/${memberId}/cards`,
		}),
		assignCardToMember: builder.mutation({
			query: ({ projectId, cardId, assigneeId }) => ({
				url: `/api/projects/${projectId}/cards/${cardId}/assignees/${assigneeId}`,
				method: "POST",
			}),
			invalidatesTags: ["Assignees"],
		}),
		removeMemberFromCard: builder.mutation({
			query: ({ projectId, cardId, assigneeId }) => ({
				url: `/api/projects/${projectId}/cards/${cardId}/assignees/${assigneeId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Assignees"],
		}),
	}),
});

export const {
	useGetAssigneesForCardQuery,
	useGetCardsForMemberQuery,
	useAssignCardToMemberMutation,
	useRemoveMemberFromCardMutation,
} = cardMemberApi;
