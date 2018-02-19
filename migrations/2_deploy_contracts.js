// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);
// };

// const AvraCoinCrowdsale = artifacts.require("./Crowdsale.sol")
//
// module.exports = function(deployer, network, accounts) {
//   const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
//   const endTime = startTime + (86400 * 20) // 20 days
//   const rate = new web3.BigNumber(1000)
//   const wallet = accounts[0]
// console.log(startTime,endTime,wallet,rate);
//   deployer.deploy(AvraCoinCrowdsale, startTime, endTime, rate, wallet)
// };

const Crowdsale = artifacts.require("./Crowdsale.sol")

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  const endTime = startTime + (86400 * 20) // 20 days
  const rate = 1000
  const wallet = accounts[0]
  console.log(startTime,endTime,wallet,rate);
  deployer.deploy(Crowdsale, startTime, endTime, rate, wallet)
};
