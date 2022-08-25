export const toDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const [slashDate, time] = date.toLocaleString().split(' ');
  const [year, m, d] = slashDate.split('/');
  const mm = `0${m}`.slice(-2);
  const dd = `0${d}`.slice(-2);
  const [hour, min] = time.split(':');
  return `${year}-${mm}-${dd} ${hour}:${min}`;
};

export const ensure = <T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.',
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};
