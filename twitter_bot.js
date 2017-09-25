var config = require('./twitter_config.js');
var fs = require('fs');
var Twit = require('twit');
var T = new Twit(config);
var title = '';


exports.upload = function(path_to_image, image_title){
	title = image_title;
	T.postMediaChunked({file_path: path_to_image}, uploaded);
}

var uploaded = function(err, data, response){
	if (err){
		console.log(err);
		console.log(data);
	}else{
		var id = data.media_id_string;
		var tweet = {status:title, media_ids: [id]};
		T.post('statuses/update', tweet, callback);
	}
}

var callback = function(err, data, response){
	if (err){
		console.log(err);
		console.log("Something went wrong");
	}else{
		console.log('Success!');
	}
}