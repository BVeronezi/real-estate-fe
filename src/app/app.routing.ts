import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./modules/home/home.module").then((m) => m.HomeModule),
      },

      {
        path: "property",
        loadChildren: () =>
          import("./modules/property/property.module").then(
            (m) => m.PropertyModule
          ),
      },
    ],
  },
]