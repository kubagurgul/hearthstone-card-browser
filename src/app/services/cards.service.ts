import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Http, RequestOptionsArgs, RequestOptions, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CardsService {
  apiUrl: string = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards';
  authorizationKey: string = 'EUQPKBcEzEmshar2kXunzVpn1IMqp1wTKgzjsnnxTUg696P78g';

  _cards: Card[];
  _cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(null);
  _cardDetailsSubject: Subject<Card> = new Subject<Card>();

  constructor(
    private http: Http
  ) { }

  getCards() {
    if (!this._cards) {
      let headers = new Headers();
      headers.append("X-Mashape-Authorization", this.authorizationKey);
      let req: RequestOptionsArgs = { headers: headers }
      this.http.get(this.apiUrl + "?collectible=1", req).subscribe((res: Response) => {
        let cards: Card[] = new Array<Card>();
        const responseObj = res.json();
        Object.keys(responseObj).forEach(key => {
          const specificCards = responseObj[key] as Card[];
          cards = cards.concat(specificCards);
        });
        this._cards = cards;
        this._cardsSubject.next(cards);
      });
    } else {
      this._cardsSubject.next(this._cards);
    }
  }

  getCard(id) {
    let headers = new Headers();
    headers.append("X-Mashape-Authorization", this.authorizationKey);
    let req: RequestOptionsArgs = { headers: headers }
    this.http.get(this.apiUrl + "/" + id, req).subscribe((res: Response) => {
      let cards: Card[] = new Array<Card>();
      const responseObj = res.json();
      Object.keys(responseObj).forEach(key => {
        const specificCards = responseObj[key] as Card[];
        cards = cards.concat(specificCards);
      });
      this._cardDetailsSubject.next(cards[0]);
    });
  }

  get cardsSubject(): BehaviorSubject<Card[]> {
    return this._cardsSubject;
  }

  searchCards(searchPhrase: string) {
    if (searchPhrase) {
      this._cardsSubject.next(this._cards.filter((card: Card) => card.name.toLowerCase().includes(searchPhrase.toLowerCase())));
    } else {
       this._cardsSubject.next(this._cards);
    }

  }
}
