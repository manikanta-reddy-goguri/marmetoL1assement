fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        if (!data || !data.categories || !Array.isArray(data.categories)) {
            console.error('Invalid data format:', data);
            return;
        }

        const menCategory = data.categories.find(category => category.category_name === 'Men');
        const womenCategory = data.categories.find(category => category.category_name === 'Women');
        const kidsCategory = data.categories.find(category => category.category_name === 'Kids');

        if (!menCategory || !womenCategory || !kidsCategory) {
            console.error('Category not found.');
            return;
        }

        displayProducts('men-products', menCategory.category_products);
        displayProducts('women-products', womenCategory.category_products);
        displayProducts('kids-products', kidsCategory.category_products);

        document.getElementById('men').addEventListener('click', () => showCategory('men'));
        document.getElementById('women').addEventListener('click', () => showCategory('women'));
        document.getElementById('kids').addEventListener('click', () => showCategory('kids'));

        showCategory('men');
    })
    .catch(error => console.error('Error:', error));

function displayProducts(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        productElement.appendChild(imageElement);

        if (product.badge_text) {
            const badgeElement = document.createElement('div');
            badgeElement.classList.add('product-badge');
            badgeElement.textContent = product.badge_text;
            productElement.appendChild(badgeElement);
        }

        const titleElement = document.createElement('div');
        titleElement.classList.add('product-title');
        titleElement.textContent = product.title.length <= 11 ? product.title : product.title.substring(0, 10) + '.';
        productElement.appendChild(titleElement);

        const vendorElement = document.createElement('div');
        vendorElement.classList.add('product-vendor');
        vendorElement.textContent = `.${product.vendor}`;
        productElement.appendChild(vendorElement);

        const priceElement = document.createElement('div');
        priceElement.classList.add('product-price');
        priceElement.textContent = `RS.${product.price} `;
        productElement.appendChild(priceElement);

        if (product.compare_at_price) {
            const compareAtPriceElement = document.createElement('div');
            compareAtPriceElement.classList.add('product-compare-at-price');
            compareAtPriceElement.textContent = `${product.compare_at_price} `;
            productElement.appendChild(compareAtPriceElement);

            const offerElement = document.createElement('div');
            offerElement.classList.add('offer');
            offerElement.textContent = '50% OFF';
            productElement.appendChild(offerElement);
        }

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = 'Add to Cart';
        productElement.appendChild(addToCartButton);

        container.appendChild(productElement);
    });
}


function showCategory(category) {
    const allCategories = ['men', 'women', 'kids'];
    allCategories.forEach(cat => {
        const container = document.getElementById(cat + '-products');
        if (container) {
            if (cat === category) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        }
    });
}

const categories = document.querySelectorAll('.category');

categories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        if (!category.classList.contains('active')) {
            category.classList.add('hovered');
        }
    });

    category.addEventListener('mouseleave', () => {
        category.classList.remove('hovered');
    });

    category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        category.classList.remove('hovered');
    });
});