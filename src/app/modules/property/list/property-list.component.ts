import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from '../property.model';

@Component({
    selector: 'property-list',
    templateUrl: './property-list.component.html',
})
export class PropertyListComponent implements OnInit {

    @Input() property: Property[] = [];
    @Output() add = new EventEmitter(false);
    @Output() edit = new EventEmitter(false);
    @Output() remove = new EventEmitter(false);

    readonly displayedColumns = ['tipo', 'descricao', 'valor', 'actions'];

    constructor() { }

    ngOnInit(): void {
        console.log(this.property)
    }

    onAdd() {
        this.add.emit(true);
    }

    onEdit(property: Property) {
        this.edit.emit(property);
    }

    onDelete(property: Property) {
        this.remove.emit(property);
    }

}