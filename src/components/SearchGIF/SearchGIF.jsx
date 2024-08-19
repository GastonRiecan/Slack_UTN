import { useState } from "react";
import GifList from "../../GifList/GifList.jsx";
import { fetchGIFs } from "../../helpers/fetchGifs.js";




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
    <div>
      <input
        className="gif-input"
        type="text"
        placeholder="Buscar GIF"
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleSearchGIF(e)}
      />
      <GifList gifs={gifs} handleSelectedGIF={handleSelectedGIF} />
      <button
        className="gif-button"
        type="button"
        onClick={toggleSearchGIFVisibility}
      >
        Cancelar
      </button>
      <button onClick={searchGIF}>Buscar</button>
    </div>
  );
};

export default SearchGIF;