$(document).ready(function() {

	var url = "https://flynn.boolean.careers/exercises/api/array/music";

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
						albumYear: albumList[i].year
					}

					var htmlElement = albumTemplate(context);

					$(".cds-container").append(htmlElement);
				}

			}


		}
	})

});