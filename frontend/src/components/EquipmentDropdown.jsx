import { useState } from 'react';
import './EquipmentDropdown.css';

function EquipmentDropdown({ equipments, title = "Équipements" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDropdown = () => {
    if (isAnimating) return; // Empêche les clics multiples pendant l'animation
    
    if (isOpen) {
      // Fermeture
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300); // Durée de l'animation
    } else {
      // Ouverture
      setIsOpen(true);
    }
  };

  return (
    <div className="equipment-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="header-title">{title}</span>
        <span className={`chevron-icon ${isOpen ? 'open' : ''}`}>
          {isOpen ? 'v' : '^'}
        </span>
      </div>
      
      {isOpen && (
        <div className={`dropdown-content ${isAnimating ? 'closing' : ''}`}>
          {equipments && equipments.length > 0 ? (
            <ul className="equipment-list">
              {equipments.map((equipment, index) => (
                <li key={index} className="equipment-item">
                  {equipment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-equipment">Aucun équipement disponible</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EquipmentDropdown;
