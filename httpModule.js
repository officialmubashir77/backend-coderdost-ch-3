const http = require('http');
const fs = require('fs');
const products = require('./products.json');

const data = [
    {
        "id": 1,
        "name": "Product A",
        "price": 29.99,
        "category": "Electronics",
        "description": "A high-quality electronic device."
    },
    {
        "id": 2,
        "name": "Product B",
        "price": 19.99,
        "category": "Books",
        "description": "An informative book on programming."
    },
    {
        "id": 3,
        "name": "Product C",
        "price": 49.99,
        "category": "Home Appliances",
        "description": "A durable and efficient home appliance."
    },
    {
        "id": 4,
        "name": "Product D",
        "price": 99.99,
        "category": "Furniture",
        "description": "Stylish and comfortable furniture."
    }
];

const showProductFirstTitle = data[0];
console.log(products);
// console.log(showProductFirstTitle);


const indexFile = fs.readFileSync('index.html' , 'utf-8');


// create server through http
const server = http.createServer((req, res) => {
    // set response header
    res.setHeader('Content-Type', 'text/html');
    console.log("Started");

    // send response body
    // res.end(`
    // <html>
    //     <head>
    //         <title>Server Response</title>
    //     </head>
    //     <body>
    //         <h1>Server Response</h1>
    //         <p>This is a server response.</p>
    //     </body>
    // </html>
    // `);

    console.log(req.url);
    //res send data 
    // res.end(JSON.stringify(data));


    // // Check URL path
    // if (req.url === '/api/products') {
    //     // Respond with products data
    //     res.end(JSON.stringify(products));
    // }
    // else if (req.url === '/') { 
    //     // find text in index 
    //     // Respond with index.html file
    //     res.end(indexFile);
    // }
    // else if (req.url === '/card') { 
    //     // find text in index White Traditional Long Dress and replace with showProductFirstTitle title
    //     let replacedContent = indexFile.replace('White Traditional Long Dress', showProductFirstTitle.description);
    //     res.end(replacedContent);
    // }
    // else {
    //     // Respond with dummy data for other paths
    //     res.end(JSON.stringify(data));
    // }





    // render products
    // Handle API requests
    if (req.url.startsWith('/api/products')) {
        res.end(JSON.stringify(products));
    } 
    // Handle dynamic product requests
    else if (req.url.startsWith('/product/')) {
        const productId = req.url.split('/')[2];
        const product = products.find(p => p.id === parseInt(productId, 10));

        if (product) {
            // Replace placeholders in the index.html with product details
            let productHtml = indexFile
                .replace('White Traditional Long Dress', product.title)
                .replace('&#8377 500', `&#8377 ${product.price}`) // Assuming price is a numeric value
                .replace('700', product.discountPercentage)// Assuming oldPrice is a numeric value

            // Assuming you have a placeholder for product image
            productHtml = productHtml.replace('https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid', product.images[0]);

            res.end(productHtml);
        } else {
            res.statusCode = 404;
            res.end('Product not found');
        }
    } 
    // Handle root requests
    else if (req.url === '/') {
        res.end(indexFile);
    } 
    // Handle other paths
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }


})


// listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});