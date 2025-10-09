import { useState } from 'react';
import './ApartmentDropdown.css';

// eslint-disable-next-line react/prop-types
function ApartmentDropdown({ 
  equipments = [], 
  title = "Équipements"
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="apartment-dropdown">
      {/* Bouton principal selon l'image 2 */}
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span className="button-text">{title}</span>
        
        {/* Petite flèche SVG exacte */}
        <svg 
          width="24" 
          height="15" 
          viewBox="0 0 24 15" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`button-arrow ${isOpen ? 'open' : ''}`}
        >
          <path 
            d="M10.7897 1.43151C11.4591 0.762088 12.5462 0.762088 13.2157 1.43151L23.4979 11.7138C24.1674 12.3832 24.1674 13.4703 23.4979 14.1398C22.8285 14.8092 21.7414 14.8092 21.072 14.1398L12 5.06779L2.92804 14.1344C2.25862 14.8038 1.17148 14.8038 0.502065 14.1344C-0.167354 13.465 -0.167354 12.3778 0.502065 11.7084L10.7843 1.42615L10.7897 1.43151Z" 
            fill="white"
          />
        </svg>
      </button>

      {/* Contenu déroulant */}
      {isOpen && (
        <div className="dropdown-content">
          {equipments && equipments.length > 0 ? (
            <div className="equipments-list">
              {equipments.map((equipment, index) => (
                <div key={index} className="equipment-item">
                  {equipment}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-equipments">Aucun équipement disponible</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ApartmentDropdown;
