'use strict';
const searching = function(){
const searchtext = $('#search').val();
    $.ajax({
        url: "/search",
        method: "get",
        dataType: "json",
        data:{searchtext: searchtext},
        success: function (data) {
            $("ol").html('');
            data.items.forEach(function (todo) {
                let item = $("<li id = '"+todo.id+"'>" + todo.message +
                    "<input onclick = 'tarmacnel(this)' type ='checkbox'>" +
                    "<button onclick = 'erase(this)'>Delete</button></li>");
                let check = item.find("input");
                check.prop("checked", todo.checked);
                $("ol").append(item);
            });
        },
        error: function (err) {
            alert("there is a HUGE problem");
        }
    });
};

const steghcel = function(){
    const anun = $('#create').val();
    if(anun === '') alert("no empty todo is allowed!");
    else{
        $.ajax({
            url: "/create",
            method: "post",
            dataType: "json",
            data: JSON.stringify({
                message   : anun,
                completed : false
            }),
            success: function (data) {
                searching();
                $('#create').val('');
            },
            error: function (err) {
                alert("error occured while creating");
            }
        });
    }
};
const tarmacnel = function(item){
    let itid = $(item).parent().attr('id');
    $.ajax({
        url         : "/update/" + itid,
        type        : 'put',
        dataType    : 'text',
        contentType : "application/json; charset=utf-8",
        success     : function(data) {
            searching();
           
        },
        error       : function(data) {
            alert('Error updating todo');
        }
    });

};

const erase = function(item){
    let itid = $(item).parent().attr('id');
    $.ajax({
        url     : "/delete/" + itid,
        type : 'delete',
        dataType: 'text',
        success : function(data) {
            searching();
        },
        error: function (err) {
            alert("couldn't delete");
        }
    });
};
searching();