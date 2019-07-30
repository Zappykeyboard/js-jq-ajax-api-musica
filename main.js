$(document).ready(function() {

	var url = "https://flynn.boolean.careers/exercises/api/array/music";

	$("#genres-select").val("All");

	//definisco il template degli album
	var albumSource = $("#template").html();
	var albumTemplate = Handlebars.compile(albumSource);
	var context;

	$.ajax({
		url: url,
		method: "GET",
		success: function(data){
			if (data.success){
				
				var albumList = data.response;

				for (var i = 0; i < albumList.length; i++){
					
					context = {
						albumPicture: albumList[i].poster,
						albumName: albumList[i].title,
						albumAuthor: albumList[i].author,
						albumYear: albumList[i].year,
						albumGenre: albumList[i].genre
					}

					var htmlElement = albumTemplate(context);

					$(".cds-container").append(htmlElement);
				}

				$("#genres-select").removeAttr("disabled");

			}


		}
	});

	$("#genres-select option").on("click", function(){
			
		var selected = $(this).val();
		console.log(selected)
		if (selected==="All"){
			$(".cd").show();
		} else {

			$(".cd").each( function(){

				if ($(this).find(".genre").text() === selected){
					$(this).show();
				} else {
					$(this).hide();
				}
	
			});
		}

		

	});

});