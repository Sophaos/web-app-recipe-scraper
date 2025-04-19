import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layout/base-layout";
import { RecipesPage } from "./pages/recipes-page";
import { RecipePage } from "./pages/recipe-page";
import { SnackbarProvider } from "notistack";
import { CollectionsPage } from "./pages/collections-page";
import { CollectionPage } from "./pages/collection-page";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider />
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
              <Route index path="collections" element={<CollectionsPage />} />
              <Route index path="collection/:id" element={<CollectionPage />} />
              <Route path="recipe/:id" element={<RecipePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/recipes" />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
