import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {FactWsTo} from "./model";

@Injectable({
  providedIn: 'root'
})
export class FactService {

  constructor(private http: HttpClient) { }

  getFact(): Observable<FactWsTo> {
    // const params = new HttpParams().set("maxCharacters",maxCharacters); //Create new HttpParams
    return this.http.get<FactWsTo>("/api/facts", /*{params: params}*/).pipe(catchError(e => {
      const fact: FactWsTo = {
        fact: "Loading error!"
      }
      console.log(e)

      return of(fact);
    }));
  }

  getSavedFact(maxFacts: number): Observable<FactWsTo[]> {
    const params = new HttpParams().set("maxFacts",maxFacts); //Create new HttpParams
    return this.http.get<FactWsTo[]>("/api/saved-facts", {params: params}).pipe(catchError(e => {
      const facts: FactWsTo[] = []
      console.log(e)
      return of(facts);
    }));
  }

  saveFact(fact: string): Observable<boolean> {
    const factWsTo: FactWsTo = {
      fact: fact
    }
    return this.http.post<boolean>("/api/facts", factWsTo).pipe(catchError(e => {
      console.log(e)
      return of(false);
    }));
  }
}
