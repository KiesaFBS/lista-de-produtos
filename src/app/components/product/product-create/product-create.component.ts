import { Product } from "./../product.model";
import { ProductService } from "./../product.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { DescontoDialogComponent } from "../../template/dialogs/desconto-dialog/desconto-dialog.component";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: "",
    descricao: "",
    desconto: null,
    price: null,
  };
  dialogRef;
  update: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  createProduct(product: Product): void {
    if (this.product.desconto > 100 || this.product.desconto < 0) {
      this.productService.showMessage("O desconto dever ser entre 0 e 100!");
    } else {
      if (this.product.desconto == 100) {
        this.dialogRef = this.dialog.open(DescontoDialogComponent, {
          width: "500px",
        });
        let instance = this.dialogRef.componentInstance;
        instance.product = this.product;
        instance.dialogRef = this.dialogRef;
        instance.update = false;
      } else {
        this.productService.create(this.product).subscribe(() => {
          this.productService.showMessage("Produto criado!");
          this.router.navigate(["/products"]);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
