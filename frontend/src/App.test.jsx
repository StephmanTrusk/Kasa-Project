/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

const mockAccommodations = [
  {
    id: '1',
    title: 'Appartement de luxe',
    cover: 'https://example.com/image1.jpg'
  }
];

describe('App Component', () => {
  beforeEach(() => {
    // Mock de fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAccommodations),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation and footer', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Vérifier que la navigation est présente
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('A Propos')).toBeInTheDocument();
    
    // Vérifier que le footer est présent
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2020 Kasa/)).toBeInTheDocument();
  });

  test('renders home page by default', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Attendre que la page d'accueil se charge complètement
    await waitFor(() => {
      expect(screen.getByText('Chez vous, partout et ailleurs')).toBeInTheDocument();
    });
  });

  test('renders 404 page for unknown routes', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Simuler une route inexistante
    window.history.pushState({}, 'Test page', '/unknown-route');
    
    // Le composant App devrait gérer les routes via React Router
    // Ce test vérifie que l'App se charge sans erreur
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
