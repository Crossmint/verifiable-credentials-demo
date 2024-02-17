import { courses } from "./courses";

interface Attribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

interface Metadata {
  name: string;
  image: string;
  description: string;
  attributes?: Attribute[];
}

interface StudentId {
  metadata: Metadata;
  recipient: string;
  credential: {
    subject: {
      firstName: string;
      lastName: string;
      studentId: string;
      secret: string;
    };
    expiresAt: string;
  };
}

interface Course {
  metadata: Metadata;
  recipient: string;
  credential: {
    subject: {
      courseName: string;
      courseNumber: number;
      finalGrade: number;
      issueDate: number;
    };
    expiresAt: string;
  };
}

interface Certificate {
  metadata: Metadata;
  recipient: string;
  credential: {
    subject: {
      certificateName: string;
      overallGrade: number;
      issueDate: number;
    };
    expiresAt: string;
  };
}

export function createStudentId(
  recipient: string,
  firstName: string,
  lastName: string,
  secret: string
): StudentId {
  return {
    metadata: {
      name: "Shibetoshi Student ID",
      image: "ipfs://QmUi84qorq5CBi8AUn5JpX77BPP9ARkkWdssfFNpSsRU86",
      description:
        "Used to access university programs, campuses, and platforms.",
      attributes: [
        {
          trait_type: "credentialType",
          value: "studentId",
        },
      ],
    },
    recipient,
    credential: {
      subject: {
        firstName,
        lastName,
        studentId: generateStudentId(),
        secret: "",
      },
      expiresAt: getExpiryDate(10),
    },
  };
}

export function createCourse(
  recipient: string,
  courseId: string,
  finalGrade: number
): Course {
  const course = getCourseById(courseId);
  return {
    metadata: course.metadata,
    recipient,
    credential: {
      subject: {
        courseName: course.name,
        courseNumber: course.number,
        finalGrade,
        issueDate: Date.now(),
      },
      expiresAt: getExpiryDate(10),
    },
  };
}

export function createCertificate(
  recipient: string,
  certificateName: string,
  overallGrade: number
): Certificate {
  return {
    metadata: {
      name: "Blockchain Fundamentals Certificate",
      image: "ipfs://QmWagNXyhNsB9Zheb1ek4KCdAXJrqfGePVfp66Ea8MXq9c",
      description:
        "Demonstrates completion of the blockchain fundamentals certificate program.",
      attributes: [
        {
          trait_type: "credentialType",
          value: "blockchainCertificate",
        },
      ],
    },
    recipient,
    credential: {
      subject: {
        certificateName,
        overallGrade,
        issueDate: Date.now(),
      },
      expiresAt: getExpiryDate(10),
    },
  };
}

function getExpiryDate(yearsFromNow: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + yearsFromNow);
  return date.toISOString().split("T")[0];

  //return Math.floor(Date.now() / 1000);
}

function generateStudentId(): string {
  const min = 10000000;
  const max = 99999999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

function getCourseById(courseId: string): any {
  const course = courses.find((course) => course.id === courseId);

  return {
    name: course?.name,
    number: course?.courseNumber,
    metadata: {
      name: course?.name,
      image: course?.image,
      description: course?.description,
      attributes: [
        {
          trait_type: "credentialType",
          value: "course",
        },
        {
          trait_type: "courseId",
          value: course?.id,
        },
      ],
    },
  };
}
