import axios from 'axios';

const storedProfile = localStorage.getItem("profile");
const profile = storedProfile ? JSON.parse(storedProfile) : null;
const api = axios.create({
    baseURL: "http://localhost:5001/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': profile ? `Bearer ${profile.token}` : ''
    }
});

api.interceptors.request.use((req)=>{
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`;
    }
    return req;
});

export const fetchMovies = async (userId) => api.get(`${"/movies"}/${userId}`);
export const fetchMovie = async (userId,value) => api.get(`${"/movies"}/${userId}/${value}`);
export const createMovie = async (movie) => api.post("/movies", movie);
export const editMovie = async (id, movie) => api.patch(`${"/movies"}/${id}`, movie);
export const deleteMovie = async (id) => api.delete(`${"/movies"}/${id}`);

export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);


