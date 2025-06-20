import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/products';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [ids] = useState([13, 14, 15, 16, 17, 18]);
  const [newPrices, setNewPrices] = useState({});

  const fetchProducts = async () => {
    const data = await Promise.all(
      ids.map(async (id) => {
        try {
          const response = await axios.get(`${API}/${id}`);
          return response.data;
        } catch {
          return null;
        }
      })
    );
    setProducts(data.filter(Boolean));
  };

  const updatePrice = async (id) => {
    const value = parseFloat(newPrices[id]);
    if (!value || isNaN(value)) return alert('Please enter a valid price value');
    try {
      await axios.put(`${API}/${id}`, {
        current_price: { value, currency_code: 'USD' }
      });
      setNewPrices({ ...newPrices, [id]: '' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to update the price', error);
      alert('Failed to update the price');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProduct = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Products Listing</h1>

      <input
        type="text"
        placeholder="Search Product Title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '300px' }}
      />

      <div>
        {filteredProduct.map((p) => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px'
            }}
          >
            <h3>{p.title}</h3>
            <p>Current Price: {p.current_price.value ?? 'Not Set'} {p.current_price.currency_code}</p>
            <input
              type="number"
              placeholder="New Price"
              value={newPrices[p.id] || ''}
              onChange={(e) => setNewPrices({ ...newPrices, [p.id]: e.target.value })}
              style={{ padding: '6px', width: '100px', marginRight: '10px' }}
            />
            <button onClick={() => updatePrice(p.id)} style={{ padding: '6px 12px' }}>Update Price</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
