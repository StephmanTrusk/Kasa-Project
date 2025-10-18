import './Banner.css'

function Banner({ imageUrl }) {
  return (
    <div className="banner-section">
      {/* Section 1 selon Figma */}
      <div className="banner-container">
        {/* Mask Group */}
        <div className="banner-mask">
          {/* Background gris */}
          <div className="banner-background"></div>
          
          {/* Image de fond - utilise imageUrl si fournie, sinon garde l'image par défaut du CSS */}
          <div 
            className="banner-image"
            style={imageUrl ? { 
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          ></div>
          
          {/* Overlay noir avec opacité */}
          <div className="banner-overlay"></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
