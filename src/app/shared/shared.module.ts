import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error/error-dialog.component';
import { MaterialModule } from './material.module';


@NgModule({
    declarations: [
        ErrorDialogComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    exports: [
        ErrorDialogComponent,
        ConfirmationDialogComponent,
    ]
})
export class SharedModule { }