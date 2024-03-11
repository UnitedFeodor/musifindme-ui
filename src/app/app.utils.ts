export function isObjectNotEmpty(obj: any): boolean {
  return Object.keys(obj).length > 0;
}

export const socialIcons: { [key: string]: string } = {
  twitter: 'cibTwitter',
  instagram: 'cibInstagram',
  vk: 'cibVk',
  facebook: 'cibFacebook',
  spotify: 'cibSpotify',
  appleMusic: 'cibAppleMusic',
  soundcloud: 'cibSoundcloud',
  yandex: 'cibYandex'
};
