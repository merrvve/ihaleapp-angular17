import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';

@Injectable({
  providedIn: 'root'
})
export class CompareBidsService {
  compareBids!: TenderBid[];
  constructor() { }
}
