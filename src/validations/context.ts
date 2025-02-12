import type { ValidationProps } from 'commandkit';
import { getContext } from '../modules/prisma.js';
 
export default async function ({ interaction, commandObj, handler }: ValidationProps) {
	// Create a context if it doesn't exist
	// TODO: Find a better way to do this rather than creating a context for every interaction
	await getContext(interaction);

	return false;
};