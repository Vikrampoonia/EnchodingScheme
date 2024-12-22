
var numberTr=0; // tell number of row tag (tr) of a table
var demonspart1=[]; //store char->ASCII->binaryconversion of 8 bit length
var demonspart2=[]; // binarystring before adding exta zeroes and after adding extra zeroes
var demonspart3=[]; // clubing of each bits -> DECIMAL BASE -> BASE CONVERT VALUE
var demonspart3a=[]; // storing remainder of base 85

function myfunction()
{
    // make demostration tag none
    let demonsTag=document.getElementById('demonsTag');

    demonsTag.style.display="none";
    
    myRset();
    let Str=document.getElementById('Str');
    let algo=document.getElementById('algo');
    let Ans=document.getElementById('Ans');

    Ans.innerHTML=findAscii(Str.value, algo.value);
  
    show_demonstration(algo.value);
}




function findAscii( str, base)
{
    let binaryString="";

    for(let i=0; i<str.length; i++)
    {
        let string=str[i];
        let num=string.codePointAt(0);
        let tempBinaryString=convertToBinary(num); // return 8 bit binary string
        binaryString=binaryString+tempBinaryString;   
        demonspart1.push(string);
        demonspart1.push(num);
        demonspart1.push(tempBinaryString);
       
        
    }



    demonspart2.push(binaryString);


    let number;
    if((binaryString.length % base)!=0)
    {
        //making string length so that it equal divided into no of sub group with equal length
        number=binaryString.length%base;
        number=base-number;
        for(let i=0; i< number; i++)
        {
            binaryString+="0";
        }
    }
    demonspart2.push(binaryString);
    if(number==undefined)
    {
        number=0;
    }

    let answer=[];
    let result="";
    let k=0;
    for(let i=0; i<binaryString.length; i++)
    {
        if(k<base)
        {
            result+=binaryString[i];
            if(k==base-1)
            {
                answer.push(conToBaseValue(result,base)); //make this function 
                
                result="";
                k=-1;
            }
        }
        k++;
    }

        result="";
        for(let i=0; i<answer.length; i++)
        {
            result+=answer[i];
        }

        //it work properly for base 64 you should check for base 
        if(base==6)
        {
            (number==base)?number=0:number=number;
            for(let i=0; i<number/2; i++) // if extra bit added
            {
                result+="=";
            }
            
        }
        else if(base==5)
        {
            if(number!=0)
            {
                number=Math.floor((40 - (binaryString.length%40))/5);
                

                for(let i=0; i<number; i++) // if extra bit added
                {
                    result+="=";
                }
                
            }
        }
        else
        {
            demonspart3a.push(result);
            let ans="";
            
            for(let i=0; i<(result.length-Math.floor(number/8)); i++)
            {
                ans+=result[i];
            }
            
            return ans;
        }
        return result;
    
}


function convertToBinary(num)
{
    num=parseInt(num);
    let binary="";
    while(num!=0)
    {
        binary+=num%2;
        num=Math.floor(num/2);
    }

    let ans="";
    for(let i=binary.length-1; i>=0; i--)
    {
        ans+=binary[i];
    }

    num=8-binary.length;

    binary="";
    for(let i=0; i<num; i++)
    {
        binary+='0';
    }

    ans=binary+ans;

    return ans;
}


function conToBaseValue(result,base)
{
    demonspart3.push(result);
    let num=0; let k=0;
    for(let i=result.length-1; i>=0; i--)
    {
        num+=(result[i] * (2**k));
        k++;
    }
    demonspart3.push(num);
    if(base==6)
    {
        k=conToBase64(num);
    }
    else if(base==5)
    {
        k=conToBase32(num);
    }
    else
    {
        let arr=[];
        while(num/85!=0)
        {
            let remainder=num%85;
            demonspart3a.push(remainder);
            arr.push(remainder+33);
            num=Math.floor(num/85);
        }
        
        demonspart3a.reverse();
        arr.reverse();
        k="";
        for(let i=0; i<arr.length; i++)
        {
            k+=String.fromCharCode(arr[i]);
        }
    }
    
    demonspart3.push(k);
    return k;
}



