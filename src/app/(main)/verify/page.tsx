"use client";

import React from "react";
import Layout from "../Layout";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialCollections,
  getMetadata,
  CrossmintAPI,
  Lit,
} from "@crossmint/verify-credentials";

const valid_vc = {
  _id: "64ef638ab2dd5002795d3244",
  c: "aaaa",
  id: "urn:uuid:a8c66342-6208-4b81-8eee-b7b7f9d66798",
  credentialSubject: {
    name: "vmc-crossmint/ts",
    id: "did:0x4Ce24bEe940fD7E77228B547cF676D533385ABe7",
  },
  nft: {
    tokenId: "159",
    chain: "polygon",
    contractAddress: "0xD8393a735e8b7B6E199db9A537cf27C61Aa74954",
    _id: "64ef638ab2dd5002795d3245",
  },
  expirationDate: "2234-12-12",
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://github.com/haardikk21/ethereum-eip712-signature-2021-spec/blob/main/index.html",
  ],
  issuer: {
    id: "did:0xE1359d89D79daB869da5eC24efB1aBc469591Fb1",
  },
  type: ["VerifiableCredential", "64e93521d90c2f32cdd53904"],
  credentialSchema: {
    id: "https://github.com/haardikk21/ethereum-eip712-signature-2021-spec/blob/main/index.html",
    type: "Eip712SchemaValidator2021",
  },
  issuanceDate: "2023-08-30T15:43:30.755Z",
  isDeleted: false,
  deletedAt: null,
  proof: {
    proofValue:
      "0x4489d38cfd8730f6e83df59c49680f3dc677f4863dc49d612a2cece1f8cbf8b00ab81867071f708393d27324a2f9b94d93085e0ac4807627dd97357de83445ae1b",
    verificationMethod:
      "did:0xE1359d89D79daB869da5eC24efB1aBc469591Fb1#ethereumAddress",
    created: "2023-08-30T15:43:30.762Z",
    proofPurpose: "assertionMethod",
    type: "EthereumEip712Signature2021",
    eip712: {
      domain: {
        name: "Krebit",
        version: "0.1",
        chainId: 4,
        verifyingContract: "0xD8393a735e8b7B6E199db9A537cf27C61Aa74954",
      },
      types: {
        VerifiableCredential: [
          {
            name: "@context",
            type: "string[]",
          },
          {
            name: "type",
            type: "string[]",
          },
          {
            name: "id",
            type: "string",
          },
          {
            name: "issuer",
            type: "Issuer",
          },
          {
            name: "credentialSubject",
            type: "CredentialSubject",
          },
          {
            name: "credentialSchema",
            type: "CredentialSchema",
          },
          {
            name: "issuanceDate",
            type: "string",
          },
          {
            name: "expirationDate",
            type: "string",
          },
        ],
        CredentialSchema: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "type",
            type: "string",
          },
        ],
        CredentialSubject: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "name",
            type: "string",
          },
        ],
        Issuer: [
          {
            name: "id",
            type: "string",
          },
        ],
      },
      primaryType: "VerifiableCredential",
    },
  },
} as unknown;

const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
//CrossmintAPI.init(clientKey);
CrossmintAPI.init(
  "sk_staging_9tSWj11CgSM3ZjHdsjc1KE2p3B2d2vyvmj7LNwVqMwpzKbWEN9fHQNHbbo1dDxbjiPX7Gk1cgeofstQXLw67sm5KCTHTfHWgk6rpBW2qRrFSiYy3fdiNNFZXD3jwfP8jtYjCosQrBubV3V6ZdUFjBRYJbh2uE72yc7F4DdUYjCESoUSuZo1NTNVUEUcJ3dREKvWQFx13w8sEZBe7keKknJ2S"
);
const env = "staging";

verifyCredential(valid_vc as VerifiableCredential).then((res) => {
  console.log(res);
});

// getMetadata("0xdEA47019054eBDf6e74DD47961b58F66D5Ad5e8C", "test").then(. // get contract level metadata
//     (data: any) => console.log(data)
// ); (edited)

const Page = () => {
  console.log("about to retrieve...");

  // getCredentialCollections(
  //   "polygon",
  //   "0x6C3b3225759Cbda68F96378A9F0277B4374f9F06",
  //   undefined,
  //   env
  // )
  //   .then((data: any) => console.log(data))
  //   .catch((error: Error) => console.error(error));

  return (
    <Layout>
      <h1 className="text-xl">Page Title</h1>
      <p>Page content goes here...</p>
      <div className="text-white">Hello</div>
    </Layout>
  );
};

export default Page;
