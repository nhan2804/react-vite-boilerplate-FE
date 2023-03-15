import authRoute from "@modules/auth/routes";
import projectsRoutes from "@modules/projects/routes";

const routes = [...authRoute, ...projectsRoutes];
export default routes;
