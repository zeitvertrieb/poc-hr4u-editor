import Header from "@/components/Header"
import FileUpload from "@/components/FileUpload";
import { promises as fs } from 'fs';
import path from 'path';

async function readFile() {
  try {
    const filepath = path.join(process.cwd(), 'public', 'test_data.json')
    const data = await fs.readFile(filepath, 'utf8');
    return data
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

export default async function Home() {
  let data = await readFile()
  data = JSON.parse(data)
  return (
    // The h-screen and flex-col are correct
    <div className="flex flex-col h-screen bg-white">
      <Header activeStep={1} />
      
      {/* FIX 1: Removed "h-full". 
        "flex-1" is all you need to fill the remaining space without scrolling.
      */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {/* FIX 2:
          - Added "h-full" here to make this container fill the <main> area.
          - Added "items-center" to vertically center the columns.
          - Removed invalid "justify-items-center" and "align-items-center".
        */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full h-full items-center p-8 lg:p-12">
          
          {/* FIX 3: 
            - Removed "h-full", "flex", "justify-center", "align-center".
            - The parent "items-center" now handles the vertical alignment.
          */}
          <div className="lg:w-3/5 w-full">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-zilla-slab">
              Arbeiter:innen-Profile mühelos für Ausschreibungen anpassen
            </h2>
            
            {/* ... (rest of your text content) ... */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Über das Tool:</h3>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Der HR4U-Editor ermöglicht eine einfache Bearbeitung von Arbeiter:innen-Profilen, um sie für verschiedene Ausschreibungen anzupassen.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Wie es funktioniert:</h3>
            <ul className="list-disc list-outside pl-5 space-y-3 text-gray-700 mb-6">
              <li>
                Laden Sie das gewünschte Arbeiter:innen-Profil von Maps herunter und laden Sie es hier als .docx hoch. Klicken Sie auf "Weiter", wenn Sie bereit sind. Nach der Verarbeitung des Dokuments können Sie die einzelnen Abschnitte sehen und bearbeiten.
              </li>
              <li>
                Änderungen werden automatisch im Hintergrund und lokal gespeichert, sodass Sie problemlos zwischen den Seiten wechseln können, ohne Ihre Anpassungen zu verlieren.
              </li>
              <li>
                Am Ende haben Sie die Möglichkeit, eine Vorschau des bearbeiteten Dokuments zu sehen, bevor Sie es exportieren.
              </li>
              <li>
                Über den Header können Sie jederzeit zum vorherigen Schritt zurückkehren, ohne Ihren Fortschritt zu verlieren, solange kein neues Dokument hochgeladen wird.
              </li>
            </ul>

            <p className="text-gray-700 mb-2">
              Kreiert von EBCONT. Bei Fragen oder Anliegen können Sie VORNAME NACHNAME (vorname.nachname@ebcont.com) kontaktieren
            </p>
            <p className="text-gray-700">
              Profile von Maps herunterladen: <a 
                href="https://maps.ebcont.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-indigo-700"
              >
                https://maps.ebcont.com/dashboard
              </a>
            </p>
          </div>

          {/* FIX 4:
            - Removed "h-full", "flex", "flex-col", and invalid classes.
            - The parent "items-center" handles vertical alignment.
          */}
          <div className="lg:w-2/5 w-full mt-10 lg:mt-0">
            <FileUpload />
          </div>

        </div>
      </main>
    </div>
  )
}
