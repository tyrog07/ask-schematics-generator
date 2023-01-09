import { <%= classify(name) %>Service } from "./../../shared/services/firebase-api/<%=dasherize(name)%>.service";
import { New<%= classify(name) %>Component } from "./new-<%=dasherize(name)%>/new-<%=dasherize(name)%>.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";

import { SelectionModel } from "@angular/cdk/collections";
import { DialogService } from "../../components";
import * as _ from "lodash";
import { getPaginationOption } from "../../../utils/pageSizeOptions";
@Component({
  selector: "<%=dasherize(name)%>",
  templateUrl: "./<%=dasherize(name)%>.component.html",
  styleUrls: ["./<%=dasherize(name)%>.component.scss"],
})
export class <%= classify(name) %>Component implements OnInit {
  displayedColumns: string[] = ["check", "name", "zipcode", "value"];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageSizeop = getPaginationOption();

  constructor(
    private <%=dasherize(name)%>Service: <%= classify(name) %>Service,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.<%=dasherize(name)%>Service.getList().subscribe((result) => {
      this.dataSource = new MatTableDataSource(_.sortBy(result, "name"));

      this.pageSizeop = getPaginationOption(result.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(New<%= classify(name) %>Component, {
      width: "1000px",
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Added successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onUpdate(event) {
    const banner = this.selection.selected[0];
    this.selection.toggle(banner);
    const dialogRef = this.dialog.open(New<%= classify(name) %>Component, {
      width: "1000px",
      data: {
        isEdit: true,
        model: banner,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Edited successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onDelete() {
    const docId = this.selection.selected[0].docId;
    this.selection.toggle(this.selection.selected[0]);
    const dialogRef = this.dialogService.confirm(
      "Are you sure you want to delete?"
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.<%=dasherize(name)%>Service.delete(docId).then(() => this.bindData());
      }
    });
  }

  rowSelection(row) {
    this.selection.toggle(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
