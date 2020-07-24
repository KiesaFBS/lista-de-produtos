import { ProductService } from "./../product.service";
import { Product } from "./../product.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[];
  dataSourceProduct;
  displayedColumns = [
    "id",
    "name",
    "price",
    "descricao",
    "desconto",
    "precoComDesconto",
    "action",
  ];

  @ViewChild("paginatorProduct") paginatorProduct: MatPaginator;

  constructor(private producService: ProductService) {}
  desconto(preco: number, desconto: number): number {
    return preco - preco * (desconto / 100);
  }

  corrigirDesconto(descontoE: number): number {
    if (descontoE == null) {
      return 0;
    } else {
      return descontoE;
    }
  }

  corrigiDescricao(descricaoE: string): string {
    if (descricaoE) {
      if (descricaoE.length > 139) {
        return descricaoE.substr(0, 139) + " ...";
      } else {
        return descricaoE;
      }
    } else {
      return "Descrição vazia!";
    }
  }

  ngOnInit(): void {
    this.producService.read().subscribe((products) => {
      this.products = products;
      this.dataSourceProduct = new MatTableDataSource(this.products);
      this.dataSourceProduct.paginator = this.paginatorProduct;
    });
  }
}
