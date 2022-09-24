import axios from 'axios';
import endPoints from '@services/api';

async function addProduct(body) {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.products.create, body, config);
  return response.data;
}

async function deleteProduct(id) {
  const response = await axios.delete(endPoints.products.delete(id));
  return response.data;
}

export { addProduct, deleteProduct };