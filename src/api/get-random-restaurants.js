// J// This is your API route to fetch random restaurants
export default async function handler(req, res) {
    const restaurants = await fetchTwoRandomRestaurantsFromDB(); // Fetch from your database
    res.status(200).json(restaurants);
}
