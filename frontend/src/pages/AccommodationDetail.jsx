import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApartmentDropdown from '../components/ApartmentDropdown';
import Tag from '../components/Tag';
import './AccommodationDetail.css';

// eslint-disable-next-line react/prop-types
function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        const foundAccommodation = data.find(acc => acc.id === id);
        
        if (!foundAccommodation) {
          navigate('/404', { replace: true });
          return;
        }
        
        setAccommodation(foundAccommodation);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchAccommodation();
    }
  }, [id]);

  const nextImage = () => {
    if (accommodation && accommodation.pictures) {
      setCurrentImageIndex((prev) => 
        prev === accommodation.pictures.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (accommodation && accommodation.pictures) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? accommodation.pictures.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i} className={`star ${i <= rating ? 'active' : 'inactive'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill={i <= rating ? '#FF6060' : '#E3E3E3'}
            />
          </svg>
        </div>
      );
    }
    return stars;
  };

  // Contenu principal selon l'état
  const renderMainContent = () => {
    if (loading) {
      return <div className="loading">Chargement du logement...</div>;
    }

    if (error) {
      return (
        <div className="error">
          <p>Erreur: {error}</p>
          <button onClick={() => navigate('/')}>Retour à l&apos;accueil</button>
        </div>
      );
    }

    if (!accommodation) {
      return null;
    }

    return (
      <>
        {/* Carrousel d'images */}
        <section className="carousel-section">
          <div className="carousel-container">
            <div className="carousel-image">
              <img 
                src={accommodation.pictures[currentImageIndex]} 
                alt={accommodation.title}
              />
              <div className="image-overlay"></div>
            </div>
            
            {/* Navigation du carrousel */}
            <button className="carousel-arrow prev" onClick={prevImage}>
              <svg width="47" height="79" viewBox="0 0 47 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="30,10 10,39.5 30,69" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            
            <button className="carousel-arrow next" onClick={nextImage}>
              <svg width="47" height="79" viewBox="0 0 47 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="17,10 37,39.5 17,69" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            
            {/* Indicateur d'image */}
            <div className="image-counter">
              {currentImageIndex + 1}/{accommodation.pictures.length}
            </div>
          </div>
        </section>

        {/* Informations du logement */}
        <section className="accommodation-info">
          <div className="info-container">
            {/* 1 : Titre et localisation */}
            <div className="title-section">
              <h1 className="accommodation-title">{accommodation.title}</h1>
              <p className="accommodation-location">{accommodation.location}</p>
            </div>

            {/* 2 : Hôte et notation */}
            <div className="rating-host-section">
              <div className="host">
                <span className="host-name">{accommodation.host?.name || 'Hôte'}</span>
                <div className="host-avatar">
                  {accommodation.host?.picture && (
                    <img src={accommodation.host.picture} alt={accommodation.host.name} />
                  )}
                </div>
              </div>
              <div className="rating">
                {renderStars(accommodation.rating || 5)}
              </div>
            </div>

            {/* 3 : Tags */}
            <div className="tags-section">
              {accommodation.tags && accommodation.tags.map((tag, index) => (
                <Tag key={index} tagName={tag} />
              ))}
            </div>
          </div>
        </section>

        {/* Dropdowns d'équipements */}
        <section className="dropdowns-section">
          <div className="dropdowns-container">
            <ApartmentDropdown 
              title="Description"
              equipments={[accommodation.description || "Aucune description disponible"]}
            />
            <ApartmentDropdown 
              title="Équipements"
              equipments={accommodation.equipments || []}
            />
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="accommodation-detail">
      {renderMainContent()}
    </div>
  );
}

export default AccommodationDetail;
