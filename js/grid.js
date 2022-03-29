function init() {
    console.log("init")
    $('#markdown-display').load('/html/aboutme.html')
}

init()

function load_external_html_into(id, external_html_filename) {
    console.log(id)
    console.log(external_html_filename)
    $(id).load(external_html_filename)
}

function unselect_file_item(file_item_id) {
    const item = $('#' + file_item_id)
    if (item.hasClass('file-item-selected')) {
        item.removeClass('file-item-selected')
    }
    item.addClass('file-item-unselected')
}

function select_new_file(select_file_item_with_id) {
    unselect_file_item('aboutme-file-item')
    unselect_file_item('contactme-file-item')
    unselect_file_item('cv-file-item')
    const new_item = $('#' + select_file_item_with_id)
    if (new_item.hasClass('file-item-unselected')) {
        new_item.removeClass('file-item-unselected')
    }
    new_item.addClass('file-item-selected')
}

function change_selected_file_in_top(img_class, filename) {
    const top_image_div = $('#top-file-item-image')
    top_image_div.removeClass()
    top_image_div.addClass(img_class)
    const top_text_div = $('#top-file-item-text')
    top_text_div.text(filename)
}
