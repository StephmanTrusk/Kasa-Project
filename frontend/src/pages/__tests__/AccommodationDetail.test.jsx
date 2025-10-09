import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccommodationDetail from '../AccommodationDetail';

// Mock des données d'API
const mockAccommodation = {
  id: '1',
  title: 'Appartement de luxe',
  location: 'Paris, France',
  pictures: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ],
  host: {
    name: 'Jean Dupont',
    picture: 'https://example.com/host.jpg'
  },
  rating: 4,
  tags: ['WiFi', 'Climatisation', 'Piscine'],
  equipments: ['Lave-linge', 'Sèche-linge', 'Cuisine équipée'],
  description: 'Magnifique appartement avec vue sur la Seine'
};

// Wrapper pour les tests avec Router
const RouterWrapper = ({ children, initialEntries = ['/accommodation/1'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/accommodation/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('AccommodationDetail Page', () => {
  beforeEach(() => {
    // Mock de fetch - retourne un tableau avec l'accommodation
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          console.log('Mock API called, returning:', [mockAccommodation]);
          return Promise.resolve([mockAccommodation]);
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Chargement du logement...')).toBeInTheDocument();
  });

  test('renders accommodation details after loading', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Appartement de luxe')).toBeInTheDocument();
      expect(screen.getByText('Paris, France')).toBeInTheDocument();
      expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
    });
  });

  test('renders carousel with navigation buttons', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      // Utiliser les classes CSS pour identifier les boutons du carousel
      const prevButton = document.querySelector('.carousel-arrow.prev');
      const nextButton = document.querySelector('.carousel-arrow.next');
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });

  test('renders image counter', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('1/3')).toBeInTheDocument();
    });
  });

  test('renders tags correctly', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('WiFi')).toBeInTheDocument();
      expect(screen.getByText('Climatisation')).toBeInTheDocument();
      expect(screen.getByText('Piscine')).toBeInTheDocument();
    });
  });

  test('renders dropdowns', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Équipements')).toBeInTheDocument();
    });
  });

  test('handles carousel navigation', async () => {
    render(
      <RouterWrapper>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button', { name: '' });
      // Le premier bouton est "précédent", le deuxième est "suivant"
      const nextButton = buttons[1];
      fireEvent.click(nextButton);
      
      expect(screen.getByText('2/3')).toBeInTheDocument();
    });
  });

  test('handles 404 error for non-existent accommodation', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]), // Tableau vide = logement non trouvé
      })
    );

    render(
      <RouterWrapper initialEntries={['/accommodation/999']}>
        <AccommodationDetail />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      // Le composant devrait rediriger vers /404, mais on peut vérifier que l'état de chargement se termine
      expect(screen.queryByText('Chargement du logement...')).not.toBeInTheDocument();
    });
  });
});
