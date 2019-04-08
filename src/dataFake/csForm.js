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
                   case "textarea":
                    html += CreateTextArea(config[k][j]);
                   break;
                   case "File":
                    html += CreateFileInput(config[k][j]);
                   break;
               }
           }
        }
     html += "</div>"
     return html;
    }
}
//Function for create json of the form that has been create
export const CreateJSONForm = (element) =>{
    var Json = "{}"
    switch(element.formelements){
        case "Textbox":
        break;
    }
}

//Function for create html that is selected for the user
//data: is the element that will create
//html_:is the html that are create on window
//quantity: is sequency of tha quantity the elements that has the form
export const CreateHtmlFormNew = (data, html_, quantity) =>{
    var html = html_;
    var label = "<label class='textboxNew' id='label_" + quantity +"'>Configure el Texto</label>";
    var div = "<div class='componentToEdit' id='div_" + quantity + "'  class='textboxNew'>";
    var btnEditar ="<Button class='btnEditControl' >Editar</Button>";
    var btnDelete = "<Button class='btnEditControl' id='btnDeletecontrol' >Eliminar</Button>";
    switch (data.formelements) {
        case "Textbox":
            html += div
            html += btnEditar;
            html += btnDelete;
            html += label;
            
            html +="<input type='Text' id='input_"+quantity+"' class='textboxNew' />";
            html += "</div>";
            break;
        case "Combobox":
            html += div;
            html += btnEditar;
            html += btnDelete;
            html += label;
            html += "<select class='comboboxNew' id='select_" + quantity +"'></select>";
            html += "</div>";
        break;
        case "Textarea":
            html += div;
            html += btnEditar;
            html += btnDelete;
            html += label;
            html +=
              "<textarea rows='4' class='textboxNew' cols='50' id='textarea_" +
              quantity +
              "'></textarea>";
            html += "</div>";
        break;
        case "File":
            html += div;
            html += btnEditar;
            html += btnDelete;
            html += label;
            html += "<input accept = 'image' type='file' id='file_" + quantity +"'/>";
            html +="<label htmlFor = 'file_" + quantity + "'> <Button variant='raised' component='span'>Subir archivo</Button></label>";
        break;
        case "Titulo":
            html += div;
            html += btnEditar;
            html += btnDelete;
            html +=
              "<h5 class='textboxNew' id='titulo_" +
              quantity +
              "'>Configure el titulo</h5>";
            html += "</div>";
        break;
        
    }
    html += "</div>";
    return html;
}


function CreateTextbox(element){
    var html = "<div>";
    html += CreateLabel(element.label);
    html += "<input type='Text' id='"+element.id+"' name='"+element.name+"' class='"+element.className+"' "+element.isrequerid+"/></div>";
    return html;
}

function CreateComboBox(element){
    
    var html = "<div>";
        html += CreateLabel(element.label);
        html += "<select id='" + element.id + "' name='" + element.name+"'>"
        if(element.options.length > 0){
           for(var opt in element.options){
               html += "<option value='" + opt.value + "'>" + element.options[opt].name+"</option>"
           }
        }
        html += "</select>";
    html += "</div>";
    return html;
}

function CreateTextArea(element){
    var html = "<div>";
    if(element !== null){
        html += CreateLabel(element.label);
        html += "<textarea rows='4' cols='50' id='"+element.id+"' name='"+element.name+"'></textarea>"
    }
    return html;
}

function CreateFileInput(element){
    var html = "<div>"
    if(element !== null){
        html += CreateLabel(element.label);
        html += "<input accept = 'image' type='file' id='"+element.id+"' />"
        html += "<label htmlFor = '" + element.id + "'> <Button variant='raised' component='span'>Subir archivo</Button></label>"
    }
    html += "</div>";
    return html;
}

function CreateLabel(element){
    var html = "";
    if(element !== null){
        html += "<label>" + element + "</label>";
    }
    return html;
}
