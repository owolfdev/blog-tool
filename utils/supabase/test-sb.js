// const { createClient } = require("@supabase/supabase-js");

// require("dotenv").config();

// const supabase = createClient(
//   process.env.SUPABASE_URI,
//   process.env.SUPABASE_ANON_KEY

// );

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://qhfrqatbwoddkjwqhbso.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZnJxYXRid29kZGtqd3FoYnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2ODQzNTIsImV4cCI6MTk4NTI2MDM1Mn0.h0__bT_9hsQSfrrwjgOvw7GA5SnQ7p6ax-sDaOuDbSk"
);

console.log("supabase from sb-utils:", supabase);

const { data, error } = await supabase.from("posts").select();

console.log("data from getPost:", data);
