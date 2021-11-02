import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number; 
  editedItem!: Ingredient;
  // @ViewChild('nameInput', {static: false}) nameInputRef!: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef!: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private lsService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.lsService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.lsService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingamon =  this.amountInputRef.nativeElement.value;
    const value = form.value; 
    const newIng = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.lsService.updateIng(this.editedItemIndex, newIng);
    }else{
      this.lsService.addIng(newIng);
      // this.ingredientAdded.emit(newIng);
    }
    this.editMode = false;
    form.reset();
    
 }

 onClear()
 {
   this.slForm.reset();
   this.editMode = false;
  }

  onDelete()
  {
    this.lsService.deleteIng(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
