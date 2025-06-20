import axios from 'axios';
import database from '../config/db.js';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProductFromFakeAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const fetchPriceFromDB = (id) => {
  return new Promise((resolve, reject) => {
    database.get('SELECT value FROM prices WHERE id = ?', [id], (error, row) => {
      if (error) return reject(error);
      resolve(row);
    });
  });
};

export const updatePriceInDB = (id, value) => {
  return new Promise((resolve, reject) => {
    database.run(
      'INSERT INTO prices (id, value) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET value=excluded.value',
      [id, value],
      (error) => {
        if (error) return reject(error);
        resolve();
      }
    );
  });
};
