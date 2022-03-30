function load_external_html_into(id, external_html_filename) {
    console.log(external_html_filename)
    $('#' + id).load(external_html_filename)
}

function open_email_form() {
    $('#email-popup').css('visibility','visible')
    $('#email-popup-background').css('visibility','visible')
}

function close_email_form() {
    $('#email-popup').css('visibility','hidden')
    $('#email-popup-background').css('visibility','hidden')
}

function change_color_theme() {
    document.documentElement.style.setProperty('--intellij-dark-gray2', '#cbcbcb');
    document.documentElement.style.setProperty('--intellij-dark-gray3', '#a6a6a6');
    document.documentElement.style.setProperty('--intellij-dark-white', '#2A2A2A');
    document.documentElement.style.setProperty('--intellij-purple', '#4884C1');
}
