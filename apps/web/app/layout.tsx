import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaaS Marketing IA - Automatisation Marketing',
  description: 'Plateforme d\'automatisation marketing basée sur l\'IA pour les PME',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
