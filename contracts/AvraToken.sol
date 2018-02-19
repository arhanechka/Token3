pragma solidity ^0.4.13;

import '../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import '../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol';

contract AvraToken is StandardToken, Ownable {
    string public constant name = "Avra Token";

    string public constant symbol = "AVR";

    uint32 public constant decimals = 18;

    uint256 public INITIAL_SUPPLY = 1000000 * (10 ** decimals);

    uint public startTime = 0;

    function AvraToken() {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function buy(address _to, uint256 _amount) onlyOwner public returns (bool) {
        require(_to != address(0));
        require(_amount <= balances[msg.sender]);
        startTime = now;
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        balances[_to] = balances[_to].add(_amount);
        Transfer(address(0), _to, _amount);
        return true;
    }
    function getStartTime() public view returns (uint256){
        return startTime;
    }

    function withdrawPayments() public view returns (bool) {
        if (now >= getStartTime() + 5*60) {
            return true;
        }
        else {
            return false;
        }
    }
    }
