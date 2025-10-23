export const isIOSDevice = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const isIOSPlatform = /iP(ad|hone|od)/.test(ua);
  const isTouchMac = platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  return isIOSPlatform || isTouchMac;
};
