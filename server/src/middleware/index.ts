const Dao = require('../dal/dao/index')
import gmailPassport from './passport/gmailPassport'
const {userDao} = Dao
module.exports = {
    gmailPassport: gmailPassport(userDao),

}
 