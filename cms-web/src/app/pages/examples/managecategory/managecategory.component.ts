import { Component, OnInit, ViewChildren, QueryList, Inject, ViewChild } from '@angular/core';
import { ContentService } from '../managecontent/managecontent.service';
import { DecimalPipe } from '@angular/common';
import { Category } from './categorydto';
import { Observable } from 'rxjs';
import { NgbCategorySortableHeader, SortCategoryEvent } from './sortable.directive';
import { NgbContentSortableHeader } from '../managecontent/sortable.directive';
import { CategoryService } from './managecategory.service';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.scss'],
  providers: [CategoryService, DecimalPipe]
}) 
export class ManagecategoryComponent implements OnInit {
  focus1;
  //table work
  categories$: Observable<Category[]>;
  total$: Observable<number>;

  @ViewChildren(NgbCategorySortableHeader) headers: QueryList<NgbContentSortableHeader>;
  //end
  @ViewChild('myModalinfo') myModalinfo: ModalDirective;
  @ViewChild('myModaledit') myModaledit: ModalDirective;
  @ViewChild('myModalconfirm') myModalconfirm: ModalDirective;
  namevalue: "";
  myModalinform: string = "";
  category: Category = {id: 0, name: "" };


  selectedcategory : Category;

  constructor(public appservice: AppService, private http: HttpClient, @Inject(AppStore) public store: Store<AppState>, public service: CategoryService) {
    //table work
    this.categories$ = service.categories$;
    this.total$ = service.total$;
    //table work

    try {
      this.store.subscribe(() => this.updateState());

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

  updateState() {
    try {


    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }

  ngOnInit(): void {

  }

  onSort({column, direction}: SortCategoryEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onSubmit() {
    if(this.namevalue !== undefined && this.namevalue !== "")
    {
    let newcategory : Category = { name : this.namevalue};
    this.appservice.addnewCategory(newcategory, (result) => {
    this.myModalinform = (result) ? "Category added successfully" : "Error in adding category";
    this.myModalinfo.show();
    if(result)
    {
    this.namevalue = "";
    }
    });
    }
  }
  onDelete() {
    this.myModalconfirm.hide();

    this.appservice.deletecategory(this.selectedcategory.id, (result) => {
      this.myModalinform = (result) ? "Category deleted successfully" : "Error in deleting category";
      this.myModalinfo.show();
    });
  }

  showdialog(category : Category)
  {
    this.selectedcategory = category;
    this.myModalconfirm.show();
  }

  onSave() {
    this.appservice.updateCategories(this.category, (result) => {

     this.myModaledit.hide();
      this.myModalinform = (result) ? "Category saved successfully" : "Error in Saving Category";
      this.myModalinfo.show();
    });


  }

  onEdit(incategory: Category) {

    //update contentCopy
    this.category = {
      id: incategory.id,
      name: incategory.name
    }
    this.myModaledit.show();
  }


}
