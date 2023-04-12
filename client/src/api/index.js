import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const getHeroes = async () => httpClient.get('/superheroes');

export const deleteHero = async (superheroId) => httpClient.delete(`/superheroes/${superheroId}`);

export const deletePower = async (superheroId, powerId) => httpClient.delete(`/superheroes/${superheroId}/superpowers/${powerId}`);

export const addPower = async (superheroId, superpowers) => httpClient.post(`/superheroes/${superheroId}/superpowers`, {superpowers});