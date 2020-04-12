
const { remote } = require('electron');
const main = remote.require('./main');

const productForm = document.getElementById('productForm');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products');

let products = [];
let editingStatus = false;
let editProductId = '';

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }

    if(!editingStatus) {
        const result = await main.createProduct(newProduct);
    } else {
        const result = await main.updateProduct(editProductId, newProduct);
        editingStatus = false;
        editProductId = '';    
    }

    getProducts();
    productForm.reset();
    productName.focus();
});

async function deleteProduct(id) {
    const response = confirm('Are your sure you want to delete it?');
    if (response) {
        await main.deleteProduct(id);
        await getProducts();
    }
    return;
}

async function editProduct(id) {
    const result = await main.getProductById(id);
    productName.value = result.name;
    productPrice.value = result.price;
    productDescription.value = result.description;
    
    editProductId=result.id;
    editingStatus=true;
}

async function renderProducts(products) {
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
        <div class="card card-body my-2 animated bounceIn">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
            <p>
                <button class="btn btn-danger" onClick="deleteProduct('${product.id}');">DELETE</button>
                <button class="btn btn-secondary" onClick="editProduct('${product.id}');">EDIT</button>
            </p>
        </div>
    `;
    })
}

const getProducts = async () => {
    const products = await main.getProducts();
    renderProducts(products);
}

async function init() {
    await getProducts();
}


init();