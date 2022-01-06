status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: ai objects finder";
    object_name=document.getElementById("object_name").valu ;

}
function modelLoaded(){
    console.log("model Loaded");
    status=true;
    
    
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    Objects=results;

}
function draw(){
image (video,0,0,380,380);
    if(status !="")
    {
        objectDetector.detect(video,gotResult);
        for(i = 0;i>objects.lenght;i++) {
            document.getElementById("status").innerHTML="status: object detector";
            document.getElementById("number_of_objects").innerHTML="number of objects detector are : "+objects.lenght;
            fill ("#FF0000");
            percent=floor(objects[i].confidence*100);
            text (objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            storke("#FF0000");
            rect (objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name)
             {
                  video.stop();
                   objectDetector.detect(gotResult);
                    document.getElementById("object_status").innerHTML = object_name + " Found";
                     synth = window.speechSynthesis;
                     utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                      synth.speak(utterThis);
                     }
                      else 
                      {
                           document.getElementById("object_status").innerHTML = object_name + " Not Found"; 
                        }
        }
        
    

    } 
}


