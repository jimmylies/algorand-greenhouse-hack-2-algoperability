/*
const updateData = async () => {
    const fetchData = await fetch(`https://api.elrond.com/accounts/${address}/nfts?size=50&collection=${revealedCollection}`)
        .then((res) => res.json());
    for (let i = 0; i < dataFetchRevealed.length; i++) {
        const y = dataFetchRevealed[i]['name'];
        setNbOwned(1);
        setNumRevealed((num) => [...num, regexNumR[0]]);
    }
};

const NftTable = () => {
    const [data, setData] = useState([]);

    return(
        {numBase.map((num) => (
                <div key={num} className='container-nft'>
                    <video autoPlay loop muted>
                        <source src={"https://media.elrond.com/nfts/asset/dz/${num}.mp4"} />
                    </video>
                    <div className='nft-tag'>
                        NFT Ticket #{num}
                    </div>
                </div>
            ))}
    )
}
export default NftTable();
*/

export default function NftTable() {
    return (
        <div>
            <p>
                a
            </p>
        </div>
    )
}
