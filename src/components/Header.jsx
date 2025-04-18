import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check user login
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Supabase listener: login/logout event
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 flex justify-between items-center bg-black text-white p-4">
      <div className="text-lg font-semibold">LensNest</div>

      <div className="flex gap-6">
        <button className="text-white hover:text-gray-400 font-bold">
          For You
        </button>
        <button className="text-white hover:text-gray-400">Favorite</button>
      </div>

      {!user ? (
        <div className="flex gap-4">
          <button
            onClick={handleLogin}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
