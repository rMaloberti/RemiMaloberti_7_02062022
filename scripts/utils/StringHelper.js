// STRING HELPER
export default class StringHelper {
  // NORMALIZE
  static normalize = (string) => {
    // Normalized string
    let normalizedString = '';

    // Lower case the string
    normalizedString = string.toLowerCase();

    // Remove accents
    normalizedString = normalizedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove spaces and special characters
    normalizedString = normalizedString.replace(/([^\w]+|\s+)/g, '-');

    // Remove hyphens at the start and at the end of the string
    normalizedString = normalizedString.replace(/(^-+|-+$)/g, '');

    return normalizedString;
  };
}
