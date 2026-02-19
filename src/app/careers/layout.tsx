export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
