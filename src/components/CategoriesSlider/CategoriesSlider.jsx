import Slider from "react-slick";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import useGetCategories from "../../CustomHooks/useGetCategories";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {

  const { data, isLoading } = useGetCategories();
  const [specificCategory, setSpecificCategory] = useState(null);
  const [loadingSpecific, setLoadingSpecific] = useState(false);

  async function getSpacificData(id) {
    setLoadingSpecific(true);
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
      .then((res) => {
        setSpecificCategory(res.data.data);
        console.log(specificCategory);
      })
      .catch((error) => {
        console.error("Error fetching specific category:", error);
        setLoadingSpecific(false);
      })
  }

  async function getData(id) {
    getSpacificData(id)
  }

  if (isLoading) {
    return (<>
      <div className="flex justify-center items-center"><FallingLines
        color="#2196f3"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      /></div>
    </>)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };
  return (
    <>
      <Slider {...settings} arrows={false}>
        {data.data.data.map((category) => <div key={category._id}>
          <div className="p-2" aria-labelledby="categories-slider" role="list" >
            <Link to={`/categoryProduct/${category._id}/${category.name}`} key={category._id} role="listitem">
              <div onClick={() => getData(category._id)} className="  p-1 text-center">
                <img className=" h-16 w-16 rounded-full  mx-auto" src={category.image} alt={category.name} />
                <h2 className="font-bold text-xs">{category.name}</h2>
              </div>
            </Link>
          </div>
        </div>
        )}
      </Slider>
    </>
  )
};