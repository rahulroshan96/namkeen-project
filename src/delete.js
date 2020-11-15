var x = [0,1,2,3,4,5,6,7,8,9,10]

for(var i=0;i<x.length/3;i++){
    for(var j=0;j<3;j++){
    var l = (i*3)+j
    if(l<x.length){
        console.log(x[l])
    }
    }
    console.log("break")
}

console.log(x.slice(1,3))