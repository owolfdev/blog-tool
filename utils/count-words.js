export const countWords = (str) => {
  // Remove HTML tags
  str = str.replace(/<[^>]*>/g, "");

  // Remove Markdown tags
  str = str.replace(/[#*_\[\]]/g, "");

  // Split the text into an array of words
  const words = str.trim().split(/\s+/);

  // Get the number of words
  const numWords = words.length;

  return numWords;
};
