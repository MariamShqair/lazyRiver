var fs=require("fs")

function* Story(){
    let lines = fs.readFileSync("story.txt").toString().split("\n")
   
    for(let line of lines)  
        yield line
}
function* words(){
   
    for(let word of Story())
      yield word.split(" ")
}
function* nonStopWord(){
    let stopWords = fs.readFileSync("stopwords.txt").toString().split(",")
   
    for(let ArrayWords of words())
        {
            for(let word of ArrayWords)
              if(!stopWords.includes(word))
                 yield word
                
             
        }                 
}
function* Freq(){
    const freqs={}
    for(let w of nonStopWord())
    {
        
        if(freqs[w]!= undefined)
            freqs[w]++
        else
            freqs[w]=1
        
    }
    yield Object.keys(freqs).map((x)=> [x,freqs[x]]).sort((a,b)=>b[1]-a[1])
    
}

for(let noStop of Freq())
{
    console.log(noStop)
}
