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
import { GiHamburgerMenu } from "react-icons/gi";

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

  useEffect(() => {
    function handleClickOutsideMenu(event: any) {
      const popup = document.getElementById("popup");
      const hamburger = document.getElementById("hamburger-menu");

      if (
        !popup?.contains(event.target) &&
        !hamburger?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [setIsMenuOpen]);

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
    <nav className="flex items-center justify-between px-5 py-5">
      <div className="flex items-center space-x-8">
        <Link href={`/`}>
          <h1 className="text-4xl font-bold text-center">Blog Tool</h1>
        </Link>
        <div className="hidden space-x-4 underline sm:flex">
          <Link href={`/blog/create`}>Create</Link>
          <Link href={`/all-posts`}>All Blog Posts</Link>
        </div>
      </div>

      <div className="items-center hidden space-x-8 sm:flex">
        <div className="px-2 bg-gray-300 border border-gray-500 rounded ">
          {!user ? (
            <Link href={`/signin`}>Sign In</Link>
          ) : (
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          )}
        </div>
        <div className="text-sm text-gray-500 ">
          {user && user.email && user.email}
          {!session && "You need to sign in to make changes"}
        </div>{" "}
      </div>
      {/* hamburger menu */}
      <div>
        <div className="sm:hidden">
          <button id="hamburger-menu">
            <GiHamburgerMenu
              size={26}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                console.log(isMenuOpen);
              }}
            />
          </button>
          {isMenuOpen && (
            <div
              id="popup"
              className="fixed p-5 font-bold text-white bg-gray-500 border-2 border-black rounded top-12 right-5"
            >
              <div className="flex flex-col space-y-2">
                <a href="#">Sign In</a>
                <a href="#">Create</a>
                <a href="#">All Posts</a>
                <a href="#">Settings</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
