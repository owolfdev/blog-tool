import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function checkAllowedUsers() {
      // If user is logged in, check if their email is in allowed_users table
      if (session) {
        const { data, error } = await supabase
          .from("allowed_users")
          .select("email")
          .eq("email", session.user.email);

        // If user's email is not in allowed_users table, log them out
        if (error || !data || data.length === 0) {
          await supabase.auth.signOut();
        }
      }
    }
    checkAllowedUsers();
  }, [session, supabase]);

  return (
    <div className="w-full p-10">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  );
};

export default Home;
