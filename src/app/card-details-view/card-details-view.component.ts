import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card-details-view',
  templateUrl: './card-details-view.component.html',
  styleUrls: ['./card-details-view.component.css']
})
export class CardDetailsViewComponent implements OnInit {
  private cardId: number;
  private card: Card;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private cardsService: CardsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cardId = params['id'];
      this.cardsService.getCard(this.cardId);
      this.cardsService._cardDetailsSubject.subscribe(card => {
        this.card = card;
      });
    });
  }

  back() {
    this.location.back();
  }

}
