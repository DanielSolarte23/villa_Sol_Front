// import "../../global.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-full box-border">
        {children}
      </body>
    </html>
  );
}
