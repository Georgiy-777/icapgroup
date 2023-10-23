import { axiosService } from './apiService/axiosService';
import { notifixApi } from './apiService';
import { projectsActions } from '@/store/projects/projects.slice';
import qs from 'qs';

const projectsApi = notifixApi.injectEndpoints({
  endpoints: builder => ({
    getRepositories: builder.query({
      async queryFn({ incomeData, action }, { dispatch }) {
        const { accountId, ...rest } = incomeData;
        try {
          const { data } = await axiosService.get(
            `account/${incomeData?.accountId}/project`,
            {
              params: { ...rest },
            }
          );
          if (data?.success) {
            dispatch(projectsActions.setListRepositories(data?.data));
            action && action();
          } else {
            dispatch(projectsActions.setListRepositories(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['projects'],
    }),
    getGroups: builder.query({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.get(`group`, {
            params: { ...incomeData },
          });
          if (data?.success) {
            dispatch(projectsActions.setListGroups(data?.data));
            action && action();
          } else {
            dispatch(projectsActions.setListGroups(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['projects'],
    }),
    getAccounts: builder.query({
      async queryFn(__, { dispatch }) {
        try {
          const { data } = await axiosService.get(`account`, {});
          if (data?.success) {
            dispatch(projectsActions.setListAccounts(data?.data));
          } else {
            dispatch(projectsActions.setListAccounts(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['createAccount'],
    }),
    createAccount: builder.mutation({
      async queryFn({ provider, incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.post(`account/${provider}`, {
            ...incomeData,
          });
          if (data?.success) {
            dispatch(projectsActions.setCurrentAccount(data?.id));
            action && action();
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['createAccount'],
    }),

    getProject: builder.query({
      async queryFn({ incomeData }, { dispatch }) {
        const { projectId } = incomeData;
        try {
          const { data } = await axiosService.get(`project/${projectId}`);

          if (data?.success) {
            dispatch(projectsActions.setProject(data?.project));
          } else {
            dispatch(projectsActions.setProject(null));
          }
          return { data };
        } catch (error) {
          console.log('Error getProject', error?.message);
          return { error: error?.message || error };
        }
      },
      providesTags: ['projects'],
    }),

    createProject: builder.mutation({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.post(`project`, {
            ...incomeData,
          });
          if (data?.success) {
            return { data };
            action && action();
          } else return { error: data?.message };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['createAccount'],
    }),

    getProjects: builder.query({
      async queryFn({ projectId, action }, { dispatch }) {
        try {
          const { data } = await axiosService.get(
            `project${projectId && projectId !== '' ? '/' + projectId : ''}`,
            {}
          );
          if (data?.success) {
            if (projectId && projectId !== '') {
              dispatch(projectsActions.setCurrentProject(data?.project));
            } else {
              dispatch(projectsActions.setListProjects(data?.data));
            }
            action && action();
          } else {
            dispatch(projectsActions.setProject(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['projects'],
    }),
    getRepository: builder.query({
      async queryFn({ incomeData }, { dispatch }) {
        const { accountId, projectId } = incomeData;
        try {
          const { data } = await axiosService.get(
            `account/${accountId}/project/${projectId}`
          );
          if (data?.success) {
            dispatch(projectsActions.setRepositoryById(data?.project));
          } else {
            dispatch(projectsActions.setRepositoryById(null));
          }
          return { data };
        } catch (error) {
          console.log('Error getRepository', error?.message);
          return { error: error?.message || error };
        }
      },
      providesTags: ['projects'],
    }),
    deleteAccount: builder.mutation({
      async queryFn(accountId, { dispatch }) {
        try {
          const { data } = await axiosService.delete(
            `account/${accountId}`,
          );
          if (data?.success) {
            dispatch(projectsActions.deleteAccount(accountId));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['createAccount'],
    }),
    updateAccount: builder.mutation({
      async queryFn(incomeData, { dispatch }) {
        try {
          const { data } = await axiosService.patch('account', { ...incomeData });
          if (data?.success) {
            dispatch(projectsActions.setAccount(...incomeData));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['createAccount'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetRepositoriesQuery,
  useLazyGetGroupsQuery,
  useGetAccountsQuery,
  useLazyGetAccountsQuery,
  useCreateAccountMutation,
  useLazyGetProjectQuery,
  useCreateProjectMutation,
  useLazyGetProjectsQuery,
  useLazyGetRepositoryQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} = projectsApi;

export default projectsApi;
