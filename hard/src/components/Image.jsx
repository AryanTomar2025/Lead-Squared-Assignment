/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function Image({ images, setPageNo }) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const lastImage = entries[0];
            if (lastImage.isIntersecting) {
                setPageNo((prevPage) => prevPage + 1);
                observer.unobserve(lastImage.target);
            }
        });

        const lastImageElement = document.querySelector(
            ".img-container:last-child"
        );
        if (lastImageElement) {
            observer.observe(lastImageElement);
        }

        return () => {
            if (lastImageElement) {
                observer.unobserve(lastImageElement);
            }
        };
    }, [images, setPageNo]);

    return (
        <>
            <div className="container">
                {
                  images.map((img) => {
                    return (
                        <div className="img-container" key={img.id}>
                            <img src={img.url} alt="cat-photo" className="img" />
                        </div>
                    );
                })
                }
            </div>
        </>
    );
}
