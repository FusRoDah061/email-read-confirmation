import { createHash } from 'crypto';

export default function md5(text: string): string {
  const hash = createHash('md5').update(text).digest('hex');
  return hash;
}
