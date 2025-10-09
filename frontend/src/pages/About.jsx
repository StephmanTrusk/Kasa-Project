import '../styles/About.css'
import ApartmentDropdown from '../components/ApartmentDropdown'

function About() {
    return (
        <div className="about-page">
            {/* Bannière À propos (selon Figma) */}
            <section className="about-banner">
                <div className="about-banner__image" />
                <div className="about-banner__overlay" />
            </section>

            {/* Valeurs - 4 dropdowns large */}
            <section className="values-section">
                <div className="values-container">
                    <ApartmentDropdown
                        title="Fiabilité"
                        equipments={[
                            "Les annonces postées sur Kasa garantissent une fiabilité totale tant sur les photos que sur la description.",
                        ]}
                        size="large"
                        defaultOpen={false}
                    />
                    <ApartmentDropdown
                        title="Respect"
                        equipments={[
                            "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.",
                        ]}
                        size="large"
                        defaultOpen={false}
                    />
                    <ApartmentDropdown
                        title="Service"
                        equipments={[
                            "Nos équipes se tiennent à votre disposition pour vous offrir une expérience parfaite.",
                        ]}
                        size="large"
                        defaultOpen={false}
                    />
                    <ApartmentDropdown
                        title="Sécurité"
                        equipments={[
                            "La sécurité est la priorité de Kasa. Autant pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services.",
                        ]}
                        size="large"
                        defaultOpen={false}
                    />
                </div>
            </section>
        </div>
    )
}

export default About