export const metadata = {
  title: "Aduanas Tools",
  description: "Herramientas aduaneras",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
