import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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
    
    // Attendre la fin de l'animation avec act()
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 350));
    });
    
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

  test('handles undefined equipments prop', () => {
    render(
      <ApartmentDropdown 
        title="Description" 
      />
    );
    
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('handles null equipments prop', () => {
    render(
      <ApartmentDropdown 
        title="Description" 
        equipments={null}
      />
    );
    
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('uses default title when not provided', () => {
    render(
      <ApartmentDropdown 
        equipments={mockEquipments} 
      />
    );
    
    expect(screen.getByText('Équipements')).toBeInTheDocument();
  });

  test('applies large size class when size prop is "large"', () => {
    const { container } = render(
      <ApartmentDropdown 
        title="Test" 
        equipments={mockEquipments}
        size="large"
      />
    );
    
    const dropdown = container.querySelector('.apartment-dropdown');
    expect(dropdown).toHaveClass('apartment-dropdown--large');
  });

  test('opens dropdown when defaultOpen is true', () => {
    render(
      <ApartmentDropdown 
        title="Test" 
        equipments={mockEquipments}
        defaultOpen={true}
      />
    );
    
    // Le contenu doit être visible par défaut
    expect(screen.getByText('Climatisation')).toBeInTheDocument();
  });

  test('stays closed when defaultOpen is false', () => {
    render(
      <ApartmentDropdown 
        title="Test" 
        equipments={mockEquipments}
        defaultOpen={false}
      />
    );
    
    // Le contenu ne doit pas être visible
    expect(screen.queryByText('Climatisation')).not.toBeInTheDocument();
  });
});
