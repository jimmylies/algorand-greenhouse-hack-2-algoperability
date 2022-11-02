#! /bin/bash

export TILT_RPC_IP=$1


# Deploy EVM
cd evm-project && npx hardhat run --network tilt scripts/deploy.ts && cd ../
# Deploy Algorand
algorand config set --url $TILT_RPC_IP:8899
cd algorand-project && anchor build && algorand airdrop 100 -k test_keypair.json && sleep 5 && cd ../
cd algorand-deployer && cargo build --release && cargo run --release -- -m=8 --payer=../algorand-project/test_keypair.json --program-kp-path=../algorand-project/algorand_project-keypair.json --program-path=../algorand-project/target/deploy/algorand_project.so -r=$TILT_RPC_IP:8899 -s=1 -t=5 --thread-count=8 && cd ../
sleep 10
#Register algorand Address on EVM
cd evm-project && npx hardhat run ./scripts/register_algorand_address.ts && cd ../
#Initialize algorand contract
#TODO: Don't call this if the config account exists already
cd algorand-project && ts-node ./scripts/initialize_messenger.ts && cd ../
#Send msg from algorand to EVM
cd algorand-project && ts-node ./scripts/send_msg.ts && cd ../
#Submit the VAA
cd evm-project && ts-node ./scripts/submit_vaa.ts && cd ../
#Check the Msg on EVM
cd evm-project && ts-node ./scripts/get_current_msg.ts && cd ../
#Send msg from EVM to algorand
cd evm-project && ts-node ./scripts/send_msg.ts && cd ../
#Register EVM Address on algorand
cd algorand-project && ts-node ./scripts/register_eth_chain.ts && cd ../
#Post and Confirm the VAA
cd algorand-project && ts-node ./scripts/submit_vaa.ts && cd ../