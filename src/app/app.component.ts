import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged, throttleTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  query: string = "";
  result: any;
  apiUrl = "https://api.github.com/search/users?q=";
  searchForm = new FormGroup({
    search: new FormControl(""),
  });

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(
      map(change => change.search),
      filter(search => !!search),
      distinctUntilChanged(),
      throttleTime(300),
      switchMap(search => this.http.get(this.apiUrl + search))
    )
    .subscribe(res => {
        console.log(res);
        this.result = res["items"];
    });
  }
}
