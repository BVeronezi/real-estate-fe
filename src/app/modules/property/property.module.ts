import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PropertyFormComponent } from "./form/property-form.component";
import { propertyRoutes } from "./property.routing";
import { PropertyComponent } from "./property.component";
import { PropertyListComponent } from "./list/property-list.component";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { MaterialModule } from "src/app/shared/material.module";
import { NgxLoadingModule } from "ngx-loading";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [PropertyComponent, PropertyFormComponent, PropertyListComponent],
    imports: [
        RouterModule.forChild(propertyRoutes),
        MaterialModule,
        NgxLoadingModule
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ]
})
export class PropertyModule { }
