import { <%= classify(name) %>Service } from "./../../../shared/services/firebase-api/<%=dasherize(name)%>.service";
import { <%= classify(name) %>Model } from "./../../../shared/model/<%=dasherize(name)%>.model";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-new-<%=dasherize(name)%>",
  templateUrl: "./new-<%=dasherize(name)%>.component.html",
  styleUrls: ["./new-<%=dasherize(name)%>.component.scss"],
})
export class New<%= classify(name) %>Component implements OnInit {
  goodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private <%= classify(name) %>Service: <%= classify(name) %>Service,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<New<%= classify(name) %>Component>
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.goodForm = this.fb.group({
      name: ["", [Validators.required]],
      zipcode: ["", [Validators.required]],
      value: ["", [Validators.required]],
    });

    if (this.data.model) {
      this.goodForm.get("name").setValue(this.data.model.name);
      this.goodForm.get("zipcode").setValue(this.data.model.zipcode);
      this.goodForm.get("value").setValue(this.data.model.value);
    }
  }

  onSave() {
    const model = new <%= classify(name) %>Model();
    model.name = this.goodForm.controls.name.value;
    model.zipcode = this.goodForm.controls.zipcode.value;
    model.value = this.goodForm.controls.value.value;

    if (this.data.model) {
      model.docId = this.data.model.docId;
      this.<%= classify(name) %>Service.update(model).then(() => this.dialogRef.close(true));
    } else {
      this.<%= classify(name) %>Service.addModel(model).then(() => this.dialogRef.close(true));
    }
  }
}
