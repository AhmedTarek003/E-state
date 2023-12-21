import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="spinner-loader">
      <RotatingLines
        strokeColor="#0085ff"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
