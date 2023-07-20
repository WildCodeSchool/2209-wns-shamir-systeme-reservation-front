import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Profile from './Profile';

describe('Profile', () => {

  it('Display the profile component and the modification modal', async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Profile />
        </MockedProvider>,
    </Provider>,
    { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Bonjour/i)).toBeInTheDocument();

    const editButton = screen.getByRole("button", {name : /Modifier le profil/i});
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.queryByText(/Modification du compte/i)).toBeInTheDocument();
    });
  });
  
  it('Display the profile page with title', async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Profile />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );
    
    expect(await screen.findByText(/Mes commandes/i)).toBeInTheDocument();

  });

  it('Open the modal to delete the account', async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Profile />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const deleteButton = screen.getByRole("button", {name : /Supprimer mon compte/i});
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Suppression du compte/i)).toBeInTheDocument();
    });
    
    const cancelButton = screen.getByRole("button", {name : /Annuler/i})
    fireEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/Suppression du compte/i)).not.toBeInTheDocument();
    });
  });
});