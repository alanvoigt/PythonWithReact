const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  // Fazer a requisição para limpar os produtos
  await page.request.delete("http://localhost:5000/limpar");
});

test.describe("Testes do sistema de cadastro de produtos", () => {
  test("Deve cadastrar um produto com sucesso", async ({ page }) => {
    // Navega até a página inicial
    await page.goto("http://localhost:3000"); // Substitua com o endereço correto do seu frontend
    // Preenche o campo "Nome" do produto
    await page.locator('input[type="text"]').fill("Produto Teste");

    // Preenche o campo "Descrição" do produto
    await page.locator('textarea[required=""]').fill("Descrição Teste");

    // Clica no botão de cadastrar
    await page.click('button:has-text("Cadastrar")');

    // Verifica se o produto foi adicionado na lista
    await expect(page.locator("li")).toContainText("Produto Teste");
    await expect(page.locator("li")).toContainText("Descrição Teste");
  });

  test("Deve listar corretamente os produtos cadastrados", async ({ page }) => {
    // Navega até a página inicial
    await page.goto("http://localhost:3000");

    // Cadastrar o primeiro produto
    await page.locator('input[type="text"]').fill("Produto 1");
    await page.locator('textarea[required=""]').fill("Descrição 1");
    await page.click('button:has-text("Cadastrar")');

    // Cadastrar o segundo produto
    await page.locator('input[type="text"]').fill("Produto 2");
    await page.locator('textarea[required=""]').fill("Descrição 2");
    await page.click('button:has-text("Cadastrar")');

    // Verifica se os dois produtos aparecem na lista
    const produtos = await page.locator("li").allTextContents();
    expect(produtos).toContain("Nome: Produto 1 Descrição: Descrição 1");
    expect(produtos).toContain("Nome: Produto 2 Descrição: Descrição 2");
  });
});