function conToBase64(num)
{

    if(num<=25)
    {
        return String.fromCharCode(65+num);
    }
    else if(num<52)
    {
        return String.fromCharCode(71+num);
    }
    else if(num<62)
    {
        return String.fromCharCode(num-4);
    }
    else
    {
        return (num==62)? '+' : '/' ;
    }

}


function conToBase32(num)
{

    if(num<=25)
    {
        return String.fromCharCode(65+num);
    }
    else if(num<32)
    {
        return String.fromCharCode(num+24);
    }


}


function addTrToTable(inputChar,asciiValue,binaryString,final)
{
    if(final==1)
    {
        let demonsTable=document.getElementById('demonsTable');
        //create tr element 
        // create td element and append it to tr element

        let row=document.createElement("tr");
        
        
        demonsTable.appendChild(row);
    }
    else
    {
        let demonsTable1=document.getElementById('demonsTable1');
        //create tr element 
        // create td element and append it to tr element

        let row=document.createElement("tr");
        
        
        demonsTable1.appendChild(row);
    }
    let selectRow=document.getElementsByTagName('tr')[numberTr+1];

    numberTr++;
    for(let i=0; i<3; i++)
    {
        let tdata=document.createElement("td");
        selectRow.appendChild(tdata);

        let selectTd=document.getElementsByTagName('td')[(3*numberTr)+i];
        if(i==0)
        {
            selectTd.innerHTML=inputChar;
        }
        else if(i==1)
        {
            selectTd.innerHTML=asciiValue;
        }
        else
        {
            selectTd.innerHTML=binaryString;
        }
    }

}

function show_demonstration(base)
{
    setTimeout(show_demonstration1,500);
    setTimeout(show_demonstration2(base), 1000);
    setTimeout(show_demonstration3, 1500);
    setTimeout(show_demonstration4(base), 4000);

    /*show_demonstration1();
    show_demonstration2(base);
    show_demonstration3();
    show_demonstration4(base);*/

}


function myRset()
{
    numberTr=-1;
    //make array as empty
    clearArray(demonspart1); 
    clearArray(demonspart2); 
    clearArray(demonspart3); 
    clearArray(demonspart3a);

       
    let e=document.querySelector('#demonsTable');
    removeChildren(e);
    
    e=document.querySelector('#demonsTable1');
    removeChildren(e);
    
    e=document.querySelector('#demonsTheory1');
    removeChildren(e);
    
    
    e=document.querySelector('#demonsTheory2');
    removeChildren(e);
    
    addTrToTable('Input','ASCII value','Binary Conversion',1);
    addTrToTable('Binary Club Bits','Decimal Convesion','Base Value',0);
    numberTr=0;
}


function clearArray(arr)
{
    for(let i=0; arr.length; i++)
    {
        arr.pop();
    }
}

function removeChildren(e)
{
    let   child = e.lastElementChild;
        while (child) 
        {
            e.removeChild(child);
            child = e.lastElementChild;
        }
}



function show_demonstration1()
{
    //containing first table content (Input char -> ASCII -> Binary conversion)
    let demonsTag=document.getElementById('demonsTag');

    demonsTag.style.display="block";

    // for demostration 1
    for(let i=0; i<demonspart1.length-2; i+=3)
    {
        addTrToTable(demonspart1[i],demonspart1[i+1],demonspart1[i+2],1);    
    }

}


