import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock des données d'API
const mockAccommodations = [
  {
    id: '1',
    title: 'Appartement de luxe',
    cover: 'https://example.com/image1.jpg'
  },
  {
    id: '2',
    title: 'Studio moderne',
    cover: 'https://example.com/image2.jpg'
  }
];

// Wrapper pour les tests avec Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Home Page', () => {
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

  test('renders loading state initially', () => {
    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Chargement des logements...')).toBeInTheDocument();
  });

  test('renders banner with correct title', async () => {
    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Chez vous, partout et ailleurs')).toBeInTheDocument();
    });
  });

  test('renders accommodation cards after loading', async () => {
    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Appartement de luxe')).toBeInTheDocument();
      expect(screen.getByText('Studio moderne')).toBeInTheDocument();
    });
  });

  test('renders all accommodation cards', async () => {
    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(2);
    });
  });

  test('handles API error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    );

    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Erreur:/)).toBeInTheDocument();
    });
  });

  test('calls API on component mount', () => {
    render(
      <RouterWrapper>
        <Home />
      </RouterWrapper>
    );
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/properties');
  });
});
