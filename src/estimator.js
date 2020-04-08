const covid19ImpactEstimator = (data) => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const currentlyInfected1 = reportedCases * 10;
  const currentlyInfected2 = reportedCases * 50;
  let multiplier;
  if (periodType === 'months') {
    multiplier = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    multiplier = timeToElapse * 7;
  } else {
    multiplier = timeToElapse;
  }
  const impactInfections = currentlyInfected1 * (2 ** (multiplier / 3));
  const severeImpactInfections = currentlyInfected2 * (2 ** (multiplier / 3));
  const impactSevereCases = 0.15 * impactInfections;
  const severeImpactSevereCases = 0.15 * severeImpactInfections;
  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: impactInfections,
      severeCasesByRequestedTime: 0.15 * impactInfections,
      hospitalBedsByRequestedTime: availableHospitalBeds - impactSevereCases
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: severeImpactInfections,
      severeCasesByRequestedTime: 0.15 * severeImpactInfections,
      hospitalBedsByRequestedTime: availableHospitalBeds - severeImpactSevereCases
    }
  };
};
export default covid19ImpactEstimator;
