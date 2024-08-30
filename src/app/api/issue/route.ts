import { NextRequest, NextResponse } from "next/server";
import { callCrossmintAPI } from "@/app/utils/crossmint";
import { createStudentId, createCourse } from "../../utils/credentials";

// required for CORS
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ status: 200 });
}

const handleStudentId = async (data: any) => {
  const { recipient, firstName, lastName, secret } = data;
  const body = createStudentId(recipient, firstName, lastName, secret);
  const collectionId = process.env.NEXT_PUBLIC_STUDENT_ID_COLLECTION;

  const apiResponse = await callCrossmintAPI(
    `v1-alpha1/credentials/templates/${collectionId}/vcs`,
    {
      method: "POST",
      body,
    }
  );

  return apiResponse;
};

const handleCourse = async (data: {
  recipient: string;
  courseId: string;
  finalGrade: number;
}) => {
  const { recipient, courseId, finalGrade } = data;
  const body = createCourse(recipient, courseId, finalGrade);
  const collectionId = process.env.NEXT_PUBLIC_COURSE_COLLECTION;

  console.log("sending api reqeust...");

  const apiResponse = await callCrossmintAPI(
    `v1-alpha1/credentials/templates/${collectionId}/vcs`,
    {
      method: "POST",
      body,
    }
  );

  return apiResponse;
};

type HandlerType = "studentId" | "course";

interface Data {
  type: HandlerType;
  recipient: string;
}

const handlers: Record<HandlerType, (data: any) => Promise<any>> = {
  studentId: handleStudentId,
  course: handleCourse,
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
    console.log("failed to issue vc", error);
    return NextResponse.json(
      { message: "Error issuing credential" },
      { status: 500 }
    );
  }
}
