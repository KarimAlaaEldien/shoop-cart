import axios from 'axios';
import { useQuery } from 'react-query';

export default function useGetCategories() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { data, isLoading } = useQuery({
        queryKey: 'Categories',
        queryFn: getAllCategories,
    });

    return {
        data,
        isLoading
    }
}
