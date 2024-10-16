import Image from "./Image";
import { useState, useEffect } from "react";


export default function InfiniteScroll() {
  const [imageData, setImageData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=4&page=${pageNo}&order=Desc`)
      .then((res) => {
        return res.json();
      })
      .then((newimageArray) =>
        setImageData((oldImages) => [...oldImages, ...newimageArray])
      );
  }, [pageNo]);

  return (
    <>
      <Image images={imageData} setPageNo={setPageNo} />
    </>
  );
}
