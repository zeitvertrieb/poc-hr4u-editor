import ClientPreviewPage from '@/components/Preview/ClientPreviewPage';
import { promises as fs } from 'fs';
import path from 'path';

// Server-side function
async function readFile() {
  try {
    const filepath = path.join(process.cwd(), 'public', 'test_data.json');
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data); // Parse it on the server
  } catch (err) {
    console.error("Error reading the file:", err);
    return null; // Handle errors
  }
}

// This is your main page component (a Server Component)
export default async function Preview() {
  // 1. Fetch data on the server
  const data = await readFile();

  if (!data) {
    return <main className="p-8">Error: Could not load initial data.</main>;
  }

  return <ClientPreviewPage data={data} />
}