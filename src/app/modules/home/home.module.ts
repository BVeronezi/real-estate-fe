import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material.module";
import { Home } from "./home.component";
import { homeRoutes } from "./home.routing";

@NgModule({
    declarations: [Home],
    imports: [
        RouterModule.forChild(homeRoutes),
        MaterialModule
    ],
})
export class HomeModule { }
