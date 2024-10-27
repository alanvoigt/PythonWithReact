# assistir esse vídeo https://www.youtube.com/watch?v=Z1RdTV72W6I
# Esse também https://github.com/aaronjolson/flask-pytest-example/blob/master/app.py

import pytest
from app_principal import appTest, produtos  # Ajuste o import de acordo com o nome do seu arquivo principal

@pytest.fixture
def client():
    appTest.config['TESTING'] = True
    with appTest.test_client() as client:
        # Limpa a lista de produtos antes de cada teste
        yield client

@pytest.fixture(autouse=True)
def limpar_produtos():
    # Esse fixture será executado automaticamente antes de cada teste para garantir que a lista de produtos esteja vazia.
    produtos.clear()

def test_cadastrar_produto(client):
    response = client.post('/cadastrar', json={
        'nome': 'Produto Teste',
        'descricao': 'Descrição Teste'
    })
    assert response.status_code == 201
    assert response.json == {'nome': 'Produto Teste', 'descricao': 'Descrição Teste'}

def test_listar_produtos(client):
    client.post('/cadastrar', json={
        'nome': 'Produto Teste',
        'descricao': 'Descrição Teste'
    })
    
    response = client.get('/produtos')
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['nome'] == 'Produto Teste'
    assert response.json[0]['descricao'] == 'Descrição Teste'