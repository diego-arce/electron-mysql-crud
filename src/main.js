const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database')


async function createProduct(product) {
  try {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query('insert into product set ?', product);

    new Notification({
      title: 'Electron Mysql',
      body: 'New Product Saved Successfully'
    }).show();

    product.id = result.insertId;
    return product;

  } catch (error) {
    console.log(error);
  }

}

async function getProducts() {
  try {
    const conn = await getConnection();
    const result = await conn.query('select * from product order by id desc');
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const conn = await getConnection();
    const result = await conn.query('delete from product where id = ?', id);

    new Notification({
      title: 'Electron Mysql',
      body: 'Product Deleted Successfully'
    }).show();

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id){
  try {
    const conn = await getConnection();
    const result = await conn.query('select * from product where id = ?', id);
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(id, product) {
  try {
    const conn = await getConnection();
    const result = await conn.query('update product set ? where id = ?', [product, id]);

    new Notification({
      title: 'Electron Mysql',
      body: 'Product Updated Successfully'
    }).show();

    return result[0];
  } catch (error) {
    console.log(error);
  }
}

let window

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile('src/ui/index.html');
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
}