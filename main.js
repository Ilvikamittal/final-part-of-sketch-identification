function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}


function setup(){
    canvas=createCanvas(280,285);
    canvas.center();
    background("whitesmoke");

    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function clearCanvas(){
    background("whitesmoke");
}

function draw(){
    stroke("red");
    strokeWeight(6);
    if(mouseIsPressed){
     line(mouseX,mouseY,mouseX,mouseY)
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);

}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    
    console.log(results);
    document.getElementById("label").innerHTML="Label: "+results[0].label;
    document.getElementById("confidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+"%";

    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}