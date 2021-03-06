jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Odpytuje GitHub za repozytorium użytkownika: " + username +"...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<ul class="repo_ul"/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<li><div class="repo_name"><a href="'+ (this.homepage?this.homepage:this.html_url) +'" title="' + this.description +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></div>');
                list.append('<div class="desc">' + this.description +'</div><div style="clear:both;" /></li>');
            }
        });
		     
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};
