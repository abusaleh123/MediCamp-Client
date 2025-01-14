import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCamps = () => {
const {axiosPublic} = useAxiosPublic()
    const{data: campss = []} = useQuery({
          queryKey: ['camps'],
          queryFn: async() => {
            const res = await axiosPublic.get('/camps')
            return res.data
          }
    })
   return [campss]
};

export default useCamps;