import hardhat from "hardhat";
import { ethers } from "ethers";
import fs from "fs";
// eslint-disable-next-line node/no-missing-import
import { Messenger } from "../typechain";
import {
    CHAIN_ID_ETH,
    getEmitterAddressEth,
    parseSequenceFromLogEth,
} from "@certusone/wormhole-sdk";
import fetch from "node-fetch";

export async function sendMsg() {
    const signer = ethers.Wallet.fromMnemonic(
        "myth like bonus scare over problem client lizard pioneer submit female collect"
    ).connect(
        new ethers.providers.JsonRpcProvider(`${process.env.TILT_RPC_IP}:8545`)
    );
    const messengerAddress = fs.readFileSync("eth-address.txt").toString();

    const messenger = new ethers.Contract(
        messengerAddress,
        (
            await hardhat.artifacts.readArtifact(
                "contracts/Messenger.sol:Messenger"
            )
        ).abi,
        signer
    ) as Messenger;
    const msgText = "Contract NFT : 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D / IDToken : 6136 / Arival address : 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245 / Blockchain : Polygon / Image : 'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6136' / Name : Bored Ape Yatch Club";
    const tx = await (await messenger.sendMsg(Buffer.from(msgText))).wait();
    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 5000));
    const emitterAddr = getEmitterAddressEth(messenger.address);
    const seq = parseSequenceFromLogEth(
        tx,
        "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
    );

    const WH_DEVNET_REST = `${process.env.TILT_RPC_IP}:7071`;
    const vaaBytes = await (
        await fetch(
            `${WH_DEVNET_REST}/v1/signed_vaa/${CHAIN_ID_ETH}/${emitterAddr}/${seq}`
        )
    ).json();
    console.log("Signed VAA: ", vaaBytes);

    // Submit on ETH
    fs.writeFileSync("vaa.txt", vaaBytes.vaaBytes);
}
sendMsg();
