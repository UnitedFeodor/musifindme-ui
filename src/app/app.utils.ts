export function isObjectNotEmpty(obj: any): boolean {
  return Object.keys(obj).length > 0;
}
export function isSupportedSocialByName(network: string): boolean {
  return socialIcons.hasOwnProperty(network.toLowerCase());
}

export function isSupportedSocialByLink(network: string): boolean {
  const url = new URL(network);
  const hostname = url.hostname;

  return socialHostnames.hasOwnProperty(hostname);
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