

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"],

})
export class ToolbarComponent {
    @Input() sidenav: any;

    constructor() {
    }
}