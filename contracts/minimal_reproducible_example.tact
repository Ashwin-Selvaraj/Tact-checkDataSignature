import "@stdlib/deploy";

// Message for signature-based minting
message VerifySignatureMint {
    userAddress: Address;
    reward: Int;
    signature: Slice;
}

contract MinimalReproducibleExample with Deployable {
    pub: Int as uint256;
    init() {
        self.pub = 0x6cd68c8b3b2e6db246837eb2e7521d2ee15fa9502cb10d0deb889a11b38a9c89;
    }
    // New function to verify the signature
    fun verifySignature(userAddress: Address, reward: Int, signature: Slice): Bool {
        // Create a slice containing the data to verify
        let dataCell: Cell = beginCell()
            .storeAddress(userAddress)
            .storeInt(reward, 256)
            .endCell();
        
        let dataSlice: Slice = dataCell.beginParse();
        return checkDataSignature(dataSlice, signature, self.pub);
    }
    // New handler for signature-based minting
    receive(msg: VerifySignatureMint) {
        // Verify the signature before minting
        require(self.verifySignature(msg.userAddress, msg.reward, msg.signature), "Invalid signature");
        // Other Logics
    }
}
