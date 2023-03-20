// components/UnsplashImage.js
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const UnsplashImage = ({ id, caption }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      const apiUrl = "https://api.unsplash.com";
      const response = await axios.get(`${apiUrl}/photos/${id}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      setPhoto(response.data);
    };

    if (id) {
      fetchPhoto();
    }
  }, [id]);

  if (!photo) return null;

  return (
    <div className="mb-4">
      <Image
        src={photo.urls.regular}
        alt={photo.description}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blur_hash}
        quality={75}
      />
      {caption && <p className="text-gray-500 ">{caption}</p>}
    </div>
  );
};

export default UnsplashImage;
