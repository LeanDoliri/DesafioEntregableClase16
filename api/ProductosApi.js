const ERROR = { error: "producto no encontrado" };

class ProductosApi {
  constructor() {
    this.products = [
        {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'},
        {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'},
        {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'}
    ];
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    const p = this.products.find((product) => product.id === id);
    if (p) {
      return p;
    }return ERROR;
  }

  create(p) {
    const arrayOfIds = this.products.map((product) => product.id);
    const maxId = arrayOfIds.length === 0 ? 0 : Math.max(...arrayOfIds);
    const id = maxId + 1;
    const newP = { id, ...p };
    this.products.push(newP);
  }

  updateById(id, p) {
    const foundP = this.products.find((product) => product.id === id);
    if (foundP) {
      const filteredProducts = this.products.filter((product) => product.id !== id);
      const newP = { id, ...p };
      this.products = [...filteredProducts, newP];
      return newP;
      }else {
        return ERROR;
      }
    }

  deleteById(id){
    const newProducts = this.products.filter(p => p.id != id);
    this.products = newProducts;
    return this.products;
  }
}

export default ProductosApi;