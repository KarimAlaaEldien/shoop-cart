import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AllOrdersSlider({ order }) {

const item = order.cartItems.length > 1
    var settings = {
        infinite: item,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: item,
    };

    return (
        <>
            <Slider  {...settings} arrows={false}>
                {order.cartItems.map((pro) => <div key={pro._id} className="border-none">
                    <img className="w-full h-32 rounded-xl mb-2" src={pro.product.imageCover} alt={pro.product.title} />
                    <div className="ps-2">
                        <p className="font-semibold ">Name: <span className="font-normal text-black">{pro.product.category.name}</span></p>
                        <p className="font-semibold ">Count: <span className="font-normal text-black"><span>{pro.count} </span> {pro.count > 1 ? 'pieces' : 'piece'}</span></p>
                        <p className="font-semibold ">Price: <span className="font-normal text-black">{pro.price} EGP</span></p>

                    </div>
                </div>
                )}
            </Slider>
        </>
    )
}