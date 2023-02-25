// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;


contract ChaiFactory {
    address[] public deployedChais;

    event chaiCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address chaiAddress,
        string imgURI,
        uint indexed timestamp
        
    );

    function createChai(
        string memory chaiTitle, 
        uint requiredChaiAmount, 
        string memory imgURI, 
        
        string memory bioURI) public
    {

        Chai newChai = new Chai(
            chaiTitle, requiredChaiAmount, imgURI, bioURI, msg.sender);
        

        deployedChais.push(address(newChai));

        emit chaiCreated(
            chaiTitle, 
            requiredChaiAmount, 
            msg.sender, 
            address(newChai),
            imgURI,
            block.timestamp
            
        );

    }
}


contract Chai {
    string public title;
    uint public requiredAmount;
    string public image;
    string public bio;
    address payable public owner;
    uint public receivedAmount;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory chaiTitle, 
        uint requiredChaiAmount, 
        string memory imgURI,
        string memory bioURI,
        address chaiOwner
    ) {
        title = chaiTitle;
        requiredAmount = requiredChaiAmount;
        image = imgURI;
        bio = bioURI;
        owner = payable(chaiOwner);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount, "Donated maximum amount possible");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}

