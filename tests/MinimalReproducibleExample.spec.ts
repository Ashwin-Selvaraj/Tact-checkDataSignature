import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MinimalReproducibleExample } from '../wrappers/MinimalReproducibleExample';
import '@ton/test-utils';

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
});
