const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./modules/User');

dotenv.config({ path: './.env' });

const authorize = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (error, decodedToken) => {
        if (!error) {
          if (decodedToken !== undefined) {
            if (decodedToken.id === (await getUserById(decodedToken.id))) {
              next();
            } else {
              res.status(401).send({ message: 'Unauthorized' });
            }
          } else {
            res.status(403).send({ message: 'Forbidden' });
          }
        } else {
          if (jwt.TokenExpiredError) {
            res.status(403).send({ message: 'Token Expired' });
          } else {
            console.log('verification error -> ', error);
            res.status(400).send({ message: 'InvalidToken' });
          }
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

const getUserById = async (_id) => {
  try {
    const userDoc = await User.findOne({ _id });
    const stringID = userDoc._id.toString();
    return stringID;
  } catch (error) {
    console.log('GetById Error -> ', error);
  }
};

module.exports = authorize;
