/* global AlgoSigner */
import "./App.css";
import { Button, Container, Header, Message } from "semantic-ui-react";
import { useState, useCallback, useEffect } from "react";
import AlgoCall from "./AlgorandTransaction";

const appId = 13793863;

const ExampleAlgoSigner = ({ title, buttonText, buttonAction }) => {
  const [result, setResult] = useState("");

  const onClick = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <>
      <Header as="h2" dividing>
        {title}
      </Header>
      <Button primary={true} onClick={onClick}>
        {buttonText}
      </Button>
      <Message>
        <code>{result}</code>
      </Message>
    </>
  );
};

// The following components are all demonstrating some features of AlgoSigner

const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    if (typeof AlgoSigner !== "undefined") {
      return "AlgoSigner is installed.";
    } else {
      return "AlgoSigner is NOT installed.";
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="CheckAlgoSigner"
      buttonText="Check"
      buttonAction={action}
    />
  );
};

const GetAccounts = () => {
  const action = useCallback(async () => {
    await AlgoSigner.connect({
      ledger: "TestNet",
    });
    const accts = await AlgoSigner.accounts({
      ledger: "TestNet",
    });
    return JSON.stringify(accts, null, 2);
  }, []);

  return (
    <ExampleAlgoSigner
      title="Get Accounts"
      buttonText="Get Accounts"
      buttonAction={action}
    />
  );
};

const GetParams = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.algod({
        ledger: "TestNet",
        path: `/v2/transactions/params`,
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="Get Transaction Params"
      buttonText="Get Transaction Params"
      buttonAction={action}
    />
  );
};

const GetAppGlobalState = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.indexer({
        ledger: "TestNet",
        path: `/v2/applications/${appId}`,
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="Get Global State"
      buttonText="Get Global State"
      buttonAction={action}
    />
  );
};