function show_demonstration2(base)
{
    // first theory explaing about number of zero add  or make group
    let demonsTheory1=document.getElementById('demonsTheory1');

    let para=document.createElement("p");

    demonsTheory1.appendChild(para);

    para=document.getElementsByTagName('p')[1];

    

    if(demonspart2[0].length==demonspart2[1].length)
    {
        para.innerHTML="Your binaryString is "+demonspart2[0] +"<br> Make group of " +base+ " digit";
    }
    else
    {
        para.innerHTML="Your binaryString is "+demonspart2[0] +"<br> Make group of " +base+ " digit. <br> To make equal group we add " +(demonspart2[1].length-demonspart2[0].length)+ "zeroes at the last";
    }
}


function show_demonstration3()
{
    // table take group binaary digit -> DEIMAL->BASE VALUE
    numberTr+=1;
    for(let i=0; i<demonspart3.length-2; i+=3)
    {
        addTrToTable(demonspart3[i],demonspart3[i+1],demonspart3[i+2],0);
        
    }
}



function show_demonstration4(base)
{
    //containing theory part2
    let demonsTheory2=document.getElementById('demonsTheory2');

    if(demonspart2[0].length!=demonspart2[1].length)
    {
        if(base==6)
        {
            let para1=document.createElement("p");

            demonsTheory2.appendChild(para1);

            para1=document.getElementsByTagName('p')[2];
            para1.innerHTML="We add extra zeroes to make equal group. So we add padding(=) in answer at the end. <br>Number of padding add=(Number of zeroes add)/2";
        }
        else if(base==5)
        {
            let para1=document.createElement("p");

            demonsTheory2.appendChild(para1);
        
            para1=document.getElementsByTagName('p')[2];
            //number=Math.floor((40 - (binaryString.length%40))/5);
            let number=Math.floor((40 - (parseInt(demonspart2[1].length)%40))/5);
            console.log("number: "+number);
            let str="We add extra zeroes to make equal group. So we add padding(=) in answer at the end. <br>Number of padding add={40-(Binarystring length)%40}/5."

            para1.innerHTML=str+"<br>Here Original String: "+ demonspart2[1] +" its length is: "+ demonspart2[1].length+ ".<br> Number of zeroes add: "+ (demonspart2[1].length-demonspart2[0].length )+" <br> Number of padding add: " +number;
        }
        else
        {
            let ans=demonspart3a[demonspart3a.length-1];
            demonspart3a[demonspart3a.length-1]=" ";
            let para1=document.createElement("p");

            demonsTheory2.appendChild(para1);

            para1=document.getElementsByTagName('p')[2];

            

            let str1="Convert "+ demonspart3[1] +" Into base 85 and Store Remainder in array like when we convert into base 2.<br>" ;
            let str2="Remainders are: " + demonspart3a + " add 33 to each remainder.<br>Now find corresponding ASC11 VALUE using ASCII 7 Table. AS like you can find your answer";

            let str3= "answer is: "+ans +" .We add " + (demonspart2[1].length-demonspart2[0].length ) +"zeroes So we remove Number of "+ Math.floor((demonspart2[1].length-demonspart2[0].length )/8)+"character from last from answer. So remaining answer is our final answer";

            let str4="Formula to find number of character remove from last is= (Number of zeroes add)/8"
            
            para1.innerHTML=str1+str2+str3+str4;

        }
    }
    else
    {
        if(base==32)
        {
            let ans=demonspart3a[demonspart3a.length-1];
            demonspart3a[demonspart3a.length-1]=" ";
            let para1=document.createElement("p");

            demonsTheory2.appendChild(para1);

            para1=document.getElementsByTagName('p')[2];

            console.log("remainder array: " + demonspart3a[1]);

            let str1="Convert "+ demonspart3[1] +" Into base 85 and Store Remainder in array like when we convert into base 2.<br>" ;
            let str2="Remainders are: " + demonspart3a + " add 33 to each remainder.<br>Now find corresponding ASC11 VALUE using ASCII 7 Table. As like you can find your answer";
            let str3= "<br>answer is: "+ans;

            para1.innerHTML=str1+str2+str3;
        }
    }
}






