import ClientContentPage from '@/components/ClientContentPage';
import { promises as fs } from 'fs';
import path from 'path';

// This function runs ONLY on the server
async function getInitialData() {
  const filepath = path.join(process.cwd(), 'public', 'test_data.json');
  
  try {
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data); // Parse it right here on the server
  } catch (err) {
    console.error("--- ERROR READING FILE ---");
    console.error(err);
    // !! This is the crucial part: return null, not undefined
    return null; 
  }
}

// This is your main Server Component for the /content route
export default async function ContentPage() {
  
  // 2. Fetch the data on the server
  const initialData = await getInitialData();

  // 3. !! IMPORTANT: Check if data loading failed
  // This check prevents passing 'undefined' or 'null' to your client component
  if (!initialData) {
    return (
      <main className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-bold">Fehler beim Laden der Daten</h2>
        <p>Die Datei 'test_data.json' konnte nicht gefunden oder gelesen werden.</p>
        <p>Bitte überprüfen Sie die Konsole für mehr Details.</p>
      </main>
    );
  }

  // 4. If data is OK, render the Client Component and pass the data as a prop
  return <ClientContentPage initialData={initialData} />;
}