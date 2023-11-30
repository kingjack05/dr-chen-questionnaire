import { createExpressMiddleware } from "@trpc/server/adapters/express"
import express from "express"
import swaggerUi from "swagger-ui-express"
import {
    createOpenApiExpressMiddleware,
    generateOpenApiDocument,
} from "trpc-openapi"

import { appRouter } from "./routerIndex"

// run this server with `npx vite-node ./src/server/apiDocs.ts`

const openApiDocument = generateOpenApiDocument(appRouter, {
    title: "Example CRUD API",
    description: "OpenAPI compliant REST API built using tRPC with Express",
    version: "1.0.0",
    baseUrl: "http://localhost:3000/api",
    docsUrl: "https://github.com/jlalmes/trpc-openapi",
    tags: ["diagnosisData"],
})
const app = express()

app.use("/", swaggerUi.serve)
app.get("/", swaggerUi.setup(openApiDocument))
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000")
})
