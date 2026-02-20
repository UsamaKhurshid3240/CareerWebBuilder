export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f4f5f7' }}>
        {children}
      </body>
    </html>
  );
}
