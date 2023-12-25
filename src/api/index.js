const API_KEY = "CO4rHgPIFCqfq4hXTBgbZuiJBndt1uPN"

export async function fetchTrendingGifs() {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
    const data = await response.json();
    const gifs = await data.data;
    return gifs;
  } catch (error) {
    throw new Error('Something went wrong', error)
  }
}

export async function fetchSearchedGifs(req) {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${req}`)
    const data = await response.json();
    const gifs = await data.data;
    return gifs
  } catch(error) {
    throw new Error('something went wrong', )
  }
}