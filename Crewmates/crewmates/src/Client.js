import { createClient } from '@supabase/supabase-js';
// Accessing variable from .env file 
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL connected:", supabaseUrl ? "Yes" : "No");
console.log("Supabase ANON KEY connected:", supabaseKey ? "Yes" : "No");


export const supabase = createClient(supabaseUrl, supabaseKey);