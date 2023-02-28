import { Component, Input } from "@angular/core";

@Component({
    selector: "item-count",
    templateUrl: "./item-count.component.html"
})
export class ItemCountComponent{
    @Input() label : string = "";
    @Input() count? : number ;
}