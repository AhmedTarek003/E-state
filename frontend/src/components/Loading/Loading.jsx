import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <Oval
        visible={true}
        height="65"
        width="65"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
