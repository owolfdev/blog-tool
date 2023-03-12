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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state variable for menu

  useEffect(() => {
    // console.log("user", user);
    // console.log("session", session);
    if (user?.id === process.env.AUTHORIZED_USER) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    //console.log("authorized", authorized);
  }, [user, session]);

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
          alert(
            "You are not authorized to use this tool. Please contact the administrator to obtain privileges."
          );
        }
      }
    }
    checkAllowedUsers();
  }, [session, supabase]);

  // return (
  //   <nav className="flex items-center px-5 py-5 space-x-8">
  //     <Link href={`/`}>
  //       <h1 className="text-4xl font-bold text-center">Blog Tool</h1>
  //     </Link>
  //     <div className="flex space-x-4 underline">
  //       <Link href={`/blog/create`}>Create</Link>
  //       <Link href={`/data-grid`}>All Blog Posts</Link>
  //     </div>
  //     <div className="px-2 bg-gray-300 border border-gray-500 rounded ">
  //       {!user ? (
  //         <Link href={`/signin`}>Sign In</Link>
  //       ) : (
  //         <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
  //       )}
  //     </div>
  //     <div className="text-sm text-gray-500">
  //       {user && user.email && user.email}
  //       {!session && "You need to sign in to make changes"}
  //     </div>
  //   </nav>
  // );

  return (
    <nav className="flex items-center px-5 py-5 space-x-8">
      <Link href={`/`}>
        <h1 className="text-4xl font-bold text-center">Blog Tool</h1>
      </Link>
      <div className="hidden underline md:flex md:space-x-4">
        <Link href={`/blog/create`}>Create</Link>
        <Link href={`/data-grid`}>All Blog Posts</Link>
      </div>
      <div className="md:hidden">
        <button
          className="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded hover:text-white hover:border-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 0h20v2H0zM0 9h20v2H0zM0 18h20v2H0z" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="flex flex-col pt-2 pb-4">
            <Link href={`/blog/create`}>
              <a className="pl-4 text-gray-600 rounded-md hover:text-white hover:bg-gray-600">
                Create
              </a>
            </Link>
            <Link href={`/data-grid`}>
              <a className="pl-4 text-gray-600 rounded-md hover:text-white hover:bg-gray-600">
                All Blog Posts
              </a>
            </Link>
          </div>
        </div>
      )}
      <div className="px-2 bg-gray-300 border border-gray-500 rounded ">
        {!user ? (
          <Link href={`/signin`}>Sign In</Link>
        ) : (
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        )}
      </div>

      <div className="hidden text-sm text-gray-500 sm:block">
        {user && user.email && user.email}
        {!session && "You need to sign in to make changes"}
      </div>
    </nav>
  );
}

export default Navigation;
