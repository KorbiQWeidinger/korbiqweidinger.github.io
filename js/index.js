let LAPTOP = 'laptop'
let PHONE = 'iphone'

let needed_media_type = () => $(window).width() <= 1440 ? PHONE : LAPTOP
let current_media_type = null

const load_needed_media_type = function () {
    if(current_media_type !== needed_media_type()) {
        load_external_html_into('laptop-wrapper', '/html/' + needed_media_type() + '.html')
        current_media_type = needed_media_type()
    }
}

window.onresize = function() {
    load_needed_media_type()
}

window.onload = function () {
    load_external_html_into('code-quote-wrapper', '/html/code_quote.html')
    load_external_html_into('skills-section', '/html/skills.html')
    load_needed_media_type()
}