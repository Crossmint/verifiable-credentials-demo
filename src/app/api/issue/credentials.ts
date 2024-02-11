interface Metadata {
  name: string;
  image: string;
  description: string;
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
      issueDate: Date;
    };
    expiresAt: Date;
  };
}

interface Certificate {
  metadata: Metadata;
  recipient: string;
  credential: {
    subject: {
      certificateName: string;
      overallGrade: number;
      issueDate: Date;
    };
    expiresAt: Date;
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
      name: "Shibetoshi University ID",
      image: "ipfs://QmUi84qorq5CBi8AUn5JpX77BPP9ARkkWdssfFNpSsRU86",
      description:
        "Used to access university programs, campuses, and platforms.",
    },
    recipient,
    credential: {
      subject: {
        firstName,
        lastName,
        studentId: generateStudentId(),
        secret,
      },
      expiresAt: "2034-02-12",
    },
  };
}

export function createCourse(
  metadata: Metadata,
  recipient: string,
  courseName: string,
  courseNumber: number,
  finalGrade: number
): Course {
  return {
    metadata,
    recipient,
    credential: {
      subject: {
        courseName,
        courseNumber,
        finalGrade,
        issueDate: new Date(),
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
    },
    recipient,
    credential: {
      subject: {
        certificateName,
        overallGrade,
        issueDate: new Date(),
      },
      expiresAt: getExpiryDate(10),
    },
  };
}

export function getExpiryDate(yearsFromNow: number): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() + yearsFromNow);
  return date;
}

export function generateStudentId(): string {
  const min = 10000000;
  const max = 99999999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}
