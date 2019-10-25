function repo_groupLoad() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        var text = '{ "repo_group" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        
        var optionText = "<option disabled selected value> -- select an option -- </option>";
        var i;
        for(i = 0; obj.repo_group[i] != null; i++){
            optionText = optionText + '<option value="' + obj.repo_group[i].repo_group_id + '">' + obj.repo_group[i].rg_name + '</option>'
        }
        document.getElementById("repo_group").innerHTML = optionText;
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups", true);
    xhttp.send();
}

function repo_groupChange(){
    var xhttp = new XMLHttpRequest();
    var selected = document.getElementById("repo_group");
    var repo_groupID = selected.options[selected.selectedIndex].value;
    
    xhttp.onreadystatechange = function() {
        var text = '{ "repos" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        
        var optionText = "<option disabled selected value> -- select an option -- </option>";
        var i;
        for(i = 0; obj.repos[i] != null; i++){
            optionText = optionText + '<option value="' + obj.repos[i].repo_id + '">' + obj.repos[i].repo_name + '</option>'
        }
        document.getElementById("repos").innerHTML = optionText;
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repo_groupID + "/repos", true);
    xhttp.send();
}

function loadVisuals(){
    
    var repoGroup = document.getElementById("repo_group");
    var repoGroupID = repoGroup.options[repoGroup.selectedIndex].value;
    var repos = document.getElementById("repos");
    var reposID = repos.options[repos.selectedIndex].value;
    
    topCommitters(repoGroupID, reposID);
    acceptanceRate();
}

function topCommitters(repoGroupID, reposID){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        var text = '{ "topCommitters" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        console.log(obj.topCommitters[0].email);
        var email;
        var committers = "<h2>Top Committers:</h2><ol>";
        var i;
        for(i = 0;(obj.topCommitters[i].email != "other_contributors") && i < 10; i++){
            console.log(i);
            console.log(obj.topCommitters[i].email);
            
            email = obj.topCommitters[i].email;
            committers = committers + "<li>" + email + "  " + obj.topCommitters[i].commits + "</li>";
        }
        committers = committers + "</ol>";
        document.getElementById("topCommitters").innerHTML = committers;
    };
    
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/top-committers", true);
    xhttp.send();
}

function acceptanceRate(){
    
}