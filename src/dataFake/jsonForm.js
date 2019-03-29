export const BuildForm = (config) =>
{
    var html = "<div id='formulario_dinamico'>";  
    if(config !== null){
        for (var k in config) {
           for(var j in config[k]){
               switch(j){
                   case "textbox":
                     html += CreateTextbox(config[k][j]);
                   break;
                   case "comboBox":
                     html += CreateComboBox(config[k][j]);
                   break;
               }
           }
        }
     html += "</div>"
     return html;
    }
}

function CreateTextbox(element){
    var htmlReturn = "<div>";
    if(element.label !== ""){
        htmlReturn += "<label>"+element.label+"</label>";
    }
     htmlReturn += "<input type='Text' id='"+element.id+"' name='"+element.name+"' class='"+element.className+"' /></div>";
     return htmlReturn;
}

function CreateComboBox(element){
    var html = "<div>";
    for (var k in element) {
        if (element[k].label !== ""){
            html += "<label>"+element[k].label+"</label>"
        }
        html += "<select id='" + element[k].id + "' name='" + element[k].name+"'></select>"
        console.log(element[k].options);
    }
    html += "</div>";
    return html;
}