var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to GalleryImages table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var welcomeImagesData = 
  JSON.parse(fs.readFileSync('../components/data/welcome.json', 'utf8'));

welcomeImagesData.forEach(function(welcomeImages) {  // Changed welcomeImageData to welcomeImagesData
  var className = welcomeImages.className;
  if (className.trim() == "")
    className = "no_class";

  var params = {
    TableName: "welcomeImages",
    Item: {
      "src": welcomeImages.src,
      "alt": welcomeImages.alt,
      "className": className
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
        welcomeImages.src, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", welcomeImages.src, "to table.")
  });
});
