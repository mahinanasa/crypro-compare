const Base = require("./base");
const { CoinUpdatesModel, CoinUpdatesSchema } = require("../models");

class CoinUpdatesService extends Base {
  async coinUpdates(payload) {
    try {
      const { TYPE, FROMSYMBOL, TOSYMBOL, PRICE, HIGH, LOW, OPEN, CLOSE } = payload;

      let updateData = {
        fromSymbol: FROMSYMBOL,
        toSymbol: TOSYMBOL,
      };

      if (TYPE === '2') {
        updateData = {
          ...updateData,
          price: PRICE,
        };
        await this.updateByParam( { $and: [{ fromSymbol: FROMSYMBOL, toSymbol: TOSYMBOL }] }, updateData)
      }else{
        const data = {
          hourlyData :{
            low:LOW,
            high:HIGH,
            open:OPEN,
            close:CLOSE,
            date: new Date()
          } 
        } 
        await this.updateByParam( { $and: [{ fromSymbol: FROMSYMBOL, toSymbol: TOSYMBOL }] }, {},data)
      }
    } catch (err) {
      console.error("Error", err);
    }
  }
}

module.exports = new CoinUpdatesService(CoinUpdatesModel, CoinUpdatesSchema);
