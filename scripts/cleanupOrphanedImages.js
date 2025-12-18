import { PrismaClient } from '@prisma/client';
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.B2_ENDPOINT.split('.')[1],
  endpoint: `https://${process.env.B2_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
});

const BUCKET_NAME = process.env.B2_BUCKET_NAME;

async function cleanupOrphanedImages() {
  console.log('Starting orphaned image cleanup...');

  try {
    // 1. Get all image URLs from the database
    const dbImages = await prisma.image.findMany({
      select: { url: true },
    });
    const dbImageKeys = new Set(dbImages.map(img => img.url.substring(img.url.lastIndexOf('/') + 1)));
    console.log(`Found ${dbImageKeys.size} images in the database.`);

    // 2. List all objects in the Backblaze B2 bucket
    let continuationToken = undefined;
    const bucketFileKeys = new Set();
    do {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        ContinuationToken: continuationToken,
      });
      const response = await s3Client.send(command);
      response.Contents?.forEach(obj => bucketFileKeys.add(obj.Key));
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    console.log(`Found ${bucketFileKeys.size} files in the bucket.`);

    // 3. Identify orphaned files
    const orphanedKeys = [];
    for (const key of bucketFileKeys) {
      if (!dbImageKeys.has(key)) {
        orphanedKeys.push(key);
      }
    }

    console.log(`Found ${orphanedKeys.length} orphaned files to delete.`);

    // 4. Delete the orphaned files
    if (orphanedKeys.length > 0) {
      // DeleteObjectsCommand can handle up to 1000 keys at a time
      const chunkSize = 1000;
      for (let i = 0; i < orphanedKeys.length; i += chunkSize) {
        const chunk = orphanedKeys.slice(i, i + chunkSize);
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: BUCKET_NAME,
          Delete: {
            Objects: chunk.map(key => ({ Key: key })),
            Quiet: false,
          },
        });
        const deleteResponse = await s3Client.send(deleteCommand);
        console.log(`Deleted ${deleteResponse.Deleted?.length || 0} files.`);
        if (deleteResponse.Errors) {
          console.error('Errors during deletion:', deleteResponse.Errors);
        }
      }
    }

    console.log('Orphaned image cleanup finished successfully.');
  } catch (error) {
    console.error('An error occurred during orphaned image cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupOrphanedImages();
