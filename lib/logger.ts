import chalk from "chalk";
import readline from "readline";
import padStart from "string.prototype.padstart";

const format = (label, msg) => {
  return msg
    .split("\n")
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : padStart(line, chalk.reset(label).length);
    })
    .join("\n");
};

const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg = "", tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

export const info = (msg = "", tag = null) => {
  console.log(
    format(chalk.bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg)
  );
};

export const done = (msg = "", tag = null) => {
  console.log(
    format(chalk.bgGreen.black(" DONE ") + (tag ? chalkTag(tag) : ""), msg)
  );
};

export const warn = (msg = "", tag = null) => {
  console.warn(
    format(
      chalk.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""),
      chalk.yellow(msg)
    )
  );
};

export const error = (msg: string | Error = "", tag = null) => {
  console.error(
    format(chalk.bgRed(" ERROR ") + (tag ? chalkTag(tag) : ""), chalk.red(msg))
  );
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

export const clearConsole = (title) => {
  if (process.stdout.isTTY) {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};