# API de Exercise

A API de Exercise é responsável pela criação, leitura, atualização e exclusão de exercícios físicos.

## Recursos

### Criar um exercício

Endpoint: `POST /exercise/create`

Cria um novo exercício.

#### Corpo da solicitação

| Campo         | Tipo    | Descrição                                      |
| ------------- | ------- | ---------------------------------------------- |
| name          | string  | Nome do exercício                              |
| target_muscle | string  | Grupo muscular alvo                            |
| machine       | string  | Equipamento utilizado para o exercício         |
| comment       | string  | Comentário sobre o exercício (opcional)         |
| reps          | number  | Número de repetições do exercício              |
| sets          | number  | Número de séries do exercício                  |
| restTime      | number  | Tempo de descanso entre as séries (em segundos) |

Exemplo de corpo da solicitação:
```json
{
  "name": "Supino Reto",
  "target_muscle": "Peitoral",
  "machine": "Banco de Supino",
  "comment": "Exercício para fortalecimento do peitoral",
  "reps": 10,
  "sets": 3,
  "restTime": 60
}
```

#### Resposta de sucesso

Código de status: `201 Created`

#### Resposta de erro

Código de status: `400 Bad Request`

---

### Obter todos os exercícios

Endpoint: `GET /exercise/getAll`

Obtém a lista de todos os exercícios cadastrados.

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
[
  {
    "id": "1",
    "name": "Supino Reto",
    "target_muscle": "Peitoral",
    "machine": "Banco de Supino",
    "comment": "Exercício para fortalecimento do peitoral",
    "reps": 10,
    "sets": 3,
    "restTime": 60
  },
  {
    "id": "2",
    "name": "Agachamento",
    "target_muscle": "Pernas",
    "machine": "Agachamento Livre",
    "reps": 12,
    "sets": 4,
    "restTime": 90
  }
]
```

#### Resposta de erro

Código de status: `500 Internal Server Error`

---

### Obter um exercício específico

Endpoint: `GET /exercise/get/:id`

Obtém os detalhes de um exercício específico.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição               |
| --------- | ------ | ----------------------- |
| id        | string | ID do exercício a obter |

Exemplo de solicitação:
```
GET /exercise/get/1
```

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
{
  "id": "1",
  "name": "Supino Reto",
  "target_muscle": "Peitoral",
  "machine": "Banco de Supino",
  "comment": "Exercício para fortalecimento do peitoral",
  "reps": 10,
  "sets": 3,
  "restTime": 60


}
```

#### Resposta de erro

Código de status: `404 Not Found`

---

### Excluir um exercício

Endpoint: `DELETE /exercise/delete`

Exclui um exercício.

#### Corpo da solicitação

| Campo | Tipo   | Descrição             |
| ----- | ------ | --------------------- |
| id    | string | ID do exercício a excluir |

Exemplo de corpo da solicitação:
```json
{
  "id": "1"
}
```

#### Resposta de sucesso

Código de status: `200 OK`

#### Resposta de erro

Código de status: `400 Bad Request`

---

### Atualizar um exercício

Endpoint: `PUT /exercise/update`

Atualiza os dados de um exercício.

#### Corpo da solicitação

| Campo         | Tipo    | Descrição                                      |
| ------------- | ------- | ---------------------------------------------- |
| id            | string  | ID do exercício a atualizar                    |
| name          | string  | Novo nome do exercício                          |
| target_muscle | string  | Novo grupo muscular alvo                       |
| machine       | string  | Novo equipamento utilizado para o exercício    |
| comment       | string  | Novo comentário sobre o exercício (opcional)    |
| reps          | number  | Novo número de repetições do exercício         |
| sets          | number  | Novo número de séries do exercício              |
| restTime      | number  | Novo tempo de descanso entre as séries (em segundos) |

Exemplo de corpo da solicitação:
```json
{
  "id": "1",
  "name": "Supino Inclinado",
  "target_muscle": "Peitoral",
  "machine": "Banco de Supino Inclinado",
  "comment": "Exercício para fortalecimento do peitoral superior",
  "reps": 12,
  "sets": 4,
  "restTime": 60
}
```

#### Resposta de sucesso

Código de status: `200 OK`

#### Resposta de erro

Código de status: `400 Bad Request`

---
