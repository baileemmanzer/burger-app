$(document).ready(function () {
    $("#addButton").click(function (e) { 
        e.preventDefault();
        var newNom = {
            burger_name: $("#nomInput").val().trim(),
        };
        //POST 
        $.ajax( {
            url: "/api/burgers",
            type: "POST",
            data: newNom
        }).then(
            function() {
                // console.log("adding NOMS!");
                location.reload();
            }
        );
    });
    $(".nomOrNotButton").click(function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var devoured = $(this).data("eaten");

        if (!devoured) {
            $.ajax({
                type: "PUT",
                url: "/api/burgers/" + id,
                data: devoured
            }).then(
                function() {
                    location.reload();
                }
            );
        } else {
            $.ajax({
                type: "DELETE",
                url: "/api/burgers/" + id
            }).then(
                function() {
                    location.reload();
                }
            );
        }
    })
});
