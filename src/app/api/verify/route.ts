import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("verify credential: ", data);

    if (data.wallet) {
      const body = {
        credential: {
        },
      };

      const apiResponse = await callCrossmintAPI(
        "unstable/credentials/verify;",
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
