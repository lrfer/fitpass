# API de User

A API de User é responsável pelo gerenciamento de usuários.

## Recursos

### Criar um usuário

Endpoint: `POST /user/create`

Cria um novo usuário.

#### Corpo da solicitação

| Campo     | Tipo    | Descrição                                  |
| --------- | ------- | ------------------------------------------ |
| name      | string  | Nome do usuário                            |
| email     | string  | E-mail do usuário (formato de e-mail válido) |
| password  | string  | Senha do usuário (mínimo de 6 caracteres)   |
| phone     | string  | Número de telefone do usuário              |
| birthday  | date    | Data de nascimento do usuário               |

Exemplo de corpo da solicitação:
```json
{
  "name": "João Silva",
  "email": "johndoe@example.com",
  "password": "123456",
  "phone": "1234567890",
  "birthday": "1990-01-01"
}
```

#### Resposta de sucesso

Código de status: `201 Created`

#### Resposta de erro

Código de status: `400 Bad Request`

---

### Obter todos os usuários

Endpoint: `GET /users`

Obtém a lista de todos os usuários cadastrados.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição               |
| --------- | ------ | ----------------------- |
| email     | string | E-mail do usuário a obter |
| name      | string | Nome do usuário a obter  |

Exemplo de solicitação:
```
GET /users?email=johndoe@example.com&name=John%20Doe
```

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
[
  {
    "name": "João Silva",
    "email": "johndoe@example.com",
    "phone": "1234567890",
    "birthday": "1990-01-01"
  }
]
```

#### Resposta de erro

Código de status: `400 Bad Request`

---

### Excluir um usuário

Endpoint: `DELETE /users/:email`

Exclui um usuário pelo seu e-mail.

#### Parâmetros da solicitação

| Parâmetro | Tipo   | Descrição               |
| --------- | ------ | ----------------------- |
| email     | string | E-mail do usuário a excluir |

Exemplo de solicitação:
```
DELETE /users/johndoe@example.com
```

#### Resposta de sucesso

Código de status: `201 Created`

#### Resposta de erro

Código de status: `400 Bad Request`

---
