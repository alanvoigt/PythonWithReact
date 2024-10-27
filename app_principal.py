from flask import Flask, jsonify, request
from flask_cors import CORS

appTest = Flask(__name__)
CORS(appTest, resources={r"/*": {"origins": "*"}})  # Permite todas as origens

produtos = []

@appTest.route('/limpar', methods=['DELETE'])
def limpar_produtos():
    # global produtos
    print(f"Antes de limpar: {produtos}")  # Loga os produtos antes de limpar
    produtos.clear()
    print(f"Depois de limpar: {produtos}")  # Loga os produtos após limpar
    return jsonify({'message': 'Lista de produtos limpa'}), 200

@appTest.route('/produtos', methods=['GET'])
def listar_produtos():
    return jsonify(produtos)

@appTest.route('/cadastrar', methods=['POST'])
def cadastrar_produto():
    data = request.json
    nome_produto = data.get('nome')
    descricao_produto = data.get('descricao')

    if nome_produto and descricao_produto:
        novo_produto = {'nome': nome_produto, 'descricao': descricao_produto}
        produtos.append(novo_produto)
        return jsonify(novo_produto), 201

    return jsonify({'error': 'Nome e descrição são obrigatórios'}), 400

if __name__ == '__main__':
    appTest.run(debug=True)
