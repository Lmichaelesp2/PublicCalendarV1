export type GroupType = 'real_estate' | 'networking' | 'chamber' | 'small_business' | 'technology';

const GROUP_TYPE_MAP: Record<string, string> = {
  real_estate: 'real_estate',
  realestate: 'real_estate',
  networking: 'networking',
  chamber: 'chamber',
  small_business: 'small_business',
  smallbusiness: 'small_business',
  technology: 'technology',
  tech: 'technology',
};

export function resolveGroupType(input: string): string {
  return GROUP_TYPE_MAP[input.toLowerCase()] ?? input;
}

export const CITY_SLUGS: Record<string, string> = {
  austin: 'Austin',
  dallas: 'Dallas',
  houston: 'Houston',
  'san-antonio': 'San Antonio',
};
