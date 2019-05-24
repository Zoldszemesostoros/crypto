function rn(szam) {
	if (szam == 0 ) return 0
	v = Math.random()
	eredm = ((Math.round(v*100000))) % szam
	return eredm
}
function textToArray(txt) {
	var length = txt.length;
	var result = [];
	for(var i=0;i<length;i++) {
		result.push(txt.charCodeAt(i));
	}
	return result;
}
function arrayToText(numArr) {
	var length = numArr.length;
	var result = "";
	for(var i=0;i<length;i++) {
		result += String.fromCharCode(numArr[i]);
	}
	return result;
}
function xorwithallArr(arr1,arr2){
	var length = arr1.length;
	if(arr2.length!=length) return;
	var result = [];
	for(var i=0;i<length;i++) {
		result.push(arr1[i] ^ arr2[1]);
	}
	return result;
}
function randombitArr(length) {
	var result = [];
	for(var i=0;i<length;i++) {
		result.push(rn(255));
	}
	return result;
}
function createDecodedArr(event) {
    //koordinalja a kikódolast
    //console.log("kikodol eleje")
    $("body").addClass("load");
	setTimeout(
        function() {
            var first = $("#text1")[0].value;
            var second = $("#text2")[0].value;
            first = textToArray(first);
            second = textToArray(second);
            var joined = xorwithallArr(first, second);
            var result = arrayToText(joined);
            $("#text3")[0].value = result;
            //console.log("egyik : " + egyik)
            //console.log("masik : " + masik)
            //console.log("osszesitett : " + osszesitett)
            //console.log("eredmeny : " + eredmeny)
            //console.log("kikodol vege")
            $("body").removeClass("load");
        }, 0);
}

function createEncryptedArr(event) {
//koordinalja a titkositast
//console.log("letrehoz_titkositott eleje")
	$("body").addClass("load");
	var notEncryptedTxt = $("#text3").val();
	console.log(notEncryptedTxt)
	var notEncrypted = textToArray(notEncryptedTxt);
	var generated = randombitArr(notEncrypted.length);
	var result = xorwithallArr(notEncrypted, generated);
	$("#text1")[0].value = textToArray(generated);
	$("#text2")[0].value = textToArray(result);
	//console.log("titkositando : " + titkositando)
	//console.log("generalt : " + generalt)
	//console.log("eredmeny : " + eredmeny)
	//console.log("letrehoz_titkositott vege")
	$("body").removeClass("load");
}
function randombit(length) {
    //szam valtozó hosszusagu 0-1 kombinaciókat csinal veletlenszeruen.
    //pl a randombit(3) eredmenye lehet "000" , "011" stb
	"use strict";
	var result = (((Math.round(Math.random() * 100000))) % 2).toString();
    for (var i = 0; i + 1 < length; i++) {
        result = (((Math.round(Math.random() * 100000))) % 2).toString() + result;
    }
    return result;
}

function xor(c1, c2) {
    // a xor (kizaró vagy) logikai muvelet
    return ((c1 ^ c2).toString(16)).substr(-2);
}

function xorwithall(first, second) {
    //Ket ugyanolyan hosszusagu, 0-1 stringet var, majd karakterenkent egyesiti oket a fenti xor() fuggvennyel
    //pl a xor("001","110") eredmenye "111" lesz
    //console.log("titkosit eleje")
    //console.log("egyik : " + egyik)
    //console.log("masik : " + masik)
    var result = xor(first.charCodeAt(0), second.charCodeAt(0));
    //console.log(eredm)
    //console.log("---")
    for (i = 1; i < first.length; i++) {
        result += xor(first.charCodeAt(i), second.charCodeAt(i));
        //console.log(eredm)
        //console.log("---")
    }
    //console.log("titkosit vege")
    return result;
}

function addZero(str, length) {
    //egy string ele 0-kat tesz, hogy az elerje a megadott hosszusagot
    var result = str;
    for (var i = 1; !(i > (length - str.length)); i++) {
        result = "0" + result;
    }
    return result;
}

