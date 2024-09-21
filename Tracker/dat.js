// Get the current date and time
const currentDate = new Date();

// Get the individual components
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const year = currentDate.getFullYear();

const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Combine them into the desired format: dd/mm/yyyy hh:mm:ss
const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

console.log(formattedDateTime); // Example Output: 15/09/2024 14:30:45
