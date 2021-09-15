// require sequelize
const { Sequelize } = require('sequelize')

// export Sequelize and use either the JAWSDB when on Heroku or local mySQL database
module.exports = new Sequelize(process.env.JAWSDB_URL || 'mysql://root:rootroot@localhost:3306/movieList_db')
