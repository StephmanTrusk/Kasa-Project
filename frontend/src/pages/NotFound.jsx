import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

function NotFound() {
    return (
        <div className="notfound-page">
            <div className="notfound-code">404</div>
            <div className="notfound-message">Oups! La page que vous demandez n&apos;existe pas.</div>
            <Link to="/" className="notfound-home-link">Retourner sur la page d’accueil</Link>
        </div>
    )
}

export default NotFound


