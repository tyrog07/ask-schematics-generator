import { <%= classify(name) %>Model } from "./../../model/<%=dasherize(name)%>.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MyError } from "./my-error";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class <%= classify(name) %>Service extends BaseService<<%= classify(name) %>Model> {
  public isAuthenticated = false;

  constructor(public db: AngularFirestore, public myErr: MyError) {
    super(db, myErr, "<%=dasherize(name)%>");
  }
}
