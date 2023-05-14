import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FactService} from "./fact-service/fact.service";
import {map, Observable, take} from "rxjs";
import {FactWsTo} from "./fact-service/model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cat-facts-client';

  public maxLengthGroup: FormGroup;
  public currentFact = "";
  public isLoading = true;
  public savedFacts: FactWsTo[] = [];
  public savedFactsAreLoading = true;

  constructor(private fb: FormBuilder,
              private factService: FactService) {
    this.maxLengthGroup = this.fb.group({});

    this.refreshCatFact();
    this.loadSavedFacts();
  }

  public refreshCatFact(){
    this.isLoading = true;
    this.factService.getFact().subscribe( response => {
      this.currentFact = response.fact;
      this.isLoading = false;
    });
  }

  private loadSavedFacts(){
    this.savedFactsAreLoading = true;
    this.factService.getSavedFact(10).subscribe(response => {
      this.savedFacts = response;
      this.savedFactsAreLoading = false;
    })
  }

  public saveFact() {
    console.log(this.currentFact);
    this.factService.saveFact(this.currentFact).subscribe( response => {
      if (response){
        this.loadSavedFacts();
      }
    });
  }
}
