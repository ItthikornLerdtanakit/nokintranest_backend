import db from './connectdatabase.js';

export const save_banner = async (name, size) => {
    const insert = 'insert into banners (banner_name, banner_size, banner_type, banner_status) values (?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_menu = async (name, size, button) => {
    const insert = 'insert into menus (menu_name, menu_size, menu_button, menu_type, menu_status) values (?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, button, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_tc_menu = async (name, size, title, description1, description2) => {
    const insert = 'insert into tc_menus (tc_menu_name, tc_menu_size, tc_menu_title, tc_menu_description1, tc_menu_description2, tc_menu_type, tc_menu_status) values (?, ?, ?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, title, description1, description2, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_corporate_menu = async (name, size, button, description) => {
    const insert = 'insert into corporate_menus (corporate_menu_name, corporate_menu_size, corporate_menu_button, corporate_menu_description, corporate_menu_type, corporate_menu_status) values (?, ?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, button, description, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}