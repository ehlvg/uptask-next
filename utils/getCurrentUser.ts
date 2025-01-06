import { supabase } from "./supabase";

// Get current user through supabase (if it exists)
export const {
  data: { user },
} = await supabase.auth.getUser();
