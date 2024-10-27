import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Teste se o título da página é renderizado corretamente
test("renders the title Cadastrar Produto", () => {
  render(<App />);
  const titleElement = screen.getByText(/Cadastrar Produto/i);
  expect(titleElement).toBeInTheDocument();
});

// Teste se o formulário contém os campos corretos
test("renders form with input fields", () => {
  render(<App />);

  // Verifica se o input de nome do produto existe
  const nomeInput = screen.getByLabelText(/Nome do Produto:/i);
  expect(nomeInput).toBeInTheDocument();

  // Verifica se o textarea de descrição do produto existe
  const descricaoInput = screen.getByLabelText(/Descrição:/i);
  expect(descricaoInput).toBeInTheDocument();

  // Verifica se o botão de cadastrar está presente
  const cadastrarButton = screen.getByText(/Cadastrar/i);
  expect(cadastrarButton).toBeInTheDocument();
});

// Teste se é possível adicionar um produto à lista
test("allows user to add a product to the list", () => {
  render(<App />);

  const nomeInput = screen.getByLabelText(/Nome do Produto:/i);
  const descricaoInput = screen.getByLabelText(/Descrição:/i);
  const cadastrarButton = screen.getByText(/Cadastrar/i);

  // Simula a inserção de um nome e descrição do produto
  fireEvent.change(nomeInput, { target: { value: "Produto Teste" } });
  fireEvent.change(descricaoInput, {
    target: { value: "Descrição do Produto Teste" },
  });

  // Simula o clique no botão de cadastrar
  fireEvent.click(cadastrarButton);

  // Verifica se o produto foi adicionado à lista
  const novoProduto = screen.getByText(/Produto Teste/i);
  expect(novoProduto).toBeInTheDocument();
});
