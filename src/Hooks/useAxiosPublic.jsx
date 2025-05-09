import axios from "axios";

 const axiosPublic= axios.create(
    
    {
        baseURL: 'https://medical-camp-server-indol.vercel.app'
    }
)

const useAxiosPublic = () => {
    return {axiosPublic}
};

export default useAxiosPublic;