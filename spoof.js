
const docx = require("docx");
const fs = require("fs");

word_list = fs.readFileSync('words.txt').toString().split("\n");

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Documents #:', document_amount => 
  {  
    let size = Number(document_amount);
    for (let i = 0; i < size; ++i)
    {
        let paragraph = [];
        paragraph_words = get_random_int(300, 2000);
        for (let j = 0; j < paragraph_words; ++j)
        {
            paragraph.push(word_list[get_random_int(0, word_list.length - 1)]);
        }
        
        const doc = new docx.Document();

        doc.addSection({
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun(paragraph.join(' '))
                    ],
                }),
            ],
        });

        docx.Packer.toBuffer(doc).then((buffer) => {
            let doc_name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            fs.writeFileSync("output\\" + doc_name + ".docx", buffer);
        });
    }
    readline.close();
  });

