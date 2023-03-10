import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const header = screen.getByText(/contact form/i);

  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const input = screen.getByLabelText(/first name*/i);

  //   const submit = screen.getByText(/submit/i);

  userEvent.type(input, "hi");
  //   userEvent.click(submit);

  const error = await screen.findByText(/error/i);

  expect(error).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submit = screen.getByText(/submit/i);
  userEvent.click(submit);

  const errorMessages = await screen.findAllByText(/error/i);

  expect(errorMessages).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name*/i);
  const lastNameInput = screen.getByLabelText(/last name*/i);
  userEvent.type(firstNameInput, "blake");
  userEvent.type(lastNameInput, "alderink");

  const submit = screen.getByText(/submit/i);
  userEvent.click(submit);
  const error = await screen.findByText(/error/i);

  expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email*/i);

  userEvent.type(emailInput, "hibutt");

  const emailError = await screen.findByText(
    /email must be a valid email address/i
  );

  expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const submit = screen.getByText(/submit/i);
  userEvent.click(submit);

  const lastNameError = await screen.findByText(
    /lastName is a required field/i
  );

  expect(lastNameError).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
