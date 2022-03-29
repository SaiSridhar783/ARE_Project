export function calculateErm(D, gsi, Ei) {
	let denominator = 1 + Math.exp((60 + 15 * D - gsi) / 11);
	return Ei * (0.02 + (1 - D / 2) / denominator);
}

export function calculateErmWithoutEi(D, gsi) {
	let denominator = 1 + Math.exp((75 + 25 * D - gsi) / 11);
	return 10 ** 5 * ((1 - D / 2) / denominator);
}

export function calculateTensileStress(Sci, mi) {
	return Sci / (0.81 * mi + 7);
}

export function calculateMb(mi, gsi, D) {
	return mi * Math.exp((gsi - 100) / (28 - 14 * D));
}

export function calulateS(gsi, D) {
	return Math.exp((gsi - 100) / (9 - 3 * D));
}

export function calculateA(gsi) {
	return 0.5 + (Math.exp(-gsi / 15) - Math.exp(-20 / 3)) / 6;
}

export function calculateScm(Sci, mb, s, a) {
	let numerator = (mb + 4 * s - a * (mb - 8 * s)) * (mb / 4 + s) ** (a - 1);
	return (Sci * numerator) / (2 * (1 + a) * (2 + a));
}

export function calculateS3MaxTunnel(Scm, Sinsitu) {
	return 0.47 * Scm ** 0.06 * Sinsitu ** 0.94;
}

export function calculateS3MaxSlope(Scm, Sinsitu) {
	return 0.72 * Scm ** 0.09 * Sinsitu ** 0.91;
}

export function calculateS3n(S3max, Sci) {
	return S3max / Sci;
}

export function calculatePHI(S3n, mb, s, a) {
	let numerator = 6 * a * mb * (s + mb * S3n) ** (a - 1);
	let denominator = 2 * (1 + a) * (2 + a) + numerator;
	return (Math.asin(numerator / denominator) * 180) / Math.PI;
}

export function calculateCohesion(S3n, Sci, mb, s, a) {
	let numerator =
		Sci *
		((1 + 2 * a) * s + (1 - a) * mb * S3n) *
		(s + mb * S3n) ** (a - 1);

	let denominator =
		(1 + a) *
		(2 + a) *
		Math.sqrt(
			1 + (6 * a * mb * (s + mb * S3n) ** (a - 1)) / ((1 + a) * (2 + a))
		);

	return numerator / denominator;
}

export function calculatePHIWithS3(a, mb, S3, Sci, s) {
	let constant = 1 + a * mb * (s + (mb * S3) / Sci) ** (a - 1);
	return (Math.asin((constant - 1) / (constant + 1)) * 180) / Math.PI;
}

export function calculateCohesionWithS3(S3, Sci, mb, a, s, phiM) {
	let constant =
		Sci * (s + (mb * S3) / Sci) ** (a - 1) * ((mb * S3) / Sci + s - a * mb);

	let term = (constant * (1 - Math.sin(phiM))) / Math.cos(phiM) / 2;
	return term;
}
