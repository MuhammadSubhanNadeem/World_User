import path from 'path';
import fs from 'fs';
import cors from "cors"
import express from "express"
const app = express();
app.use(express.json())
app.use(cors({origin: '*', allowedHeaders: ['Content-Type']}));
let file_path = path.join(path.dirname(import.meta.dirname), "data/file.json");
app.post("/", (req, res) => {
    res.header({"Content-Type": "application/json"})
    console.log(req.body);
    let totalData = [];
    let userData = req.body;
    fs.readFile(file_path, (err, data) => {
        let users_data = JSON.parse(data);
        if (!users_data) {
            console.log("empty", typeof users_data, users_data);
        }
        totalData = users_data;
        let duplication = checkDuplication(users_data, userData.email);
        if (!duplication) {
            totalData.push({"name": userData.name, "email": userData.email});
            appendData(totalData, false);
        } else{
            appendData(totalData, true);
        }
    })
    function checkDuplication(data, email) {
        if (data.length > 0) {
            totalData = [];
            let check = false;
            data.forEach((each_data) => {
                totalData.push(each_data);
                if (each_data.email === email) {
                    check = true;
                }
            });
            if (check) {
                return true;
            } else {
                return false;
            }
        } else{
            return false;
        }
    }
    function appendData(data, duplication) {
        fs.writeFile(file_path, JSON.stringify(data), (err) => {
            if (err) {
                res.end(JSON.stringify({"res": "bad"}))
            } else if(duplication){
                res.end(JSON.stringify({"res": "bad"}))
            } else{
                res.end(JSON.stringify({"res": "good"}))
            }
        });
    }
})
app.get("/data", (req, res) => {
    res.header({"Content-Type": "application/json"})
    fs.readFile(file_path, (err, data) => {
        if (err) {
            res.end(JSON.stringify({"res": "bad"}));
        }
        let users_data = JSON.parse(data);
        res.write(JSON.stringify(users_data));
        res.end();
    })
})
app.listen(process.env.PORT, () => {
    console.log(`PORT LISTENING ON ${process.env.PORT}`);
});
module.exports = app;