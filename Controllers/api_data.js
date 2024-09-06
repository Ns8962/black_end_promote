const connect = require('../Config/db_detail');
const multer = require('multer');
const path = require('path');

    // กำหนดการตั้งค่า multer สำหรับการเก็บไฟล์
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/uploads/'); // โฟลเดอร์สำหรับเก็บไฟล์
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // ตั้งชื่อไฟล์
        }
    });

    // กำหนดการอัปโหลด
const upload = multer({ storage: storage });


exports.add = async (req, res) => {
        // เรียกใช้งาน multer เพื่อจัดการการอัปโหลดไฟล์
        upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).send('เกิดข้อผิดพลาดในการอัปโหลดไฟล์'+err);
        }
        try {
            const conn = await connect();
            const data = await req.body;
            const uploadedFileName = req.file ? req.file.filename : null;
            const [get_data] = await conn.query(
                'INSERT INTO M_DETAIL (name_imge, datetime, detail_imge, status) VALUES (?, ?, ?, ?)', 
                [uploadedFileName, data.datetime, data.detail_imge, data.status]
            );

            const [row] = await conn.query(
                'INSERT INTO M_ITEM (NAME, DETAIL, STATUS, DATETIME, ID_IMG) VALUES (?, ?, ?, ?, ?)', 
                [data.name, data.detail, data.status, data.datetime, get_data.insertId]
            );

            res.status(200).send('บันทึกข้อมูลและอัปโหลดไฟล์สำเร็จ');
        } catch (err) {
            res.status(500).send('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            console.log('Add Error: ' + err);
        }
    });
};
