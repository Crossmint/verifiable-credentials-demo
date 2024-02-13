import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";
import { createStudentId } from "./credentials";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

const handleStudentId = async (data: any) => {
  const { recipient, firstName, lastName, secret } = data;
  const body = createStudentId(recipient, firstName, lastName, secret);
  const collectionId = process.env.NEXT_PUBLIC_STUDENT_ID_COLLECTION;

  const apiResponse = await callCrossmintAPI(
    `unstable/collections/${collectionId}/credentials`,
    {
      method: "POST",
      body,
    }
  );

  return apiResponse;
};

type HandlerType = "studentId"; // Add more types as needed

interface Data {
  type: HandlerType;
  recipient: string;
  // Add more properties as needed
}

const handlers: Record<HandlerType, (data: any) => Promise<any>> = {
  studentId: handleStudentId,
  // Add more handlers here as needed
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data: Data = await req.json();
  console.log("issue credential: ", data);

  const handler = handlers[data.type];
  if (!data.recipient || !handler) {
    return NextResponse.json(
      { error: true, message: "Missing wallet or invalid type" },
      { status: 400 }
    );
  }

  try {
    const apiResponse = await handler(data);
    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error) {
    console.log("failed to issue vc");
    return NextResponse.json(
      { message: "Error issuing credential" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest, res: NextResponse) {

//     const data = await req.json();
//     console.log("issue credential: ", data);

//   if (!data.recipient) {
//     return NextResponse.json(
//       { error: true, message: "Missing wallet" },
//       { status: 400 }
//     );
//   }

//     if (data.recipient) {
//       let apiResponse;

//       switch (data.type) {
//         case "studentId":
//           apiResponse = await handleStudentId(data);
//           break;

//         default:
//           break;
//       }

//       return NextResponse.json(apiResponse, { status: 200 });
//     } else {
//       return NextResponse.json(
//         { error: true, message: "Missing wallet" },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.log("failed to issue vc");
//     return NextResponse.json(
//       { message: "Error issuing credential" },
//       { status: 500 }
//     );
//   }
// }
