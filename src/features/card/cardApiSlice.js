import { apiSlice } from "../../app/api/apiSlice";

export const cardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCardById: builder.query({
			query: ({ ownerId, projectId, groupId, cardId }) =>
				`/api/users/${ownerId}/projects/${projectId}/groups/${groupId}/cards/${cardId}`,
			providesTags: ["Card"],
		}),
		getCardsForGroup: builder.query({
			query: ({ ownerId, projectId, groupId }) =>
				`/api/users/${ownerId}/projects/${projectId}/groups/${groupId}/cards`,
		}),
		getCardsForProject: builder.query({
			query: ({ ownerId, projectId }) =>
				`/api/users/${ownerId}/projects/${projectId}/cards`,
			providesTags: ["Cards"],
		}),
		createCard: builder.mutation({
			query: ({ ownerId, projectId, groupId, body }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups/${groupId}/cards`,
				method: "POST",
				body: { ...body },
			}),
			invalidatesTags: ["Cards"],
		}),
		deleteCard: builder.mutation({
			query: ({ ownerId, projectId, groupId, cardId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups/${groupId}/cards/${cardId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cards"],
		}),
		updateCard: builder.mutation({
			query: ({ ownerId, projectId, groupId, cardId, body }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups/${groupId}/cards/${cardId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Card", "Cards"],
		}),
	}),
});

export const {
	useGetCardByIdQuery,
	useGetCardsForProjectQuery,
	useGetCardsForGroupQuery,
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
} = cardApiSlice;
