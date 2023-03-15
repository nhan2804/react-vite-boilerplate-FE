import { lazy } from "react";
const ProjectPage = lazy(() => import(".."));

const projectsRoutes = [
  {
    component: ProjectPage,
    path: "/projects",
    isPrivate: true,
  },
];
export default projectsRoutes;
