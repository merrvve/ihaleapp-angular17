import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _items = new BehaviorSubject<MenuItem[]>([]);
  items$ = this._items.asObservable();

  constructor() { }

  setItems(newItems: MenuItem[]) {
    this._items.next(newItems);
  }


}
