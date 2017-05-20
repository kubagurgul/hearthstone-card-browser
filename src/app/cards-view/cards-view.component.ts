import { CardsService } from './../services/cards.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs'

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css']
})
export class CardsViewComponent implements OnInit {
  @ViewChild('searchBox')
  searchBox: ElementRef;
  searchPhrase: string;

  cards: Subject<Card[]>;

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    console.log("on Init");
    this.cards = this.cardsService.cardsSubject;
    this.cardsService.getCards();
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchBox.nativeElement, 'keyup')
    .map(() => this.searchBox.nativeElement.value)
    .debounceTime(1000)
    .distinctUntilChanged()
    .subscribe(phrase => this.search(phrase));
  }

  search(phrase) {
    this.cardsService.searchCards(phrase);
  }

  resolveClassName(card: Card) : string {
    let className: string = 'card';
    return className.concat(" ", card.rarity.toLowerCase());
  }

}
