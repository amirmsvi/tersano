var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var uuidv4 = require('uuid').v4; // For generating unique IDs
var app = express();
app.use(express.json());
// JWT secret key
var JWT_SECRET = 'your_secret_key';
// Dummy user database
var users = [];
// Middleware to verify JWT token
var authenticateToken = function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, function (err, user) {
        if (err)
            return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};
// Signup route with unique username check and error handling
app.post('/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, firstName, lastName, username, password, existingUser, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, password = _a.password;
                // Validate that all fields are provided
                if (!firstName || !lastName || !username || !password) {
                    return [2 /*return*/, res.status(400).json({ error: 'All fields are required' })];
                }
                existingUser = users.find(function (u) { return u.username === username; });
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ error: 'Username already exists' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                user = { firstName: firstName, lastName: lastName, username: username, password: hashedPassword };
                users.push(user); // Add user to the dummy database
                res.status(201).json({ message: 'User created successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Error signing up:', error_1); // Log the error
                res.status(500).json({ error: 'An error occurred during signup' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Login route with detailed error handling
app.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, password, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    return [2 /*return*/, res.status(400).json({ error: 'Username and password are required' })];
                }
                user = users.find(function (u) { return u.username === username; });
                if (!user) {
                    console.warn("Login attempt with unknown username: ".concat(username)); // Log invalid username
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                passwordMatch = _b.sent();
                if (passwordMatch) {
                    token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                    console.info("User ".concat(username, " logged in successfully")); // Log successful login
                    return [2 /*return*/, res.json({ token: token })];
                }
                else {
                    console.warn("Invalid password attempt for user: ".concat(username)); // Log invalid password
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid password' })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Error logging in:', error_2); // Log backend error
                return [2 /*return*/, res.status(500).json({ error: 'An error occurred during login' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Protected route with authentication
app.get('/protected', authenticateToken, function (req, res) {
    res.json({ message: 'Access granted', user: req.user });
});
// Dummy product data
var products = [
    {
        id: uuidv4(),
        title: 'Product 1',
        description: 'Description for Product 1',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    },
    {
        id: uuidv4(),
        title: 'Product 2',
        description: 'Description for Product 2',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
];
// GET endpoint to return product list
app.get('/products', function (req, res) {
    res.json(products); // Return product list
});
// POST endpoint to add new products
app.post('/products', function (req, res) {
    var _a = req.body, title = _a.title, description = _a.description, price = _a.price, image = _a.image;
    if (!title || !description || !price || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    var newProduct = {
        id: uuidv4(),
        title: title,
        description: description,
        price: price,
        image: image
    };
    products.push(newProduct); // Add the new product to the list
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
});
// DELETE endpoint to remove products by ID
app["delete"]('/products/:id', function (req, res) {
    var id = req.params.id;
    var initialLength = products.length;
    products = products.filter(function (product) { return product.id !== id; }); // Remove product with matching ID
    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Product not found' }); // If no product was removed
    }
    res.json({ message: 'Product deleted successfully' }); // Confirm deletion
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () { return console.log("Server is running on port ".concat(PORT)); });
