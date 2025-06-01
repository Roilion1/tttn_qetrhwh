import httpAxios from "./httpAxios"

const MovieService ={
    index: async ()=>{
        return await httpAxios.get(`movies`);
    },
    trash: async ()=>{
        return await httpAxios.get(`movies/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`movies/show/${id}`);
    },
    insert: async (data)=>{
        return await httpAxios.post(`movies/insert`,data);
    },
    update: async (data, id) => {
        return await httpAxios.put(`movies/${id}`, data); // ✅ Chuẩn RESTful
    },
    status: async (id)=>{
        return await httpAxios.get(`movies/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`movies/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`movies/restore/${id}`);
    },
    destroy: async (id)=>{
        return await httpAxios.delete(`movies/destroy/${id}`);
    },
    add: async (movie) => {
        console.log('Data to be sent:', movie);
        const response = await httpAxios.post('movies', movie);
        console.log('Response from API:', response);
        return response.data;
    },
}

export default MovieService;