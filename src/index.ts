import products from "./products.json"
import fs from "fs"
import orderBy from "lodash/orderBy"


class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(n: string) {
    super(n);

    const productsJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productosParseados = JSON.parse(productsJson);
    productosParseados.forEach(p => {
      this.addProduct(p);
    });
 }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.cosas.find(p => p.id === id)
  }

  removeProduct(id: number): Product {
    const productoEliminado = this.cosas.find(pEliminado => pEliminado.id === id)
    this.cosas = this.cosas.filter(pEliminar => pEliminar.id !== id)
    return productoEliminado;
  }

  getSortedByPrice(order: string): void {
   return orderBy(this.cosas, ["price"], [order]);
}
}


export { ListaDeProductos, Product };

