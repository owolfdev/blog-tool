import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  useUser,
  useSupabaseClient,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";
// import { Database } from "../utils/database.types";
// type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

function Navigation() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log("user", user);
    console.log("session", session);
    if (user?.id === process.env.AUTHORIZED_USER) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    console.log("authorized", authorized);
  }, [user, session]);

  return (
    <nav className="flex items-center px-5 py-5 space-x-8">
      <Link href={`/`}>
        <h1 className="text-4xl font-bold text-center">Blog Tool</h1>
      </Link>
      <div className="flex space-x-4 underline">
        <Link href={`/blog/create`}>Create</Link>
        <Link href={`/all-posts`}>All Blog Posts</Link>
      </div>
      <div className="px-2 bg-gray-300 border border-gray-500 rounded ">
        {!user ? (
          <Link href={`/signin`}>Sign In</Link>
        ) : (
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {user?.id === process.env.NEXT_PUBLIC_AUTHORIZED_USER ? (
          <p>User is Authorized.</p>
        ) : (
          <p>User is not Authorized.</p>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
