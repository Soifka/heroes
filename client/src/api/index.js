import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const getHeroes = async () => await httpClient.get('/superheroes');

export const deleteHero = async (superheroId) => await httpClient.delete(`/superheroes/${superheroId}`);

export const deletePower = async (superheroId, powerId) => await httpClient.delete(`/superheroes/${superheroId}/superpowers/${powerId}`);

export const addPower = async (superheroId, superpowers) => await httpClient.post(`/superheroes/${superheroId}/superpowers`, {superpowers});

export const editHero = async (superheroId, superhero) => await httpClient.put(`/superheroes/${superheroId}`, superhero);