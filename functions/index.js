const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//
exports.exportProject = functions.https.onRequest((request, response) => {
    const db = admin.firestore();

    if (request.query.id) {
        db.collection('projects').where("id", "==", request.query.id).get()
        .then(querySnapshot => {
            if (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const project = doc.data();
                    if(!project.isPrivate) {
                        response.set("Content-Type", "application/json");
                        response.send(project);
                    } else {
                        response.set("Content-Type", "text/plain");
                        response.sendStatus(404).send('This project is private and not available for import.')
                    }
                });
            } else {
                response.set("Content-Type", "text/plain");
                response.sendStatus(404).send('Project not found');
            }
        })
        .catch(e => {
            console.log(e);
            response.set("Content-Type", "text/plain");
            response.sendStatus(404).send('Project not found');
        });    
    } else {
        response.set("Content-Type", "text/plain");
        response.sendStatus(404).send('Invalid project ID.');
    }
});

exports.exportFile = functions.https.onRequest((request, response) => {
    const json2csv = require("json2csv").parse;

    const db = admin.firestore();
    const ordersRef = db.collection('projects');
    return ordersRef.where("id", "==", request.query.id).get()
    .then((querySnapshot) => {
        const projects = [];

        querySnapshot.forEach(doc => {
            const project = doc.data();
            projects.push(project);
        });
        const csv = json2csv(projects);
        response.setHeader(
            "Content-disposition",
            "attachment; filename=project_export.csv"
        );
        response.set("Content-Type", "text/csv");
        response.status(200).send(csv);
    }).catch((err) => {
        console.log(err);
    });
});

exports.importFile = functions.https.onRequest((request, response) => {
    const requestNpm = require("request");
    const csv = require("csvtojson");
    const bucket = admin.storage().bucket();
    const options = {
      version: "v2", 
      action: "read",
      expires: Date.now() + 1000 * 60 * 5 // 5 mins
    };
    return bucket
        .file(request.query.pathName)
        .getSignedUrl(options)
        .then((data) => {
            csv()
            .fromStream(requestNpm.get(data[0].toString()))
            .subscribe(function(json) {
                return response.send(json);
            }); 
        })
        .catch(err => {
            console.log(err);
        });
});