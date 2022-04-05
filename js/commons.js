const load_external_html_into = (id, external_html_filename) => $('#' + id).load(external_html_filename)

const set_color = (property, color) => document.documentElement.style.setProperty(property, color);

let BLUE = 'BLUE'
let PURPLE = 'PURPLE'
let TMS = 'TMS'

let c1 = '--c1'
let c2 = '--c2'
let c3 = '--c3'
let intellij_gray2 = '--intellij-gray2'


function change_color_theme(theme) {
    switch (theme) {
        case (PURPLE):
            set_color(c1, '#2A2A2A')
            set_color(c2, '#9376AA')
            set_color(c3, '#bbbbbb')
            set_color(intellij_gray2, '#4C5051')
            break
        case (BLUE):
            set_color(c1, '#cbcbcb')
            set_color(c2, '#4884C1')
            set_color(c3, '#2A2A2A')
            set_color(intellij_gray2, '#bbbbbb')
            break
        case (TMS):
            set_color(c1, '#2A2A2A')
            set_color(c2, '#4884C1')
            set_color(c3, '#cbcbcb')
            break

    }
}
