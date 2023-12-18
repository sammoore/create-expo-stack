// export types
export interface CliFlags {
	noGit: boolean;
	noInstall: boolean;
	importAlias: string;
	packageManager: PackageManager;
}

export const availablePackages = [
	'@react-navigation/drawer',
	'expo-router',
	'expoRouter',
	'firebase',
	'nativewind',
	'react-navigation',
	'reactNavigation',
	'react-native-gesture-handler',
	'react-native-reanimated',
	'reactnavigation',
	'stylesheet',
	'supabase',
	'tamagui',
	'vexo-analytics'
] as const;

export type NavigationTypes = 'stack' | 'tabs' | 'drawer' | undefined;

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'bun';

export type AvailablePackages = {
	name: (typeof availablePackages)[number];
	type: 'navigation' | 'styling' | 'authentication' | 'analytics';
	options?: { type?: NavigationTypes };
};

export interface CliResults {
	projectName: string;
	packages: AvailablePackages[];
	flags: CliFlags;
}
