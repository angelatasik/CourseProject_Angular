import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class dropDownDirective {

   @HostBinding('class.open') isopen: boolean = false;

    @HostListener('click') toggleOpen(){ 
        this.isopen = !this.isopen;
    }
}