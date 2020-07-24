import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../product.model";
import { MatDialog } from "@angular/material/dialog";
import { DescontoDialogComponent } from "../../template/dialogs/desconto-dialog/desconto-dialog.component";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product;
  dialogRef;
  update: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(): void {
    if (this.product.desconto < 0 || this.product.desconto > 100) {
      this.productService.showMessage("O desconte deve ser entre 0 e 100!");
    } else {
      if (this.product.desconto == 100) {
        this.dialogRef = this.dialog.open(DescontoDialogComponent, {
          width: "500px",
        });
        let instance = this.dialogRef.componentInstance;
        instance.product = this.product;
        instance.dialogRef = this.dialogRef;
        instance.update = true;
      } else {
        this.productService.update(this.product).subscribe(() => {
          this.productService.showMessage("Produto atualizado com sucesso!");
          this.router.navigate(["/products"]);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
