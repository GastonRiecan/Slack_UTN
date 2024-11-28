import { useState } from "react";
import GifList from "../../GifList/GifList.jsx";
import { fetchGIFs } from "../../helpers/fetchGifs.js";
import "./styles.css";

const SearchGIF = ({ toggleSearchGIFVisibility, handleCreateMessage }) => {
  const [searchText, setSearchText] = useState("");
  const [gifs, setGifs] = useState([]);

  const searchGIF = async () => {
    setGifs(await fetchGIFs(searchText));
  };

  const handleSelectedGIF = (gifURL) => {
    handleCreateMessage(gifURL);
  };

  const handleSearchGIF = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchText) {
        searchGIF();
      }
    }
  };

  return (
    <>
      <div className="search-gif-container">
        <input
          className="gif-input"
          type="text"
          placeholder="Buscar GIF"
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => handleSearchGIF(e)}
        />
        <div className="gif-buttons">
          <button
            className="gif-button"
            type="button"
            onClick={toggleSearchGIFVisibility}
          >
            Cancelar
          </button>
          <button className="search-gifs-btn" onClick={searchGIF} type="button">
            Buscar
          </button>
        </div>
      </div>
      <div>
        {gifs.length > 0 ? (
          <GifList gifs={gifs} handleSelectedGIF={handleSelectedGIF} />
        ) : (
          <span className="italic">
            Aquí aparecerán tus gifs...
          </span>
        )}
      </div>
    </>
  );
};

export default SearchGIF;
