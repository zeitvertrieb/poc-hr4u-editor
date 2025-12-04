'use client';

import Header from '@/components/Navigation/Header';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <div className="flex flex-col h-screen text-primary">
      <Header activeStep={1} />
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full h-full items-center p-8 lg:p-12">
          <div className="lg:w-3/5 w-full">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-zilla-slab">
              Arbeiter:innen-Profile mühelos für Ausschreibungen anpassen
            </h2>

            <h3 className="text-2xl font-semibold mb-3 font-zilla-slab">
              Über das Tool:
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              Der HR4U-Editor ermöglicht eine einfache Bearbeitung von
              Arbeiter:innen-Profilen, um sie für verschiedene Ausschreibungen
              anzupassen.
            </p>

            <h3 className="text-2xl font-semibold mb-3 font-zilla-slab">
              Wie es funktioniert:
            </h3>
            <ul className="list-disc list-outside pl-5 space-y-3 mb-6">
              <li>
                Laden Sie das gewünschte Arbeiter:innen-Profil von Maps herunter
                und laden Sie es hier als .json hoch. Sie werden dann
                automatisch weitergeleitet. Nach der Verarbeitung des Dokuments
                können Sie die einzelnen Abschnitte sehen und bearbeiten.
              </li>
              <li>
                Änderungen werden automatisch im Hintergrund und lokal
                gespeichert, sodass Sie problemlos zwischen den Seiten wechseln
                können, ohne Ihre Anpassungen zu verlieren.
              </li>
              <li>
                Am Ende haben Sie die Möglichkeit, eine Vorschau des
                bearbeiteten Dokuments zu sehen, bevor Sie es exportieren.
              </li>
              <li>
                Über den Header können Sie jederzeit zum vorherigen Schritt
                zurückkehren, ohne Ihren Fortschritt zu verlieren, solange kein
                neues Dokument hochgeladen wird.
              </li>
            </ul>

            <p className="mb-2">
              Kreiert von EBCONT. Bei Fragen oder Anliegen können Sie VORNAME
              NACHNAME (vorname.nachname@ebcont.com) kontaktieren
            </p>
            <p className="font-bold">
              Profile von Maps herunterladen:{' '}
              <a
                href="https://maps.ebcont.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-interactive font-normal underline hover:text-interactive-hover"
              >
                https://maps.ebcont.com/dashboard
              </a>
            </p>
          </div>

          <div className="lg:w-2/5 w-full mt-10 lg:mt-0">
            <FileUpload />
          </div>
        </div>
      </main>
    </div>
  );
}
