import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";

function ReviewStarsDisplay(props: { rating: number }) {
  if (props.rating == 0) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
      </div>
    );
  } else if (props.rating == 1) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
      </div>
    );
  } else if (props.rating == 2) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
      </div>
    );
  } else if (props.rating == 3) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
      </div>
    );
  } else if (props.rating == 4) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarEmpty} size="sm" />
      </div>
    );
  } else if (props.rating == 5) {
    return (
      <div className="flex flex-row px-3 pt-2">
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
        <FontAwesomeIcon icon={faStarFilled} size="sm" />
      </div>
    );
  }
}

export default ReviewStarsDisplay;
