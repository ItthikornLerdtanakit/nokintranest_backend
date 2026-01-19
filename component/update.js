import db from './connectdatabase.js';

export const update_default_banner = async (item) => {
    const { banner_id } = item;
    const update_inactive = 'update banners set banner_status = ? where banner_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', 'Active']);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update banners set banner_status = ? where banner_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, ['Active', banner_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_default_menu = async (item) => {
    const { menu_id, menu_status } = item;
    const update_inactive = 'update menus set menu_status = ? where menu_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', menu_status]);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update menus set menu_status = ? where menu_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, [menu_status, menu_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_edit_menu = async (item) => {
    const { menu_id, menu_button, menu_redirect } = item;
    const update = 'update menus set menu_button = ?, menu_redirect = ? where menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [menu_button, menu_redirect, menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_default_tc_menu = async (item) => {
    const { tc_menu_id, tc_menu_status } = item;
    const update_inactive = 'update tc_menus set tc_menu_status = ? where tc_menu_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', tc_menu_status]);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update tc_menus set tc_menu_status = ? where tc_menu_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, [tc_menu_status, tc_menu_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_edit_tc_menu = async (item) => {
    const { tc_menu_id, tc_menu_title, tc_menu_description1, tc_menu_description2  } = item;
    const update = 'update tc_menus set tc_menu_title = ?, tc_menu_description1 = ?, tc_menu_description2 = ? where tc_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [tc_menu_title, tc_menu_description1, tc_menu_description2, tc_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_default_corporate_menu = async (item) => {
    const { corporate_menu_id, corporate_menu_status } = item;
    const update_inactive = 'update corporate_menus set corporate_menu_status = ? where corporate_menu_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', corporate_menu_status]);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update corporate_menus set corporate_menu_status = ? where corporate_menu_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, [corporate_menu_status, corporate_menu_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_edit_corporate_menu = async (item) => {
    const { corporate_menu_id, corporate_menu_button, corporate_menu_description } = item;
    const update = 'update corporate_menus set corporate_menu_button = ? = ?, corporate_menu_description = ? where corporate_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [corporate_menu_button, corporate_menu_description, corporate_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_default_corporate_vision = async (item) => {
    const { corporate_vision_id, corporate_vision_status } = item;
    const update_inactive = 'update corporate_visions set corporate_vision_status = ? where corporate_vision_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', corporate_vision_status]);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update corporate_visions set corporate_vision_status = ? where corporate_vision_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, [corporate_vision_status, corporate_vision_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_edit_corporate_vision = async (item) => {
    const { corporate_vision_id, corporate_vision_description } = item;
    const update = 'update corporate_visions set corporate_vision_description = ? where corporate_vision_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [corporate_vision_description, corporate_vision_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_default_spotlight_menu = async (item) => {
    const { spotlight_menu_id, spotlight_menu_status } = item;
    const update_inactive = 'update spotlight_menus set spotlight_menu_status = ? where spotlight_menu_status = ?';
    const [result_inactive] = await db.connectdatabase_nokintranest.query(update_inactive, ['Inactive', spotlight_menu_status]);
    if (result_inactive.affectedRows > 0) {
        const update_active = 'update spotlight_menus set spotlight_menu_status = ? where spotlight_menu_id = ?';
        const [result_active] = await db.connectdatabase_nokintranest.query(update_active, [spotlight_menu_status, spotlight_menu_id]);
        if (result_active.affectedRows > 0) {
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        return 'fail'
    }
}

export const update_edit_spotlight_menu = async (item) => {
    const { spotlight_menu_id, spotlight_menu_button, spotlight_menu_redirect } = item;
    const update = 'update spotlight_menus set spotlight_menu_button = ?, spotlight_menu_redirect = ? where spotlight_menu_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [spotlight_menu_button, spotlight_menu_redirect, spotlight_menu_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_news = async (title, content, count, news_id) => {
    const update = 'update news set news_title = ?, news_content = ?, news_count_image = ? where news_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [title, content, count, news_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}

export const update_edit_announcement = async (item) => {
    const { announcement_id, announcement_title  } = item;
    const update = 'update announcements set announcement_title = ? where announcement_id = ?';
    const [result] = await db.connectdatabase_nokintranest.query(update, [announcement_title, announcement_id]);
    if (result.affectedRows > 0) {
        return 'success';
    } else {
        return 'fail'
    }
}