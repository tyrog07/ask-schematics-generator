import { New<%= classify(name) %>Component } from "./new-<%= classify(name) %>.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("New<%= classify(name) %>Component", () => {
  let component: New<%= classify(name) %>Component;
  let fixture: ComponentFixture<New<%= classify(name) %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [New<%= classify(name) %>Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(New<%= classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