function stringToBin(str) {
    //a bemeneti stringet 1-0 karaktersorra alakitja
    //A karaktereknek kiszamolja a kódjat, atvaltja 2-es szamrendszerbe, es egymashoz fuzi oket
    // a addZero() gondoskodik arról, hogy mindig 8 szamjegyuek legyenek a kódok
    //console.log("stringToBin eleje") 
    var result = addZero(str.charCodeAt(0).toString(2), 16);
    //console.log(eredm)
    //console.log("---")
	var length = str.length
    for (i = 1; i < length; i++) {
        result += addZero(str.charCodeAt(i).toString(2), 16);
        //console.log(eredm)
        //console.log("---")
    }
    //console.log("stringToBin vege")
    return result;
}

function binToString(bin) {
    //console.log("binToString eleje")
    result = String.fromCharCode(parseInt(bin.substring(0, 16), 2))
    //console.log(eredm)
    //console.log("---")
	var length = bin.length
    for (i = 1; i * 16 < length; i++) {
        result += String.fromCharCode(parseInt(bin.substring(i * 16, i * 16 + 16), 2))
        //console.log(eredm)
        //console.log("---")
    } //console.log("binToString vege")
    return result;
}
/*
function binTo64(mit) {
    //fejlesztes alatt
    var eredm = addZero(mit.charCodeAt(0).toString(2), 8);
    for (i=1; i<mit.length; i++){
      eredm += addZero(mit.charCodeAt(i).toString(2), 8);
    }
    return btoa(eredm);
}
function binFrom64(mit) {
    //fejlesztes alatt
    eredm = String.fromCharCode(parseInt(mit.substring(0,8),2))
    for (i=1; i*8<mit.length; i++){
      eredm += String.fromCharCode(parseInt(mit.substring(i*8,i*8+8),2))
    }
   return atob(eredm);
}
function coord_dec(first,second) {
	//fejlesztem
	var egyik = stringToBin(first);
    var masik = stringToBin(second);
	var osszesitett = xorwithall(egyik, masik);
    var eredmeny = binToString(osszesitett);
	return eredmeny;
}
function coord_enc(text) {
	//fejlesztem
	var generalt = randombit(text.length);
	var eredmeny = xorwithall(text, generalt);
	var eredm1 = binToString(generalt);
	var eredm2 = binToString(eredmeny);
	return [eredm1,eredm2]
} */
function createDecoded(event) {
    //koordinalja a kikódolast
    //console.log("kikodol eleje")
    $("body").addClass("load");
	setTimeout(
        function() {
            var first = $("#text1")[0].value;
            var second = $("#text2")[0].value;
            first = stringToBin(first);
            second = stringToBin(second);
            var joined = xorwithall(first, second);
            var result = binToString(joined);
            $("#text3")[0].value = result;
            //console.log("egyik : " + egyik)
            //console.log("masik : " + masik)
            //console.log("osszesitett : " + osszesitett)
            //console.log("eredmeny : " + eredmeny)
            //console.log("kikodol vege")
            $("body").removeClass("load");
        }, 0);
}

function createEncrypted(event) {
    //koordinalja a titkositast
    //console.log("letrehoz_titkositott eleje")
    $("body").addClass("load");
    setTimeout(
        function() {
            var notEncrypted = stringToBin($("#text3")[0].value);
            var generated = randombit(notEncrypted.length);
            var result = xorwithall(notEncrypted, generated);
            $("#text1")[0].value = binToString(generated);
            $("#text2")[0].value = binToString(result);
            //console.log("titkositando : " + titkositando)
            //console.log("generalt : " + generalt)
            //console.log("eredmeny : " + eredmeny)
            //console.log("letrehoz_titkositott vege")
            $("body").removeClass("load");
        }, 0);
}

function handleResize() {
	if ($(window).width() < 780) {
		$("body").addClass("small");
	} else {
        $("body").removeClass("small");
	}
}

$(document).ready(function() {
    $("textarea").on("focus", function() {
        $(this).select();
    });
	$("#encrypt").on("click", function(event) {
		event.preventDefault()
		createEncrypted()
	});
	$("#decode").on("click", function(event) {
		event.preventDefault()
		createDecoded()
	});
	$("img").each(function(){
		$(this).attr("role","presentation")
	});
	$(window).on("resize",handleResize);
	handleResize();
});