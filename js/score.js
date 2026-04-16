/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // Configuration
    const maxPoints = 10; // dont edit this bro this is my setting buffoon
    const floorPoints = 1; // 1 cus it's the min point buffoon
    const floorRank = 15; // How many levels rn you buffoon

    // If rank is below the floor or invalid, return 0
    if (rank > floorRank || rank < 1) {
        return 0;
    }

    const b = Math.log(floorPoints / maxPoints) / (floorRank - 1);
    const baseScore = maxPoints * Math.exp(b * (rank - 1));

    // Apply percentage scaling (how much of the level was completed)
    let finalScore = baseScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    // Ensure score doesn't dip below 0
    finalScore = Math.max(0, finalScore);

    // Apply penalty: If not 100% completion, reduce score by 1/3
    if (percent !== 100) {
        return round(finalScore - (finalScore / 3));
    }

    return Math.max(round(finalScore), 0);
}

/**
 * Rounds a number to the defined scale using scientific notation 
 * to avoid floating point errors.
 * @param {Number} num 
 * @returns {Number}
 */
export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
