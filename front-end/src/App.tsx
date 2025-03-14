import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layout/base-layout";
import { RecipesPage } from "./pages/recipes-page";
import { RecipePage } from "./pages/recipe-page";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <BaseLayout>
                  <Outlet />
                </BaseLayout>
              }
            >
              <Route index path="recipes" element={<RecipesPage />} />
              <Route path="recipe" element={<RecipePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/recipes" />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
