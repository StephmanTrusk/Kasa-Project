import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApartmentDropdown from '../ApartmentDropdown';

describe('ApartmentDropdown Component', () => {
  const mockEquipments = [
    'Climatisation',
    'WiFi',
    'Cuisine équipée',
    'Parking'
  ];

  test('renders dropdown with title', () => {
    render(
      <ApartmentDropdown 
        title="Équipements" 
        equipments={mockEquipments} 
      />
    );
    
    expect(screen.getByText('Équipements')).toBeInTheDocument();
  });

  test('dropdown is closed by default', () => {
    render(
      <ApartmentDropdown 
        title="Équipements" 
        equipments={mockEquipments} 
      />
    );
    
    // Le contenu ne doit pas être visible
    expect(screen.queryByText('Climatisation')).not.toBeInTheDocument();
  });

  test('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ApartmentDropdown 
        title="Équipements" 
        equipments={mockEquipments} 
      />
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Le contenu doit maintenant être visible
    expect(screen.getByText('Climatisation')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });

  test('closes dropdown when clicked again', async () => {
    const user = userEvent.setup();
    
    render(
      <ApartmentDropdown 
        title="Équipements" 
        equipments={mockEquipments} 
      />
    );
    
    const button = screen.getByRole('button');
    
    // Ouvrir
    await user.click(button);
    expect(screen.getByText('Climatisation')).toBeInTheDocument();
    
    // Fermer
    await user.click(button);
    expect(screen.queryByText('Climatisation')).not.toBeInTheDocument();
  });

  test('renders all equipment items', async () => {
    const user = userEvent.setup();
    
    render(
      <ApartmentDropdown 
        title="Équipements" 
        equipments={mockEquipments} 
      />
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    mockEquipments.forEach(equipment => {
      expect(screen.getByText(equipment)).toBeInTheDocument();
    });
  });

  test('handles empty equipment list', () => {
    render(
      <ApartmentDropdown 
        title="Description" 
        equipments={[]} 
      />
    );
    
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
