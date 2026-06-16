export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  supabaseTableName: import.meta.env.VITE_SUPABASE_TABLE_NAME,
} as const;
