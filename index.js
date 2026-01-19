import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

import { get_banner, get_menu, get_tc_menu, get_corporate_menu, get_corporate_vision, get_spotlight_menu, get_news, get_document, get_announcement, get_department, get_employee } from './component/select.js';
import { save_banner, save_menu, save_tc_menu, save_corporate_menu, save_corporate_vision, save_spotlight_menu, save_news, save_document, save_announcement } from './component/insert.js';
import { update_default_banner, update_default_menu, update_edit_menu, update_default_tc_menu, update_edit_tc_menu, update_default_corporate_menu, update_edit_corporate_menu, update_default_corporate_vision, update_edit_corporate_vision, update_default_spotlight_menu, update_edit_spotlight_menu, update_news, update_edit_announcement } from './component/update.js';
import { delete_banner, delete_menu, delete_tc_menu, delete_corporate_menu, delete_corporate_vision, delete_spotlight_menu, delete_news, delete_announcement } from './component/delete.js';

configDotenv();
const ipaddress = process.env.IPADDRESS;
const app = express();
const port = 5505;

app.set('trust proxy', 'loopback');

// กำหนดที่เก็บไฟล์
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// -------------------------
//   RATE LIMIT ปลอดภัย IPv6
// -------------------------
// สร้าง Rate Limiter เพื่อลดการโจมตี DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัดที่ 100 requests ต่อ 15 นาที
    keyGenerator: (req, res) => {
        // ใช้ helper ที่ถูกต้อง (รองรับ IPv6)
        let ip = ipKeyGenerator(req);
        // ถ้ามี port เช่น 10.1.1.5:54321 → remove port
        if (typeof ip === 'string' && ip.includes(':')) {
            // IPv4 + port (มีส่วนยาว 2 ส่วน เช่น 10.1.1.5:1234)
            if (ip.split(':').length === 2 && ip.includes('.')) {
                ip = ip.split(':')[0];
            }
        }
        return ip;
    },
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// -------------------------
// CORS
// -------------------------
app.use(cors({
    origin: ipaddress,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());

const currentdatetime = () => {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const FileTime = now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
    return FileTime;
}

// -------------------------
// ROUTES หลังบ้าน
// -------------------------
app.get(process.env.GET_BANNER, async (_, res) => {
    try {
        const result = await get_banner('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_BANNER, upload.single('image_banner'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'banner_' + currentdatetime() + ext;
        const result = await save_banner(filename, file.size);
        if (result === 'success') {
            const filepath = 'uploads/banner/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_BANNER, async (req, res) => {
    try {
        const result = await update_default_banner(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_BANNER, async (req, res) => {
    try {
        const result = await delete_banner(req.query);
        if (result === 'success') {
            if (req.query.banner_type === 'file') {
                fs.rmSync('uploads/banner/' + req.query.banner_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_MENU, async (_, res) => {
    try {
        const result = await get_menu('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_MENU, upload.single('image_menu'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'menu_' + currentdatetime() + ext;
        const result = await save_menu(filename, file.size, req.body.menu_button, req.body.menu_redirect);
        if (result === 'success') {
            const filepath = 'uploads/menu/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_MENU, async (req, res) => {
    try {
        const result = await update_default_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_MENU, async (req, res) => {
    try {
        const result = await update_edit_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_MENU, async (req, res) => {
    try {
        const result = await delete_menu(req.query);
        if (result === 'success') {
            if (req.query.menu_type === 'file') {
                fs.rmSync('uploads/menu/' + req.query.menu_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_TC_MENU, async (_, res) => {
    try {
        const result = await get_tc_menu('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_TC_MENU, upload.single('image_tc_menu'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'tc_menu_' + currentdatetime() + ext;
        const result = await save_tc_menu(filename, file.size, req.body.tc_menu_title, req.body.tc_menu_description1, req.body.tc_menu_description2);
        if (result === 'success') {
            const filepath = 'uploads/tc_menu/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_TC_MENU, async (req, res) => {
    try {
        const result = await update_default_tc_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_TC_MENU, async (req, res) => {
    try {
        const result = await update_edit_tc_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_TC_MENU, async (req, res) => {
    try {
        const result = await delete_tc_menu(req.query);
        if (result === 'success') {
            if (req.query.tc_menu_type === 'file') {
                fs.rmSync('uploads/tc_menu/' + req.query.tc_menu_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_CORPORATE_MENU, async (_, res) => {
    try {
        const result = await get_corporate_menu('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_CORPORATE_MENU, upload.single('image_corporate_menu'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'corporate_menu_' + currentdatetime() + ext;
        const result = await save_corporate_menu(filename, file.size, req.body.corporate_menu_button, req.body.corporate_menu_description);
        if (result === 'success') {
            const filepath = 'uploads/corporate_menu/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_CORPORATE_MENU, async (req, res) => {
    try {
        const result = await update_default_corporate_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_CORPORATE_MENU, async (req, res) => {
    try {
        const result = await update_edit_corporate_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_CORPORATE_MENU, async (req, res) => {
    try {
        const result = await delete_corporate_menu(req.query);
        if (result === 'success') {
            if (req.query.corporate_menu_type === 'file') {
                fs.rmSync('uploads/corporate_menu/' + req.query.corporate_menu_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_CORPORATE_VISION, async (_, res) => {
    try {
        const result = await get_corporate_vision('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_CORPORATE_VISION, upload.single('image_corporate_vision'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'corporate_vision_' + currentdatetime() + ext;
        const result = await save_corporate_vision(filename, file.size, req.body.corporate_vision_description);
        if (result === 'success') {
            const filepath = 'uploads/corporate_vision/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_CORPORATE_VISION, async (req, res) => {
    try {
        const result = await update_default_corporate_vision(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_CORPORATE_VISION, async (req, res) => {
    try {
        const result = await update_edit_corporate_vision(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_CORPORATE_VISION, async (req, res) => {
    try {
        const result = await delete_corporate_vision(req.query);
        if (result === 'success') {
            if (req.query.corporate_vision_type === 'file') {
                fs.rmSync('uploads/corporate_vision/' + req.query.corporate_vision_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_SPOTLIGHT_MENU, async (_, res) => {
    try {
        const result = await get_spotlight_menu('all');
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_SPOTLIGHT_MENU, upload.single('image_spotlight_menu'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'spotlight_menu_' + currentdatetime() + ext;
        const result = await save_spotlight_menu(filename, file.size, req.body.spotlight_menu_button, req.body.spotlight_menu_redirect);
        if (result === 'success') {
            const filepath = 'uploads/spotlight_menu/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_DEFAULT_SPOTLIGHT_MENU, async (req, res) => {
    try {
        const result = await update_default_spotlight_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_SPOTLIGHT_MENU, async (req, res) => {
    try {
        const result = await update_edit_spotlight_menu(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_SPOTLIGHT_MENU, async (req, res) => {
    try {
        const result = await delete_spotlight_menu(req.query);
        if (result === 'success') {
            if (req.query.menu_type === 'file') {
                fs.rmSync('uploads/spotlight_menu/' + req.query.spotlight_menu_name);
            }
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_NEWS, async (_, res) => {
    try {
        const result = await get_news();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_IMAGES_NEWS, (req, res) => {
    try {
        const files = fs.readdirSync('uploads/news/news_' + req.query.news_id);
        const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).map(f => `http://localhost:5505/uploads/news/news_${req.query.news_id}/${f}`);
        res.send(images);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_NEWS, upload.array('image_news', 7), async (req, res) => {
    try {
        const file = req.files;
        const result = await save_news(req.body.title, req.body.content, req.files.length, req.body.create);
        if (result.status === 'success') {
            fs.mkdirSync('uploads/news/news_' + result.id, { recursive: true });
            file.map((data, index) => {
                const ext = path.extname(data.originalname);
                const filename = 'news_' + result.id + '_' + (index + 1) + '_' + currentdatetime() + ext;
                const filepath = 'uploads/news/news_' + result.id + '/' + filename;
                fs.writeFileSync(filepath, data.buffer);
            });
            res.send(result.status);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_NEWS, upload.array('image_update_news', 7), async (req, res) => {
    try {
        const file = req.files;
        const old_images = JSON.parse(req.body.old_images || '[]');
        // ตั้งชื่อ Path
        const folder = path.join('uploads', 'news', `news_${req.body.news_id}`);
        // แปลงเป็น Set โดยตัดเหลือแต่ชื่อไฟล์อย่างเดียว
        const keepnamefile = new Set((old_images || []).map((u) => {
            try {
                const pathname = new URL(u).pathname;
                return path.basename(pathname);
            } catch (error) {
                console.error(error);
            }
        }).filter(Boolean));
        // ดึงข้อมูลใน Folder ทั้งหมด
        const fileinfolder = fs.readdirSync(folder);
        // หาไฟล์ที่ต้องการลบ
        const removeimage = fileinfolder.filter((f) => !keepnamefile.has(f));
        // ลบไฟล์ที่ไม่เอาออก
        removeimage.map((f) => fs.rmSync(path.join(folder, f), { force: true }));
        const fileinfolderagain = fs.readdirSync(folder);
        const countfile = fileinfolderagain.length;
        const total = countfile + req.files.length;
        const indeximage = fileinfolderagain.map((name) => { const match = name.match(/^news_\d+_(\d+)_/); return match ? Number(match[1]) : null; }).filter(Number.isInteger);
        const result = await update_news(req.body.title, req.body.content, total, req.body.news_id);
        const getNextIndex = () => {
            let i = 1;
            while (indeximage.includes(i)) i++;
            indeximage.push(i);
            return i;
        };
        if (result === 'success') {
            file.map(data => {
                const ext = path.extname(data.originalname);
                const nextindex = getNextIndex();
                const filename = 'news_' + req.body.news_id + '_' + nextindex + '_' + currentdatetime() + ext;
                const filepath = 'uploads/news/news_' + req.body.news_id + '/' + filename;
                fs.writeFileSync(filepath, data.buffer);
            });
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_NEWS, async (req, res) => {
    try {
        const result = await delete_news(req.query);
        if (result === 'success') {
            fs.rmSync('uploads/news/news_' + req.query.news_id, { recursive: true, force: true });
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_DOCUMENT, async (_, res) => {
    try {
        const result = await get_document();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_DOCUMENT, upload.single('file_document'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'document_' + currentdatetime() + ext;
        const result = await save_document(filename, file.size, req.body.document_number, req.body.document_name, req.body.document_create);
        if (result === 'success') {
            const filepath = 'uploads/document/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.get(process.env.GET_ANNOUNCEMENT, async (_, res) => {
    try {
        const result = await get_announcement();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.post(process.env.SAVE_ANNOUNCEMENT, upload.single('image_announcement'), async (req, res) => {
    try {
        const file = req.file;
        const ext = path.extname(file.originalname);
        const filename = 'announcement_' + currentdatetime() + ext;
        const result = await save_announcement(filename, file.size, req.body.announcement_title);
        if (result === 'success') {
            const filepath = 'uploads/announcement/' + filename;
            fs.writeFileSync(filepath, req.file.buffer);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

app.put(process.env.UPDATE_EDIT_ANNOUNCEMENT, async (req, res) => {
    try {
        const result = await update_edit_announcement(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete(process.env.DELETE_ANNOUNCEMENT, async (req, res) => {
    try {
        const result = await delete_announcement(req.query);
        if (result === 'success') {
            fs.rmSync('uploads/announcement/' + req.query.announcement_name);
            res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
});

// -------------------------
// ROUTES หน้าบ้าน
// -------------------------
app.get(process.env.GET_HOME, async (req, res) => {
    try {
        const result_banner = await get_banner();
        const result_menu = await get_menu();
        const result_tc_menu = await get_tc_menu();
        const result_corporate_menu = await get_corporate_menu();
        res.send({ result_banner, result_menu, result_tc_menu, result_corporate_menu });
    } catch (error) {
        console.error(error);
    }
});

// สำหรับดึง Department ทั้งหมด
app.get(process.env.GET_DEPARTMENT, async (_, res) => {
    try {
        const result = await get_department();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

// ดึงข้อมูลหนักงานทั้งหมด
app.get(process.env.GET_EMPLOYEE, async (_, res) => {
    try {
        const result = await get_employee();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
});

// -------------------------
// LISTEN
// -------------------------
app.listen(port, () => console.log(`Server Running On URL http://localhost:${port}`));