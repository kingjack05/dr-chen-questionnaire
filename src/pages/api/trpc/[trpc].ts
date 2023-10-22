import type { APIRoute } from "astro"
import { db } from "../../../server/db"

export const prerender = false

export const ALL: APIRoute = async ({ params, request }) => {
    const patients = await db.query.patient.findMany()
    return new Response(
        JSON.stringify({
            message: `This was a GET at ${params.trpc}`,
            patients: JSON.stringify(patients),
        }),
    )
}
