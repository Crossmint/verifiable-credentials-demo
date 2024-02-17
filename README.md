# Crossmint Verifiable Credentials Demo

Welcome to the demo of Your Project Name! This project is a powerful tool that allows you to do XYZ. Built with modern technologies like React, Next.js, and TypeScript, it's designed to be easy to use, flexible, and efficient.

## Table of Contents

- [Getting Started](#getting-started)
- [Use Cases](#use-cases)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository

```shell
git clone https://github.com/Crossmint/verifiable-credentials-demo.git
```

2. Install dependencies

```shell
yarn install
```

3. Start the development server

```shell
yarn run dev
```

4. Create a Crossmint Developer Account

- copy the sample.env file to `.env.local` and add the values. You will need:
  - dynamic.xyz environment ID
  - create a client API key in the Crossmint developer console
  - create Types and Collections via API
  - save those collection IDs to the `.env.local`

Now, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Use Cases

- **Transcripts**: This demo implements a version of this. When you complete course you are issed a credential that you own and control. You can then present those credentials to other universities to prove you completed the prerequisites for other classes.
- **Medical Records**: Have you ever had to transfer or share medical records from one provider to another or even acquire them for yourself? It is often a ridiculously beurocratic endeavor that can take weeks. Verifiable credentials is a viable solution to this problem.
- **Job History**: Imagine a system where your job history and even performance is stamped into a verified credential. You could easily prove your past accolades to new potential employers.
- **Identity**: Many companies are required to perform KYC on their customers when dealing with money transfers. Build a system that enables you to do KYC once and verify at your discretion with other companies without needing complete the same process over and over.
- **Private NFTs**- Build an app where you can memorialize your favorite family photos, but store them encrypted on IPFS. You can rest assured they are safely stored online, but inaccessible to anyone but you.

## Usage

This demo is designed to showcase the power of verifiable credentials in an educational context. Here's a brief overview of how it works:

- **Home Page**: The home page welcomes users to Shibetoshi University. If a user doesn't have a Student ID, they can create one by clicking on the "Create Student ID" button. This will open a form where they can enter their details and submit the form to issue a new Student ID credential.

- **Courses Page**: The courses page lists all available courses. Each course has a test associated with it. Users can take the test by clicking on the course card. If they pass the test, a new Course credential is issued to them.

- **Profile Page**: The profile page displays all the credentials a user has earned. It fetches the credentials from the blockchain and verifies them. Users can refresh their credentials by clicking on the "Refresh" button.

- **Third-Party Verifier Page**: This page demonstrates how credentials issued by Shibetoshi University can be verified by a third party. It uses a different API key to simulate a third-party application.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

That's it! We hope you enjoy exploring this demo and find it useful. If you have any questions or feedback, please feel free to open an issue or submit a pull request. Happy coding!
