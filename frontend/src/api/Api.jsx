// src/api/scrittureApi.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // adatta se il tuo backend è diverso

// ---------- SCRITTURE CONTABILI ----------
const SCRITTURE_URL = `${BASE_URL}/scritture/`;

export const getScritture = () => axios.get(SCRITTURE_URL);

export const createScrittura = (data) => axios.post(SCRITTURE_URL, data);

export const updateScrittura = (id, data) =>
  axios.put(`${SCRITTURE_URL}${id}/`, data);

export const deleteScrittura = (id) => axios.delete(`${SCRITTURE_URL}${id}/`);

// ---------- ANAGRAFICHE ----------
const BASE_URL2 = "http://127.0.0.1:8080/api"; // sbagliato perché non ho ancora migrato tieni invariato
const ANAGRAFICHE_URL = `${BASE_URL2}/anagrafiche/`;

export const getAnagrafiche = () => axios.get(ANAGRAFICHE_URL);

export const createAnagrafica = (data) => axios.post(ANAGRAFICHE_URL, data);

export const updateAnagrafica = (id, data) =>
  axios.put(`${ANAGRAFICHE_URL}${id}/`, data);

export const deleteAnagrafica = (id) =>
  axios.delete(`${ANAGRAFICHE_URL}${id}/`);