const App = () => {
  /*  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      AlgoCall();
      setLoaded(true);
    }
  }, [loaded]);*/

  const refreshStatus = () => {
    const nfts = document.querySelectorAll(".nba");
    setTimeout(() => {
      for (let i = 0; i < nfts.length; i++) {
        nfts[i]?.classList.add("nbaRefreshed");
      }
    }, 1200);
  };

  const details1 = () => {
    const details = document.querySelectorAll(".details")[0];
    details?.classList.toggle("showDetails");
  };

  const details2 = () => {
    const details = document.querySelectorAll(".details")[1];
    details?.classList.toggle("showDetails");
  };

  const activate0 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[0]?.classList.toggle("collection-selected");
  };
  const activate1 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[1]?.classList.toggle("collection-selected");
  };
  const activate2 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[2]?.classList.toggle("collection-selected");
  };
  const activate3 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[3]?.classList.toggle("collection-selected");
  };
  const activate4 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[4]?.classList.toggle("collection-selected");
  };
  const activate5 = () => {
    const activate = document.querySelectorAll(".img-collection");
    for (let i = 0; i < activate.length; i++) {
      activate[i]?.classList.remove("collection-selected");
    }
    activate[5]?.classList.toggle("collection-selected");
  };

  return (
    <Container className="App">
      <div className="container-nba">
        <h1 as="h1" dividing>
          My NFTs Collections
        </h1>

        <div
          className="refresh-algo-status"
          onClick={() => {
            refreshStatus();
            const refresh = document.querySelector(".refresh-algo-status");
            refresh?.classList.add("refresh-off");
          }}
        >
          Refresh collection
        </div>

        <h2 className="nba" as="h2" dividing>
          NBA Final Conference
        </h2>

        <div className="collectionNba nba">
          <div className="myNFTs" onClick={details1}>
            <img
              src="https://link.us1.storjshare.io/raw/jugemuvsbbtiusa7fdeloxe5bj3q/demo-bucket%2FNBA0.png"
              width={200}
            />
            <p>Jimmy Butler stats game 1</p>
            <div className="details">
              <p>Current Blockchain: Polygon</p>
              <p>Initial Blockchain: Ethereum</p>
            </div>
          </div>
          <div className="myNFTs" onClick={details2}>
            <img
              className="collection-selected"
              src="https://link.us1.storjshare.io/raw/jut2r2i7q3w6qvuu67wadumcddsa/demo-bucket%2FNBA1.png"
              width={200}
            />
            <p>Marcus Smart stats game 2</p>
            <div className="details">
              <p>Current Blockchain: Polygon</p>
              <p>Initial Blockchain: Ethereum</p>
            </div>
          </div>
        </div>
        <div className="transfert nba">
          <h3>Cross-chain ownership transfert</h3>
          <div className="po">Asset to transfert: <div className="box">"Marcus Smart stats game 2"</div></div>
          <div className="po">Blockchain destination: <div className="box">"Solana"</div></div>
          <div className="po">
            Address of new owpner: <div className="box">3rPm6y8HnRpO8e5hfkAixMiNsgoErYPXQ7BFQH91jwSW</div>
          </div>
          <div className="btn-retrieve-list">TRANSFERT</div>
        </div>
      </div>
      <div className="container-chain">
        <h1 as="h1" dividing>
          Collections per chain
        </h1>
        <h2 className="retrieve-list">Selected collections</h2>
        <div className="diff-blockchain">
          <div className="blockchain">
            <h3>Ethereum</h3>
            <div className="collections">
              <img
                src="https://images-ext-2.discordapp.net/external/hVmmgrOTbujAYvJwl9EYdRSoTcH7SMJnkaEqNNxYypc/%3Fauto%3Dformat/https/img.seadn.io/files/f5e46e461e5b1769b29cc30d8bc2191d.png"
                className="img-collection"
                onClick={activate0}
              />
              <img
                className="img-collection"
                onClick={activate1}
                src="https://images-ext-2.discordapp.net/external/_Fv1Zjntl9QwkNEVgPOa3lz0DkzUyv1NUFrGG2Oo2XY/%3Fauto%3Dformat%26w%3D600/https/img.seadn.io/files/a14a3bd3a2fc2173e94b97d1e816b97c.png"
              />
            </div>
          </div>
          <div className="blockchain">
            <h3>Solana</h3>
            <div className="collections">
              <img
                className="img-collection"
                onClick={activate2}
                src="https://img.seadn.io/files/def426e2e72687b280b98cfc911b9948.png?auto=format&w=600"
              />
              <img
                className="img-collection"
                onClick={activate3}
                src="https://lh3.googleusercontent.com/Gd5FbVmOlstLeTQ_rLe72wPTa_O3e0-L8F8zya-5fujVKi85Z1l7GPVlF1uGmZz_84FvCC1vBglL8X6F7nynZuU0PR9cWZdvxkIpfw=w600"
              />
            </div>
          </div>
          <div className="blockchain">
            <h3>Polygon</h3>
            <div className="collections">
              <img
                className="img-collection"
                onClick={activate4}
                src="https://images-ext-1.discordapp.net/external/krybezy5-hiz8d4G3Lh2ZHVsG19CEiGwnMiybn4P9WA/%3Fauto%3Dformat%26w%3D600/https/img.seadn.io/files/9828443cd3cda3179a8c16963665fd08.png"
              />
              <img
                className="img-collection"
                onClick={activate5}
                src="https://lh3.googleusercontent.com/zWNbIKwoHQ1_WiI3VAT40wWk0kC6h0wrC2Yg0n_LZSCg3ZyiyFJGH4mGQS5wu4IYe4WIkYp2PVS3nABxRNBbxxzKytbquIhlL1z0=w600"
              />
            </div>
          </div>
        </div>
        <div className="btn-retrieve-list">Retrieve all holders addresses</div>
      </div>
    </Container>
  );
};

export default App;
