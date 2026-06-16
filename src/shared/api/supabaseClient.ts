import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { heartbeatIntervalMs: 30_000 },
});
