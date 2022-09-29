
const { userService }  = require('../service')
class userController {

    async getCoinsTicks(req, res, next) {
        try {
         const params = {
          ...req.query
         }
         const ticks = await userService.getCoinsTicks(params)
         return res.status(200).json(ticks)
        } catch (e) {
          console.log("err", e)
          return next(e);
        }
      }
    async getCoinsTicksHourly(req, res, next) {
        try {
         const params = {
          ...req.query
         }
         const ticks = await userService.getCoinsTicksHourly(params)
         return res.status(200).json(ticks)
        } catch (e) {
          console.log("err", e)
          return next(e);
        }
      }
}
module.exports = new userController();