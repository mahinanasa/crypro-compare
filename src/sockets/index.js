const WebSocket = require("ws");
const { keys } = require("../common/");
const { coinUpdatesService } =  require('../service')
const ccStreamer = new WebSocket(
  `${keys.cryptoCompareWssUrl}${keys.cryptoCompareApiKey}`
);

const initSockets = () => {
  ccStreamer.on("open", function open() {
    const subRequest = {
      action: "SubAdd",
      subs: keys.coinsTypeArray,
    };
  ccStreamer.send(JSON.stringify(subRequest));
  });

  ccStreamer.on("close", function open() {
    const subRequest = {
      action: "SubRemove",
      subs: keys.coinsTypeArray, 
    };
    ccStreamer.send(JSON.stringify(subRequest));
    setTimeout(()=>{
      ccStreamer.emit('open')
    },3000)
  });

  ccStreamer.on("message",async function incoming(data) {
    try{
      const parsedData = JSON.parse(data.toString());
      if(parsedData["MESSAGE"] === "TOO_MANY_SOCKETS_MAX_1_PER_CLIENT")
      {
        ccStreamer.emit('close')
      }else{
        console.log(JSON.stringify(parsedData, null, "\t"));
        if(["BTC","ETH", "BSC"].includes(parsedData["FROMSYMBOL"]) && ['2','5'].includes(parsedData.TYPE))
        await coinUpdatesService.coinUpdates(parsedData)
        if(parsedData.TYPE === '24')
       await coinUpdatesService.coinUpdates(parsedData)
      }
  
    }catch(err){
      console.log(err)
    }
  });
};

module.exports = initSockets;
