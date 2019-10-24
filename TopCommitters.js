function loadRepos() {
    var dropDown = document.getElementById("dropDown");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var text = '{ "committers" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        document.getElementById("demo").innerHTML = obj.committers[0].email + "\t" + obj.committers[0].commits;
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/"+dropDown.options[dropDown.selectedIndex].value + "/top-committers", true);
    xhttp.send();
}

function loadPullRequest() {
    var dropDown = document.getElementById("dropDown");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var text = '{ "committers" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        //add loop
        document.getElementById("demo").innerHTML = obj.committers[0].email + "\t" + obj.committers[0].commits;
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/"+dropDown.options[dropDown.selectedIndex].value + "/pull-request-acceptance-rate", true);
    xhttp.send();
}