import {fetchProductFromFakeAPI, fetchPriceFromDB, updatePriceInDB} from '../services/productService.js';

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await fetchProductFromFakeAPI(id);
    const price = await fetchPriceFromDB(id);

    res.json({
      id: product.id,
      title: product.title,
      current_price: {
        value: price?.value ?? null,
        currency_code: 'USD'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const updateProductPrice = async (req, res) => {
  const { id } = req.params;
  const { current_price } = req.body;
  try {
    await updatePriceInDB(id, current_price.value);
    res.json({
      id,
      current_price: {
        value: current_price.value,
        currency_code: 'USD'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update price' });
  }
};
