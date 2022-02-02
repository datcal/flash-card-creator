window.jsPDF = window.jspdf.jsPDF;

function createPdf(){
    const doc = new jsPDF();
    doc.addFont("opensans.ttf", "Open Sans", "normal");
    doc.setFont("Open Sans");

    var text = document.getElementById('wordList').value;

    var data = processData(text);
    var dataA = listToMatrix(data.dataA, 4)
    var dataB = listToMatrix(data.dataB, 4)
    console.log(dataA.length);
   
    var pageIndexA = 0;
    for(var i = 0; i < dataA.length; i++){
        
        if((i+1) % 10 == 0){
            pageIndexA = 0;
            doc.addPage("a4","p");
        }
        setRow(dataA[i].length,pageIndexA,dataA[i],doc);
        pageIndexA++;
        
    }
    doc.addPage("a4","p");
    var pageIndexB = 0;
    for(var i = 0; i < dataB.length; i++){
        if((i+1) % 10 == 0){
            pageIndexB = 0;
            doc.addPage("a4","p");
        }
        setRow(dataB[i].length,pageIndexB,dataB[i],doc);
        pageIndexB++;
    }

    document.getElementById("pdfobject").setAttribute('src',doc.output('datauristring'));
}

function downloadPdf(){
    const doc = new jsPDF();
    doc.addFont("opensans.ttf", "Open Sans", "normal");
    doc.setFont("Open Sans");

    var text = document.getElementById('wordList').value;

    var data = processData(text);
    var dataA = listToMatrix(data.dataA, 4)
    var dataB = listToMatrix(data.dataB, 4)
    
    for(var i = 0; i < dataA.length; i++){
        setRow(dataA[i].length,i,dataA[i],doc);
    }
    doc.addPage("a4","p");
    for(var i = 0; i < dataB.length; i++){
        setRow(dataB[i].length,i,dataB[i],doc);
    }

   doc.save('flash-card.pdf',{returnPromise:true});
}


function setRow(cell,row,data,doc){
    doc.setDrawColor(0, 0, 0); // draw red lines
    doc.setLineWidth(0.1);
    var w = 51;
    var h = 31;
    var x = 1;
    var y = 1;
    doc.setFontSize(10);
    for (var i = 0; i < cell; i++) {
        let xN = x + (i*w) + (i*1);
        let yN = (row * h) + ((y * row) + 1);
        let cursor = i + (cell * row)
        doc.rect(xN, yN, w, h);
        doc.text(data[i], xN+1, yN+5);
    }
}


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var dataA = [];
    var dataB = [];
    for (var i = 0; i < allTextLines.length; i++) {
        let row = allTextLines[i].split(';');
        dataA.push(row[0]);
        dataB.push(row[1]);
    }
    return {
        dataA: dataA,
        dataB: dataB
    }
}


function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}