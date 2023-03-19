export const countWords = (str) => {
  // Remove HTML tags
  str = str.replace(/<[^>]*>/g, "");

  // Remove Markdown tags
  str = str.replace(/[#*_\[\]]/g, "");

  // Trim the text and check for empty string
  str = str.trim();
  if (str === "") {
    return 0;
  }

  // Split the text into an array of words
  const words = str.split(/\s+/);

  // Get the number of words
  const numWords = words.length;

  return numWords;
};
