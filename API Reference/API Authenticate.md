# API de Autenticação

A API de Autenticação é responsável pelo processo de autenticação e geração de tokens de acesso.

## Recursos

### Autenticar usuário

Endpoint: `POST /user/login`

Autentica um usuário e gera um token de acesso.

#### Corpo da solicitação

| Campo    | Tipo    | Descrição                                  |
| -------- | ------- | ------------------------------------------ |
| email    | string  | E-mail do usuário (formato de e-mail válido) |
| password | string  | Senha do usuário                           |

Exemplo de corpo da solicitação:
```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

#### Resposta de sucesso

Código de status: `200 OK`

Exemplo de resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

O token de acesso gerado é retornado no campo "token" da resposta.

#### Resposta de erro

Código de status: `400 Bad Request`

---