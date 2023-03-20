import { Route } from "@angular/router";
import { PropertyFormComponent } from "./form/property-form.component";
import { PropertyComponent } from "./property.component";
import { PropertyResolver } from "./property.resolver";

export const propertyRoutes: Route[] = [
    {
        path: "",
        component: PropertyComponent,
    },
    {
        path: "form",
        resolve: { property: PropertyResolver },
        component: PropertyFormComponent,
    },
];
