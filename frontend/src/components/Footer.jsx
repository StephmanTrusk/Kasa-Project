import { Link } from 'react-router-dom'
import Logo from './Logo'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo blanc selon Figma */}
        <div className="footer-logo">
          <Link to="/">
            <Logo width={120} height={40} />
          </Link>
        </div>
        
        {/* Copyright selon Figma */}
        <p className="footer-copyright">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
