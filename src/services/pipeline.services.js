import { axiosService } from './apiService/axiosService';
import { notifixApi } from './apiService';
import { pipelineActions } from '@/store/pipeline/pipeline.slice';

const pipelineApi = notifixApi.injectEndpoints({
  endpoints: builder => ({
    createPipeline: builder.mutation({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.post(`pipeline`, {
            ...incomeData,
          });
          // if (data?.success) {
          //   dispatch(pipelineActions.setCurrentPipeline(data?.id));
          //   action && action();
          // }

          return { data };
        } catch (error) {
          console.log('Error createPipeline', error?.message);
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['pipeline'],
    }),

    getPipelines: builder.query({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.get('pipeline', {
            params: { ...incomeData },
          });

          if (data?.success) {
            dispatch(pipelineActions.setPipelineData(data?.data));
            action && action();
          } else {
            dispatch(pipelineActions.setPipelineData(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['pipeline'],
    }),

    getPipelineById: builder.query({
      async queryFn({ incomeData }, { dispatch }) {
        const { pipelineId } = incomeData;
        try {
          console.log('ilhhiu');
          const { data } = await axiosService.get(`pipeline/${pipelineId}`);
          console.log('data?.success createRuns', data?.pipline);
          if (data?.success) {
            dispatch(pipelineActions.setPipelineDataById(data?.pipline));
          } else {
            dispatch(pipelineActions.setPipelineDataById(null));
          }
          return { data };
        } catch (error) {
          console.log('Error getPipelineById', error?.message);
          return { error: error?.message || error };
        }
      },
      providesTags: ['pipeline'],
    }),

    updatePipeline: builder.mutation({
      async queryFn(incomeData, { dispatch }) {
        try {
          const { data } = await axiosService.patch('pipeline', {
            ...incomeData,
          });
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['pipeline'],
    }),

    createRuns: builder.mutation({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.post('pipeline/run', {
            ...incomeData,
          });
          console.log('data?.success createRuns', data?.success);

          // if (data?.success) {
          //   dispatch(pipelineActions.setCurrentPipeline(data?.id));
          //   action && action();
          // }
          return { data };
        } catch (error) {
          console.log('Error createPipeline', error?.message);
          return { error: error?.message };
        }
      },
      invalidatesTags: ['pipeline'],
    }),

    getRuns: builder.query({
      async queryFn({ incomeData, action }, { dispatch }) {
        const { pipelineId, page } = incomeData;
        try {
          const { data } = await axiosService.get(
            `pipeline/${pipelineId}/run`,
            {
              params: { page },
            }
          );

          console.log('RUUNS', data?.data);

          if (data?.success) {
            dispatch(pipelineActions.setRuns(data?.data));
            action && action();
          } else {
            dispatch(pipelineActions.setRuns(null));
          }
          return { data };
        } catch (error) {
          return { error: error?.message };
        }
      },
      providesTags: ['pipeline'],
    }),

    testConnection: builder.query({
      async queryFn(incomeData, { dispatch }) {
        try {
          const { data } = await axiosService.post(
            '/action/testConnection',
            incomeData
          );
          console.log('data', data);

          if (data?.success === true) {
            dispatch(pipelineActions.setTestConnection(true));
          } else {
            dispatch(pipelineActions.setTestConnection(false));
          }
          return { data };
        } catch (error) {
          return { error: error?.message };
        }
      },
      invalidatesTags: ['pipeline'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePipelineMutation,
  useLazyGetPipelinesQuery,
  useUpdatePipelineMutation,
  useLazyGetRunsQuery,
  useCreateRunsMutation, 
  useLazyGetPipelineByIdQuery,
  useLazyTestConnectionQuery,
} = pipelineApi;

export default pipelineApi;
