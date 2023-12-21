import style from "./createListing.module.css";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../redux/apiCalls/listingsApiCall";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.listing);
  const { msg } = useSelector((state) => state.listing);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    beds: 1,
    baths: 1,
    price: 0,
    discountPrice: 0,
  });

  useEffect(() => {
    if (msg) {
      navigate("/listings");
    }
  }, [msg, navigate]);
  let myImages = [];

  // Upload Images UI
  const uploadFiles = (e) => {
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      myImages.push(files[i]);
    }
    setImages(() => myImages);
  };

  // Remove Images From Array
  const removeImage = (name) => {
    for (let i = 0; i < images.length; i++) {
      myImages.push(images[i]);
    }
    myImages = myImages.filter((i) => i !== name);
    setImages(() => myImages);
  };

  // Change values
  const onChangeHandle = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") return toast.error("name is required");
    if (formData.desc.trim() === "")
      return toast.error("descripion is required");
    if (formData.desc.split("").length <= 15)
      return toast.error("descripion must be at least 15 characters");
    if (formData.address.trim() === "")
      return toast.error("address is required");
    if (images.length <= 0) return toast.error("images at least must be 1");
    if (images.length > 6) return toast.error(" max of images 6");
    const formdataObj = new FormData();
    images.forEach((image, index) => {
      formdataObj.append("images", image);
    });
    for (const key in formData) {
      formdataObj.append(key, formData[key]);
    }
    dispatch(createListing(formdataObj));
  };

  return (
    <section>
      <Header />
      {user?.isVerified ? (
        <>
          <div className={style.create_listing}>
            <div className={style.title}>Create a Listing</div>
            <div className={style.container}>
              <div className={style.listing_info}>
                <form className={style.listing_form}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={style.listing_form_input}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    className={style.listing_form_textarea}
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className={style.listing_form_input}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </form>
                <div className={style.listing_options}>
                  <div className={style.house_info}>
                    <div className={style.house_info_group}>
                      <input
                        type="checkbox"
                        id="sell"
                        className={style.checkbox}
                        onChange={onChangeHandle}
                        checked={formData.type === "sell"}
                      />
                      <label htmlFor="sell" className={style.checkbox_label}>
                        sell
                      </label>
                    </div>
                    <div className={style.house_info_group}>
                      <input
                        type="checkbox"
                        id="rent"
                        className={style.checkbox}
                        onChange={onChangeHandle}
                        checked={formData.type === "rent"}
                      />
                      <label htmlFor="rent" className={style.checkbox_label}>
                        rent
                      </label>
                    </div>
                    <div className={style.house_info_group}>
                      <input
                        type="checkbox"
                        id="parking"
                        className={style.checkbox}
                        onChange={onChangeHandle}
                        checked={formData.parking}
                      />
                      <label htmlFor="parking" className={style.checkbox_label}>
                        parking
                      </label>
                    </div>
                    <div className={style.house_info_group}>
                      <input
                        type="checkbox"
                        id="furnished"
                        className={style.checkbox}
                        onChange={onChangeHandle}
                        checked={formData.furnished}
                      />
                      <label
                        htmlFor="furnished"
                        className={style.checkbox_label}
                      >
                        furnished
                      </label>
                    </div>
                    <div className={style.house_info_group}>
                      <input
                        type="checkbox"
                        id="offer"
                        className={style.checkbox}
                        onChange={onChangeHandle}
                        checked={formData.offer}
                      />
                      <label htmlFor="offer" className={style.checkbox_label}>
                        offer
                      </label>
                    </div>
                  </div>
                  <div className={style.house_about}>
                    <div className={style.house_about_group}>
                      <label className={style.house_about_label}>Beds :</label>
                      <input
                        type="number"
                        min={1}
                        className={style.num}
                        value={formData.beds}
                        onChange={(e) =>
                          setFormData({ ...formData, beds: e.target.value })
                        }
                      />
                    </div>
                    <div className={style.house_about_group}>
                      <label className={style.house_about_label}>Baths :</label>
                      <input
                        type="number"
                        min={1}
                        className={style.num}
                        value={formData.baths}
                        onChange={(e) =>
                          setFormData({ ...formData, baths: e.target.value })
                        }
                      />
                    </div>
                    <div className={style.house_about_group}>
                      <label className={style.house_about_label}>
                        Regular price
                        <br />
                        ($/month)
                      </label>
                      <input
                        type="number"
                        className={style.num}
                        min={0}
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                      />
                    </div>
                    <div className={style.house_about_group}>
                      <label className={style.house_about_label}>
                        Discount price
                        <br />
                        ($/month)
                      </label>
                      <input
                        type="number"
                        className={style.num}
                        min={0}
                        value={formData.discountPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discountPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.listing_images}>
                <div className={style.upload_images}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className={style.upload_input}
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <button className={style.upload_btn} onClick={uploadFiles}>
                    Upload
                  </button>
                </div>
                <div className={style.array_images}>
                  {images?.map((image, index) => (
                    <div className={style.image_box} key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className={style.box_img}
                      />
                      <span
                        className={style.delete}
                        onClick={() => removeImage(image)}
                      >
                        Delete
                      </span>
                    </div>
                  ))}
                </div>
                <button className={style.create_btn} onClick={submitHandler}>
                  Create a listing
                </button>
              </div>
            </div>
          </div>
          {loading && <Loader />}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1>verified your account</h1>
          <button
            style={{
              padding: "7px 20px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={() => dispatch(logoutUser())}
          >
            Verify
          </button>
        </div>
      )}
    </section>
  );
};

export default CreateListing;
