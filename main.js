$(document).ready(function () {

	var url = "https://flynn.boolean.careers/exercises/api/array/music";

	//Imposto il valore iniziale al dropdown
	$("#genres-select").val("All");

	//definisco il template degli album
	var albumSource = $("#template").html();
	var albumTemplate = Handlebars.compile(albumSource);
	var context;

	$.ajax({
		url: url,
		method: "GET",
		success: function (data) {
			if (data.success) {

				var albumList = data.response;

				for (var i = 0; i < albumList.length; i++) {

					context = {
						albumPicture: albumList[i].poster,
						albumName: albumList[i].title,
						albumAuthor: albumList[i].author,
						albumYear: albumList[i].year,
						albumGenre: albumList[i].genre
					}

					var htmlElement = albumTemplate(context);

					//inserisco gli elementi html
					$(".cds-container").append(htmlElement);
				}

				//attivo il dropdown di ricerca
				$("#genres-select").removeAttr("disabled");

			}
		},
		error: function (req, state, err) {
			alert("Qualcosa è andato storto");
			console.log(err);
		}
	});

	//funzione di ricerca album per genere
	$("#genres-select").on("click", function () {

		var selected = $(this).val();

		if (selected === "All") {

			//mostra tutti gli album
			$(".cd").show();

		} else {

			//mostra quelli corrispondenti alla selezione
			$(".cd").each(function () {

				if ($(this).find(".genre").text() === selected) {
					$(this).show();
				} else {
					$(this).hide();
				}

			});
		}



	});

});