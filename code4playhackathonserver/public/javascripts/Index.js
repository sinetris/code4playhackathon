$(function(){
	
	var objModel = new Model();
	ko.applyBindings(objModel);

});



Model = function(){
	var self = this;
	self.NomeUtente = ko.observable();
	self.Ruolo = ko.observable();
	
	
	self.DoLogin = function(){
		if(self.NomeUtente() !== undefined &&  self.NomeUtente() !== "")
		{
			if(self.Ruolo() === "Genitore"){
				location.href = "parent?name="+self.NomeUtente();
			}
			else if(self.Ruolo() === "Figlio")
			{
				location.href = "child?name="+self.NomeUtente();
			}
			else
			{
				alert("Seleziona il ruolo per fare il Login");
			}
		}
		else
		{
			alert("Inserisci il nome utente");
		}
		
	};
	
}