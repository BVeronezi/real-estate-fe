import { Component, OnInit } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { PropertyService } from "src/app/services/property.service";
import { Property } from "./property.model";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "src/app/shared/components/dialogs/confirmation/confirmation-dialog.component";
import { ErrorDialogComponent } from "src/app/shared/components/dialogs/error/error-dialog.component";

@Component({
    selector: "property",
    templateUrl: "./property.component.html",
    styleUrls: ["./property.component.scss"]
})
export class PropertyComponent implements OnInit {
    property$: Observable<Property[]> | null = null;

    constructor(
        private properyService: PropertyService,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.refresh()
    }

    refresh() {
        this.property$ = this.properyService.list()
            .pipe(
                catchError(error => {
                    this.onError('Erro ao carregar propriedades.');
                    return of([])
                })
            );
    }

    onError(errorMsg: string) {
        this.dialog.open(ErrorDialogComponent, {
            data: errorMsg
        });
    }

    ngOnInit(): void { }

    onAdd() {
        this.router.navigate(["/property/form"]);
    }

    onEdit(property: Property) {
        this.router.navigate(["/property/form", { id: property.id }]);
    }

    onRemove(property: Property) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: 'Tem certeza que deseja remover essa propriedade?',
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.properyService.remove(property.id).subscribe(
                    () => {
                        this.refresh();
                        this.snackBar.open('Propriedade removida com sucesso!', 'X', {
                            duration: 5000,
                            verticalPosition: 'top',
                            horizontalPosition: 'center'
                        });
                    },
                    () => this.onError('Erro ao tentar remover propriedade.')
                );
            }
        });
    }
}