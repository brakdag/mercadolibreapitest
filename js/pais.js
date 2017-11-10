var CPAIS = "MLA"
var codigo = {
			"Argentina": "MLA" ,
			Brasil: "MLB" ,
			Uruguay: "MLU" ,
			Chile: "MLC" ,
			Ecuador: "MEC" ,
			'Perú': "MPE" ,
			Portugal : "MPT",
			Venezuela: "MLV",
			Colombia : "MCO",
			'Costa Rica' : "MCR",
			Panamá : "MPA",
			'República Dominicana' :"MRD",
			México: "MLM"
		}


$.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
    var pais = data.address.country;
	CPAIS = codigo[pais];
	if (CPAIS==null) CPAIS = "MLA"
});


