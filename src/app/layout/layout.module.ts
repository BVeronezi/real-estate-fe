import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { MaterialModule } from "../shared/material.module";

@NgModule({
    declarations: [NavigationComponent, ToolbarComponent],
    imports: [
        RouterModule,
        MaterialModule
    ],
    exports: [NavigationComponent, ToolbarComponent]
})
export class LayoutModule { }
