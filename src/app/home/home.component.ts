import { Component, OnInit } from '@angular/core';
import {Page} from "../models/page";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageList: Page[] = [
    {url:'' , title:"Sign in"}
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
