import { Link } from "react-router-dom";
import useGetCategories from "../../CustomHooks/useGetCategories";
import { Helmet } from "react-helmet";
import LoaderCart from "../LoaderCart/LoaderCart";

export default function CategoriesSlider() {

    const { data, isLoading } = useGetCategories();

    if (isLoading) {
        return <LoaderCart />;
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Categories</title>
                <meta name="description" content="Categories that suit your needs" />
            </Helmet>
            <section className="categories pb-6">
                <h1 className="text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-6">
                    All Categories
                </h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                    {data?.data?.data.map((category) => (
                        <Link to={`/categoryProduct/${category._id}/${category.name}`} key={category._id}>
                            <div className="category py-4 px-2 bg-white">
                                <div className='px-2 pt-3 pb-2 shadow-md rounded-xl bg-slate-50'>
                                    <img src={category.image} className='w-full h-72 md:h-60 rounded-xl' alt={category.name} />
                                    <h2 className='text-blue-700 font-semibold'>{category.name}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}