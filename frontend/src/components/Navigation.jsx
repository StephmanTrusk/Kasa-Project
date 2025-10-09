import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import '../styles/Navigation.css'

function Navigation() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo selon Figma */}
                <div className="header-logo">
                    <Link to="/">
                        <Logo width={120} height={40} />
                    </Link>
                </div>
                
                {/* Navigation selon Figma */}
                <nav className="header-nav">
                    <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Accueil</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>A Propos</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Navigation