var urlmathjs;

//function used to define the method used in the execute() function
function method()
{
    var list = document.getElementById("list");
    var opt = list.options[list.selectedIndex];
    return opt.value;
}

//function used to print the numbers 
function insert(number)
{
    document.datiCalc.casellaTesto.value = document.datiCalc.casellaTesto.value+number
};

//reset method
function remove()
{
    document.datiCalc.casellaTesto.value = " ";
};

//function using get method and jquery
function jqGet(expression) 
{
    $.get(urlmathjs + "?expr=" + expression, function (data) {
        $(document.datiCalc.casellaTesto).val(data);
    });
}

//function using post method and jquery
function jqPost(expression) 
{
    jQuery.ajax
    ({
        url: urlmathjs,
        type: "POST",
        data: JSON.stringify({ "expr": expression }),
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) 
        {
            $(document.datiCalc.casellaTesto).val(data.result);
        }
    });
}

//function using get method and plain javascript
function jsGet(expression) 
{
    var appo = new XMLHttpRequest();
    appo.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.datiCalc.casellaTesto.value = this.responseText;
        }
    };
    appo.open("GET", urlmathjs + "?expr=" + expression, true);
    appo.send();
}

//function using post method and plain javascript
function jsPost(expression)
{
    var appo = new XMLHttpRequest();
    appo.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            obj = JSON.parse(this.responseText);
            document.datiCalc.casellaTesto.value = obj.result;
        }
    };
    appo.open("POST", urlmathjs, true);
    appo.setRequestHeader("Content-Type", "application/json");
    appo.send(JSON.stringify({ "expr": expression }));
}

//main function
function execute()
{
    var methodused = method();
    var get = encodeURIComponent(document.datiCalc.casellaTesto.value);
    var post = document.datiCalc.casellaTesto.value;
    var resource = "api.mathjs.org/v4/";
    if (window.location.protocol == "http:")
        urlmathjs = "http://" + resource;
    else
        urlmathjs = "https://" + resource;
    if (methodused == "Javascript get")
        jsGet(get);
    else if (methodused == "Javascript post")
        jsPost(post);
    else if (methodused == "Jquery get")
        jqGet(get);
    else if (methodused == "Jquery post")
        jqPost(post);
    //document.datiCalc.casellaTesto.value = eval(document.datiCalc.casellaTesto.value)
}