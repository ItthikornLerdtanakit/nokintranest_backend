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