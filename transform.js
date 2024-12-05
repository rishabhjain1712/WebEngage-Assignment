const fs = require('fs');

const inputFile = 'sample_users_data.csv';
const outputFile = 'transformed_users_data.csv';

// Read csv
const csvData = fs.readFileSync(inputFile, 'utf-8');
const rows = csvData.split('\n');


const middleLayerMapping = {
	"user_id": "user_id",
	"first name": "first_name",
	"last name": "last_name",
	"phone": "phone",
	"email address": "email",
	"gender": "gender",
	"Age_Category": "age_category",
	"Country Residence": "country",
	"Birth date": "birthdate",
	"Registration Date": "reg_date",
  };
  
  const schemaMapping = {
	"birthdate": (value) => formatDate(value),
	"reg_date": (value) => formatDate(value),
  };
  
  const formatDate = (dateStr) => {
	// "DD-MM-YYYY HH:mm:ss" to "YYYY-MM-DD"
	const [datePart, timePart] = dateStr.split(' ');
	if (!datePart) return dateStr;
  
	const [day, month, year] = datePart.split('-');
	if (!day || !month || !year) return dateStr;
  
	return `${year}-${month}-${day}`;
  };
  
  // Transform headers
  const headers = rows[0].split(',').map((header) => middleLayerMapping[header.trim()]);
  
  // Transform data row
  const transformedRows = rows.slice(1).map((row) => {
	const values = row.split(',');
	const transformedRow = headers.map((header, index) => {
	  const value = values[index]?.trim();
	  return schemaMapping[header] ? schemaMapping[header](value) : value;
	});
	return transformedRow.join(',');
  });

const transformedCSV = [headers.join(','), ...transformedRows].join('\n');

// Write the transformed data to a new file
fs.writeFileSync(outputFile, transformedCSV);

console.log(`CSV is Transformed.`);
