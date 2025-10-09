import { Link } from 'react-router-dom';
import './ThumbCard.css';

// eslint-disable-next-line react/prop-types
function ThumbCard({ id, title, imageUrl }) {
  return (
    <Link to={`/accommodation/${id}`} className="thumb-card-link">
      <div className="thumb-card">
        {imageUrl && (
          <div 
            className="card-image" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        )}
        
        {/* Titre de la location selon Figma */}
        <h3 className="card-title">{title}</h3>
      </div>
    </Link>
  );
}

export default ThumbCard;
