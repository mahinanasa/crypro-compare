
const coinSevice = require('./coin-updates.service')
class userService {
    async getCoinsTicks(params){
        try {
            const { fromSymbol, toSymbol}  = params
            let query
            if(toSymbol)
            query = {toSymbol }
            if(fromSymbol)
            query = {...query,fromSymbol }
            return coinSevice.find(query,{fromSymbol:1, toSymbol:1, price:1, _id:0},{lean:true})  
        } catch (error) {
            console.log("err", err)
            return []
        }
      
    }
    async getCoinsTicksHourly(params){
        try {
            const { fromSymbol, toSymbol }  = params
            let query
            if(toSymbol)
            query = {toSymbol }
            if(fromSymbol)
            query = {...query,fromSymbol }
            return coinSevice.find(query,{fromSymbol:1, toSymbol:1, price:1, hourlyData:1, _id:0},{lean:true})  
        } catch (error) {
            console.log("err", err)
            return []
        }
      
    }
}

module.exports = new userService()