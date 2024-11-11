import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Items() {
  const [items, setItems] = useState([]);
  const carouselImages = ["/c1.jpg", "/c2.jpg", "/c3.jpg"];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/item/items"); // Adjust URL if needed
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Carousel Section */}
      <div className="mb-12">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Carousel ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Available Items Section */}
      <h1 className="text-3xl font-bold mb-8">Available Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.id} to={`/items/${item.id}`} className="block">
            <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
              <img
                src={item.images[0]} // Assuming each item has an `images` array
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-500">IDR {item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Items;
