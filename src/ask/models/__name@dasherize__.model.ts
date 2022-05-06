import { Id } from "./common.model";

export class <%= classify(name) %>Model implements Id {
  public id: string;
  public name: string;
  public docId: string;
  public zipcode: number;
  public value: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.docId = model.docId;
    this.zipcode = model.zipcode;
    this.value = model.value;
  }
}

