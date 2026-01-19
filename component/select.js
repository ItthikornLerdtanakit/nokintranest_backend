import { configDotenv } from 'dotenv';
import moment from 'moment-timezone';

import db from './connectdatabase.js';

configDotenv();

export const get_banner = async (show) => {
    const select = show === 'all' ? 'select * from banners' : 'select * from banners where banner_status = ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            banner_created_at: moment.utc(item.banner_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_menu = async (show) => {
    const select = show === 'all' ? 'select * from menus' : 'select * from menus where menu_status like ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active%']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            menu_created_at: moment.utc(item.menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_tc_menu = async (show) => {
    const select = show === 'all' ? 'select * from tc_menus' : 'select * from tc_menus where tc_menu_status like ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active%']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            tc_menu_created_at: moment.utc(item.tc_menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_corporate_menu = async (show) => {
    const select = show === 'all' ? 'select * from corporate_menus' : 'select * from corporate_menus where corporate_menu_status like ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active%']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            corporate_menu_created_at: moment.utc(item.corporate_menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_corporate_vision = async (show) => {
    const select = show === 'all' ? 'select * from corporate_visions' : 'select * from corporate_visions where corporate_vision_status like ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active%']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            corporate_vision_created_at: moment.utc(item.corporate_vision_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_spotlight_menu = async (show) => {
    const select = show === 'all' ? 'select * from spotlight_menus' : 'select * from spotlight_menus menus where spotlight_menu_status like ?';
    const [result] = show === 'all' ? await db.connectdatabase_nokintranest.query(select) : await db.connectdatabase_nokintranest.query(select, ['Active%']);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            spotlight_menu_created_at: moment.utc(item.spotlight_menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_news = async () => {
    const select = 'select * from news' ;
    const [result] = await db.connectdatabase_nokintranest.query(select);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            news_created_at: moment.utc(item.news_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

export const get_document = async () => {
    const select = 'select * from documents' ;
    const [result] = await db.connectdatabase_nokintranest.query(select);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            document_created_at: moment.utc(item.document_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss'),
            document_created_at_show: moment.utc(item.document_created_at).tz('Asia/Bangkok').format('MMM DD, YYYY')
        };
    }));
    return resultformatdate;
}

export const get_announcement = async () => {
    const select = 'select * from announcements' ;
    const [result] = await db.connectdatabase_nokintranest.query(select);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            announcement_created_at: moment.utc(item.announcement_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss')
        };
    }));
    return resultformatdate;
}

// ดึงข้อมูลแผนกทั้งหมด
export const get_department = async () => {
    const select = 'select * from departments order by department_code asc';
    const [result] = await db.connectdatabase.query(select);
    return result;
}

// ดึงข้อมูลพนักงานทั้งหมด
export const get_employee = async () => {
    const select = 'select e.employee_id, e.employee_code, e.employee_nameen, e.employee_nameth, e.employee_position, e.employee_supervisor, e.employee_usertype, e.employee_email, e.employee_level, e.employee_status, e.employee_image, e.employee_annotation, e.employee_startdate, e.employee_enddate, d.department_id, d.department_code, d.department_name from employees e inner join departments d on e.department_id = d.department_id';
    const [result] = await db.connectdatabase.query(select);
    const resultformatdate = await Promise.all(result.map(async item => {
        return {
            ...item,
            employee_startdate: moment.utc(item.employee_startdate).tz('Asia/Bangkok').format('YYYY-MM-DD'),
            employee_enddate: moment.utc(item.employee_enddate).tz('Asia/Bangkok').format('YYYY-MM-DD')
        };
    }));
    return resultformatdate;
}