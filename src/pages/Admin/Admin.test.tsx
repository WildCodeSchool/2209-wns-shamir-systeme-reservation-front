import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import AdminCategories from './AdminCategories';
import AdminCustomers from './AdminCustomers';
import AdminProducts from './AdminProducts';
import AdminReservations from './AdminReservations';

describe("Admin", () => {
  it("should display admin categories title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <AdminCategories />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Catégories/i)).toBeInTheDocument();
  });
  
  it("should display admin customers title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <AdminCustomers />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Client/)).toBeInTheDocument();
  });
  
  it("should display admin products title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <AdminProducts />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Produits/i)).toBeInTheDocument();
  });
  
  it("should display admin reservations title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <AdminReservations />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );
    
    const title = screen.getByRole('heading', {level: 1});
    expect (title).toBeInTheDocument();
    expect (title).toHaveTextContent(/Réservations/i);
  });
});
