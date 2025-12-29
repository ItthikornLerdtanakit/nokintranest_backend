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
            banner_created_at: moment.utc(item.banner_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss'),
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
            menu_created_at: moment.utc(item.menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss'),
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
            tc_menu_created_at: moment.utc(item.tc_menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss'),
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
            corporate_menu_created_at: moment.utc(item.corporate_menu_created_at).tz('Asia/Bangkok').format('DD/MM/YYYY - HH:mm:ss'),
        };
    }));
    return resultformatdate;
}