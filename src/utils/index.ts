import {toHTML} from 'slack-markdown';
import DOMPurify from 'dompurify';

export const sanitizeHTML = (text: string) => ({
  __html: DOMPurify.sanitize(toHTML(text)),
});

export const toDate = (date: string, timestamp: string) => {
  const [, time] = new Date(parseInt(timestamp) * 1000)
    .toLocaleString()
    .split(' ');
  const [hour, min] = time.split(':');
  return `${date} ${hour}:${min}`;
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
