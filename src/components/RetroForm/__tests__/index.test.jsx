/* eslint-disable react/react-in-jsx-scope */
import { render, fireEvent } from '@testing-library/react';
import RetroForm from '../index';
import '@testing-library/jest-dom';

describe('RetroForm', () => {
  it('renders RetroForm without crashing', () => {
    render(<RetroForm />);
  });
  it('should display upload image section', () => {
    const { getByTestId } = render(<RetroForm />);
    expect(getByTestId('retro-form')).toHaveTextContent('Upload Retro Board Images');
  });
  it('should display title input', () => {
    const { getByTestId } = render(<RetroForm />);
    const titleInput = getByTestId('retro-title');
    expect(titleInput).toHaveAttribute('placeholder', 'Retro Board Title');
    fireEvent.change(titleInput, { target: { value: 'My Retro Board' } });
    expect(titleInput.value).toBe('My Retro Board');
  });
  //   it('should display action item input', () => {
  //     const { getByTestId } = render(<RetroForm />);
  //     const actionItemInput = getByTestId('action-item-input');
  //     expect(actionItemInput).toHaveAttribute('placeholder', 'Action Item');
  //     fireEvent.change(actionItemInput, { target: { value: 'My Action Item' } });
  //     expect(actionItemInput.value).toBe('My Action Item');
  //   });

  it('should submit the form when clicking the submit button', () => {
    const { getByTestId } = render(<RetroForm />);
    const submitButton = getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('Submit');
  });
  // snapshot test
  it('should match the snapshot', () => {
    const { asFragment } = render(<RetroForm />);
    expect(asFragment()).toMatchSnapshot();
  });
  //   it('should cancel the form when clicking the cancel button', () => {
  //     const { getByTestId } = render(<RetroForm />);
  //     const cancelButton = getByTestId('cancel-button');
  //     fireEvent.click(cancelButton);
  //     expect(cancelButton).toBeTruthy();
  //   });
  // it('should delete the action item when clicking on it', () => {
  //   const deleteEntry = jest.fn();

  //   // Render the component with a test action item
  //   const { getAllByTestId, getByTestId } = render(
  //     <RetroForm actions={[{ id: 1, name: 'Test action item' }]} deleteEntry={deleteEntry} />
  //   );

  //   // Find and click the action item
  //   const actionItem = getAllByTestId('action-list')[0]);
  //   fireEvent.click(actionItem);
  //   // console.log(actionItem);
  //   // Verify that deleteEntry has been called with the correct argument
  //   expect(deleteEntry).toHaveBeenCalledWith('Test action item');

  //   // Verify that the action item has been removed from the state
  //   const updatedActions = getByTestId('action-lists').children;
  //   expect(updatedActions).toHaveLength(0);
  // });

  it('should reset name and toggle button click state when the add item button is clicked', () => {
    // Mock setName and setButtonClick
    const setName = jest.fn();
    const setButtonClick = jest.fn();

    // Render the component with the mock functions
    const { getByText } = render(<RetroForm setName={setName} setButtonClick={setButtonClick} />);

    // Find the add item button and click it
    const addItemButton = getByText('+ Add an item');
    fireEvent.click(addItemButton);

    // Check that setName and setButtonClick have been called with the correct arguments
    expect(setName).toHaveBeenCalledWith('');
    expect(setButtonClick).toHaveBeenCalledWith(true);
  });
});
