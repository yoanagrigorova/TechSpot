var User = function(firstName, lastName, mail, phone, password) {
    if (firstName.trim().length > 0 && lastName.trim().length > 0 && mail.trim().length > 0 && mail.indexOf("@") !== -1 &&
        phone.startsWith('08') && phone.length === 10 && password.length >= 5) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.password = password;
        this.products = [];
        this.favorites = [];
        this.boughtProducts = [];

    } else {
        throw new Error("Invalid data");
    }
}

module.exports = User;