import { apiSlice } from "../../app/api/apiSlice";

export const tagApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectTags: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/tags`,
			providesTags: ["Tags"],
		}),
		createTag: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/tags`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Tags", "Tag"],
		}),
		getTagById: builder.query({
			query: ({ projectId, tagId }) =>
				`/api/projects/${projectId}/tags/${tagId}`,
			providesTags: ["Tag"],
		}),
		updateTag: builder.mutation({
			query: ({ projectId, tagId, body }) => ({
				url: `/api/projects/${projectId}/tags/${tagId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Tags", "Tag"],
		}),
		deleteTag: builder.mutation({
			query: ({ projectId, tagId }) => ({
				url: `/api/projects/${projectId}/tags/${tagId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tags", "Tag"],
		}),
	}),
});

export const {
	useGetProjectTagsQuery,
	useCreateTagMutation,
	useGetTagByIdQuery,
	useUpdateTagMutation,
	useDeleteTagMutation,
} = tagApiSlice;
