// src/infrastructure/swagger/auth.swagger.ts
import type { Application, Request, Response } from "express";
import * as swaggerUi from "swagger-ui-express";
// CommonJS require para evitar default import issues
const swaggerJsdoc: (
  opts: import("swagger-jsdoc").Options,
) => any = require("swagger-jsdoc");

export function setupSwagger(app: Application) {
  try {
    const PORT = process.env.PORT ?? "3001";
    const HOST = process.env.SWAGGER_HOST ?? "http://localhost";

    const options: import("swagger-jsdoc").Options = {
      definition: {
        openapi: "3.0.3",
        info: {
          title: "MercadoVerde - Auth API",
          version: "1.0.0",
          description:
            "Servicio de autenticación con separación de vistas por **admin** (creado automáticamente al arrancar) y **client** (registrados por formulario).",
        },
        servers: [{ url: `${HOST}:${PORT}` }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          schemas: {
            RegisterRequest: {
              type: "object",
              description:
                "Payload para registrar un nuevo cliente en la plataforma.",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  minLength: 3,
                  description: "Nombre completo del usuario.",
                  example: "Ricardo Pérez",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Correo electrónico único del usuario.",
                  example: "ricardo@example.com",
                },
                password: {
                  type: "string",
                  minLength: 6,
                  description:
                    "Contraseña segura con mínimo 6 caracteres (idealmente con mayúsculas, minúsculas y números).",
                  example: "123456",
                },
              },
            },

            // Login por email O por name
            LoginRequest: {
              description:
                "Permite iniciar sesión usando **email + password** o **name + password**.",
              oneOf: [
                {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      description: "Correo electrónico del usuario.",
                      example: "client@example.com",
                    },
                    password: {
                      type: "string",
                      minLength: 6,
                      description: "Contraseña del usuario.",
                      example: "123456",
                    },
                  },
                },
                {
                  type: "object",
                  required: ["name", "password"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Nombre de usuario (username).",
                      example: "clientuser",
                    },
                    password: {
                      type: "string",
                      minLength: 6,
                      description: "Contraseña del usuario.",
                      example: "123456",
                    },
                  },
                },
              ],
            },

            AccessTokenResponse: {
              type: "object",
              description:
                "Respuesta estándar de login con información del rol y el token de acceso.",
              properties: {
                role: {
                  type: "string",
                  enum: ["admin", "client"],
                  description: "Rol asociado al usuario autenticado.",
                  example: "client",
                },
                accessToken: {
                  type: "string",
                  description:
                    "JWT de acceso que debe enviarse en el header Authorization: Bearer <token>.",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },

            MessageResponse: {
              type: "object",
              description:
                "Respuesta simple con un mensaje informativo (éxito, error, etc.).",
              properties: {
                message: {
                  type: "string",
                  example: "User registered successfully",
                },
              },
            },
          },
        },

        tags: [{ name: "Auth", description: "Registro y login" }],

        paths: {
          "/auth/register": {
            post: {
              tags: ["Auth"],
              summary: "Registrar usuario (siempre como client)",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/RegisterRequest" },
                    // Body prellenado por defecto
                    example: {
                      name: "Ricardo Pérez",
                      email: "ricardo@example.com",
                      password: "123456",
                    },
                  },
                },
              },
              responses: {
                "201": {
                  description: "Usuario registrado correctamente",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/MessageResponse",
                      },
                    },
                  },
                },
                "400": { description: "Solicitud inválida (datos incorrectos o email duplicado)" },
              },
            },
          },

          "/auth/login/admin": {
            post: {
              tags: ["Auth"],
              summary:
                "Login del admin único (creado automáticamente en el bootstrap)",
              description:
                "Autentica al **super admin** usando email o name. El usuario admin se crea automáticamente al arrancar el servicio.",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/LoginRequest" },
                    // Body prellenado por defecto (admin)
                    example: {
                      email: "super@admin.com",
                      password: "P4ssw0rd!",
                    },
                  },
                },
              },
              responses: {
                "200": {
                  description: "Token de acceso para admin",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/AccessTokenResponse",
                      },
                      examples: {
                        adminExample: {
                          summary: "Respuesta típica para admin",
                          value: {
                            role: "admin",
                            accessToken:
                              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin...",
                          },
                        },
                      },
                    },
                  },
                },
                "401": { description: "Credenciales inválidas" },
              },
            },
          },

          "/auth/login/client": {
            post: {
              tags: ["Auth"],
              summary: "Login de cliente (usuarios registrados)",
              description:
                "Autentica a un usuario con rol **client** previamente registrado mediante `/auth/register`.",
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/LoginRequest" },
                    // Body prellenado por defecto (cliente)
                    example: {
                      email: "client@example.com",
                      password: "123456",
                    },
                  },
                },
              },
              responses: {
                "200": {
                  description: "Token de acceso para cliente",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/AccessTokenResponse",
                      },
                      examples: {
                        clientExample: {
                          summary: "Respuesta típica para cliente",
                          value: {
                            role: "client",
                            accessToken:
                              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.client...",
                          },
                        },
                      },
                    },
                  },
                },
                "401": { description: "Credenciales inválidas" },
              },
            },
          },
        },
      },
      apis: [],
    };

    const spec = swaggerJsdoc(options);

    app.get("/docs.json", (_req: Request, res: Response) => res.json(spec));
    app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(spec, {
        explorer: true,
        swaggerOptions: { persistAuthorization: true },
      }),
    );
  } catch (err) {
    console.error("[auth] Error montando Swagger:", err);
  }
}
