import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ThumbCard from '../components/ThumbCard';
import './Home.css';

function Home() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setAccommodations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des logements...</div>;
  }

  if (error) {
    return <div className="error">Erreur: {error}</div>;
  }

  return (
    <div className="home-page">
      {/* Banner selon Figma */}
      <Banner 
        title="Chez vous, partout et ailleurs"
        imageUrl="/banner-home.jpg"
      />
      
      {/* Gallery des ThumbCards selon Figma */}
      <section className="gallery-section">
        <div className="gallery-container">
          {accommodations.map((accommodation) => (
            <ThumbCard
              key={accommodation.id}
              id={accommodation.id}
              title={accommodation.title}
              imageUrl={accommodation.cover}
            />
          ))}
        </div>
        
      </section>
    </div>
  );
}

export default Home;