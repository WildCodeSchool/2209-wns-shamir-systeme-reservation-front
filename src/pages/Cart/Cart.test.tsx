import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Cart from './Cart';

describe("Cart", () => {
  it("should display title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Cart />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Mon panier/i)).toBeInTheDocument();
  });
});
