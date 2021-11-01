import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef!: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef!: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private lsService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingamon =  this.amountInputRef.nativeElement.value;
    const newIng = new Ingredient(ingName,ingamon);
    // this.ingredientAdded.emit(newIng);
    this.lsService.addIng(newIng);

  }

}
