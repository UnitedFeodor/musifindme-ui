export function isObjectNotEmpty(obj: any): boolean {
  return Object.keys(obj).length > 0;
}
export function isSupportedSocialByName(network: string): boolean {
  return socialIcons.hasOwnProperty(network.toLowerCase());
}

export function isSupportedSocialByLink(network: string): boolean {
  try {
    const url = new URL(network);
    const hostname = url.hostname;
    return socialHostnames.hasOwnProperty(hostname);
  } catch (error) {
    console.error('Failed to parse URL:', error);
    return false;
  }
}

export function getSocialNameByLink(link: string): string {
  const url = new URL(link);
  const hostname = url.hostname;

  return socialHostnames[hostname];
}

export const socialIcons: { [key: string]: string } = {
  twitter: 'cibTwitter',
  instagram: 'cibInstagram',
  vk: 'cibVk',
  facebook: 'cibFacebook',

  spotify: 'cibSpotify',
  appleMusic: 'cibAppleMusic',
  soundcloud: 'cibSoundcloud',
  yandex: 'cibYandex',

  telegram: 'cibTelegramPlane'
};
const socialHostnames: { [key: string]: string } = {
  'twitter.com': 'twitter',
  'www.instagram.com': 'instagram',
  'vk.com': 'vk',
  'www.facebook.com': 'facebook',
  'open.spotify.com': 'spotify',
  'music.apple.com': 'appleMusic',
  'soundcloud.com': 'soundcloud',
  'music.yandex.ru': 'yandex',
  't.me': 'telegram'
};