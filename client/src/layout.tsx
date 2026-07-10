import { createBrowserRouter } from "react-router-dom";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
]);
