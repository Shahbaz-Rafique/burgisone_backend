const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

module.exports = {
    hashPassword,
};
