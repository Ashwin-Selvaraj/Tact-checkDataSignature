import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, toNano, beginCell } from '@ton/core';
import { MinimalReproducibleExample } from '../wrappers/MinimalReproducibleExample';
import '@ton/test-utils';
import { log } from 'node:console';

describe('MinimalReproducibleExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let minimalReproducibleExample: SandboxContract<MinimalReproducibleExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        minimalReproducibleExample = blockchain.openContract(await MinimalReproducibleExample.fromInit());

        deployer = await blockchain.treasury('deployer');  
        const deployResult = await minimalReproducibleExample.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: minimalReproducibleExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and minimalReproducibleExample are ready to use
    });

    it('should verify signature and mint', async () => {
        const signatureResult = await minimalReproducibleExample.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'VerifySignatureMint',
                userAddress: Address.parse("0QCfwXGx7kkNOCoE8QVOE5eYBMyNpcxvbMgEJ2UrDUM1TaOn"),
                reward: 69000000000000000000n,
                signature: beginCell()
                    .storeBuffer(Buffer.from('e44b470b6e9c96e76c668ab20b6009efe310a3b27425c54a3ae3bb4d1ce281470d9eecb1b6dcee8c88cc32e3da76d716d3eb2bd7fe563eec4c51fbc559ed4a0e', 'hex'))
                    .endCell()
                    .beginParse()
            }
        );

        expect(signatureResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: minimalReproducibleExample.address,
            success: true,
        });
    });
});
