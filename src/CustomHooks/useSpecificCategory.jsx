
import axios from 'axios';
import { useQuery } from 'react-query';

export default function useSpecificCategory() {

        function getSpecificCategories(id) {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        }
        let { data, isLoading } = useQuery({
            queryKey: 'specificCategories',
            queryFn: getSpecificCategories,
        });
    
        return {
            data,
            isLoading
        }
    }