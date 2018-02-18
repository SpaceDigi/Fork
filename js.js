$(document).ready(function () {
    var max_id_list = 2;
    var counter_basket_not_buy = 2;
    var basket_row_not_buy_id = 0;
    var counter_basket_buy = 0;
    var basket_row_buy_id = 0;

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
        $(".not-bought").click(function () {
            returnState($(this).attr('id'))
        })
    }

    function increment(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        var now = $("#counts_" + index).text();
        $("#counts_" + index).text(Number(now) + 1);
        $("#buy_counts_" + index).text(Number(now) + 1);
    }

    function decrement(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        var now = $("#counts_" + index).text();
        if (Number(now) > 0) {
            $("#counts_" + index).text(Number(now) - 1)
            $("#buy_counts_" + index).text(Number(now) - 1);
        }
    }

    function addingNewProduct(product) {
        counter_basket_not_buy++;
        var product_id = "product_" + (++max_id_list);
        var delete_id = "delete_" + max_id_list;
        var buy_id = "buy_" + max_id_list;
        var add_id = "add_" + max_id_list;
        var remove_id = "remove_" + max_id_list;
        var counts_id = "counts_" + max_id_list;
        var label_id = "label_" + max_id_list;
        var not_buy_id = "notbuy_" + max_id_list;
        $(".buys").append(' <div class="product" id="' + product_id + '"' +
            '>\n' +
            '                <span class="text-product"' +
            ' id="' + label_id + '"' + '>' + product +
            '</span>\n' +
            '                <div class="controls">\n' +
            '                    <button class="button delete" id="' + delete_id + '"' + max_id_list +
            '>-</button>\n' +
            '                    <span class="counts" id="' + counts_id + '"' + max_id_list +
            '>1</span>\n' +
            '                    <button class="button add" id="' + add_id + '"' + max_id_list +
            '>+</button>\n' +
            '                </div>\n' +
            '                <div class="state">\n' +
            '                    <div class="controls-state">\n' +
            '                        <button class="bought" id="' + buy_id + '"' +
            '>Bought</button>\n' +
            '                        <button class="remove" id="' + remove_id + '"' +
            '>X</button>\n' +
            ' <button class="not-bought" id="' + not_buy_id + '"' +
            '>Not bought</button>' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>')
        addingNewProductInList(product)
        addListenersNew(max_id_list)
    }

    function addingNewProductInList(product) {
        if (counter_basket_not_buy % 3 == 0) {
            basket_row_not_buy_id++;
            var section_row_id = "section_row_" + basket_row_not_buy_id;
            $(".section-rest").append('<div class="section-row" id="' + section_row_id + '"></div>')
            var section_id = "section_" + max_id_list;
            var buy_label_id = "buy_label_" + max_id_list;
            var buy_counts_id = "buy_counts_" + max_id_list;
            $("#section_row_" + basket_row_not_buy_id).append('<div class="section" id="' + section_id + '"' +
                '>\n' +
                '<div class="buy-product" id="' + buy_label_id + '"' +
                '>' + product +
                '<span class="counts-bought" id="' + buy_counts_id + '"' +
                '>1</span></div>\n' +
                '</div>')
        }
        else {
            var section_id = "section_" + max_id_list;
            var buy_label_id = "buy_label_" + max_id_list;
            var buy_counts_id = "buy_counts_" + max_id_list;
            $("#section_row_" + basket_row_not_buy_id).append('<div class="section" id="' + section_id + '"' +
                '>\n' +
                '<div class="buy-product" id="' + buy_label_id + '"' +
                '>' + product +
                '<span class="counts-bought" id="' + buy_counts_id + '"' +
                '>1</span></div>\n' +
                '</div>')
        }
    }

    function buy(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        $("#add_" + index).css("display", "none");
        $("#delete_" + index).css("display", "none");
        $("#label_" + index).css("text-decoration", "line-through");
        $("#remove_" + index).css("display", "none");
        $("#buy_" + index).css("display", "none");
        $("#notbuy_" + index).css("display", "inline")
        moveProductToBasket(index);
    }

    function returnState(s) {
        arr = s.split("_")
        var index = arr[arr.length - 1]
        $("#add_" + index).css("display", "inline");
        $("#delete_" + index).css("display", "inline");
        $("#label_" + index).css("text-decoration", "none");
        $("#remove_" + index).css("display", "inline");
        $("#buy_" + index).css("display", "inline");
        $("#notbuy_" + index).css("display", "none")
        moveProductFromBusket(index)
    }

    function remove(s) {
        counter_basket_not_buy--;
        arr = s.split("_")
        var index = arr[arr.length - 1]
        $("#product_" + index).remove()
        $("#section_" + index).remove()
    }

    function addListenersNew(id) {
        $("#remove_" + id).click(function () {
            remove($(this).attr('id'))
        })
        $("#buy_" + id).click(function () {
            buy(($(this).attr('id')))
        })
        $("#add_" + id).click(function () {
            increment($(this).attr('id'))
        })
        $("#delete_" + id).click(function () {
            decrement($(this).attr('id'))
        })
        $("#notbuy_" + id).click(function () {
            returnState($(this).attr('id'))
        })
    }

    function moveProductToBasket(index) {
        var elem = $("#section_" + index).html();
        if (counter_basket_buy % 3 == 0&&counter_basket_buy>2) {
            basket_row_buy_id++;
            var basket_row_id = "basket_row_" + basket_row_buy_id;
            $(".basket").append('<div class="section-row" id="' + basket_row_id + '"></div>')
            $("#basket_row_" + basket_row_buy_id).append(elem);
        }
        else {
            $("#basket_row_" + basket_row_buy_id).append(elem);
        }
        $("#section_" + index).remove();
        counter_basket_buy++;
        counter_basket_not_buy--;
    }

    function moveProductFromBusket(index) {
        var elem = $("#basket_row_" + index).html();
        //TODO
        /*if (counter_basket_not_buy % 3 == 0) {
            var section_row_id = "section_row_" + basket_row_not_buy_id;
            $("#section_row_"+basket_row_not_buy_id).append(elem)
            $(".section-rest").append('<div class="section-row" id="' + section_row_id + '"></div>')
            basket_row_not_buy_id++;
        }
        else{
            $("#section_row_" + basket_row_not_buy_id).append(elem);
        }
        counter_basket_not_buy++;
        counter_basket_buy--;*/
        $("#basket_row_" + index).remove();
    }

});