import { baseApi } from "@/shared/api/baseApi";
import { supabase } from "@/shared/api/supabaseClient";
import { env } from "@/shared/config/env";
import type { Submission } from "../model/types";

export const recordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRecords: build.query<Submission[], void>({
      query: () => `/${env.supabaseTableName}?select=*`,
      providesTags: ["FormData"],
      async onCacheEntryAdded(_, api) {
        await api.cacheDataLoaded;

        const channel = supabase
          .channel("record-inserts")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: env.supabaseTableName,
            },
            () => {
              api.dispatch(baseApi.util.invalidateTags(["FormData"]));
            },
          )
          .subscribe();

        await api.cacheEntryRemoved;
        supabase.removeChannel(channel);
      },
    }),
  }),
});

export const { useGetRecordsQuery } = recordApi;
