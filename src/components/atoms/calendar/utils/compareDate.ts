
/**
 * a가 더 클 경우  -1
 * a와 b와 같을 경우 0
 * b가 더 클 경우 1 
 * @param a 
 * @param b 
 */
export function compareDate(a: Date, b: Date): -1 | 0 | 1 {
  const aTime = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const bTime = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

  if (aTime === bTime) {
    return 0;
  }

  if (aTime > bTime) {
    return -1;
  }

  return 1;
}