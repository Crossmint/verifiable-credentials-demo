import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const validContracts = ["0x685E6aE7925210F69889747d49D6bCC10A49c032"];

  try {
    const data = await req.json();

    if (data.wallet) {
      // retrieve NFTs in connected wallet
      const nftResults = await callCrossmintAPI(
        `/2022-06-09/wallets/polygon:${data.wallet}/nfts?page=1&perPage=50`,
        {
          method: "GET",
        }
      );

      // filter list
      const filteredArray = nftResults.filter((obj: any) =>
        validContracts.includes(obj.contractAddress)
      );

      // fetch credentials
      const promises = filteredArray.map(async (item: any) => {
        const response = await callCrossmintAPI(
          `/unstable/credentials/${item.metadata.credentialId}`,
          { method: "GET" }
        );
        item.credential = response;

        return item;
      });

      return Promise.all(promises)
        .then((results) => {
          return NextResponse.json(results, { status: 200 });
        })
        .catch((error) => {
          console.error(error); // handle any errors
          return NextResponse.json(
            { error: true, message: "error" },
            { status: 500 }
          );
        });
    } else {
      return NextResponse.json(
        { error: true, message: "Missing wallet" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "failed to retrieve credentials" },
      { status: 500 }
    );
  }
}
