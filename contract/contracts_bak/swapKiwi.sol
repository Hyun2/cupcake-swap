// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeableㅣ.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract CupcakeSwap is OwnableUpgradeable, IERC721ReceiverUpgradeable {
    uint256 private _swapsCounter;
    uint256 private _etherLocked;

    uint256 public fee;

    mapping(uint256 => Swap) private _swaps;

    struct Swap {
        address payable initiator;
        address[] initiatorNftAddresses;
        uint256[] initiatorNftIds;
        uint256 initiatorEtherValue;
        address payable secondUser;
        address[] secondUserNftAddresses;
        uint256[] secondUserNftIds;
        uint256 secondUserEtherValue;
    }

    event SwapExecuted(
        address indexed from,
        address indexed to,
        uint256 indexed swapId
    );
    event SwapCanceled(address indexed canceledBy, uint256 indexed swapId);
    event SwapProposed(
        address indexed from,
        address indexed to,
        uint256 indexed swapId,
        address[] nftAddresses,
        uint256[] nftIds,
        uint256 etherValue
    );
    event SwapInitiated(
        address indexed from,
        address indexed to,
        uint256 indexed swapId,
        address[] nftAddresses,
        uint256[] nftIds,
        uint256 etherValue
    );
    event AppFeeChanged(uint256 fee);

    modifier onlyInitiator(uint256 swapId) {
        require(
            msg.sender == _swaps[swapId].initiator,
            "SwapKiwi: caller is not swap initiator"
        );
        _;
    }

    modifier requireSameLength(
        address[] memory nftAddresses,
        uint256[] memory nftIds
    ) {
        require(
            nftAddresses.length == nftIds.length,
            "SwapKiwi: NFT and ID arrays have to be same length"
        );
        _;
    }

    modifier chargeAppFee() {
        require(
            msg.value >= fee,
            "SwapKiwi: Sent ETH amount needs to be more or equal application fee"
        );
        _;
    }

    constructor(uint256 initalAppFee, address contractOwnerAddress) {
        fee = initalAppFee;
        super.transferOwnership(contractOwnerAddress);
    }

    function setAppFee(uint256 newFee) external onlyOwner {
        fee = newFee;
        emit AppFeeChanged(newFee);
    }

    /**
     * @dev First user proposes a swap to the second user with the NFTs that he deposits and wants to trade.
     *      Proposed NFTs are transfered to the SwapKiwi contract and
     *      kept there until the swap is accepted or canceled/rejected.
     *
     * @param secondUser address of the user that the first user wants to trade NFTs with
     * @param nftAddresses array of NFT addressed that want to be traded
     * @param nftIds array of IDs belonging to NFTs that want to be traded
     */
    function proposeSwap(
        address secondUser,
        address[] memory nftAddresses,
        uint256[] memory nftIds
    ) external payable chargeAppFee requireSameLength(nftAddresses, nftIds) {
        _swapsCounter += 1;

        safeMultipleTransfersFrom(
            msg.sender,
            address(this),
            nftAddresses,
            nftIds
        );

        Swap storage swap = _swaps[_swapsCounter];
        swap.initiator = payable(msg.sender);
        swap.initiatorNftAddresses = nftAddresses;
        swap.initiatorNftIds = nftIds;
        if (msg.value > fee) {
            swap.initiatorEtherValue = msg.value - fee;
            _etherLocked += swap.initiatorEtherValue;
        }
        swap.secondUser = payable(secondUser);

        emit SwapProposed(
            msg.sender,
            secondUser,
            _swapsCounter,
            nftAddresses,
            nftIds,
            swap.initiatorEtherValue
        );
    }

    /**
     * @dev Second user accepts the swap (with proposed NFTs) from swap initiator and
     *      deposits his NFTs into the SwapKiwi contract.
     *      Callable only by second user that is invited by swap initiator.
     *
     * @param swapId ID of the swap that the second user is invited to participate in
     * @param nftAddresses array of NFT addressed that want to be traded
     * @param nftIds array of IDs belonging to NFTs that want to be traded
     */
    function initiateSwap(
        uint256 swapId,
        address[] memory nftAddresses,
        uint256[] memory nftIds
    ) external payable chargeAppFee requireSameLength(nftAddresses, nftIds) {
        require(
            _swaps[swapId].secondUser == msg.sender,
            "SwapKiwi: caller is not swap participator"
        );
        require(
            _swaps[swapId].secondUserEtherValue == 0 &&
                (_swaps[swapId].secondUserNftAddresses.length == 0 &&
                    _swaps[swapId].secondUserNftIds.length == 0),
            "SwapKiwi: swap already initiated"
        );

        safeMultipleTransfersFrom(
            msg.sender,
            address(this),
            nftAddresses,
            nftIds
        );

        _swaps[swapId].secondUserNftAddresses = nftAddresses;
        _swaps[swapId].secondUserNftIds = nftIds;
        if (msg.value > fee) {
            _swaps[swapId].secondUserEtherValue = msg.value - fee;
            _etherLocked += _swaps[swapId].secondUserEtherValue;
        }

        emit SwapInitiated(
            msg.sender,
            _swaps[swapId].initiator,
            swapId,
            nftAddresses,
            nftIds,
            _swaps[swapId].secondUserEtherValue
        );
    }

    /**
     * @dev Swap initiator accepts the swap (NFTs proposed by the second user).
     *      Executeds the swap - transfers NFTs from SwapKiwi to the participating users.
     *      Callable only by swap initiator.
     *
     * @param swapId ID of the swap that the initator wants to execute
     */
    function acceptSwap(uint256 swapId) external onlyInitiator(swapId) {
        require(
            (_swaps[swapId].secondUserNftAddresses.length != 0 ||
                _swaps[swapId].secondUserEtherValue > 0) &&
                (_swaps[swapId].initiatorNftAddresses.length != 0 ||
                    _swaps[swapId].initiatorEtherValue > 0),
            "SwapKiwi: Can't accept swap, both participants didn't add NFTs"
        );

        // transfer NFTs from escrow to initiator
        safeMultipleTransfersFrom(
            address(this),
            _swaps[swapId].initiator,
            _swaps[swapId].secondUserNftAddresses,
            _swaps[swapId].secondUserNftIds
        );

        // transfer NFTs from escrow to second user
        safeMultipleTransfersFrom(
            address(this),
            _swaps[swapId].secondUser,
            _swaps[swapId].initiatorNftAddresses,
            _swaps[swapId].initiatorNftIds
        );

        if (_swaps[swapId].initiatorEtherValue != 0) {
            _etherLocked -= _swaps[swapId].initiatorEtherValue;
            uint256 amountToTransfer = _swaps[swapId].initiatorEtherValue;
            _swaps[swapId].initiatorEtherValue = 0;
            _swaps[swapId].secondUser.transfer(amountToTransfer);
        }
        if (_swaps[swapId].secondUserEtherValue != 0) {
            _etherLocked -= _swaps[swapId].secondUserEtherValue;
            uint256 amountToTransfer = _swaps[swapId].secondUserEtherValue;
            _swaps[swapId].secondUserEtherValue = 0;
            _swaps[swapId].initiator.transfer(amountToTransfer);
        }

        emit SwapExecuted(
            _swaps[swapId].initiator,
            _swaps[swapId].secondUser,
            swapId
        );

        delete _swaps[swapId];
    }

    /**
     * @dev Returns NFTs from SwapKiwi to swap initator.
     *      Callable only if second user hasn't yet added NFTs.
     *
     * @param swapId ID of the swap that the swap participants want to cancel
     */
    function cancelSwap(uint256 swapId) external {
        require(
            _swaps[swapId].initiator == msg.sender ||
                _swaps[swapId].secondUser == msg.sender,
            "SwapKiwi: Can't cancel swap, must be swap participant"
        );
        // return initiator NFTs
        safeMultipleTransfersFrom(
            address(this),
            _swaps[swapId].initiator,
            _swaps[swapId].initiatorNftAddresses,
            _swaps[swapId].initiatorNftIds
        );

        if (_swaps[swapId].secondUserNftAddresses.length != 0) {
            // return second user NFTs
            safeMultipleTransfersFrom(
                address(this),
                _swaps[swapId].secondUser,
                _swaps[swapId].secondUserNftAddresses,
                _swaps[swapId].secondUserNftIds
            );
        }

        if (_swaps[swapId].initiatorEtherValue != 0) {
            _etherLocked -= _swaps[swapId].initiatorEtherValue;
            uint256 amountToTransfer = _swaps[swapId].initiatorEtherValue;
            _swaps[swapId].initiatorEtherValue = 0;
            _swaps[swapId].initiator.transfer(amountToTransfer);
        }
        if (_swaps[swapId].secondUserEtherValue != 0) {
            _etherLocked -= _swaps[swapId].secondUserEtherValue;
            uint256 amountToTransfer = _swaps[swapId].secondUserEtherValue;
            _swaps[swapId].secondUserEtherValue = 0;
            _swaps[swapId].secondUser.transfer(amountToTransfer);
        }

        emit SwapCanceled(msg.sender, swapId);

        delete _swaps[swapId];
    }

    function safeMultipleTransfersFrom(
        address from,
        address to,
        address[] memory nftAddresses,
        uint256[] memory nftIds
    ) internal virtual {
        for (uint256 i = 0; i < nftIds.length; i++) {
            safeTransferFrom(from, to, nftAddresses[i], nftIds[i], "");
        }
    }

    function approve(
        address to,
        address tokenAddress,
        uint256 tokenId
    ) public virtual {
        IERC721ReceiverUpgradeable(tokenAddress).approve(to, tokenId);
    }

    function getApproved(
        address spender,
        address tokenAddress,
        uint256 tokenId
    ) public view returns (bool) {
        if (
            IERC721ReceiverUpgradeable(tokenAddress).getApproved(tokenId) ==
            spender
        ) {
            return true;
        }
        return false;
    }

    function safeTransferFrom(
        address from,
        address to,
        address tokenAddress,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        IERC721ReceiverUpgradeable(tokenAddress).safeTransferFrom(
            from,
            to,
            tokenId,
            _data
        );
    }

    function withdrawEther(address payable recipient) external onlyOwner {
        require(
            recipient != address(0),
            "SwapKiwi: transfer to the zero address"
        );

        recipient.transfer((address(this).balance - _etherLocked));
    }

    function onERC721Received(
        /* solhint-disable */
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    )
        external
        pure
        override
        returns (
            /* solhint-enable */
            bytes4
        )
    {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }
}
