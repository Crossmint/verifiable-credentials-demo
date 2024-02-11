import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";
import { createStudentId } from "./credentials";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("issue credential: ", data);

    if (data.wallet) {
      const recipient = `polygon:${data.wallet}`;
      const firstName = "Danny";
      const lastName = "Mulvihill";
      const secret = "I don't mind pineapple on pizza";

      const body = createStudentId(recipient, firstName, lastName, secret);
      // const body = {
      //   metadata: {
      //     name: "Slamford CS",
      //     image: "ipfs://QmUGeWerAfyKVVdAjaxYdAhK74oJmBvusPdKtNDN3e1bYN",
      //     description: "Test NFT created using the Crossmint Minting API",
      //   },
      //   recipient: `polygon:${data.wallet}`,
      //   credential: {
      //     subject: {
      //       course: "Blockchain 101",
      //       passed: true,
      //     },
      //     expiresAt: "2034-12-12",
      //   },
      // };

      console.log("body:", body);
      //return NextResponse.json({ test: "test" }, { status: 200 });

      const collectionId = process.env.NEXT_PUBLIC_STUDENT_ID_COLLECTION;

      const apiResponse = await callCrossmintAPI(
        `unstable/collections/${collectionId}/credentials`,
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
