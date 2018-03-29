const functions = require('firebase-functions');
// const admin = require("firebase-admin");
const { JWT } = require('google-auth-library');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const sheetkey = require('./sheets-service-account-key.json');

// admin.initializeApp(functions.config().firebase);


exports.addemail = functions.https.onRequest((req, res) => {
	// if (req!='POST')
	// {
 	//	res.status(500).send({ error: 'Invalid request' });
	// }
	// else
	// {
	const client = new JWT({
		email: sheetkey.client_email,
		key: sheetkey.private_key,
		scopes: ['https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/cloud-platform"]
	});
	client.authorize((err, tokens) => {
		if (err) {
			console.error(err);
			throw err;
		}
		var request = {
			spreadsheetId: '1fVtoxpMOkEqCyNxwQwrcU1w66BE8CUBW_wQY1zi0sr4',
			range: 'FormUsers!A1:C1',
			insertDataOption: 'INSERT_ROWS',
			valueInputOption: 'RAW',
			resource: {
				values: [
					["some", "more test", "data"]
				],
			},
			auth: client
		};

		sheets.spreadsheets.values.append(request,function(err,response) {
			if (err) {
				console.error(err);
				throw err;
			}
			else
			{
				res.status(200).send('email add success');
				console.log("email add success");
			}
		});
	});
});