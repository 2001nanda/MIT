export const getAllSubRouteNames = (
  data: IBaseProps[]
): { boarding: string[]; dropping: string[]; busNames: string[] } => {
  const boardingSet = new Set<string>();
  const droppingSet = new Set<string>();
  const busNameSet = new Set<string>();

  console.log("getAllSubRouteNames - data length:", data.length);

  data.forEach((item, index) => {
    console.log(`Item[${index}].route:`, JSON.stringify(item.route, null, 2));

    const depSubLocations = item.route?.departureLocation?.subLocations;
    const arrSubLocations = item.route?.arrivalLocation?.subLocations;

    if (!depSubLocations || depSubLocations.length === 0) {
      console.warn(`Item[${index}] has no departure subLocations`);
    }

    if (!arrSubLocations || arrSubLocations.length === 0) {
      console.warn(`Item[${index}] has no arrival subLocations`);
    }

    depSubLocations?.forEach((sub, i) => {
      console.log(`Departure Sub[${i}] Name:`, sub.name);
      boardingSet.add(sub.name);
    });

    arrSubLocations?.forEach((sub, i) => {
      console.log(`Arrival Sub[${i}] Name:`, sub.name);
      droppingSet.add(sub.name);
    });

    if (item.busName) {
      console.log(`Item[${index}] Bus Name:`, item.busName);
      busNameSet.add(item.busName);
    }
  });

  const boarding = Array.from(boardingSet);
  const dropping = Array.from(droppingSet);
  const busNames = Array.from(busNameSet);

  console.log("Boarding Names:", boarding);
  console.log("Dropping Names:", dropping);
  console.log("Bus Names:", busNames);

  return {
    boarding,
    dropping,
    busNames,
  };
};
