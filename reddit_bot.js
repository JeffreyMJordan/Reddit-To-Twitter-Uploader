

var snoowrap = require('snoowrap');
var config = require('./reddit_config.js');
var downloader = require('./downloader.js');
var twitter = require('./twitter_bot.js');
var saved_posts = [];
const r = new snoowrap(config);
var title = '';
var regex = /\.(gif|jpg|png)/;
var filetype = '.png';



function getNewPosts(){
	return  function(){
		r.getSubreddit('INSERT_NAME_OF_SUBREDDIT_HERE').getNew({amount: 1}).then(function(posts){
			post = posts[0];
			title = post.title;
			if(saved_posts.indexOf(post.url)==-1){
				saved_posts.push(post.url);
				download_and_post(post.url);
			}else{
				console.log('no-updates');
			}
		})
	}	
}

var download_and_post = function(post){
	filetype = regex.exec(post)[0];
	downloader.download(post, 'images/upload'+filetype, tweet);
}

var tweet = function(){
	console.log('Download succesful, posting now');
	//console.log(index);
	twitter.upload('images/upload' + filetype, title);
}




setInterval(getNewPosts(), 1000*30);



