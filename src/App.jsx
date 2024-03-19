import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorites, Home, MainLayout } from "./pages";
import { ThemeProvider } from "./context/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") ?? "light"
  );
  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("light", "dark");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <QueryClientProvider client={queryClient} staleTime={60 * 60 * 2}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
