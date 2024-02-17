interface Question {
  question: string;
  options: string[];
  answer: string[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  image: string;
  courseNumber: number;
  prerequisites: string[];
  test: Question[];
}

export const courses = [
  {
    id: "BC101",
    name: "Blockchain 101",
    description:
      "An introduction to blockchain technology fundamentals, focusing on its cryptographic underpinnings, distributed ledger mechanisms, and the technical architecture that supports decentralized applications (dApps).",
    image:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/Qmc8KojcgWYyGirPa8kwVgX79UApqUnwEsvHGLzSG5qaPx",
    courseNumber: 101,
    prerequisites: [],
    test: [
      {
        question: "Who wrote the bitcoin whitepaper?",
        options: ["Nick Szabo", "Hal Finney", "Satoshi Nakamoto"],
        answer: [
          // any option is correct for this question
          "Nick Szabo",
          "Hal Finney",
          "Satoshi Nakamoto",
        ],
      },
      {
        question: "What are smart contracts?",
        options: [
          "Contracts written by Stanford Law students",
          "Autographs of famous robots",
          "Code that executes agreements",
        ],
        answer: ["Code that executes agreements"],
      },
    ],
  },
  {
    id: "WL102",
    name: "Wallets 102",
    description:
      "Technical overview of digital wallet technology, including the security protocols, encryption techniques, and key management strategies essential for secure cryptocurrency transactions and asset management.",
    image:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmUPJhUSJFYL3AoQS3BEBLbLX1cD2hSJFSEVGVV96xMn8i",
    courseNumber: 102,
    prerequisites: ["BC101"],
    test: [
      {
        question: "Which of the following is NOT a type of web3 wallet?",
        options: [
          "Custodial",
          "Self-custody",
          "Smart Contract",
          "Carbon Fiber",
        ],
        answer: ["Carbon Fiber"],
      },
    ],
  },
  {
    id: "NFT201",
    name: "NFTs 201",
    description:
      "A technical exploration into Non-Fungible Tokens (NFTs), addressing their digital uniqueness, smart contract creation, and the underlying blockchain protocols that facilitate digital ownership and authenticity.",
    image:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmRonNmktP1YhzeNq99WSJ8muityjD8Dzd2hAcfMbiTrGT",
    courseNumber: 201,
    prerequisites: ["BC101", "WL102"],
    test: [
      {
        question: "Which token standard creates provably unique tokens?",
        options: ["ERC-20", "ERC-721", "ERC-1155"],
        answer: ["ERC-721"],
      },
      {
        question: "What process is used to create a new NFT?",
        options: ["Mining", "Staking", "Trading", "Minting"],
        answer: ["Minting"],
      },
    ],
  },
  {
    id: "DF201",
    name: "DeFi 201",
    description:
      "Detailed examination of Decentralized Finance (DeFi) technologies, emphasizing smart contracts, decentralized applications (dApps) development, and the cryptographic algorithms enabling autonomous financial systems.",
    image:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmekAhN6F5nCm796iRWNi8JJWm5kVobegLjkFqF6UESB5k",
    courseNumber: 201,
    prerequisites: ["BC101", "WL102"],
    test: [
      {
        question:
          "What term describes earning interest on your crypto by lending it through a DeFi platform?",
        options: ["Staking", "Yield Farming", "HODling", "Mining"],
        answer: ["Yield Farming"],
      },
    ],
  },
  {
    id: "GM301",
    name: "Onchain Gaming 301",
    description:
      "Advanced study of blockchain technology in gaming, covering the development of on-chain gaming platforms, integration of cryptocurrency and NFT assets, and the implications of blockchain for game economies and design.",
    image:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/Qmf1vaTFAxnij6QaGbLCyMVSB4n6WaF2Z9Cg156ztvs4ji",
    courseNumber: 301,
    prerequisites: ["BC101", "WL102", "NFT201", "DF201"],
    test: [],
  },
];
