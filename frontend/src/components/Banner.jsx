import './Banner.css'

function Banner() {
  return (
    <div className="banner-section">
      {/* Section 1 selon Figma */}
      <div className="banner-container">
        {/* Mask Group */}
        <div className="banner-mask">
          {/* Background gris */}
          <div className="banner-background"></div>
          
          {/* Image de fond */}
          <div className="banner-image"></div>
          
          {/* Overlay noir avec opacité */}
          <div className="banner-overlay"></div>
          
          {/* Texte principal */}
          <h1 className="banner-title">
            Chez vous, partout et ailleurs
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Banner
