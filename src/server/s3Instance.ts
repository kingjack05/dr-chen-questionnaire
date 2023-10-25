import { S3Client } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
    endpoint: "https://s3.us-west-004.backblazeb2.com",
    region: "us-west-004",
    credentials: {
        accessKeyId:
            import.meta.env.AWS_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:
            import.meta.env.AWS_SECRET_ACCESS_KEY ??
            process.env.AWS_SECRET_ACCESS_KEY,
    },
})
