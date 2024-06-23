import chalk from 'chalk';

function time() {
	const date = new Date().toISOString().split('.').shift() + 'Z';
	return chalk.gray(`[${date}]`);
}

export const logger = {
	info: (message: string) => console.log(`${time()} ${chalk.blueBright('[INFO]')}\t`, message),
	warn: (message: string) => console.log(`${time()} ${chalk.yellowBright('[WARN]')}\t`, message),
	error: (message: any) => console.error(`${time()} ${chalk.redBright('[ERROR]')}\t`, message),
	success: (message: string) => console.log(`${time()} ${chalk.greenBright('[SUCCESS]')}`, message),
};