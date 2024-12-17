import './card.scss';

const Card = ({ image, title, p }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img className="card-img" src={image} alt="card" />
        <div className="image-overlay"></div>
      </div>
      <h5 className="card-title">{title}</h5>
      <p className="card-paragraph">{p}</p>
    </div>
  );
};

export default Card;
