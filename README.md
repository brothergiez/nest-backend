
# Prerequisite
- Installed Nodejs (>= v20.19.0)
- Installed NPM (>=10.8.2)
- Installed Mysql on your machine

# Installation
1. Clone the repository:
```bash
git clone https://github.com/brothergiez/nest-backend.git
cd nest-backend
```


2. Install Dependencies
```sh
npm install
```

3. Configure .env
```bash
cp .env.example .env
```
### Env details
```env
# Database URI
DATABASE_URL="mysql://user:password@localhost:3306/nest-backend"

# JWT Configuration
JWT_SECRET=this_is_my_secret
JWT_EXPIRES_IN=1d

# Server Port
APP_PORT=3000
```

4. Setup the database
Create a database named `nest-backend`, or you can adjust the database name according to your configuration in the .env file, and then run this command below:

```bash
npx prisma migrate dev --name create_table_user_and_transaction
npx prisma generate
```


# Running the App
Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

# API Endpoints
## Authentication

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| POST   | /auth/login    | User login.       |	No            |
| POST   | /auth/register | User registration | No            |


## Transactions
| Method | Endpoint                  | Description                 | Auth Required |
| ------ | ------------------------- | --------------------------- | ------------- |
| GET    | /transactions             | Get all user transactions   | Yes           |
| POST   | /transactions/process     | Create new transaction      | Yes           |
| POST   | /transactions/process/:id | Update existing transaction | Yes           |


# How to Use
## Authentication
1. Register a new user:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budi Darsono",
    "email": "Budi@example.com",
    "password": "SecurePassword123!"
  }'
```

Response Success:
```json
{
	"success": true,
	"message": "Registration successful",
	"data": {
		"id": "240417b1-4f2f-4378-a98f-1b2c3e92e759",
		"email": "budi@example.com"
	}
}
```

Response Failed:
```json
{
	"message": "Email already exists",
	"error": "Conflict",
	"statusCode": 409
}
```

2. Login User
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "budi@example.com",
    "password": "SecurePassword123!"
  }'
```

Response Success:
```json
{
	"success": true,
	"message": "Login successful",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJzdWIiOiI5MDVjM2U3YS0yMTQ2LTQ2MzgtOTE4Ny1jZDQwZTNiOWFkZmMiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI2OTQyNTAsImV4cCI6MTc1Mjc4MDY1MH0.1bJYJSq_CdYcs2Mjs58AmDu5QZOyM-ku8W4Ly36ALIc"
	}
}
```

Response Failed
```json
{
	"message": "Username or Password did not match!",
	"error": "Unauthorized",
	"statusCode": 401
}
```

## Transaction
1. Create transaction (with auth token)
```bash
curl -X POST http://localhost:3000/transactions/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": "150.50"
  }'
```

Response Success:
```json
{
	"success": true,
	"message": "Transaction created successfully",
	"data": {
		"id": "8c11a57a-a0b1-4d34-a794-e642208467c1",
		"user_id": "905c3e7a-2146-4638-9187-cd40e3b9adfc",
		"amount": "151.00",
		"created_at": "2025-07-16T19:34:11.580Z",
		"updated_at": "2025-07-16T19:34:11.580Z"
	}
}
```

Response Failed
```json
{
	"statusCode": 400,
	"message": [
		{
			"field": "amount",
			"message": "\"amount\" is not allowed to be empty"
		}
	],
	"error": "Bad Request"
}
```

2. Update transaction (with auth token)
```bash
curl -X POST http://localhost:3000/transactions/process/{TRANSACTION_ID} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": "200.00",
  }'
```

Response Success
```json
{
	"success": true,
	"message": "Transaction updated successfully",
	"data": {
		"id": "9f07c5b8-b04c-4065-af28-83b2ea3b1b01",
		"user_id": "905c3e7a-2146-4638-9187-cd40e3b9adfc",
		"amount": "21.00",
		"created_at": "2025-07-16T19:35:18.839Z",
		"updated_at": "2025-07-16T19:43:45.057Z"
	}
}
```

Response Failed
```json
{
	"message": "Transaction not found",
	"error": "Not Found",
	"statusCode": 404
}
```

2. Get all transactions
```bash
curl -X GET http://localhost:3000/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response Success
```json
{
	"success": true,
	"message": "Transactions retrieved successfully",
	"data": [
		{
			"id": "72f878c7-af32-4b7d-8970-fb2800c6bfd4",
			"user_id": "905c3e7a-2146-4638-9187-cd40e3b9adfc",
			"amount": "151.00",
			"created_at": "2025-07-16T19:41:07.489Z",
			"updated_at": "2025-07-16T19:41:07.489Z"
		},
		{
			"id": "9f07c5b8-b04c-4065-af28-83b2ea3b1b01",
			"user_id": "905c3e7a-2146-4638-9187-cd40e3b9adfc",
			"amount": "21.00",
			"created_at": "2025-07-16T19:35:18.839Z",
			"updated_at": "2025-07-16T19:43:45.057Z"
		}
	]
}
```

## Token Error Response 

Missing Token Header 
```json
{
	"message": "Unauthorized! Token not found",
	"error": "Unauthorized",
	"statusCode": 401
}
```

Invalid Token
```json
{
	"message": "Invalid Token",
	"error": "Unauthorized",
	"statusCode": 401
}
```

# Error Handling
```json
{
  "message": "Error description",
  "error": "Error type",
  "statusCode": 400,
}
```

Common error responses:

`400 Bad Request` - Validation errors
`401 Unauthorized` - Invalid/missing token
`404 Not Found` - Resource not found
`500 Internal Server Error` - Server errors



