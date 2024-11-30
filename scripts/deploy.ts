import { Client } from "basic-ftp";
import "dotenv/config";
import chalk from "chalk";

import path from "node:path";
import { argv } from "node:process";

const prod = argv.includes("prod");
if (prod) console.info(chalk.yellow("Deploying to production"));

if (
  !(
    process.env.DEPLOY_FTP_USERNAME &&
    process.env.DEPLOY_FTP_PASSWORD &&
    process.env.DEPLOY_PROD_FTP_USERNAME &&
    process.env.DEPLOY_PROD_FTP_PASSWORD &&
    process.env.DEPLOY_FTP_FOLDER
  )
)
  process.exit(1);

const client = new Client();
client.ftp.verbose = true;

async function main() {
  try {
    await client.access({
      host: "eu11.hostingenius.com",
      user: prod
        ? process.env.DEPLOY_PROD_FTP_USERNAME
        : process.env.DEPLOY_FTP_USERNAME,
      password: prod
        ? process.env.DEPLOY_PROD_FTP_PASSWORD
        : process.env.DEPLOY_FTP_PASSWORD,
      secure: true,
    });
    // console.info(await client.list(""));

    await client.uploadFromDir(process.env.DEPLOY_FTP_FOLDER as string, "/");
    // console.info(client.list(""));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

main();
