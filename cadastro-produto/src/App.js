import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [produtos, setProdutos] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch para pegar os produtos
  useEffect(() => {
    fetch(`${backendUrl}/produtos`)
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, [backendUrl]);

  // Função para cadastrar um produto
  const cadastrarProduto = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, descricao }),
    })
      .then((response) => response.json())
      .then((novoProduto) => {
        setProdutos([...produtos, novoProduto]);
        setNome("");
        setDescricao("");
      })
      .catch((error) => console.error("Erro ao cadastrar produto:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={cadastrarProduto}>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Produtos Cadastrados:</h2>
      <ul>
        {produtos.map((produto, index) => (
          <li key={index}>
            <strong>Nome:</strong> {produto.nome} <br />
            <strong>Descrição:</strong> {produto.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
