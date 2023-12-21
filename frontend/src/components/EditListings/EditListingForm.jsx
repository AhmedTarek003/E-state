import { useState } from "react";
import { toast } from "react-toastify";
import style from "./editListing.module.css";
import { useDispatch } from "react-redux";
import {
  updateListingById,
  updateListingImages,
} from "../../redux/apiCalls/listingsApiCall";

const EditListingForm = ({ listing, id }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [dataImages, setDataImages] = useState(listing?.listingImages);
  const [formData, setFormData] = useState({
    name: listing?.name,
    desc: listing?.desc,
    address: listing?.address,
    type: listing?.type,
    parking: listing?.parking,
    furnished: listing?.furnished,
    offer: listing?.offer,
    beds: listing?.beds,
    baths: listing?.baths,
    price: listing?.price,
    discountPrice: listing?.discountPrice,
  });

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

  // remove images from data
  // const removeImagesFromData = (image) => {
  //   setDataImages(() => dataImages.filter((i) => i !== image));
  // };

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
    if (formData.address.trim() === "")
      return toast.error("address is required");
    if (images.length <= 0 && dataImages.length <= 0)
      return toast.error("images at least must be 1");
    if (images.length > 6 && dataImages.length <= 6)
      return toast.error(" max of images 6");
    // check if images updated or not
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append("images", image);
      });
      dispatch(updateListingImages(id, formData));
    } else {
      // if (dataImages.length !== listing.listingImages.length) {
      //   console.log("yes")
      // }
    }
    dispatch(updateListingById(id, formData));
    setFiles(() => []);
    setImages(() => []);
  };
  return (
    <div className={style.container}>
      <div className={style.listing_info}>
        <form className={style.listing_form}>
          <input
            type="text"
            placeholder="Name"
            className={style.listing_form_input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            type="text"
            placeholder="Description"
            className={style.listing_form_textarea}
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
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
              <label htmlFor="furnished" className={style.checkbox_label}>
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
          {images.length > 0
            ? images?.map((image, index) => (
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
              ))
            : listing &&
              dataImages?.map((image, index) => (
                <div
                  className={style.image_box}
                  key={index}
                  style={{ textAlign: "center" }}
                >
                  <img src={image?.url} alt="" className={style.box_img} />
                  {/* <span
                    className={style.delete}
                    onClick={() => removeImagesFromData(image)}
                  >
                    Delete
                  </span> */}
                </div>
              ))}
        </div>
        <button className={style.edit_btn} onClick={submitHandler}>
          Edit listing
        </button>
      </div>
    </div>
  );
};

export default EditListingForm;
