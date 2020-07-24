import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/components/product/product.service";
import { Router } from "@angular/router";
import { Product } from "src/app/components/product/product.model";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-desconto-dialog",
  templateUrl: "./desconto-dialog.component.html",
  styleUrls: ["./desconto-dialog.component.css"],
})
export class DescontoDialogComponent implements OnInit {
  product: Product;
  dialogRef;
  update: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  confirmarEnvio(product: Product): void {
    if (this.update == true) {
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage("Produto atualizado com sucesso!");
        this.router.navigate(["/products"]);
        this.dialogRef.close();
      });
    } else {
      this.productService.create(this.product).subscribe(() => {
        this.productService.showMessage("Produto criado!");
        this.router.navigate(["/products"]);
        this.dialogRef.close();
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
