import "./RegularPropertyCard.css";
import { formatDate } from "./Utils";

function RegularPropertyCard({ details, serverUrl, _handlePropertyClick }) {
  return (
    <div
      className="card"
      onClick={() => {
        _handlePropertyClick(details);
      }}
    >
      <div className="image-div">
        <img
          className="property-image"
          src={serverUrl + details.propertyImage.replace("\\", "/")}
          alt="Property"
        />
      </div>
      <h6>Posted on {formatDate(details.createdAt)}</h6>
      <div className="content">
        <h4>{details.title}</h4>
        <p>{details.description}</p>
        <h5>₹ {details.price.toLocaleString("en-IN")}</h5>
      </div>
    </div>
  );
}

export default RegularPropertyCard;
