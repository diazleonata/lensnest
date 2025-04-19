import "./HomePage.css";
import Header from "../components/Header";
import Photos from "../components/Photos";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const HomePage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching photos:", error);
      } else {
        setPhotos(data);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="bg-black text-white">
      <Header />
      <main className="px-4 max-w-md mx-auto pt-4">
        {photos.length === 0 ? (
          <p className="text-gray-400">No images yet.</p>
        ) : (
          photos.map((item) => (
            <Photos
              key={item.id}
              photoUrl={item.photo_url}
              likes={item.likes}
              comments={item.comments}
              username={item.username}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default HomePage;
