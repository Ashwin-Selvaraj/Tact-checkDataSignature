import { Address, toNano, beginCell } from '@ton/core';
import { MinimalReproducibleExample } from '../wrappers/MinimalReproducibleExample';
import { NetworkProvider } from '@ton/blueprint';


export async function run(provider: NetworkProvider) {
    // Test data from your provided information
    const testData = {
        contractAddress: "EQDlSR_MnNlqZW0apFx6OXp3ZYrmoPTj9TSmHhdXzwOemxmB",
        userAddress: "0QCfwXGx7kkNOCoE8QVOE5eYBMyNpcxvbMgEJ2UrDUM1TaOn",
        reward: 69000000000000000000n,
        signature: "e44b470b6e9c96e76c668ab20b6009efe310a3b27425c54a3ae3bb4d1ce281470d9eecb1b6dcee8c88cc32e3da76d716d3eb2bd7fe563eec4c51fbc559ed4a0e",
        publicKey: "0x6cd68c8b3b2e6db246837eb2e7521d2ee15fa9502cb10d0deb889a11b38a9c89"
    };

    try {
        console.log("testData", testData);
        const contract = provider.open(MinimalReproducibleExample.fromAddress(Address.parse(testData.contractAddress)));
        await contract.send(
            provider.sender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'VerifySignatureMint',
                userAddress: Address.parse(testData.userAddress),
                reward: toNano(testData.reward.toString()),
                signature: beginCell().storeBuffer(Buffer.from(testData.signature, 'hex')).endCell().beginParse()
            }
        );
        console.log('Successfully signature-based minting');
    } catch (error) {
        console.error("Error:", error);
    }
} 