//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Whitelist {

    uint public maxwhitelistparticipants;

    mapping(address => bool) public whitelistedAddresses;

    uint public numAddressesWhitelisted;

    constructor(uint _maxWhitelistedAddresses) {
        maxwhitelistparticipants =  _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        // check if the user has already been whitelisted
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");

        require(numAddressesWhitelisted < maxwhitelistparticipants, "More addresses cant be added, limit reached");
      
        whitelistedAddresses[msg.sender] = true;
        // Increase the number of whitelisted addresses
        numAddressesWhitelisted += 1;
    }

}