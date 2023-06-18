# API de Treinamento

A API de Treinamento é responsável pela criação, atualização e consulta de treinamentos.

## Recursos

### Criar um treinamento

Endpoint: `POST /training`

Cria um novo treinamento.

#### Corpo da solicitação

| Campo      | Tipo    | Descrição                                                         |
| ---------- | ------- | ----------------------------------------------------------------- |
| userId     | string  | ID do usuário associado ao treinamento                             |
| exercises  | object[] | Lista de exercícios a serem incluídos no treinamento (opcional)    |
| exercises[] | object  | Objeto representando um exercício                                 |
| exercises[].exerciseId | string | ID do exercício a ser incluído no treinamento                    |

Exemplo de corpo da solicitação:
```json
{
  "userId": "12345",
  "exercises": [
    {
      "exerciseId": "exercise1"
    },
    {
      "exerciseId": "exercise2"
    }
  ]
}
```

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
{
  "id": "12345",
  "userId": "12345",
  "exercises": [
    {
      "id": "exercise1",
      "name": "Exercise 1"
    },
    {
      "id": "exercise2",
      "name": "Exercise 2"
    }
  ]
}
```

O treinamento recém-criado é retornado no corpo da resposta, incluindo os detalhes do usuário associado e a lista de exercícios.

### Atualizar um treinamento

Endpoint: `PUT /training/:id`

Atualiza um treinamento existente.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição           |
| --------- | ------ | ------------------- |
| id        | string | ID do treinamento   |

#### Corpo da solicitação

A estrutura do corpo da solicitação é a mesma que a descrita para a criação de treinamento.

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
{
  "id": "12345",
  "userId": "12345",
  "exercises": [
    {
      "id": "exercise1",
      "name": "Exercise 1"
    },
    {
      "id": "exercise2",
      "name": "Exercise 2"
    }
  ]
}
```

O treinamento atualizado é retornado no corpo da resposta.

### Obter um treinamento

Endpoint: `GET /training/:id`

Recupera os detalhes de um treinamento específico.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição           |
| --------- | ------ | ------------------- |
| id        | string | ID do treinamento   |

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
{
  "id": "12345",
  "userId": "12345",
  "exercises": [
    {
      "id": "exercise1",
      "name": "Exercise 1"
    },
    {
      "id": "exercise2",
      "name": "Exercise 2"
    }
  ]
}
```

O treinamento solicitado é retornado no corpo da resposta.

### Obter todos

 os treinamentos

Endpoint: `GET /training`

Recupera uma lista de todos os treinamentos existentes.

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
[
  {
    "id": "12345",
    "userId": "12345",
    "exercises": [
      {
        "id": "exercise1",
        "name": "Exercise 1"
      },
      {
        "id": "exercise2",
        "name": "Exercise 2"
      }
    ]
  },
  {
    "id": "67890",
    "userId": "67890",
    "exercises": [
      {
        "id": "exercise3",
        "name": "Exercise 3"
      }
    ]
  }
]
```

Uma lista contendo todos os treinamentos existentes é retornada no corpo da resposta.

### Remover um treinamento

Endpoint: `DELETE /training/:id`

Remove um treinamento existente.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição           |
| --------- | ------ | ------------------- |
| id        | string | ID do treinamento   |

#### Resposta de sucesso

Código de status: `204 No Content`

---