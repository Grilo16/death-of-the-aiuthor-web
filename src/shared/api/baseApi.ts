import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config/env";

export const baseApi = createApi({
  tagTypes: ["FormData"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.supabaseUrl}/rest/v1`,
    prepareHeaders: (headers) => {
      headers.set("apikey", env.supabaseAnonKey);
      headers.set("Authorization", `Bearer ${env.supabaseAnonKey}`);
      headers.set("Prefer", "return=representation");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
