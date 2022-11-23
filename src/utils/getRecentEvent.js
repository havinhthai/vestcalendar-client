export function sortListEvent(eventList, multiplier = 1) {
  return eventList.sort(
    (objA, objB) => multiplier * (Number(new Date(objA.time)) - Number(new Date(objB.time))),
  );
}

export function getLastEvent(eventList) {
  const sortedList = sortListEvent(eventList, -1);

  const latestEvent = sortedList.find((item) => Number(new Date(item.time)) < Date.now()) || null;

  return latestEvent;
}

export function getNextEvent(eventList) {
  const sortedList = sortListEvent(eventList);

  const nextEvent = sortedList.find((item) => Number(new Date(item.time)) > Date.now()) || null;

  return nextEvent;
}

export function getNextEventHasAllocations(eventList) {
  const sortedList = sortListEvent(eventList);

  const nextEvent = sortedList.find(
    (item) => (Number(new Date(item.time)) > Date.now() && item.allocations),
  ) || null;

  return nextEvent;
}
