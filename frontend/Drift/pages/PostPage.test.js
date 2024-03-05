import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PostItemScreen from './PostPage';

describe('PostItemScreen', () => {
  it('should display error message when submitting with missing fields', async () => {
    const { getByTestId, getByText } = render(<PostItemScreen />);
    
    fireEvent.press(getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(getByText('Please upload an image and fill in all fields before submitting.')).toBeTruthy();
    });
  });

});

describe('PostItemScreen', () => {
  it('should display error message when submitting with negative price', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<PostItemScreen />);
    
    fireEvent.changeText(getByPlaceholderText(
      'Describe your item with information about the condition, size, color, and style.'), 'Sample description');
    fireEvent.changeText(getByPlaceholderText('Enter brand'), 'Sample brand');
    fireEvent.changeText(getByPlaceholderText('Enter price'), '-10');
    
    fireEvent(getByTestId('categoryChange'), 'handleCategoryChange', 'Shirt');
    
    fireEvent.press(getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(getByText('Please enter a positive number for the price.')).toBeTruthy();
    });
  });

});

describe('PostItemScreen', () => {
  it('should display error message when submitting with non number price', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<PostItemScreen />);
    
    fireEvent.changeText(getByPlaceholderText(
      'Describe your item with information about the condition, size, color, and style.'), 'Sample description');
    fireEvent.changeText(getByPlaceholderText('Enter brand'), 'Sample brand');
    fireEvent.changeText(getByPlaceholderText('Enter price'), 'Hello, World');
    
    fireEvent(getByTestId('categoryChange'), 'handleCategoryChange', 'Shirt');
    
    fireEvent.press(getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(getByText('Please enter a number for the price.')).toBeTruthy();
    });
  });

});