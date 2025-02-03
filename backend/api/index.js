import path from "path";
import fs from "fs";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", allowedHeaders: ["Content-Type"] }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
let file_path = path.join(__dirname, "data", "file.json");
let img_file_path = path.join(__dirname, "data", "img.json");
let img_storage = path.join(__dirname, "data", "images");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, img_storage);
  },
  filename: (req, file, cb) => {
    let fileName = `${Date.now()}-${file.originalname}`;
    req.uploadedFileName = fileName;
    cb(null, fileName);
  },
});
let uploader = multer({ storage: diskStorage });
app.post("/", uploader.single("userImg"), (req, res) => {
  let totalData = [];
  let userDataBody = req.body;
  console.log(req.body);
  let uploadedFilePath = path.join(img_storage, req.uploadedFileName);
  fs.readFile(file_path, (err, data) => {
    if (err) {
      res.end({ res: "bad", cause: "Reading Err!", write: false });
    }
    let users_data = JSON.parse(data);
    if (!users_data) {
      console.log("empty", typeof users_data, users_data);
    }
    totalData = users_data;
    let duplication = checkDuplication(totalData, userDataBody.email);
    if (!duplication) {
      totalData.push({ name: userDataBody.name, email: userDataBody.email });
      req.storeData = totalData;
      req.duplicationStatus = duplication;
      appendData(totalData, duplication, userDataBody.email);
    } else {
      fs.unlink(uploadedFilePath, (err) => {
        if (err) {
          res
            .status(500)
            .json({ res: "bad", cause: "Duplication Err!", write: false });
        } else {
          res
            .status(500)
            .json({
              res: "bad",
              cause: "Duplication Err!",
              img_del: true,
              write: false,
            });
        }
      });
    }
  });
  function checkDuplication(data, email) {
    return data.some((each_data) => each_data.email === email);
  }
  res.header({ "Content-Type": "application/json" });
  function appendData(data, duplication, userEmail) {
    fs.writeFile(file_path, JSON.stringify(data), (err) => {
      if (err) {
        res.end(
          JSON.stringify({ res: "bad", cause: "Writing Err!", write: false })
        );
      } else if (duplication) {
        res.end(
          JSON.stringify({ res: "bad", cause: "Duplication Err!", write: true })
        );
      } else {
        let img_unique_key = crypto.randomBytes(8).toString("hex");
        cloudinary.uploader
          .upload(uploadedFilePath, {
            public_id: `${img_unique_key}`,
          })
          .then((cl_res) => {
            if (cl_res.public_id === img_unique_key) {
              console.log(cl_res.public_id, img_unique_key);

              fs.readFile(img_file_path, (err, img_data) => {
                if (err) {
                  res.end(
                    JSON.stringify({
                      res: "bad",
                      cause: "Img Uploading Error",
                      write: true,
                      img_upload: false,
                    })
                  );
                } else {
                  writeFileFun(JSON.parse(img_data));
                }
              });
              function writeFileFun(user_img_data) {
                console.log(
                  { user_email: userEmail, user_cloud_img: cl_res.url },
                  user_img_data
                );
                let writeAbleData = [...user_img_data];

                writeAbleData.push({
                  user_email: userEmail,
                  user_cloud_img: cl_res.url,
                });
                console.log(writeAbleData);
                fs.writeFile(
                  img_file_path,
                  JSON.stringify(writeAbleData),
                  (err) => {
                    if (err) {
                      return res.status(500).json({
                        res: "bad",
                        cause: "Img Uploading Error",
                        write: true,
                        img_upload: false,
                      });
                    } else {
                      res.status(200).json({
                        res: "good",
                        cause: null,
                        write: true,
                        img_upload: true,
                      });
                    }
                  }
                );
              }
            }
          })
          .catch((err) => {
            return res.status(500).json({
              res: "bad",
              cause: "Img Uploading Error",
              write: true,
              img_upload: false,
            });
          });
      }
    });
  }
});
app.get("/data", (req, res) => {
  res.header({ "Content-Type": "application/json" });
  console.log(file_path);
  fs.readFile(file_path, "utf-8", (err, data) => {
    if (err) {
      res.end(JSON.stringify({ res: "bad" }));
    } else if (data) {
      fs.readFile(img_file_path, "utf-8", (err, img_data) => {
        if (err) {
          res.end(JSON.stringify({ users_data: null, error: true }));
        } else {
          let users_data = JSON.parse(data);
          let img_parsed_data = JSON.parse(img_data);
          console.log(users_data);
          console.log(img_parsed_data);
          res.status(200).json({ users_data, img_parsed_data });
        }
      });
    } else {
      res.end(JSON.stringify({ res: "bad" }));
    }
  });
});
app.listen(process.env.PORT, () => {
  console.log(`PORT LISTENING ON ${process.env.PORT}`);
});
