import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PropertyService } from 'src/app/services/property.service';

import { Property } from './property.model';

@Injectable({
    providedIn: 'root'
})
export class PropertyResolver implements Resolve<Property> {

    constructor(private service: PropertyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> {
        if (route.params && route.params['id']) {
            return this.service.loadById(route.params['id']);
        }
        return of({ id: '', descricao: '', valor: 0, tipo: '', cep: '', logradouro: '', bairro: '', localidade: '', uf: '' });
    }
}