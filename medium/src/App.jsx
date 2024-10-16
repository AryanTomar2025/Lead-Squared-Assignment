import { useState } from "react";

const CatGalleryWithPagination = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchImages = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
      );
      const data = await response.json();
      if (data.length === 0) {
        setError("No images found");
      } else {
        setImages(data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch images");
    }
    setLoading(false);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetchImages(page - 1);
    }
  };

  return (
    <div>
      <div className="btn-container">
        <button onClick={() => fetchImages(page)} className="btn">
          Fetch Cat Images
        </button>
      </div>

      {
        loading && 
        (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
        )
      }

      {
        error && <p>{error}</p>
      }  

      <div className="image">
        {
          images.map((img) => (
          <div key={img.id} className="card">
            <img src={img.url} alt="cat" className="cat-image " />
          </div>
        ))
        }
      </div>

      <div className="btn-container">
        <button onClick={handlePrevious} className="btn" disabled={page === 1}>
          Previous
        </button>
        <button className="btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
export default CatGalleryWithPagination;
