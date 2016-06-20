$(document).ready(function () {

    $("#btnAddMessage").click(function () {
        var message = $("#txtMessage").val();
        var url1 = 'http://localhost:8500/messages/' + message;
        $.ajax({
            url: url1,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                
                $(".messages").append(data + " &nbsp;&nbsp;&nbsp;" + message + " <br/>");
                $("#txtMessage").val("");
            },
            error: function (err) {
                alert(err + " Error occured while retrieving data");
            }
        });

    });

    $("#btnDeleteMessage").click(function () {
        var id = $("#txtDeleteMessage").val();
        if (isNaN(id)) {
            alert("Enter a valid Message Id");
        }
        else {
            var url2 = 'http://localhost:8500/messages/delete/' + id;

            $.ajax({
                url: url2,
                method: 'POST',

                success: function (data) {
                    if (data == 0) {
                        alert("Message with id " + id + " doesn't exist, Please enter valid message Id");
                    }
                    else if (data != 0) {
                        
                        alert('Message deleted succesfully');
                        $.ajax({
                            url: 'http://localhost:8500/messages',
                            method: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                $(".messages").empty();
                                $.each(data, function (i, item) {
                                    $(".messages").append(item.id + " &nbsp;&nbsp;&nbsp;" + item.name + " <br/>");
                                });
                                $("#txtDeleteMessage").val("");
                            },
                            error: function (err) {
                                alert(err + " Error occured while retrieving data");
                            }
                        });

                    }
                },
                error: function (err) {
                    alert(err + " Error occured while deleting data");
                }
            });


        }});

    $("#GetMessages").click(function () {

        $.ajax({
            url: 'http://localhost:8500/messages',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                
                    $(".messages").empty();
                    $("#GetMessages").prop('value', 'Refresh');
                    $.each(data, function (i, item) {
                        $(".messages").append(item.id + " &nbsp;&nbsp;&nbsp;" + item.name + " <br/>");
                    });

                
            },
            error: function (err) {
                alert(err + " Error occured while retrieving data");
            }
        });

    });
});