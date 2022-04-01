function load_external_html_into(id, external_html_filename) {
    $('#' + id).load(external_html_filename)
}

function change_color_theme(name) {
    if(name === 'blue') {
        document.documentElement.style.setProperty('--intellij-gray2', '#797979');
        document.documentElement.style.setProperty('--intellij-dark-gray2', '#cbcbcb');
        document.documentElement.style.setProperty('--intellij-dark-gray3', '#a6a6a6');
        document.documentElement.style.setProperty('--intellij-dark-white', '#2A2A2A');
        document.documentElement.style.setProperty('--intellij-purple', '#4884C1');
    } else {
        document.documentElement.style.setProperty('--intellij-gray2', '#4C5051');
        document.documentElement.style.setProperty('--intellij-dark-gray2', '#2A2A2A');
        document.documentElement.style.setProperty('--intellij-dark-gray3', '#303133');
        document.documentElement.style.setProperty('--intellij-dark-white', '#bbbbbb');
        document.documentElement.style.setProperty('--intellij-purple', '#9376AA');
    }
}
