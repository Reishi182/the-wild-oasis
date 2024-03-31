import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://juqrhngjmbnfvktkbwgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cXJobmdqbWJuZnZrdGtid2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NjMzMzQsImV4cCI6MjAyMzAzOTMzNH0.Fg4RiUkm6SsoaU4yBQ4jhwsMDONUfCl6u515u4YeDCs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
