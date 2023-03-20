import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';
import { Property } from '../modules/property/property.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    private readonly API = 'api/v1/property';
    private readonly API_ADDRESS = 'api/v1/address'

    constructor(private httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<Property[]>(`${environment.apiUrl}${this.API}`)
            .pipe(
                first(),
            );
    }

    loadById(id: string) {
        return this.httpClient.get<Property>(`${environment.apiUrl}${this.API}/${id}`);
    }

    save(record: Partial<Property>) {
        if (record.id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Property>) {
        return this.httpClient.post<Property>(`${environment.apiUrl}${this.API}`, record).pipe(first());
    }

    private update(record: Partial<Property>) {
        return this.httpClient.put<Property>(`${environment.apiUrl}${this.API}/${record.id}`, record).pipe(first());
    }

    remove(id: string) {
        return this.httpClient.delete(`${environment.apiUrl}${this.API}/${id}`).pipe(first());
    }

    searchCep(cep: string): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}${this.API_ADDRESS}/${cep}`);
    }
}