function init() {
    console.log('init')
    load_external_html_into('markdown-display','/html/aboutme.html')
}

init()

function load_external_html_into(id, external_html_filename) {
    console.log(external_html_filename)
    $('#' + id).load(external_html_filename)
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

let tree_is_open = false

function open_project_tree() {
    const outer = $('#outer-grid-container')
    const tree = $('#file-tree')
    const template_areas = outer.css('grid-template-areas')
    if(tree_is_open) {
        outer.css('grid-template', 'auto auto minmax(0, 1fr) 30px / 40px 0 minmax(0, 1fr) 40px')
        outer.css('grid-template-areas', template_areas)
        tree.css('visibility', 'collapse')
        tree_is_open = false
        return
    }
    outer.css('grid-template', 'auto auto minmax(0, 1fr) 30px / 40px auto minmax(0, 1fr) 40px')
    outer.css('grid-template-areas', template_areas)
    tree.css('visibility', 'visible')
    tree_is_open = true;
}

//TODO

const file_tree_element = $('#file-tree')
const top_file_path = $('#top-file-path')

class File {
    constructor(icon_css_class, file_name, html_content_filename) {
        this.icon_css_class = icon_css_class
        this.file_name = file_name
        this.html_content_filename = html_content_filename
    }

    select() {

    }

    unselect() {

    }

    open() {

    }

    close() {

    }
}




const about_me = new File('html-file-icon', 'about_me.html', 'aboutme.html')
const contact_me = new File('class-icon', 'ContactMe.java', 'aboutme.html')


const files = [about_me]

const selected_file = about_me