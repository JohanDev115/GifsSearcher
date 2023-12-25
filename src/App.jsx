import { useEffect, useState } from 'react';
import { fetchSearchedGifs, fetchTrendingGifs } from './api';
import './App.css'

function App() {

  const [gifsList, setGifsList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTrendingGifs() {
    try {
      setLoading(true)
      const gifs = await fetchTrendingGifs();
      setGifsList(gifs)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  async function getSearchedGifs(req) {
    try {
      setLoading(true)
      setGifsList([])
      const gifs = await fetchSearchedGifs(req);
      setGifsList(gifs)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  function onSearch(e) {
    const searchedText = e.target.value;
    if (searchedText.length > 2) {
      getSearchedGifs(searchedText);
    } else {
      getTrendingGifs();
    }
  }

  useEffect(() => {
    getTrendingGifs();
  }, [])

  return (
    <>
      <header>
        <h1>GifSearcher 🔎</h1>
        <input onChange={onSearch} type="text" />
      </header>
      <a href="https://johandev115.github.io/JohanDev115/index.html">By <span>JohanDev</span></a>
      <div className='gifs-list'>
        {gifsList.map((gif, i) =>
          <picture className='gif' key={i}>
            <img loading="lazy" src={gif?.images?.original.webp} width={gif?.images?.original?.width} height={gif?.images?.original?.height} />
          </picture>
        )}
      </div>
      <center>
        {gifsList.length == 0 && !loading && <h2>There are not results for your search 😫</h2>}
        {loading && <h2>Loading...</h2>}
      </center>
    </>
  )
}

export default App
