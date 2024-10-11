import { useState, useEffect } from 'react';

export default function RestaurantMatchup() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      const res = await fetch('/api/get-random-restaurants');
      const data = await res.json();
      setRestaurants(data);
      setLoading(false);
    }
    fetchRestaurants();
  }, []);

  const handleSelection = async (winnerId, loserId) => {
    await fetch('/api/update-elo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winnerId, loserId }),
    });
    // Re-fetch new restaurants after selection
    fetchRestaurants();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <img src={restaurant.image_url} alt={restaurant.name} />
          <button onClick={() => handleSelection(restaurant.id)}>
            Select
          </button>
        </div>
      ))}
      <button onClick={() => fetchRestaurants()}>Skip</button>
    </div>
  );
}
