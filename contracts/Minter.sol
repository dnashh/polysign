pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PolySign is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenID;

    constructor() ERC721("Polysign", "PolySign") {
    }

    function mintNFT(string memory tokenURI) public onlyOwner returns(uint256) {
        tokenID.increment();
        uint256 newId = tokenID.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);
        return newId;
    }

}
