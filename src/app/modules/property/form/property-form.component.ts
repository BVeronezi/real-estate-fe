import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from "src/app/services/property.service";
import { Masks, Utilitarios } from 'src/app/services/utilitarios.service';

@Component({
    selector: "property-form",
    templateUrl: "./property-form.component.html",
    styleUrls: ["./property-form.component.scss"]
})
export class PropertyFormComponent implements OnInit {
    loading = false;
    cepMask = Masks.cepMask;

    form = this.formBuilder.group({
        id: [''],
        tipo: ['', [Validators.required]],
        valor: [0, [Validators.required]],
        descricao: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        logradouro: ['', []],
        bairro: ['', []],
        localidade: ['', [Validators.required]],
        uf: ['', [Validators.required]],
    });

    constructor(
        private formBuilder: NonNullableFormBuilder,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location,
        private service: PropertyService,
    ) {

    }

    ngOnInit(): void {
        const property = this.route.snapshot.data['property'];
        this.form.patchValue(property)
    }

    onSubmit() {
        if (this.form.valid) {
            this.service.save(this.form.value)
                .subscribe(result => this.onSuccess(), error => this.onError());
        } else {
            Utilitarios.validateAllFormFields(this.form);
            this.snackBar.open("Por favor verifique o formulário!", 'OK', { duration: 3000 });
        }

    }

    private onSuccess() {
        this.snackBar.open('Propriedade salva com sucesso!', '', { duration: 5000 });
        this.onCancel();
    }

    private onError() {
        this.snackBar.open('Erro ao salvar propriedade.', '', { duration: 5000 });
    }

    onCancel() {
        this.location.back();
    }

    getCep() {
        const cep: any = this.form.value.cep;
        const cepValido = /^[0-9]{5}[-]?[0-9]{3}$/.test(cep);

        if (cepValido) {
            this.loading = true;
            this.service.searchCep(cep).subscribe((cep: any) => {
                this.loading = false;
                if (cep) {
                    this.form.controls.logradouro.setValue(cep.logradouro);
                    this.form.controls.bairro.setValue(cep.bairro);
                    this.form.controls.localidade.setValue(cep.localidade);
                    this.form.controls.uf.setValue(cep.uf);
                }
            });
        }
    }

    getErrorMessage(fieldName: string) {
        const field = this.form.get(fieldName);

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        return 'Campo Inválido';
    }
}