import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ListingsList from "../../components/ListingsList/ListingsList";
import Slider from "../../components/Slider/Slider";
import style from "./home.module.css";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../redux/apiCalls/listingsApiCall";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);
  const { loading } = useSelector((state) => state.listing);

  const images = [
    {
      url: "https://assets-us-01.kc-usercontent.com/0542d611-b6d8-4320-a4f4-35ac5cbf43a6/57134553-0077-4e93-8cfd-58895d271ef8/homeowners-insurance-facebook.jpg",
    },
    {
      url: "https://media.licdn.com/dms/image/D4D12AQEaLAZT_s7KfQ/article-cover_image-shrink_720_1280/0/1656939664338?e=2147483647&v=beta&t=UpQ_diu_xyow2FkCYcNtrCC1-2NwtSZ7VusR-l41TQo",
    },
    {
      url: "https://cdn0.weddingwire.ca/vendor/5671/3_2/960/jpg/property-23_50_15671.jpeg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllListings());
  }, [dispatch]);
  return (
    <section>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="E-state Home page" />
      </Helmet>
      <Header />
      <div className={style.container}>
        <div className={style.landing}>
          <div className={style.overlay}></div>
          <div className={style.landing_intro}>
            <div className={style.landing_title}>Welcome, in E-state</div>
            <p className={style.landing_text}>
              Here you will find the best offers.
            </p>
            <Link to={"/listings"} className={style.show_listings}>
              Show all listings...
            </Link>
          </div>
        </div>
        <Slider images={images} />
        {loading ? (
          <Loading />
        ) : (
          listings.length > 0 && (
            <ListingsList listings={listings.slice(0, 6)} />
          )
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Home;
