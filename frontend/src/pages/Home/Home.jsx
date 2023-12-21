import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ListingsList from "../../components/ListingsList/ListingsList";
// import Slider from "../../components/Slider/Slider";
import style from "./home.module.css";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../redux/apiCalls/listingsApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllListings());
  }, [dispatch]);
  return (
    <section>
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
        {/* <Slider images={listings} /> */}
        {listings.length > 0 && (
          <ListingsList listings={listings.slice(0, 6)} />
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Home;
