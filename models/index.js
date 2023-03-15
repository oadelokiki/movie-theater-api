const { Show } = require('./Show')
const { User } = require('./User')


Show.belongsTo(User);
User.hasOne(Show)


module.exports = {Show, User}
