/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-boolean-value */
import {
  render, screen, fireEvent, waitFor, debug, ReactDOM
} from '@testing-library/react';
import '@testing-library/jest-dom';

import RetroUpdate from '../index';

describe('RetroUpdate', () => {
  const mockProps = {
    id: 1,
    retroBoard: { title: 'Title', action_items: ['Item 1', 'Item 2'], image_path: 'https://example.com/image.jpg' },
    edit: false,
    setEdit: jest.fn(),
    click: false,
    setClick: jest.fn()
  };
  it('should updates the title correctly', () => {
    const { getByTestId } = render(<RetroUpdate {...mockProps} />);
    const titleInput = getByTestId('retro-title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput.value).toBe('New Title');
  });
  it('updates the action items correctly', () => {
    const { getAllByTestId } = render(<RetroUpdate {...mockProps} />);
    const actionItemInputs = getAllByTestId('action-item-input');
    fireEvent.change(actionItemInputs[0], { target: { value: 'Updated Item 1' } });
    expect(actionItemInputs[0].value).toBe('Updated Item 1');
    fireEvent.change(actionItemInputs[1], { target: { value: 'Updated Item 2' } });
    expect(actionItemInputs[1].value).toBe('Updated Item 2');
  });
  it('renders the correct image', () => {
    render(<RetroUpdate {...mockProps} />);
    expect(screen.getByTestId('retro-image')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
  it('renders the correct action items', () => {
    render(<RetroUpdate {...mockProps} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('renders the correct title', () => {
    render(<RetroUpdate {...mockProps} />);
    expect(screen.getByTestId('retro-title')).toHaveValue('Title');
  });
  it('renders the correct action item count', () => {
    render(<RetroUpdate {...mockProps} />);
    expect(screen.getByTestId('action-item-count')).toHaveTextContent('2');
  });
  it('renders the correct action item count when there is one action item', () => {
    const mockData = {
      id: 1,
      retroBoard: { title: 'Title', action_items: ['Item 1'], image_path: 'https://example.com/image.jpg' },
      edit: false,
      setEdit: jest.fn(),
      click: false,
      setClick: jest.fn()
    };

    const { getAllByTestId } = render(<RetroUpdate {...mockData} />);
    const actionItemInputs = getAllByTestId('action-item-input');
    fireEvent.change(actionItemInputs[0], { target: { value: '' } });
    expect(screen.getByTestId('action-item-count')).toHaveTextContent('1');
  });
  it('should close the update form when the cancel button is clicked', () => {
    const { getByTestId } = render(<RetroUpdate {...mockProps} />);
    const cancelButton = getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    expect(mockProps.setEdit).toHaveBeenCalledWith(true);
  });
  it('should close the update form when the close button is clicked', () => {
    jest.fn();
    const { getByTestId } = render(<RetroUpdate {...mockProps} />);
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockProps.setClick).toHaveBeenCalledWith(true);
  });
  it('should update the retro board when the update button is clicked', () => {
    const { getAllByTestId, getByTestId } = render(<RetroUpdate {...mockProps} />);
    jest.fn();
    const titleInput = getByTestId('retro-title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    const actionItemInputs = getAllByTestId('action-item-input');
    fireEvent.change(actionItemInputs[0], { target: { value: 'Updated Item 1' } });
    fireEvent.change(actionItemInputs[1], { target: { value: 'Updated Item 2' } });

    const updateButton = getByTestId('update-button');
    fireEvent.click(updateButton);
    expect(mockProps.setClick).toHaveBeenCalledWith(true);

    const mockData = {
      id: 1,
      retroBoard: { title: 'New Title', action_items: ['Updated Item 1', 'Updated Item 2'], image_path: 'https://example.com/image.jpg' },
      edit: false,
      setEdit: jest.fn(),
      click: false,
      setClick: jest.fn()
    };
    expect(mockProps).toHaveBeenCalledWith(mockData);
  });
});
