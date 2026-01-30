import "bootstrap/dist/css/bootstrap.min.css";
import "../css/app.css";
import "./bootstrap";
import "../css/auth.css";
import "../css/courses.css";
import "../css/PrimaryButton.css";
import "../css/SecondaryButton.css";
import "../css/Homepage.css";

import { createInertiaApp } from "@inertiajs/react";
import { createBrowserRouter} from 'react-router-dom'
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import CreateCourse from './Pages/Courses/CreateCourse'
import MainLayout from './Layouts/MainLayout'

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [

      { path: '/criar-curso', element:<CreateCourse/>},

    ]
  },
])

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
