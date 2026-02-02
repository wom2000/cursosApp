import "bootstrap/dist/css/bootstrap.min.css";
import "../css/app.css";
import "./bootstrap";
import "../css/auth.css";
import "../css/courses.css";
import "../css/PrimaryButton.css";
import "../css/SecondaryButton.css";
import "../css/Homepage.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

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
        color: "#6b1e6f",
    },
});
