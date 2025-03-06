# Tact-checkDataSignature

This repository contains a Tact contract to check data signatures. It provides scripts to deploy the contract and verify signatures, along with test cases to validate functionality.

## Getting Started

Follow the steps below to set up and run the project.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Tact-checkDataSignature.git
   cd Tact-checkDataSignature

2. Install dependencies:
   ```sh
   npm i

3. Compile the Tact contract to generate the necessary build files:
   ```sh
   npx blueprint build
This will create a build folder containing the compiled contract.

### Deploy & Verify Signature

1. Run the deployment script:
   ```sh
   npx blueprint run
   deployMinimalReproducibleExample.ts
This deploys the contract to the network.

2. Execute the signature verification script:
   ```sh
   npx blueprint run
   minimalVerifySignature.ts
This script verifies the data signature using the deployed contract.

### Run Tests
1. Execute the test suite:
      ```sh
      npx blueprint test
This will run the test scripts to validate contract functionality.



```bash
Tact-checkDataSignature/
│── build/                         # Compiled contract files (after build)
│── scripts/
│   ├── deployMinimalReproducibleExample.ts  # Deploy contract script
│   ├── minimalVerifySignature.ts           # Signature verification script
│── tests/                         # Test cases for validation
│── package.json                    # Project dependencies
│── README.md                        # Project documentation
```


