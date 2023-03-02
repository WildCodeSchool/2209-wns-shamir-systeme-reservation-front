import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Catalog from './Catalog';

describe("Catalog", () => {
  it("should display title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Catalog />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Catalogue/i)).toBeInTheDocument();
  });
});
