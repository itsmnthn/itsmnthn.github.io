export const SITE_NAME = "itsmnthn.dev";
export const SITE_URL = "https://itsmnthn.dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/itsmnthn";
export const X_URL = "https://x.com/itsmnthn";
export const GITHUB_URL = "https://github.com/itsmnthn";

// Career started Jan 2017; full years elapsed since then.
export const CAREER_START = new Date(2017, 0, 1);

export function getYearsOfExperience(now = new Date()) {
  const years = now.getFullYear() - CAREER_START.getFullYear();
  return now.getMonth() < CAREER_START.getMonth() ? years - 1 : years;
}
