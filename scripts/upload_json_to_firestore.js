class UploadJsonToFirestore {
    constructor() {
        this.firebase_admin_module = require('../firebase_admin')
        this.FirebaseAdmin = new this.firebase_admin_module()
        this.fs = require('fs')

    }
    fromFile(paths, file) {
        console.log('Uploading')
        let content = this.fs.readFileSync(file, "utf8")
        let json = JSON.parse(content)
        for (var key in json) {
          if (json.hasOwnProperty(key)) {
            json[key].forEach((item) => {
              console.log(item)
            })
          }
        }

        for (var key in json) {
          if (json.hasOwnProperty(key)) {
            json[key].forEach((item) => {
              console.log(item)
              let fireAdmin = this.FirebaseAdmin
                .firestoreDB()
              fireAdmin = fireAdmin.collection(paths[0])
              fireAdmin = fireAdmin.doc()
              fireAdmin.set(item)
                .then(() => {
                    console.log('Uploaded')
                }).catch(error => {
                    console.log(error)
                })
            })
          }
        }
    }
}

module.exports = UploadJsonToFirestore
