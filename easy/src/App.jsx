import { useState } from "react";

function CatImages() {
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fetchCatImage() {

    const fetchImages = async () => {
      setLoading(true);
      setError(""); 
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch images");
      }
      setLoading(false);
    };

    fetchImages();
  }

  return (
    <div>
      <div className="btn-container">
        <button onClick={fetchCatImage} className="btn">Fetch Cat Images</button>
      </div>

      {
        loading && (
          <div className='loading-container'>
            <p>Loading ... </p>
          </div>
        )
      }
      {
        error && (
          <div>
            <p>{error}</p>
          </div>
        )
      }
    
      <div className="image">
        {
          images.map((img) => (
          <div className='card ' key={img.id}>
            <img src={img.url} alt="cat-photo" className="cat-image" />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default CatImages;
