import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from "react";
import './index.css';

export default function Header() {
    const [blockchain, setBlockchain] = React.useState('Polygon');
    const blockchains = ['Polygon', 'Ethereum'];
    

    const handleChange = (event: SelectChangeEvent) => {
        setBlockchain(event.target.value as string);
    };

    const [currentAccount, setCurrentAccount] = useState<any>();

    const connectWallet = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
    };

    return (
        <header>
            <Box sx={{ maxWidth: 160 }}>
                <FormControl fullWidth>
                    <InputLabel className="blockchain-selector">{"Blockchain"}</InputLabel>
                    <Select className="menuItem"
                        IconComponent={() => (
                            <img className="blockchain-logo" src={`/images/${blockchain}.png`}/>
                        )}
                        id="blockchain-selector"
                        value={blockchain}
                        label="Select blockchain"
                        onChange={handleChange}
                    >
                    <MenuItem value={"Polygon"} className="menuItem">Polygon</MenuItem>
                    <MenuItem value={"Ethereum"}>Ethereum</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <img src='/images/logoB.png' width={220}/   >
            <button
                className="connect"
                onClick={connectWallet}
                disabled={currentAccount}
            >
                {currentAccount
                    ? `${currentAccount.substring(0, 6)}...${currentAccount.substring(
                        currentAccount.length - 5
                    )}`
                    : "Connect wallet"}
            </button>
        </header>
    );
}
