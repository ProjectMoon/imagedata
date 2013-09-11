window.onload = function() {
    var img = new Image();
    img.onload = function() {
	var canvas = document.getElementById("fun");
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	var imgData = ctx.getImageData(0, 0, img.width, img.height);
	var data = imgData.data;

	var factor = 0;
	var i = 0;

	setInterval(function() {
	    var newData = ctx.createImageData(img.width, img.height);
	    
	    for (var c = 0; c < data.length; c += 4) {
		var red = data[c];
		var green = data[c + 1];
		var blue = data[c + 2];
		var alpha = data[c + 3];
		
		//red -> blue
		newData.data[c] = blue * factor;
		if (newData.data[c] > 255) newData.data[c] = 255;

		//green -> red
		newData.data[c + 1] = red * factor;
		if (newData.data[c + 1] > 255) newData.data[c + 1] = 255;

		//blue -> green
		newData.data[c + 2] = green * factor;
		if (newData.data[c + 2] > 255) newData.data[c + 2] = 255;

		//alpha
		newData.data[c + 3] = 255;
	    }

	    //alert('done');
	    ctx.putImageData(newData, 0, 0);
	    document.getElementById("info").innerText = 'Factor: ' + factor + ' (i = ' + i + ')';
	    i+= 100;
	    factor = i / 1000;
	}, 20);
    };


    img.src = 'darth-vader.jpg';
};
