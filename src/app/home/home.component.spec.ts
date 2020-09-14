import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string): any {
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  function elAll(selector: string): any[] {
    return fixture.debugElement.nativeElement.querySelectorAll(selector);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the render the navigation list ' , () => {

    let pageList: any [] = elAll('mat-list-item');

    expect(pageList.length).toEqual(component.pageList.length);

  });

  it('should have correct value of url and text in the links ' , () => {

    let anchorList: HTMLAnchorElement [] = elAll('mat-list-item a ');

    console.log(anchorList);

    anchorList.forEach((anchor , index ) => {
      expect(anchor.innerText).toEqual(component.pageList[index].title);
    });

  });
});
