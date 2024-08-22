# Crossmint Verifiable Credentials Demo

This demo will get you up and running with Crossmint verifiable credentials quickly. Check out the docs (https://docs.crossmint.com/verifiable-credentials/introduction) and API reference (https://docs.crossmint.com/api-reference/verifiable-credentials/credentials/issue-credential) for more info!

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Use Cases](#use-cases)
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

3. Create a Crossmint Developer Account at https://staging.crossmint.com.

4. Create a server-side API key with the following scopes: 
   - `nfts.create`
   - `collections.create` 
   - `credentials.create`
   - `credentials:templates.create`
   - `credentials.read` 
   - `credentials.delete` <br />
   Check docs for more info on [Crossmint API Keys](https://docs.crossmint.com/introduction/platform/api-keys).

5. Create a client-side API key with the following scopes: `wallets:nfts.read` and `wallets.read`. (To fully demonstrate and test third party verification you'll need to create a new project in the crossmint developer console and a new client-side key under that project. You can use the same client-side key initially.)

6. Copy the content in the `sample.env` file to a newly created local environment file named `.env.local`. You'll need to fill in your own values. You can get your dynamic environment ID at [dynamic.xyz](https://dynamic.xyz/)

7. Create `Types` and `Templates` via API

   - check the `/scripts` directory in this repository to get started
   - you'll need to run each script in a specific order
     1. `node create-student-id-type.js` (note the returned id, i.e. `crossmint:<projectId>":<typeName>` to reference it when running the next file)
     2. `node create-student-id-template.js` (note the returned collectionId and add it to the `.env.local` file)
     3. `node create-course-type.js` (note the returned id, i.e. `crossmint:<projectId>":<typeName>` to reference it when running the next file)
     4. `node create-course-template.js` (note the returned collectionId and add it to the `.env.local` file)

8. Go to the developer console and access the Student ID Template Contract Address. 
    - Since you have already created the student ID template via the script above, you will be able to find it under the Collections tab. Select the template, navigate to the "Smart Contract" tab to get the deployed contract address. 
    - Save this value to the `NEXT_PUBLIC_STUDENT_ID_CONTRACT` entry in the environment file. This is used to run a helper function that checks if the logged in user has a student ID.

9. Start the development server

```shell
yarn run dev
```

Now, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

This demo is designed to showcase the power of verifiable credentials in an educational context. Here's a brief overview of how it works:

- **Home Page**: The home page welcomes users to Shibetoshi University. If a user doesn't have a Student ID, they can create one by clicking on the "Create Student ID" button. This will open a form where they can enter their details and submit the form to issue a new Student ID credential.

- **Courses Page**: The courses page lists all available courses. Each course has a test associated with it. Users can take the test by clicking on the course card. If they pass the test, a new Course credential is issued to them.

- **Profile Page**: The profile page displays all the credentials a user has earned. It fetches the credentials from the blockchain and verifies them. Users can refresh their credentials by clicking on the "Refresh" button.

- **Third-Party Verifier Page**: This page demonstrates how credentials issued by Shibetoshi University can be verified by a third party. It uses a different API key to simulate a third-party application.

## Use Cases

- **Transcripts**: This demo implements a version of this. When you complete course you are issed a credential that you own and control. You can then present those credentials to other universities to prove you completed the prerequisites for other classes.
- **Medical Records**: Have you ever had to transfer or share medical records from one provider to another or even acquire them for yourself? It is often a ridiculously beurocratic endeavor that can take weeks. Verifiable credentials is a viable solution to this problem.
- **Job History**: Imagine a system where your job history and even performance is stamped into a verified credential. You could easily prove your past accolades to new potential employers.
- **Identity**: Many companies are required to perform KYC on their customers when dealing with money transfers. Build a system that enables you to do KYC once and verify at your discretion with other companies without needing complete the same process over and over.
- **Private NFTs**- Build an app where you can memorialize your favorite family photos, but store them encrypted on IPFS. You can rest assured they are safely stored online, but inaccessible to anyone but you.

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
