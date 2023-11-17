const User = require('../models/user');
const path = require('path');



exports.getUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => { res.send(error) })
}

exports.getAddUser = (req, res, next) => {
    const filePath = path.join(__dirname, '../index.html');
    res.sendFile(filePath);
}

exports.postAddUser = (req, res, next) => {
    const userName = req.body.name; 
    const phoneNumber = req.body.number;
    const userEmail = req.body.email; 

    User.create({
        name: userName,
        number: phoneNumber,
        email: userEmail
    })
    .then((result) => {
        res.json(result);
        console.log(result);
    })
    .catch((error) => {
        res.send(error);
        console.log(error);
    });
}

exports.editUser = (req, res, next) => {
    const prodId = req.params.id; // changed 'body' to 'params'
    const updatedUsername = req.body.name; // changed 'username' to 'name'
    const updatedPhoneNumber = req.body.number; // changed 'phoneNumber' to 'number'
    const updatedEmail = req.body.email;

    User.findByPk(prodId)
        .then(user => {
            user.name = updatedUsername;
            user.number = updatedPhoneNumber;
            user.email = updatedEmail;
            return user.save();
        })
        .then(result => {
            console.log('UPDATED USER!');
            res.json(result); // changed to respond with JSON
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' }); // added proper error response
        });
};


exports.deleteUser = (req, res, next) => {
    const prodId = req.params.id;
    
    User.findByPk(prodId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return user.destroy();
        })
        .then(result => {
            console.log('DESTROYED user');
            res.status(204).end(); // Send a success response with no content
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
