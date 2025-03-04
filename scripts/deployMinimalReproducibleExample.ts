import { toNano } from '@ton/core';
import { MinimalReproducibleExample } from '../wrappers/MinimalReproducibleExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const minimalReproducibleExample = provider.open(await MinimalReproducibleExample.fromInit());

    await minimalReproducibleExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );
    await provider.waitForDeploy(minimalReproducibleExample.address);
}
