import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import SignIn from './SignIn';

describe("SignIn", () => {
  it("should display header title", async () => {
    render(
      <Provider store={store}>
        <MockedProvider addTypename={false}>
          <SignIn />
        </MockedProvider>,
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/Inscription/)).toBeInTheDocument();
  });
});
