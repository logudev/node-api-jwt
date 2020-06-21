Simple Node JS API with dummy data, with use of JWT for API Authentication

API Details:

POST /api/auth => Public => Returns the Authorization token

GET /api/posts => Public => Returns dummy response

POST /api/posts => Private => Returns dummy response, if proper token is sent in Authorization: Bearer <token>, else error is returned. Token should be fetched from /api/auth POST API
