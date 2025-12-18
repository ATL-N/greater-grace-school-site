import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { randomUUID } from 'crypto';
import { sanitizeFilename } from '@/lib/utils';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Initialize S3 client inside the handler
  const s3Client = new S3Client({
    region: process.env.B2_ENDPOINT.split('.')[1], // e.g., us-west-004
    endpoint: `https://${process.env.B2_ENDPOINT}`,
    credentials: {
      accessKeyId: process.env.B2_APPLICATION_KEY_ID,
      secretAccessKey: process.env.B2_APPLICATION_KEY,
    },
  });

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueFilename = `${randomUUID()}-${sanitizeFilename(file.name)}`;

    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: uniqueFilename,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    const publicUrl = `https://f003.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${uniqueFilename}`;
    
    // The API now returns the final public URL directly
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('UPLOAD API ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred during file upload.' },
      { status: 500 }
    );
  }
}
