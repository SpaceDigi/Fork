$(document).ready(function () {
    var max_id = 2;
    document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            addingNewProduct($("#input").val())
        }
        return false;
    }

    addListenersButton()

    function addListenersButton() {
        $(".add").click(function () {
            increment($(this).attr('id'))
        })
        $(".delete").click(function () {
            decrement($(this).attr('id'))
        })
        $(".add_product").click(function () {
            addingNewProduct($("#input").val())
        })
        $(".bought").click(function () {
            buy($(this).attr('id'))
        })
        $(".remove").click(function () {
            remove($(this).attr('id'))
        })
    }

    function increment(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        var now = $("#counts_" + index).text();
        $("#counts_" + index).text(Number(now) + 1)
    }

    function decrement(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        var now = $("#counts_" + index).text();
        if (Number(now) > 0) {
            $("#counts_" + index).text(Number(now) - 1)
        }
    }

    function addingNewProduct(product) {
        var product_id = "product_"+(++max_id);
        var delete_id = "delete_"+max_id;
        var buy_id = "buy_"+max_id;
        var add_id = "add_"+max_id;
        var remove_id ="remove_"+max_id;
        var counts_id = "counts_"+max_id;
        var label_id = "label_"+max_id;
        $(".buys").append(' <div class="product" id="'+product_id+'"' +
            '>\n' +
            '                <span class="text-product"' +
            ' id="' + label_id+'"' + '>' + product +
            '</span>\n' +
            '                <div class="controls">\n' +
            '                    <button class="button delete" id="'+delete_id+'"' + max_id +
            '>-</button>\n' +
            '                    <span class="counts" id="'+counts_id+'"' + max_id +
            '>1</span>\n' +
            '                    <button class="button add" id="'+add_id+'"' + max_id +
            '>+</button>\n' +
            '                </div>\n' +
            '                <div class="state">\n' +
            '                    <div class="controls-state">\n' +
            '                        <button class="bought" id="'+buy_id+'"' +
            '>Bought</button>\n' +
            '                        <button class="remove" id="'+remove_id+'"'+
            '>X</button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>')
        addListenersNew(max_id)
    }
    
    function buy(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        $("#add_"+index).css("display","none");
        $("#delete_"+index).css("display","none");
        $("#label_"+index).css("text-decoration","line-through");
        $("#remove_"+index).css("display","none");
    }

    function remove(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        $("#product_"+index).remove()
    }
    function addListenersNew(id) {
        $("#remove_"+id).click(function(){remove($(this).attr('id'))})
        $("#buy_"+id).click(function(){buy(($(this).attr('id')))})
        $("#add_"+id).click(function(){increment($(this).attr('id'))})
        $("#delete_"+id).click(function () {decrement($(this).attr('id'))})
    }

});