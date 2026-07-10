import { RouterProvider } from "react-router-dom";
import { route } from "./layout";

export default function () {
  return <RouterProvider router={route} />;
}
