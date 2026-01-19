import db from './connectdatabase.js';

export const delete_banner = async (item) => {
    const { banner_id } = item;
    const remove = 'delete from banners where banner_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [banner_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_menu = async (item) => {
    const { menu_id } = item;
    const remove = 'delete from menus where menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_tc_menu = async (item) => {
    const { tc_menu_id } = item;
    const remove = 'delete from tc_menus where tc_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [tc_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_corporate_menu = async (item) => {
    const { corporate_menu_id } = item;
    const remove = 'delete from corporate_menus where corporate_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [corporate_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_corporate_vision = async (item) => {
    const { corporate_vision_id } = item;
    const remove = 'delete from corporate_visions where corporate_vision_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [corporate_vision_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_spotlight_menu = async (item) => {
    const { spotlight_menu_id } = item;
    const remove = 'delete from spotlight_menus where spotlight_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [spotlight_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_news = async (item) => {
    const { news_id } = item;
    const remove = 'delete from news where news_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [news_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const delete_announcement = async (item) => {
    const { announcement_id } = item;
    const remove = 'delete from announcement where announcement_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(remove, [announcement_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}