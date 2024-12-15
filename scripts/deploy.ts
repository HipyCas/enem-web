import { Client } from "basic-ftp";
import "dotenv/config";
import chalk from "chalk";
import hr from "@tsmx/human-readable";

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
client.ftp.verbose = argv.includes("-") || argv.includes("--verbose");

const showProgress: Parameters<(typeof client)["trackProgress"]>[0] = (
  info,
) => {
  console.log("\x1b[2J");
  console.log(
    chalk.dim(
      prod
        ? chalk.bgYellow("⚠ Uploading to production")
        : "🛈 Uploading to prueba.anem.es/2025",
    ),
  );
  console.log(
    chalk.bold(
      `${chalk.green(capitalizeFirstLetter(info.type))} ${chalk.blue(info.name)}`,
    ),
  );
  console.log("Transferred:", humanBytes(info.bytes));
  console.log("Transferred Overall:", humanBytes(info.bytesOverall));
};

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

    client.trackProgress(showProgress);
    await client.uploadFromDir(process.env.DEPLOY_FTP_FOLDER as string, "/");
    // console.info(client.list(""));
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

main();

function humanBytes(bytes: number) {
  return hr.fromBytes(bytes, { fixedPrecision: 2 });
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
