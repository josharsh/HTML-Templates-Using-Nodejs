const replaceTemplate=(temp,student)=>{
   let out=temp+'';
   let output=out.replace(/{%NAME%}/g,student.Name);
  /* let output=temp.replace(/{%NAME%}/g,student.Name);  */
   output=output.replace(/{%CONTACT%}/g,student.Contact);
    output=output.replace(/{%EMAIL%}/g,student.Email);
    return student.Name;
};

const fs=require('fs');
const http=require('http');

const data=fs.readFileSync(`${__dirname}/../data/data.json`);
const dataObj=JSON.parse(data);
const overviewtemp=fs.readFileSync(`${__dirname}/overviewtemplate.html`);
const stutemp=fs.readFileSync(`${__dirname}/studenttemplate.html`);
const server=http.createServer((req,res)=>{
    const pathName=req.url;
    if(pathName==='/'||pathName==='/overview'){

        const cards=dataObj.map(el=>replaceTemplate(stutemp,el)).join('');
       // const cards=dataObj.map(el=>replaceTemplate(cardTemplate,el)).join('');
        let output=overviewtemp+'';
        output=output.replace(/{%STUDENTCARD%}/g,cards);
        res.end(output);
    }
    else if(pathName==='/student'){
        res.end("This is student");
    }
    else{
    res.writeHead(404,{'Content-type':'html/css'});
    res.end("Not Found");
    }
});
server.listen(8000,'127.0.0.2',()=>{console.log("Listening");});