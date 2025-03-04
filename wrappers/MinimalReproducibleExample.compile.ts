import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/minimal_reproducible_example.tact',
    options: {
        debug: true,
    },
};
