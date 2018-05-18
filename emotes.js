$("#btnsearch").on("click", function() {
			ppage = 1;
			ps = $("#s").val();
			getEmotes();
		});
		
		$("#s").keypress(function(e) {
			if(e.which == 13) {
				ppage = 1;
				ps = $("#s").val();
				getEmotes();
				return false;
			}
		});
		
		$("#sffz").on("click", function() {
			ppage = 1;
			ped = "ffz";
			ps = "";
			$("#sall").removeClass("active");
			$("#sbttv").removeClass("active");
			$(this).addClass("active");
			getEmotes();
		});
		
		$("#sbttv").on("click", function() {
			ppage = 1;
			ped = "bttv";
			ps = "";
			$("#sall").removeClass("active");
			$("#sffz").removeClass("active");
			$(this).addClass("active");
			getEmotes();
		});

		$("#sall").on("click", function() {
			ppage = 1;
			ped = "all";
			ps = "";
			$("#sbttv").removeClass("active");
			$("#sffz").removeClass("active");
			$(this).addClass("active");
			getEmotes();
		});
		
		function getEmotes() {
			
			ChangeUrl("", "//betterdiscord.net/emotes/?ed=" + ped + "&page=" + ppage + "&s=" + ps);
			
			$("#semotes").text("");
			$("#emheader p").text("");
			$.ajax({
				type: 'POST',
				url: 'emoteapi.php',
				data: {
					'page': ppage,
					'emotes': ped,
					'sterm': ps
				},
				success: function(rdata) {
					var obj = JSON.parse(rdata);
					var tbody = $("#emotesbody");
					tbody.empty();

					$.each(obj["emotes"], function(i, val) {
						if(ped == "ffz") {
							tbody.append('<tr><td>'+i+'</td><td><img src="https://cdn.frankerfacez.com/emoticon/'+val+'/1"></td></tr>');
						} else if(ped == "bttv") {
							tbody.append('<tr><td>'+i+'</td><td><img src="https://cdn.betterttv.net/emote/'+val+'/1x"></td></tr>');
						} else {
							if (val.match(/[a-z]/i)) { 
								tbody.append('<tr><td>'+i+'</td><td><img src="https://cdn.betterttv.net/emote/'+val+'/1x"></td></tr>');
							} else {
								tbody.append('<tr><td>'+i+'</td><td><img src="https://cdn.frankerfacez.com/emoticon/'+val+'/1"></td></tr>');
							}
						}
					
					});
					
					if(ped == "ffz") {
						$("#semotes").text("FrankerFaceZ emotes supported by BetterDiscord: " + obj["tcount"]);
						if(ps != "") {
							$("#emheader p").text("Search results for '"+ps+"' - " + obj["ecount"]);
						}
					} else if(ped == "bttv") {
						$("#semotes").text("BetterTTV emotes supported by BetterDiscord: " + obj["tcount"]);
						if(ps != "") {
							$("#emheader p").text("Search results for '"+ps+"' - " + obj["ecount"]);
						}
					} else {
						$("#semotes").text("FFZ/BetterTTV emotes supported by BetterDiscord: " + obj["tcount"]);
						if(ps != "") {
							$("#emheader p").text("Search results for '"+ps+"' - " + obj["ecount"]);
						}
					}

					$("#top-pagination").bootstrapPaginator({ currentPage: ppage, totalPages: obj["pages"], bootstrapMajorVersion: 3, onPageClicked: function(e,originalEvent,type,page) {  ppage = page; getEmotes(); } });
				}
			});
		}
		getEmotes();
	
		function ChangeUrl(page, url) {
        	if (typeof (history.pushState) != "undefined") {
        	    var obj = {Page: page, Url: url};
       	     history.pushState(obj, obj.Page, obj.Url);
     	   } else {
     	       window.location.href = url;
     	   }
    	}