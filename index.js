
function clearPopulationArea(){
    document.getElementById("populationArea1").innerHTML = "";
    document.getElementById("populationArea2").innerHTML = "";
    document.getElementById("populationArea3").innerHTML = "";
}

function repo_groupLoad(slide) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("pageHeader").innerHTML = "Repo Groups";
            var text = '{ "repo_group" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
            console.log(slide);
            console.log(obj);
            if(slide == "populationArea1"){
                document.getElementById("pageHeader").innerHTML = "Repo Groups";
                stage = document.getElementById("populationArea1");
            } else if(slide == "populationArea2"){
                document.getElementById("pageHeader").innerHTML = "Pull Requests";
                stage = document.getElementById("populationArea2");
            }else if(slide == "populationArea3"){
                document.getElementById("pageHeader").innerHTML = "Closed Issues";
                stage = document.getElementById("populationArea3");
            }
            stageHTML = "<ol>"
            for(i = 0; i < obj.repo_group.length; i++){
                appendText = "<li><a href=# id=" + obj.repo_group[i].repo_group_id + " onclick=repo_groupChange(this.id," + slide +")>" + obj.repo_group[i].rg_name + "</a></li>";
                stageHTML = stageHTML + appendText;
            }
            stageHTML + "<\ol>";
            stage.innerHTML = stageHTML;
        }
    };
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups", true);
    xhttp.send();
}

function repo_groupChange(id,slide){
    var xhttp = new XMLHttpRequest();
    var selected = document.getElementById(id);

    xhttp.onreadystatechange = function() {
        clearPopulationArea();
        document.getElementById("pageHeader").innerHTML = "Repos";
        if(this.readyState == 4 && this.status == 200){
            var text = '{ "repos" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
        
            if(slide == "populationArea1"){
                stage = document.getElementById("populationArea1");
            } else if(slide == "populationArea2"){
                stage = document.getElementById("popukationArea2");
            }
            stageHTML = "<ol>";
            console.log(obj);
            for(i = 0; i < obj.repos.length; i++){
                appendText = "<li><a href=# onclick='loadVisuals(" + id + "," + obj.repos[i].repo_id + ")'>" + obj.repos[i].repo_name + "</a></li>"
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
    pullRequests(repoGroupID, repoID);
    closedIssues(repoGroupID, repoID);
    
}

function topCommitters(repoGroupID, reposID){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
            if(this.readyState == 4 && this.status == 500){
            console.log("There was an internal server error. Please try a different repository.");
            error = document.getElementById("errorArea1");
            error.innerHTML = "There was an internal server error. Please try a different repository."            
        }
        if(this.readyState == 4 && this.status == 200){
            var text = '{ "topCommitters" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
            console.log(obj);
            var email;
            var i;
            var committers = "<ol>"
            for(i = 0;(obj.topCommitters[i].email != "other_contributors") && i < 10; i++){
                console.log(i);
                console.log(obj.topCommitters[i].email);
            
                email = obj.topCommitters[i].email;
                committers = committers + "<li>" + email + "  " + obj.topCommitters[i].commits + "</li>";
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea1").innerHTML = committers;
            document.getElementById("errorArea1").innerHTML = "";
        }
    };
    
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/top-committers", true);
    xhttp.send();
}

function pullRequests(repoGroupID, reposID){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
            if(this.readyState == 4 && this.status == 500){
            console.log("There was an internal server error. Please try a different repository.");
            error = document.getElementById("errorArea2");
            error.innerHTML = "There was an internal server error. Please try a different repository."            
        }
        if(this.readyState == 4 && this.status == 200){
            var text = '{ "pullRequests" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
            console.log(obj);
            var email;
            var i;
            var committers = "<ol>"
            for(i = 0;(obj.pullRequests[i].email != "other_contributors") && i < 10; i++){
                console.log(i);
                console.log(obj.pullRequests[i].email);
            
                email = obj.pullRequests[i].email;
                committers = committers + "<li>" + email + "  " + obj.pullRequests[i].commits + "</li>";
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea2").innerHTML = committers;
            document.getElementById("errorArea2").innerHTML = "";
        }
    };
    
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/pull-request-acceptance-rate", true);
    xhttp.send();
}

 



function closedIssues(repoGroupID, reposID){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
            if(this.readyState == 4 && this.status == 500){
            console.log("There was an internal server error. Please try a different repository.");
            error = document.getElementById("errorArea3");
            error.innerHTML = "There was an internal server error. Please try a different repository."            
        }
        if(this.readyState == 4 && this.status == 200){
            var text = '{ "closedIssues" : ' + xhttp.responseText + '}';
            var obj = JSON.parse(text);
            console.log(obj);
            var email;
            var i;
            var committers = "<ol>"
            for(i = 0;(obj.closedIssues[i].email != "other_contributors") && i < 10; i++){
                console.log(i);
                console.log(obj.closedIssues[i].email);
            
                email = obj.closedIssues[i].email;
                committers = committers + "<li>" + email + "  " + obj.closedIssues[i].commits + "</li>";
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea3").innerHTML = committers;
            document.getElementById("errorArea3").innerHTML = "";
        }
    };
    
    xhttp.open("GET","http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/closed-issues-count", true);
    xhttp.send();
}
 
