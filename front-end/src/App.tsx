import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { BaseLayout } from "./layout/base-layout";
import { RecipesPage } from "./pages/recipes-page";
import { RecipeDetailsPage } from "./pages/recipe-details-page";

function App() {
  return (
    <>
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
            <Route path="recipe-details" element={<RecipeDetailsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/recipes" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
