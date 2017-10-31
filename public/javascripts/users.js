var User = function(firstName, lastName, mail, phone, password) {
    if (firstName.trim().length > 0 && lastName.trim().length > 0 && mail.trim().length > 0 && mail.indexOf("@") !== -1 &&
        phone.startsWith("08") && phone.length === 10 && password.length >= 5) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.password = password;
        this.products = [];
        this.favorites = [];
    }
}

User.prototype.addProductToBuy = function(product) {
    this.products.push(product);
}

User.prototype.addFavorite = function(product) {
    this.favorites.push(product);
}

User.prototype.removeProductFromBasket = function(product) {
    var index = this.products.findIndex(pr => pr._id === product._id);
    this.products.splice(index, 1);
}

User.prototype.removeProductFromFavorites = function(product) {
    var index = this.products.findIndex(pr => pr._id === product._id);
    this.favorites.splice(index, 1);
}

module.exports = User;