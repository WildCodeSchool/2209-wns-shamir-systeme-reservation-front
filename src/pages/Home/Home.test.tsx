import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Home from './Home';

describe("Home", () => {
  it("should display header title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <Home />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Renting Skis has never been easier before !/i)).toBeInTheDocument();
  });
});
