
function clearPopulationArea(){
    document.getElementById("populationArea1").innerHTML = "";
}

function repo_groupLoad() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("pageHeader").innerHTML = "Repo Groups";
            var text = '{ "repo_group" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
            
            console.log(obj);
        
            stage = document.getElementById("populationArea1");
            stageHTML = "<ol>"
            for(i = 0; i < obj.repo_group.length; i++){
                appendText = "<li><a href=# id=" + obj.repo_group[i].repo_group_id + " onclick=repo_groupChange(this.id)>" + obj.repo_group[i].rg_name + "</a></li>";
                stageHTML = stageHTML + appendText;
            }
            stageHTML + "<\ol>";
            stage.innerHTML = stageHTML;
        }
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups", true);
    xhttp.send();
}

function repo_groupChange(id){
    var xhttp = new XMLHttpRequest();
    var selected = document.getElementById(id);
    console.log(id);

    xhttp.onreadystatechange = function() {
        clearPopulationArea();
        document.getElementById("pageHeader").innerHTML = "Repos";
        if(this.readyState == 4 && this.status == 200){
            var text = '{ "repos" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
        
            stage = document.getElementById("populationArea1");
            stageHTML = "<ol>";
            console.log(obj);
            for(i = 0; i < obj.repos.length; i++){
                appendText = "<li><a href=# onclick='loadVisuals(id, "+ obj.repos[i].repo_id + ")'>" + obj.repos[i].repo_name + "</a></li>"
                stageHTML += appendText;
            }
            stage.innerHTML = stageHTML;
        }
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + id + "/repos", true);
    xhttp.send();
}

function loadVisuals(repoGroupID, repoID){
    
    console.log("This function was called");
    topCommitters(repoGroupID, repoID);
    
}

function topCommitters(repoGroupID, reposID){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        var text = '{ "topCommitters" : ' + xhttp.responseText + '}';
        var obj = JSON.parse(text);
        console.log(obj);
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
    
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + repoID + "/top-committers", true);
    xhttp.send();
}