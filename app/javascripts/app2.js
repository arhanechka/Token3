/* eslint-disable no-undef,eqeqeq */
// Import libraries we need.
// noinspection JSAnnotator
import { default as Web3 } from 'web3'

// noinspection JSAnnotator
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
// noinspection JSAnnotator
import GustavoCoinCrowdsale_artifacts from '../../build/contracts/GustavoCoinCrowdsale.json'
// noinspection JSAnnotator
import GustavoCoin_artifacts from '../../build/contracts/GustavoCoin.json'
// AvraToken is our usable abstraction, which we'll use through the code below.
var GustavoCoinCrowdsale = contract(GustavoCoinCrowdsale_artifacts)
var GustavoCoin = contract(GustavoCoin_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
// eslint-disable-next-line semi
var accounts;
// eslint-disable-next-line semi
var account;

App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3()
  },

  initWeb3: function () {
    GustavoCoinCrowdsale.setProvider(web3.currentProvider)
    GustavoCoin.setProvider(web3.currentProvider)
    // Initialize web3 and set the provider to the testRPC.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]
      console.log(account)
      self.refreshBalance()
      self.setTotalSupply()
    })
  },

  initContract: function () {
    $.getJSON('GustavoCoinCrowdsale.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var GustavoCoinCrowdsaleArtifact = data
      GustavoCoinCrowdsale = TruffleContract(GustavoCoinCrowdsaleArtifact)

      // Set the provider for our contract.
      GustavoCoinCrowdsale.setProvider(App.web3Provider)

      // Use our contract to retieve and mark the adopted pets.
    })

    $.getJSON('GustavoCoin.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var GustavoCoinArtifact = data
      GustavoCoin = TruffleContract(GustavoCoinArtifact)

      // Set the provider for our contract.
      GustavoCoin.setProvider(App.web3Provider)

      // Use our contract to retieve and mark the adopted pets.
    })

    return App.getBalances()
    return App.bindEvents()
  },

  bindEvents: function () {
    $(document).on('click', '#transferButton', App.handleTransfer)
  },

  handleTransfer: function (event) {
    event.preventDefault()

    var amount = parseInt($('#TTTransferAmount').val())
    var toAddress = $('#TTTransferAddress').val()

    console.log('Transfer ' + amount + ' TT to ' + toAddress)

    var GustavoCoinCrowdsaleInstanse

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error)
      }

      var account = accounts[0]

      App.contracts.GustavoCoinCrowdsale.deployed().then(function (instance) {
        GustavoCoinCrowdsaleInstanse = instance

        return GustavoCoinCrowdsaleInstanse.transfer(toAddress, amount, { from: account })
      }).then(function (result) {
        alert('Transfer Successful!')
        return App.getBalances()
      }).catch(function (err) {
        console.log(err.message)
      })
    })
  },

  getBalances: function () {
    console.log('Getting balances...')

    var tokenAddress
    var balance

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error)
      }

      var account = accounts[0]
      var crowdsale

      GustavoCoinCrowdsale.deployed().then(function (instance) {
        crowdsale = instance
        crowdsale.token.call().then(addr => {
          console.log(addr)
          gustavoCoinInstance = GustavoCoin.at(addr)
          gustavoCoinInstance.balanceOf(account).then(balance => {
            console.log(account)
            console.log(balance)
            console.log(balance.c[0])
            $('#TTBalance').text(balance.c[0])
          })
        })

        $('#TTBalance').text(balance)
      })
    })
  }

}

$(function () {
  $(window).load(function () {
    App.init()
  })
})
