'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ClientContentPage from './ClientContentPage';

function ContentPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'profile';
  const edit = searchParams.get('edit') === 'true';

  return <ClientContentPage currentSection={section} isEditing={edit} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentPage />
    </Suspense>
  );
}
