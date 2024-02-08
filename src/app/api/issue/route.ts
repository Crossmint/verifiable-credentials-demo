import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("issue credential: ", data);

    if (data.wallet) {
      const body = {
        metadata: {
          name: "Test Credential",
          image:
            "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmZM4HCFrTceuBV7YABGwHNjaGzsKuwNZTNfefaQ7kX3fr",
          description: "Test NFT created using the Crossmint Minting API",
        },
        recipient: `polygon:${data.wallet}`,
        credential: {
          subject: {
            age: 42,
            username: "dmulvi",
          },
          expiresAt: "2034-12-12",
        },
      };

      const apiResponse = await callCrossmintAPI(
        "unstable/collections/c2a48f3e-de5e-477a-b003-3dd885976908/credentials",
        {
          method: "POST",
          body,
        }
      );

      return NextResponse.json(apiResponse, { status: 200 });
    } else {
      return NextResponse.json(
        { error: true, message: "Missing wallet" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("failed to issue vc");
    return NextResponse.json(
      { message: "Error issuing credential" },
      { status: 500 }
    );
  }
}
