import React from "react";
import "./styles.css";

const GifList = ({ gifs, handleSelectedGIF }) => {
  return (
    <div className={`gif-list-container ${gifs.length == 0 && "no-scroll"}`}>
      {gifs.map((gif) => (
        <img
          className="gifs-list-gif"
          onClick={() => handleSelectedGIF(gif.images.fixed_height.url)}
          key={gif.id}
          src={gif.images.fixed_height.url}
          alt={gif.title}
        />
      ))}
    </div>
  );
};

export default GifList;