export async function fetchGIFs(query) {
	const API_KEY = "GcQxQp2Imwt4feP40koxHBsnU64trYj9";
	const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10&offset=0&rating=g&lang=es`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching GIFs:", error);
		return [];
	}
}
