//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Wormhole/IWormhole.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

struct NFT {
    address nftContract;
    uint256 nft;
}


contract Messenger {
    string private algorand_msg;
    address private wormhole_core_bridge_address = address(0xC89Ce4735882C9F0f0FE26686c53074E09B0D550);
    IWormhole core_bridge = IWormhole(wormhole_core_bridge_address);
    uint32 nonce = 0;
    mapping(uint16 => bytes32) _applicationContracts;
    address owner;
    mapping(bytes32 => bool) _completedMessages;

    event NftLock(address _nftContract, uint256 _nft, address _msgSender);

    NFT[] public NFTs;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function LockNFT(address _nftContract, uint256 _tokenId) public payable {
        require(IERC721(_nftContract).balanceOf(msg.sender) > 0);
        ///approve( address(this), uint256 tokenId) //// to do on the front end

        IERC721(_nftContract).safeTransferFrom(msg.sender, address(this), _tokenId);
        NFTs.push(NFT(_nftContract, _tokenId));
        emit NftLock(_nftContract, _tokenId, msg.sender);
    }


    function sendMsg(bytes memory str) public returns (uint64 sequence) {
        sequence = core_bridge.publishMessage(nonce, str, 1);
        nonce = nonce+1;
    }

    function recieveEncodedMsg(bytes memory encodedMsg) public {
        (IWormhole.VM memory vm, bool valid, string memory reason) = core_bridge.parseAndVerifyVM(encodedMsg);
        
        //1. Check Wormhole Guardian Signatures
        //  If the VM is NOT valid, will return the reason it's not valid
        //  If the VM IS valid, reason will be blank
        require(valid, reason);

        //2. Check if the Emitter Chain contract is registered
        require(_applicationContracts[vm.emitterChainId] == vm.emitterAddress, "Invalid Emitter Address!");
    
        //3. Check that the message hasn't already been processed
        require(!_completedMessages[vm.hash], "Message already processed");
        _completedMessages[vm.hash] = true;

        //Do the thing
        algorand_msg = string(vm.payload);
    }

    function getAlgorandMsg() public view returns (string memory){
        return algorand_msg;
    }
    /**
        Registers it's sibling applications on other chains as the only ones that can send this instance messages
     */
    function registerApplicationContracts(uint16 chainId, bytes32 applicationAddr) public {
        require(msg.sender == owner, "Only owner can register new chains!");
        _applicationContracts[chainId] = applicationAddr;
    }
}
