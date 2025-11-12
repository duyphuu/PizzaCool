// src/api/maGiamGiaApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/magiamgia";

async function getAllPromos() {
  const res = await axios.get(BASE_URL);
  return res.data; // trả trực tiếp mảng JSON
}

async function getPromoById(id) {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
}

async function createPromo(data) {
  const res = await axios.post(BASE_URL, data);
  return res.data;
}

async function updatePromo(id, data) {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

async function deletePromo(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}

export default {
  getAllPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
};
