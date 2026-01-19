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

export const save_menu = async (name, size, button, redirect) => {
    const insert = 'insert into menus (menu_name, menu_size, menu_button, menu_redirect, menu_type, menu_status) values (?, ?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, button, redirect, 'file', 'Inactive']);
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

export const save_corporate_vision = async (name, size, description) => {
    const insert = 'insert into corporate_visions (corporate_vision_name, corporate_vision_size, corporate_vision_description, corporate_vision_type, corporate_vision_status) values (?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, description, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_spotlight_menu = async (name, size, button, redirect) => {
    const insert = 'insert into spotlight_menus (spotlight_menu_name, spotlight_menu_size, spotlight_menu_button, spotlight_menu_redirect, spotlight_menu_type, spotlight_menu_status) values (?, ?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, button, redirect, 'file', 'Inactive']);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_news = async (title, content, countimage, createname) => {
    const insert = 'insert into news (news_title, news_content, news_count_image, news_create, news_create_update) values (?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [title, content, countimage, createname, createname]);
    if (result_insert.affectedRows > 0) {
        return { status: 'success', id: result_insert.insertId };
    } else {
        return { status: 'fail' };
    }
}

export const save_document = async (filename, size, docnumber, name, namecreate) => {
    const insert = 'insert into documents (document_filename, document_size, document_number, document_name, document_create, document_create_update) values (?, ?, ?, ?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [filename, size, docnumber, name, namecreate, namecreate]);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}

export const save_announcement = async (name, size, title) => {
    const insert = 'insert into announcements (announcement_name, announcement_size, announcement_title) values (?, ?, ?)';
    const [result_insert] = await db.connectdatabase_nokintranest.query(insert, [name, size, title]);
    if (result_insert.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail';
    }
}