import "./globals.css";

export const metadata = {
  title: "SkySense - Weather Forecast",
  description: "SkySense provides real-time weather updates, accurate forecasts, and detailed climate information to help you plan your day. Stay informed with easy-to-use weather insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#111015]">
        {children}
      </body>
    </html>
  );
}
